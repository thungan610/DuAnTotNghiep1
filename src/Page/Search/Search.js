import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, LogBox, Dimensions } from 'react-native';
import AxiosInstanceSP from "../api/AxiosInstanceSP";
import { useSelector } from 'react-redux';  // Redux selector
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../api/AxiosInstance';
import axios from 'axios';

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  const user = useSelector(state => state.user);
  const userId = user?.userData?._id || 'default_id';
  const fetchProducts = async (keyword) => {
    try {
      console.log('Fetching products for keyword:', keyword);
      setRefreshing(true);
      const response = await axios.get(`http://192.168.1.22:3000/products/search?key=${keyword}`);
      console.log('response:', response);
      const productsData = response.data.data;
      console.log('Fetched products:', productsData);
      setProducts(productsData);
      setFilteredProducts(productsData);
      setRefreshing(false);
    } catch (error) {
      console.log('Error fetching products:', error);
      setProducts([]);
      setFilteredProducts([]);
      setRefreshing(false);
    }
  };


  const saveSearchHistory = async (keyword) => {
    try {
      const response = await axiosInstance.post(`/search/search-history/save`, { userId, keyword });
      if (response.status === 200) {
        console.log('saved successfully');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };


  const fetchSearchHistory = async () => {
    try {
      const response = await axiosInstance.get(`/search/search-history/${userId}`);
      if (!response) {
        console.log('No data found in response');

      } else {
        setSearchHistory(response);
      }
    } catch (error) {
      console.log('Error fetching search history:', error);
    }
  };

  const handleDeleteHistory = async (id) => {
    try {
      const response = await axiosInstance.delete(`/search/search-history/delete/${id}`);
      console.log('');

      if (response) {
        setSearchHistory(prev => prev.filter(item => item._id.$oid !== id));
        console.log('deleted successfully');
        await fetchSearchHistory()
      }
    } catch (error) {
      console.log('Error deleting history:', error);
    }
  };

  useEffect(() => {
    fetchSearchHistory();
  }, [userId]);
  useEffect(() => {

  }, [searchHistory]);

  useEffect(() => {
    if (searchText.trim()) {
      fetchProducts(searchText);
    } else {
      setFilteredProducts(products);
    }
  }, [searchText]);

  const handleSearch = async (key) => {
    setSearchText(key);
    await fetchProducts(key);
    await saveSearchHistory(key);
  };

  const handleSearchSubmit = () => {
    const keyword = searchText.trim();
    if (keyword) {
      handleSearch(keyword);
    }
    setSearchText('');
  };

  const renderProduct = ({ item }) => {
    console.log('Item:', item);
    const imageUri = item.images && item.images.length > 0 ? item.images[0] : 'default_image_uri';

    return (
      <TouchableOpacity
        onPress={() => {
          if (item.quantity === 0) return;
          const Detail = {
            id: item._id,
            name: item.name,
            oum: item.oum,
            quantity: item.quantity ?? 'Không xác định',
            origin: item.origin ?? 'Không xác định',
            preserve: item.preserve?.preserve_name ?? 'Không xác định',
            user: userId,
            discount: item.discount ?? 0,
            fiber: item.fiber ?? 'Không xác định',
            description: item.description ?? 'Không có mô tả',
            price: item.price,
            images: item.images || [imageUri],
            category: item.category?.category_id ?? 'unknown',
            categoryName: item.category?.category_name ?? 'unknown',
          };

          if (item.category?.category_id === "6606b733ccf861171c336d91") {
            navigation.navigate('Detailbottle', { product: Detail });
          } else {
            navigation.navigate('Detail', { product: Detail });
          }
        }}
      >
        <View style={SearchStyle.productContainer}>
          {(item.quantity === 0) && (
            <View style={SearchStyle.textdiscount}>
              <Text style={SearchStyle.label}>
                Hết hàng
              </Text>
            </View>
          )}

          {item.discount && (
            <View style={SearchStyle.textdiscount}>
              <Text style={SearchStyle.label}>
                Giảm: {item.discount} đ
              </Text>
            </View>
          )}

          <Image style={{ width: 100, height: 80 }} source={{ uri: imageUri }} />
          <Text style={SearchStyle.productTitle} numberOfLines={1}>{item.name || 'Không có tên'}</Text>
          <Text style={SearchStyle.productWeight}>{item.oum || 'Không có trọng lượng'}</Text>
          <View style={SearchStyle.priceall}>
            <Text style={SearchStyle.productPrice}>
              {item.price ? `${item.price.toLocaleString()}VNĐ` : 'Giá không có'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };




  const renderHistoryItem = ({ item }) => (
    <View style={SearchStyle.historyItemContainer}>
      <View style={{ flexDirection: 'row', }}>
        <Image source={require('../../assets/Refresh.png')} />
        <TouchableOpacity onPress={() => handleSearch(item.keyword)}>
          <Text style={SearchStyle.historyItem}>{item.keyword}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 4, marginLeft: 270 }}>
        <TouchableOpacity onPress={() => {
          console.log('Deleting ID:', item._id);
          handleDeleteHistory(item._id);
        }}>
          <Image source={require('../../assets/delete.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={SearchStyle.container}>
      <View style={SearchStyle.searchBar}>
        <TextInput
          style={SearchStyle.searchInput}
          placeholder='Tìm kiếm...'
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchSubmit}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')} style={SearchStyle.clearButton}>
            <Image style={{ tintColor: 'black', width: 20, height: 20 }} source={require('../../assets/delete.png')} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('BottomNav')}>
          <Text style={SearchStyle.cancelText}>Hủy</Text>
        </TouchableOpacity>
      </View>

      {searchHistory.length > 0 && (
        <FlatList
          horizontal={true}
          data={isHistoryExpanded ? searchHistory : searchHistory.slice(0, 4)}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={SearchStyle.historyList}
        />
      )}

      {searchHistory.length > 4 && !isHistoryExpanded && (
        <TouchableOpacity onPress={() => setIsHistoryExpanded(true)} style={SearchStyle.viewMoreText}>
          <Text>Xem thêm...</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item._id.toString()}
        numColumns={2}
        contentContainerStyle={SearchStyle.productList}
        refreshing={refreshing}
        onRefresh={() => fetchProducts(searchText)}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center' }}>
            Không tìm thấy sản phẩm nào
          </Text>
        )}
      />
    </View>
  );
};
const { width, height } = Dimensions.get('window');
const SearchStyle = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    backgroundColor: '#F2F2F2',
  },
  clearButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  clearText: {
    fontSize: 20,
    color: '#007AFF',
  },
  cancelText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007AFF',
  },
  productList: {
    paddingBottom: 20,
  },
  productContainer: {
    borderColor: '#2CA9C0',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: height * 0.22,
    width: width * 0.43,
    margin: 7,
  },
  productDetails: {
    alignItems: 'center',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  productWeight: {
    fontSize: 12,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  historyItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 4
  },
  historyItem: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  viewMoreText: {
    alignItems: 'center',
  },
  historyList: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingBottom: 10
  },
  textdiscount: {
    display: 'flex',
    top: -2,
    left: -50,
    backgroundColor: '#FF0000',
    width: width * 0.16,
    height: height * 0.04,
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});


export default SearchScreen;
