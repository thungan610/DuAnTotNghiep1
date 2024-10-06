import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CancelTrueStyle from './style'

const CancelTrue = () => {
  return (
    <View style={{justifyContent:'center',
    alignItems:'center',
width:'100%',height:'100%',
position:'relative',
    }}>
      <Image
      source={require('../../../../src/assets/huythanhcong.png')}
      />
      <Text style={{fontSize:24,marginTop:20,fontWeight:'bold',color:'black'}}>Hủy đơn thành công</Text>

      <TouchableOpacity style={{
        borderRadius:15,
        borderColor:'#27AAE1',
        backgroundColor:'#27AAE1',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        width: '90%',
        height:50,
        position:'absolute',
       bottom:10}}>
        
        <Text style={{
        fontSize: 20,
        fontWeight:'bold',
        color:'white',}}>QUAY LẠI TRANG CHỦ</Text>

      </TouchableOpacity>
    </View>
  )
}

export default CancelTrue