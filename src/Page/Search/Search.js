import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState(['Bắp cải trắng', 'Khoai tây']);

  const handleClear = () => {
    setSearchText('');
  };

  const handleCancel = () => {
    setSearchText('');
    // Add logic here to handle the cancel action (e.g., close search)
  };
};

const Search = () => {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.search}>
        <TextInput
          style={styles.textInput}
          placeholder='Tìm Kiếm'
          // You can add value and onChangeText to manage search state
        />
        <TouchableOpacity onPress={() => { /* Add cancel logic here */ }}>
          <Text style={styles.headerText}>Hủy</Text>
        </TouchableOpacity>
      </View>

      {/* Search Result Items */}
      <View style={styles.textSearch}>
        <Image source={require('../../assets/iconSearch.png')} />
        <Text style={styles.text}>Bắp cải trắng</Text>
        <TouchableOpacity>
          <Image
            style={styles.delete}
            source={require('../../assets/delete.png')}
          />
        </TouchableOpacity>
        
      </View>
      <View style={styles.textSearch}>
        <Image source={require('../../assets/iconSearch.png')} />
        <Text style={styles.text}>Chanh Không Hạt</Text>
        <TouchableOpacity>
          <Image
            style={styles.delete}
            source={require('../../assets/delete.png')}
          />
        </TouchableOpacity>
        
      </View>
      <View style={styles.textSearch}>
        <Image source={require('../../assets/iconSearch.png')} />
        <Text style={styles.text}>Khoai Tây</Text>
        <TouchableOpacity>
          <Image
            style={styles.delete}
            source={require('../../assets/delete.png')}
          />
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    paddingTop: 20,
  },
  search: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#EAEAEA',
    borderRadius: 15,
    paddingLeft: 10,
  },
  headerText: {
    fontSize: 20,
    paddingLeft: 10,
    color: 'black',
  },
  textSearch: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: -20, 
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: '#4A4A4A',
    flex: 1, 
    // Làm cho văn bản chiếm không gian có sẵn
  },
  delete: {
    width: 23,
    height: 23,
  },
});
