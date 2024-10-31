import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';

const SearchScreen = ({ route, prop }) => {
    const { products } = route.params || {}; // Nhận sản phẩm từ props
    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (Array.isArray(products)) {
            setFilteredProducts(products);
        } else {
            console.warn("Products is not an array:", products); // Cảnh báo nếu không phải mảng
            setFilteredProducts([]);
        }
    }, [products]);

    const handleSearch = (text) => {
        setSearchText(text);
    };

    const performSearch = () => {
        if (searchText.trim() === '') return;

        const results = products.filter(product =>
            product.name.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredProducts(results);
        setSearchText(''); // Xóa trường tìm kiếm sau khi tìm
    };

    const renderProduct = ({ item }) => (
        <View style={SearchStyle.productContainer}>
            <Image source={{ uri: item.images[0] }} style={SearchStyle.productImage} />
            <View style={SearchStyle.productDetails}>
                <Text style={SearchStyle.productName}>{item.name}</Text>
                <Text style={SearchStyle.productWeight}>{item.oum}</Text>
                <Text style={SearchStyle.productPrice}>{item.price} VNĐ</Text>
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
                    onChangeText={handleSearch}
                    onSubmitEditing={performSearch}
                />
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchText('')} style={SearchStyle.clearButton}>
                        <Text style={SearchStyle.clearText}>×</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => prop.navigation.navigate('BottomNav')}>
                    <Text style={SearchStyle.cancelText}>Hủy</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredProducts}
                renderItem={renderProduct}
                keyExtractor={item => item._id.toString()}
                numColumns={2}
                contentContainerStyle={SearchStyle.productList}
            />
        </View>
    );
};

export default SearchScreen;

const SearchStyle = StyleSheet.create({
  container: {
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
    marginRight: 15,
  },
  productDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productWeight: {
    fontSize: 16,
  },
  priceall: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productPrice: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    marginRight: 5,
  },
});
