import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React from 'react';
import TabAddressStyle from './TabAdressStyle';

const TabAddress = () => {
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
        <TouchableOpacity>
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
  );

  return (
    <View>
      <View style={TabAddressStyle.headers}>
        <Image
          style={TabAddressStyle.iconback}
          source={require('../../../src/assets/back.png')}
        />
        <Text style={TabAddressStyle.textH}>Địa chỉ</Text>
      </View>
      <View style={TabAddressStyle.flatlist}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderAddressItem}
        />
      </View>

      <View style={TabAddressStyle.addAdress} >
        <TouchableOpacity>
          <Image
            style={TabAddressStyle.iconback}
            source={require('../../../src/assets/addNew.png')}
          />
        </TouchableOpacity>
        <Text style={TabAddressStyle.textA}>Địa chỉ nhận hàng</Text>
      </View>
    </View>
  );
};

export default TabAddress;
