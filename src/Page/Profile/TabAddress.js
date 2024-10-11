import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React from 'react';
import TabAddressStyle from './TabAdressStyle';
import { useNavigation } from '@react-navigation/native';


const TabAddress = () => {
  const navigation = useNavigation();
  const BtnInsertAddress = () => {
    navigation.navigate('InsertAddress');
  }
  const BackRight = () => {
    navigation.goBack()
}
const BtnAddAdress = () => {
  navigation.navigate('AddAdress');
}
  const data = [
    {
      id: '1',
      name: 'Bé Phát',
      phoneNumber: '0920134939340',
      address:
        'Số nhà 123, hẻm 222, khu phố 4, Hiệp Thành, quận 12, Hồ Chí Minh',
    },
    {
      id: '2',
      name: 'Bé Đào',
      phoneNumber: '0920134939340',
      address:
        'Số nhà 123, hẻm 222, khu phố 4, Hiệp Thành, quận 12, Hồ Chí Minh',
    },
  ];

  const renderAddressItem = ({item}) => (
   <View>
     <View style={TabAddressStyle.addressContainer}>
      <Image
        style={TabAddressStyle.icon}
        source={require('../../../src/assets/address.png')}
      />

      <View style={TabAddressStyle.infoContainer}>
        <Text style={TabAddressStyle.name}>
          {item.name}, {item.phoneNumber}
        </Text>
        <Text style={TabAddressStyle.address}>{item.address}</Text>
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
    <View style={{backgroundColor: 'white', height:'100%'}}>
      <View style={TabAddressStyle.headers}>
        <TouchableOpacity onPress={BackRight}>
        <Image
          style={TabAddressStyle.iconback}
          source={require('../../../src/assets/back.png')}
        />
        </TouchableOpacity>
        <Text style={TabAddressStyle.textH}>Địa chỉ</Text>
      </View>
      <View style={TabAddressStyle.flatlist}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderAddressItem}
        />
      </View>
      <TouchableOpacity onPress={BtnAddAdress}>
      <View style={TabAddressStyle.addAdress} >
        
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
