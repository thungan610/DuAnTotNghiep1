import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import InsertAddressStyles from './InsertAddressStyles';
import axiosInstance from '../api/AxiosInstance';
import { useSelector } from 'react-redux';

const InsertAddress = ({ navigation, route }) => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updatedHouseNumber, setUpdatedHouseNumber] = useState('');
  const [updatedAlley, setUpdatedAlley] = useState('');
  const [updatedQuarter, setUpdatedQuarter] = useState('');
  const [updatedDistrict, setUpdatedDistrict] = useState('');
  const [updatedCity, setUpdatedCity] = useState('');
  const [updatedCountry, setUpdatedCountry] = useState('');

  const { addressId } = route.params;
  console.log('');
  
  const user = useSelector(state => state.user);

  const userid = user?.userData?._id || 'default_id';
  console.log('userid', userid);



  const fetchAddress = async () => {
    try {
      const response = await axiosInstance.get(`/users/getAddressById/${addressId}`);
      console.log('response', response);

      if (response) {
        setAddress(response);
        setUpdatedName(response.user.name);
        setUpdatedPhone(response.user.phone);
        setUpdatedHouseNumber(response.houseNumber);
        setUpdatedAlley(response.alley);
        setUpdatedQuarter(response.quarter);
        setUpdatedDistrict(response.district);
        setUpdatedCity(response.city);
        setUpdatedCountry(response.country);
      }
    } catch (err) {
      console.log('Error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [addressId]);

  const handleUpdateAddress = async () => {
    if (!addressId) {
      console.error("Error: addressId is missing");
      return;
    }
  
    try {
      const updatedAddressData = {
        user: { name: updatedName, phone: updatedPhone },
        houseNumber: updatedHouseNumber,
        alley: updatedAlley,
        quarter: updatedQuarter,
        district: updatedDistrict,
        city: updatedCity,
        country: updatedCountry,
        userId: userid,
      };
      const response = await axiosInstance.put(`/users/updateAddress/${userid}/${addressId}`, updatedAddressData);
      if (response) {
        console.log('response', response);
        navigation.goBack();
      } else {
        console.error('Error updating address: No addressId returned');
      }
    } catch (error) {
    }
  };
  
  

  const renderAddressItem = ({ item }) => (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <View style={InsertAddressStyles.infoFContainer}>
        <TextInput
          style={InsertAddressStyles.textInfo}
          value={updatedName || ''}
          onChangeText={setUpdatedName}
        />
        <TextInput
          style={InsertAddressStyles.phone}
          value={updatedPhone || ''}
          onChangeText={setUpdatedPhone}
        />
      </View>
      <Text style={InsertAddressStyles.titleInfo}>Thông tin địa chỉ</Text>

      <View style={InsertAddressStyles.infoFContainer2}>
        <TextInput
          style={InsertAddressStyles.textInfo}
          value={updatedCountry || ''}
          onChangeText={setUpdatedCountry}
        />
        <TextInput
          style={InsertAddressStyles.phone}
          value={updatedCity || ''}
          onChangeText={setUpdatedCity}
        />
        <TextInput
          style={InsertAddressStyles.phone}
          value={updatedDistrict || ''}
          onChangeText={setUpdatedDistrict}
        />
        <TextInput
          style={InsertAddressStyles.phone}
          value={updatedQuarter || ''}
          onChangeText={setUpdatedQuarter}
        />
        <TextInput
          style={InsertAddressStyles.phone}
          value={updatedAlley || ''}
          onChangeText={setUpdatedAlley}
        />
        <TextInput
          style={InsertAddressStyles.phone}
          value={updatedHouseNumber || ''}
          onChangeText={setUpdatedHouseNumber}
        />

      </View>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={InsertAddressStyles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={InsertAddressStyles.headers}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
            keyExtractor={(item) => item._id}
            renderItem={renderAddressItem}
          />
        ) : (
          <Text>No address found</Text>
        )}
      </View>
      <View style={InsertAddressStyles.footer}>
        <TouchableOpacity onPress={handleUpdateAddress} style={InsertAddressStyles.button}>
          <Text style={InsertAddressStyles.buttonText}>LƯU</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 20 }}></View>
    </ScrollView>
  );
};

export default InsertAddress;
