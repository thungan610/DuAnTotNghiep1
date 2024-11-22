import { View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AxiosInstance from '../api/AxiosInstance';
import TabAddressStyle from './TabAdressStyle';
import { useSelector } from 'react-redux';

const TabAddress = (prop) => {
  const [data, setData] = useState([]);
  const user = useSelector(state => state.user);
  const userId = user?.userData?._id;
  console.log('userId', userId);

  const BtnInsertAddress = (addressId) => {
    prop.navigation.navigate('InsertAddress', { addressId: addressId });
  };
  const BtnPayment = (addressId) => {
    prop.navigation.navigate('Payment', { addressId: addressId });
  };
  const BackRight = () => {
    prop.navigation.goBack();
  };
  const BtnAddAdress = () => {
    prop.navigation.navigate('AddAdress');
  };

  const getAddress = async (userId) => {
    try {
      const response = await AxiosInstance.get(`users/getAddress/${userId}`);
      if (response?.data) {
        setData(response.data);
      }
    } catch (error) {
    }
  };

  const deleteAddress = async (addressId) => {
    console.log('addressId', addressId);
    
    try {
      const response = await AxiosInstance.delete(`users/deleteAddress/${userId}/${addressId}`);
      if (response) {
        setData((prevData) => prevData.filter(item => item._id !== addressId));
        Alert.alert('Thành công', 'Địa chỉ đã được xóa');
      }
    } catch (error) {
      console.error('Error deleting address', error);
      Alert.alert('Lỗi', 'Không thể xóa địa chỉ');
    }
  };

  const handleDelete = (addressId) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa địa chỉ này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => deleteAddress(addressId),
        },
      ],
      { cancelable: true }
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      if (userId) {
        getAddress(userId);
      } else {
        console.error("UserId is missing");
      }
    }, [userId])
  );

  const renderAddressItem = ({ item }) => (
    <TouchableOpacity onPress={() => BtnPayment(item._id)}>
      <View style={TabAddressStyle.addressContainer}>
        <Image
          style={TabAddressStyle.icon}
          source={require('../../../src/assets/address.png')}
        />
        <View style={TabAddressStyle.infoContainer}>
          <Text style={TabAddressStyle.name}>
            {item.user.name}, {item.user.phone}
          </Text>
          <Text style={TabAddressStyle.address}>
            {item.houseNumber}, {item.alley}, {item.quarter}, {item.district}, {item.city}, {item.country}
          </Text>
        </View>
        <View style={TabAddressStyle.iconsContainer}>
          <TouchableOpacity onPress={() => BtnInsertAddress(item._id)}>
            <Image
              style={TabAddressStyle.icon}
              source={require('../../../src/assets/edit.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item._id)}>
            <Image
              style={TabAddressStyle.icon}
              source={require('../../../src/assets/deleteR.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={TabAddressStyle.headers}>
        <TouchableOpacity onPress={BackRight}>
          <Image
            style={TabAddressStyle.iconback}
            source={require('../../../src/assets/back.png')}
          />
        </TouchableOpacity>
        <Text style={TabAddressStyle.textH}>Địa chỉ</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderAddressItem}
      />

      <TouchableOpacity onPress={BtnAddAdress}>
        <View style={TabAddressStyle.addAdress}>
          <Image
            style={TabAddressStyle.iconback}
            source={require('../../../src/assets/addNew.png')}
          />
          <Text style={TabAddressStyle.textA}>Địa chỉ nhận hàng</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TabAddress;
