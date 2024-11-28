import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import UserCancelStyle from './style';
import axiosInstance from '../api/AxiosInstance';

const UserCancel = ({ navigation, route }) => {
  const [description, setDescription] = useState('');
  const { userId } = route.params || {}; 
  console.log(userId);
  const handleCancelAccount = async () => {
    try {
      const response = await axiosInstance.delete(`/users/delete-account/${userId}`);
  
      console.log('API Response:', response);
  
      if (response) {
        Alert.alert('Thành công', 'Tài khoản của bạn đã được hủy.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]);
      } else {
        Alert.alert('Thất bại', 'Không thể hủy tài khoản.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi hủy tài khoản. Vui lòng thử lại sau.');
    }
  };

  return (
    <View style={UserCancelStyle.container}>
      <View style={UserCancelStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={UserCancelStyle.imgHeader}
            source={require('../../../src/assets/chevron-left.png')}
          />
        </TouchableOpacity>
        <Text style={UserCancelStyle.txtHeader}>Yêu cầu hủy tài khoản</Text>
      </View>
      <Text style={UserCancelStyle.txtHeader2}>Hãy cho chúng tôi biết lí do bạn muốn hủy tài khoản?</Text>
      <TextInput
        style={UserCancelStyle.input}
        placeholder="Hãy thêm nhận xét cho sản phẩm..."
        multiline={true}
        numberOfLines={5}
        onChangeText={text => setDescription(text)}
        value={description}
      />
      <TouchableOpacity style={UserCancelStyle.btn} onPress={handleCancelAccount}>
        <Text style={UserCancelStyle.txtBtn}>HỦY</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserCancel;
