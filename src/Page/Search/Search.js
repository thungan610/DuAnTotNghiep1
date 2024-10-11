import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';

const SearchScreen = (prop) => {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showAllSearches, setShowAllSearches] = useState(false);
  
  // Danh sách sản phẩm để tìm kiếm
  const productinsearch = [
    { id: 1, name: 'Bắp cải trắng', weight: '1 kg', price: '19.000đ', image: require('../../assets/image/image1.png') },
    { id: 2, name: 'Chanh không hạt', weight: '1 kg', price: '9.000đ', image: require('../../assets/image/image2.png') },
    { id: 3, name: 'Khoai tây', weight: '1 kg', price: '30.000đ', image: require('../../assets/image/image3.png') },
    { id: 4, name: 'Sườn non', weight: '1 kg', price: '45.000đ', image: require('../../assets/image/image4.png') },
    { id: 5, name: 'Thịt nạt', weight: '1 kg', price: '30.000đ', image: require('../../assets/image/image5.png') },
    { id: 6, name: 'Rau cải', weight: '1 kg', price: '10.000đ', image: require('../../assets/image/image6.png') },
  ];

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const performSearch = () => {
    if (searchText.trim() === '') return;

    if (!recentSearches.includes(searchText)) {
      setRecentSearches(prevSearches => {
        const newSearches = [searchText, ...prevSearches];
        return newSearches.slice(0, 10);
      });
    }

    setSearchText('');
  };

  const handleRecentSearchPress = (item) => {
    setSearchText(item);
  };

  // Lọc sản phẩm theo searchText
  const filteredProducts = productinsearch.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderProduct = ({ item }) => (
    <View style={SearchStyle.productContainer}>
      <Image source={item.image} style={SearchStyle.productImage} />
      <View style={SearchStyle.productDetails}>
        <Text style={SearchStyle.productName}>{item.name}</Text>
        <Text style={SearchStyle.productWeight}>{item.weight}</Text>
        <View style={SearchStyle.priceall}>
          <Image style={SearchStyle.price} source={require('../../../src/assets/Dollar.png')} />
          <Text style={SearchStyle.productPrice}>{item.price} VNĐ</Text>
        </View>
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

      <View style={SearchStyle.recentSearchContainer}>
        {(showAllSearches ? recentSearches : recentSearches.slice(0, 4)).map((item, index) => (
          <TouchableOpacity key={index} style={SearchStyle.recentSearchItem} onPress={() => handleRecentSearchPress(item)}>
            <Image source={require('../../assets/iconSearch.png')} style={SearchStyle.searchIcon} />
            <Text style={SearchStyle.recentSearchText}>{item}</Text>
            <TouchableOpacity onPress={() => {
              setRecentSearches(prevSearches => prevSearches.filter((search) => search !== item));
            }}>
              <Image source={require('../../assets/delete.png')} style={SearchStyle.deleteIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {recentSearches.length > 4 && !showAllSearches && (
          <TouchableOpacity style={SearchStyle.viewMoreContainer} onPress={() => setShowAllSearches(true)}>
            <Text style={SearchStyle.viewMoreText}>Xem thêm</Text>
            <Image source={require('../../assets/chevron-left.png')} style={{ transform: [{ rotate: '270deg' }] }} />
          </TouchableOpacity>
        )}

        {recentSearches.length > 4 && showAllSearches && (
          <TouchableOpacity style={SearchStyle.viewMoreContainer} onPress={() => setShowAllSearches(false)}>
            <Text style={SearchStyle.viewMoreText}>Ẩn bớt</Text>
            <Image source={require('../../assets/chevron-left.png')} style={{ transform: [{ rotate: '270deg' }] }} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
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
  recentSearchContainer: {
    marginBottom: 20,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  recentSearchText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  viewMoreContainer: {
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  viewMoreText: {
    fontSize: 16,
    color: '#8B8B8B',
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
    marginRight: 15
  },
  productDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  productWeight: {
    fontSize: 16,
  },
  priceall: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  productPrice: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold'
  },
  price: {
    marginRight: 5
  },
});
