import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ForgotPasswordStyle from './style'

const ForgotPassword = (prop) => {
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10,11}$/; // Kiểm tra số điện thoại có 10-11 chữ số
    return re.test(phone);
  };

  const BtnContinue = () => {
    setErrorMessage('');

    if (input === '') {
      setErrorMessage("Vui lòng nhập email hoặc số điện thoại");
      setInput('');
    } else if (!validateEmail(input) && !validatePhone(input)) {
      setErrorMessage("Email hoặc số điện thoại không hợp lệ");
      setInput('');
    } else {
      prop.navigation.navigate('ResetPassword');
    }
  };
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
              <TextInput
                value={input}
                placeholder={errorMessage ? errorMessage : "Nhập email hoặc số điện thoại"}
                placeholderTextColor={errorMessage ? 'red' : '#999'}
                onChangeText={(text) => {
                  setInput(text);
                  setErrorMessage('');
                }}
                style={[
                  ForgotPasswordStyle.input,
                  errorMessage ? { color: 'red' } : {}
                ]} />
            </View>
          </View>
          <View style={ForgotPasswordStyle.button}>
            <TouchableOpacity style={ForgotPasswordStyle.dn} onPress={BtnContinue}>
              <Text style={ForgotPasswordStyle.chudn}>TIẾP TỤC</Text>
            </TouchableOpacity>
          </View>
          <View style={ForgotPasswordStyle.footer}>
            <Text style={ForgotPasswordStyle.footerdau}>Bạn đã có tài khoản?</Text>
            <Text onPress={'Register'} style={ForgotPasswordStyle.footerduoi}>Đăng nhập</Text>
          </View>
        </View>

      </View>
    </View>
  )
}

export default ForgotPassword