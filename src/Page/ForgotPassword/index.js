import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ForgotPasswordStyle from './style'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
  return (
    <View style={ForgotPasswordStyle.container}>
     <View style={ForgotPasswordStyle.headerLogo}>
        <Image
        style={ForgotPasswordStyle.logo}
        source={require('../../../src/assets/logo.png')}
        />
     </View>
     <View style={ForgotPasswordStyle.body}>
        <View>
            <View style={ForgotPasswordStyle.tieude}>
             <Text style={ForgotPasswordStyle.tieudedn}>Quên mật khẩu</Text>
            </View>

            <View style={ForgotPasswordStyle.inputall}>
                <Text style={ForgotPasswordStyle.tieudeinput}>Nhập email/ số điện thoại</Text>
                <View style={ForgotPasswordStyle.anhinput}>
                <Image
                style={ForgotPasswordStyle.message}
                source={require('../../../src/assets/Message.png')}
                />
             <TextInput placeholder="Nhập email hoặc số điện thoại" onChangeText={(text) => setEmail(text)}  />
                </View>
            </View>
            <View style={ForgotPasswordStyle.button}>
        <TouchableOpacity style={ForgotPasswordStyle.dn}>
         <Text style={ForgotPasswordStyle.chudn}>TIẾP TỤC</Text>
        </TouchableOpacity>
            </View>
        <View style={ForgotPasswordStyle.footer}>
         <Text style={ForgotPasswordStyle.footerdau}>Bạn đã có tài khoản?</Text>
         <Text style={ForgotPasswordStyle.footerduoi}>Đăng nhập</Text>
        </View>
        </View>

     </View>
    </View>
  )
}

export default ForgotPassword