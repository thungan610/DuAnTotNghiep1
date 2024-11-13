import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AxiosInstanceSP from "../api/AxiosInstanceSP";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  // Hàm lấy sản phẩm từ API dựa trên từ khóa
  const fetchProducts = async (keyword) => {
    try {
      setRefreshing(true);
      const response = await AxiosInstanceSP().get(`/products/search?key=${keyword}`);
      console.log('Fetched products:', response.data);
  
      const productsData = Array.isArray(response.data) ? response.data : [];
      setProducts(productsData);
      setFilteredProducts(productsData);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setProducts([]); 
      setFilteredProducts([]); 
      setRefreshing(false);
    }
  };
  

  const saveSearchHistory = async (keyword) => {
    try {
      const currentHistory = await AsyncStorage.getItem('searchHistory');
      const historyArray = currentHistory ? JSON.parse(currentHistory) : [];

      // Thêm từ khóa vào lịch sử (kiểm tra và loại bỏ trùng lặp)
      if (!historyArray.includes(keyword)) {
        historyArray.push(keyword);
      }

      if (historyArray.length > 5) {
        historyArray.shift();
      }

      // Lưu lại lịch sử tìm kiếm mới
      await AsyncStorage.setItem('searchHistory', JSON.stringify(historyArray));
      setSearchHistory(historyArray);
    } catch (error) {
      console.log('Error saving search history:', error);
    }
  };

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('searchHistory');
        if (storedHistory) {
          setSearchHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.log('Error fetching search history:', error);
      }
    };

    fetchSearchHistory();
  }, []);

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
    if (keyword && !searchHistory.includes(keyword)) {
      setSearchHistory([keyword, ...searchHistory]);
      saveSearchHistory(keyword); 
    }
    setSearchText('');
  };
  
  const handleDeleteHistory = async (keyword) => {
    try {
      const currentHistory = await AsyncStorage.getItem('searchHistory');
      let historyArray = currentHistory ? JSON.parse(currentHistory) : [];

      // Xóa từ khóa khỏi lịch sử
      historyArray = historyArray.filter(item => item !== keyword);

      // Lưu lại lịch sử mới
      await AsyncStorage.setItem('searchHistory', JSON.stringify(historyArray));
      setSearchHistory(historyArray); // Cập nhật trạng thái
    } catch (error) {
      console.log('Error deleting search history:', error);
    }
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
      <TouchableOpacity onPress={() => handleSearch(item)}>
        <Text style={SearchStyle.historyItem}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteHistory(item)}>
        <Text style={SearchStyle.deleteHistoryItem}>×</Text>
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
          <Text style={SearchStyle.clearText}>×</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('BottomNav')}>
        <Text style={SearchStyle.cancelText}>Hủy</Text>
      </TouchableOpacity>
    </View>

    {searchHistory.length > 0 && (
      <View>
        <FlatList
          data={isHistoryExpanded ? searchHistory : searchHistory.slice(0, 3)} // Hiển thị tối đa 3 từ khóa
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}
        />

        {searchHistory.length > 3 && !isHistoryExpanded && (
          <TouchableOpacity onPress={() => setIsHistoryExpanded(true)}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
            <Text style={SearchStyle.viewMoreText}>Xem thêm</Text>
            <Image source={require('../../assets/Vector.png')}/>
            </View>
          </TouchableOpacity>
        )}

        {isHistoryExpanded && (
          <TouchableOpacity onPress={() => setIsHistoryExpanded(false)}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
            <Text style={SearchStyle.viewMoreText}>Thu gọn</Text>
            <Image source={require('../../assets/Expand_up_light.png')}/>
            </View>
          </TouchableOpacity>
        )}
      </View>
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
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Không tìm thấy sản phẩm nào
          </Text>
        )}
      />
    </View>
  );
};

export default SearchScreen;

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
    height: 180,
    width: 170,
    marginTop: 15,
    marginHorizontal: 6,
  },
  productDetails: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  productWeight: {
    fontSize: 16,
  },
  productPrice: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  historyItemContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  historyItem: {
    fontSize: 14,
    color: '#333',
  },
  deleteHistoryItem: {
    fontSize: 16,
    color: '#8B8B8B',
  },
  viewMoreText: {
    fontSize: 14,
    color: '#8B8B8B',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal:4
  },
});