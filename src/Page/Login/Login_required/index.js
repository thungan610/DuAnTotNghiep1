import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Login_required = (prop) => {

    const HanLogin = () => {
        prop.navigation.navigate('Login')
    }
  return (
    <View style={{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding:20
    }}>
      <Text style={{
        fontSize: 22,
        fontWeight:'bold',
        color:'black'
      }}>Bạn cần đăng nhập để thanh toán</Text>
      <TouchableOpacity onPress={HanLogin} style={{
        marginTop: 20,
        borderRadius:5,
        backgroundColor:'#27AAE1',
        width:'100%'
      }}>
        <Text style={{
            textAlign:'center',
            fontSize:22,
            fontWeight:'bold',
            color:'white',
            padding:10
        }}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login_required