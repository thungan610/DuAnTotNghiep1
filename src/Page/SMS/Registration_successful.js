import { View, Text, Image, StyleSheet } from 'react-native'
import React, {useEffect} from 'react'

const Registration_successful = (prop) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      prop.navigation.navigate('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [prop]);

  return (
    <View style={Registration_successfulStyle.container}>
      <Image style={Registration_successfulStyle.Image} source={require('../../../src/assets/thanhcong.png')} />
      <Text style={Registration_successfulStyle.txt}>Đăng ký thành công</Text>
    </View>
  )
}

export default Registration_successful;

const Registration_successfulStyle = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
    fontSize: 26,
    color: '#27AAE1',
    fontWeight: 'bold',
  },
});