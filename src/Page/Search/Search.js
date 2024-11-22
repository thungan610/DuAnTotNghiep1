import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, LogBox, Dimensions } from 'react-native';
import AxiosInstanceSP from "../api/AxiosInstanceSP";
import { useSelector } from 'react-redux';  // Redux selector
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../api/AxiosInstance';

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  const user = useSelector(state => state.user);
  console.log('user', user);

  const userId = user?.userData?._id || 'default_id';
  console.log('userId', userId);



  const fetchProducts = async (keyword) => {
    try {
      console.log('Fetching products for keyword:', keyword);
      setRefreshing(true);
      const response = await AxiosInstanceSP().get(`/products/search?key=${keyword}`);
      const productsData = Array.isArray(response.data) ? response.data : [];
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
      console.log('Fetching search history for user:', userId);
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
    console.log('Updated searchHistory:', searchHistory);
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
    const imageUri = item.images && item.images.length > 0 ? item.images[0] : defaultImageUri;

    return (
      <TouchableOpacity
        onPress={() => {
          const Detail = {
            id: item._id,
            name: item.name,
            oum: item.oum,
            origin: item.origin,
            preserve: item.preserve?.preserve_name,
            uses: item.uses,
            fiber: item.fiber,
            description: item.description,
            price: item.price,
            images: item.images || [imageUri],
            category: item.category,
          };
          if (Detail.category === "5" || Detail.category === "6") {
            navigation.navigate('Detailbottle', { product: Detail });
          } else {
            navigation.navigate('Detail', { product: Detail });
          }
        }}
      >
        <View style={SearchStyle.productContainer}>
          <Image style={{ width: 100, height: 80 }} source={{ uri: imageUri }} />
          <View style={SearchStyle.productDetails}>
            <Text style={SearchStyle.productName}>{item.name || 'Không có tên sản phẩm'}</Text>
            <Text style={SearchStyle.productWeight}>{item.oum || 'Không có trọng lượng'}</Text>
            <Text style={SearchStyle.productPrice}>{item.price ? `${item.price}.000 VNĐ` : 'Giá không có'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHistoryItem = ({ item }) => (
    <View style={SearchStyle.historyItemContainer}>
      <TouchableOpacity onPress={() => handleSearch(item.keyword)}>
        <Text style={SearchStyle.historyItem}>{item.keyword}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        console.log('Deleting ID:', item._id);
        handleDeleteHistory(item._id);
      }}>
        <Text style={SearchStyle.deleteHistoryItem}>x</Text>
      </TouchableOpacity>
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
            <Text style={SearchStyle.clearText}>X</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('BottomNav')}>
          <Text style={SearchStyle.cancelText}>Hủy</Text>
        </TouchableOpacity>
      </View>

      {searchHistory.length > 0 && (
        <FlatList
          horizontal={true}
          data={isHistoryExpanded ? searchHistory : searchHistory.slice(0, 5)}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}

          showsHorizontalScrollIndicator={false}
          contentContainerStyle={SearchStyle.historyList}
        />
      )}
      {searchHistory.length > 5 && !isHistoryExpanded && (
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
    color: '#2CA9C0',
    fontSize: 14,
    textAlign: 'center',
  },
  productWeight: {
    fontSize: 12,
    color: 'gray',
  },
  productPrice: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
  },
  historyItemContainer: {
    flexDirection: 'row',
    padding: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  historyItem: {
    fontSize: 16,
    color: '#555',
    marginEnd: 10,
  },
  deleteHistoryItem: {
    fontSize: 20,
    color: 'red',
    marginStart: 10,
  },
  viewMoreText: {
    alignItems: 'center',
    marginBottom: 10,
  },
  historyList: {
    paddingLeft: 10,
    height: 100,
  },
});


export default SearchScreen;
