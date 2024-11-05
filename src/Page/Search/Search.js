import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AxiosInstanceSP from "../api/AxiosInstanceSP";

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const defaultImageUri = 'https://res.cloudinary.com/imagesupload2024/image/upload/v1729583649/Rau%20c%E1%BB%A7/zjj0p3oqj0q1dfnta4z8.png'; 

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


  useEffect(() => {
    if (searchText.trim()) {
      fetchProducts(searchText);
    } else {
      setFilteredProducts(products);
    }
  }, [searchText]);

  const handleSearch = async (key) => {
    try {
      const results = await findProductsByKey_App(key);
      setProducts(results); 
    } catch (error) {
      console.error("Lỗi tìm kiếm: ", error.message);
    }
  };

  const renderProduct = ({ item }) => {
    // Kiểm tra và lấy URL ảnh từ sản phẩm
    const imageUri = (item.images && item.images.length > 0) ? item.images[0] : defaultImageUri;
    
    return (
        <View style={SearchStyle.productContainer}>
            <Image
                style={{ width: 100, height: 80 }}
                source={{ uri: imageUri }}
                onError={() => console.log('Error loading image, using default image.')}
            />
            <View style={SearchStyle.productDetails}>
                <Text style={SearchStyle.productName}>{item.name || 'Không có tên sản phẩm'}</Text>
                <Text style={SearchStyle.productWeight}>{item.oum || 'Không có trọng lượng'}</Text>
                <Text style={SearchStyle.productPrice}>{item.price ? `${item.price}.000 VNĐ` : 'Giá không có'}</Text>
            </View>
        </View>
    );
};


  return (
    <View style={SearchStyle.container}>  
      <View style={SearchStyle.searchBar}>
        <TextInput
          style={SearchStyle.searchInput}
          placeholder='Tìm kiếm...'
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
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
    textAlign:'center'
  },
  productWeight: {
    fontSize: 16,
  },
  productPrice: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});