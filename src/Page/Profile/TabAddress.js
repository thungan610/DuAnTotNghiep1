import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AxiosInstance from '../api/AxiosInstance';
import TabAddressStyle from './TabAdressStyle';

const TabAddress = (prop) => {
  const [data, setData] = useState([]);

  const BtnInsertAddress = () => {
    prop.navigation.navigate('InsertAddress');
  };

  const BackRight = () => {
    prop.navigation.goBack();
  };

  const BtnAddAdress = () => {
    prop.navigation.navigate('AddAdress');
  };

  // Fetch data from API when component mounts using axios
  const getAddress = async (userId) => {
    try {
      const response = await AxiosInstance.get(`users/getAddress/${userId}`);
      if (response.status === 200) {
        console.log("User Address: ", response.data.data);
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching address: ", error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const userId = prop.userId;
      if (userId) {
        getAddress(userId);
      }
    }, [prop.userId]) 
  );

  const renderAddressItem = ({ item }) => (
    <View>
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
            {item.houseNumber},{item.alley}, {item.quarter}, {item.district}, {item.city}, {item.country}
          </Text>
        </View>
        <View style={TabAddressStyle.iconsContainer}>
          <TouchableOpacity onPress={BtnInsertAddress}>
            <Image
              style={TabAddressStyle.icon}
              source={require('../../../src/assets/edit.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={TabAddressStyle.icon}
              source={require('../../../src/assets/deleteR.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
      <TouchableOpacity onPress={() => prop.navigation.navigate('Payment')} style={TabAddressStyle.flatlist}>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id} 
          renderItem={renderAddressItem}
        />
      </TouchableOpacity>
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
