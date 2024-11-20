import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import InsertAddressStyles from './InsertAddressStyles';
import axiosInstance from '../api/AxiosInstance';

const InsertAddress = ({ navigation, route }) => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addressId } = route.params;
  console.log('addressId', addressId);


  const fetchAddress = async () => {
    try {
      const response = await axiosInstance.get(`/users/getAddressById/${addressId}`);
      console.log('Full API response:', response); 
      if (response) {
        console.log('API data:', response);  
        setAddress(response); 
      } else {
        console.log('No data found in the response');
      }
    } catch (err) {
      console.log('Error fetching address:', err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    console.log('addressId from route:', addressId);
    fetchAddress();
  }, [addressId]);

  const BackRight = () => {
    navigation.goBack();
  };

  const renderAddressItem = ({ item }) => (
    <View style={{alignItems: 'center', marginTop: 20}}>
      <View style={InsertAddressStyles.infoFContainer}>
        <TextInput
          style={InsertAddressStyles.textInfo}
          value={item.user.name || ''}
        />
        <TextInput
          style={InsertAddressStyles.phone}
          value={item.user.phone || ''}
        />
      </View>
      <Text style={InsertAddressStyles.titleInfo}>Thông tin địa chỉ</Text>

      <View style={InsertAddressStyles.infoFContainer2}>
        <TextInput
          style={InsertAddressStyles.textInfo}
          value={item.country || ''}
        />
        <TextInput
          style={InsertAddressStyles.phone}
          value={item.city || ''}
        />
        <TextInput
          style={InsertAddressStyles.phone}
          value={item.district || ''}
        />
        <TextInput
          style={InsertAddressStyles.phone}
          value={`${item.alley}\\${item.houseNumber}` || ''}
        />
        <TextInput
          style={InsertAddressStyles.phone}
          value={item.quarter || ''}
        />
      </View>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={InsertAddressStyles.headers}>
        <TouchableOpacity onPress={BackRight}>
          <Image
            style={InsertAddressStyles.iconback}
            source={require('../../../src/assets/back.png')}
          />
        </TouchableOpacity>
        <Text style={InsertAddressStyles.textH}>Sửa địa chỉ</Text>
      </View>
      <View>
        <Text style={InsertAddressStyles.titleInfo}>Thông tin liên hệ</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : address ? (
          <FlatList
            data={[address]}
            keyExtractor={item => item._id}
            renderItem={renderAddressItem}
          />
        ) : (
          <Text>No address found</Text>
        )}
      </View>
      <View style={InsertAddressStyles.footer}>
        <TouchableOpacity onPress={BackRight} style={InsertAddressStyles.button}>
          <Text style={InsertAddressStyles.buttonText}>LƯU</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default InsertAddress;