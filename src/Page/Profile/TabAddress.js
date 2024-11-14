import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AxiosInstanceSP from '../api/AxiosInstanceSP';
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstanceSP().get('/users/getAddress/6734b3846560a8c22d54f7d5');
        setData(response.data); // Assuming the API response contains address data
        console.log('Address data:', response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []); // Empty array ensures the API call runs only once when the component mounts

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
          keyExtractor={item => item.id}
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
