import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import UserCancelStyle from './style'
import { useNavigation } from '@react-navigation/native';


const UserCancel = () => {
    const[description, setDescription] = useState('');
    const navigation = useNavigation();
    const BackRight = () => {
        navigation.goBack()
    }

  return (
    <View style={UserCancelStyle.container}>
     <View style={UserCancelStyle.header}>
        <TouchableOpacity onPress={BackRight}>
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
  onChangeText={text=>setDescription(text)}
  value={description}
  />

  <TouchableOpacity style={UserCancelStyle.btn}>
    <Text style={UserCancelStyle.txtBtn} >HỦY</Text>
  </TouchableOpacity>
    </View>
  )
}

export default UserCancel