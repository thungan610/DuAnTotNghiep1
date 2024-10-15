import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import React from 'react';
import InsertAddressStyles from './InsertAddressStyles';

const InsertAddress = (prop) => {
  const BackRight = () => {
    prop.navigation.goBack()
}
  const data = [
    {
      id: '1',
      name: 'Bé Phát',
      phoneNumber: '0920134939340',
      country: 'Việt Nam',
      city: 'Hồ Chí Minh',
      distric: 'Quận 12',
      address: 'số 123, hẻm 122, Tân Hới',
    },
  ];

  const renderAddressItem = ({item}) => (
    <View>
      <View style={InsertAddressStyles.infoFContainer}>
        <TextInput style={InsertAddressStyles.textInfo}>{item.name}</TextInput>
        <TextInput style={InsertAddressStyles.phone}>
          {item.phoneNumber}
        </TextInput>
      </View>
      <Text style={InsertAddressStyles.titleInfo}>Thông tin địa chỉ</Text>

      <View style={InsertAddressStyles.infoFContainer2}>
        <TextInput style={InsertAddressStyles.textInfo}>{item.country}</TextInput>
        <TextInput style={InsertAddressStyles.phone}>{item.city}</TextInput>
        <TextInput style={InsertAddressStyles.phone}>{item.distric}</TextInput>
        <TextInput style={InsertAddressStyles.phone}>{item.address}</TextInput>
      </View>
    </View>
  );

  return (
    <View>
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
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderAddressItem}
        />
      </View>
      <View style={InsertAddressStyles.footer}>
                <TouchableOpacity onPress={BackRight} style={InsertAddressStyles.button}>
                    <Text style={InsertAddressStyles.buttonText}>LƯU</Text>
                </TouchableOpacity>
            </View>
    </View>
  );
};

export default InsertAddress;
