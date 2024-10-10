import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';

const SearchScreen = (prop) => {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState(['Bắp cải trắng', 'Chanh không hạt', 'Khoai tây']);
  const products = [
    { id: 1, name: 'Bắp cải trắng', price: '19.000đ', image: require('../../assets/image/image1.png') },
    { id: 2, name: 'Chanh không hạt', price: '9.000đ', image: require('../../assets/image/image2.png') },
    { id: 3, name: 'Khoai tây', price: '30.000đ', image: require('../../assets/image/image3.png') },
    { id: 4, name: 'Sườn non', price: '45.000đ', image: require('../../assets/image/image4.png') },
    { id: 5, name: 'Thịt nạt', price: '30.000đ', image: require('../../assets/image/image5.png') },
    { id: 6, name: 'Rau cải', price: '10.000đ', image: require('../../assets/image/image6.png') },
    // Thêm các sản phẩm khác tại đây
  ];

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder='Tìm kiếm...'
          value={searchText}
          onChangeText={handleSearch}
        />

        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
            <Text style={styles.clearText}>×</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => prop.navigation.navigate('BottomNav')}>
          <Text style={styles.cancelText}>Hủy</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Searches */}
      <View style={styles.recentSearchContainer}>
        {recentSearches.map((item, index) => (
          <View key={index} style={styles.recentSearchItem}>
            <Image source={require('../../assets/iconSearch.png')} style={styles.searchIcon} />
            <Text style={styles.recentSearchText}>{item}</Text>
            <TouchableOpacity>
              <Image source={require('../../assets/delete.png')} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.viewMoreContainer}>
          <Text style={styles.viewMoreText}>Xem thêm</Text>
          <Image source={require('../../assets/chevron-left.png')} style={{ transform: [{ rotate: '270deg' }],}} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
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
    borderRadius: 10,
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
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});