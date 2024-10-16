import { View, Text, Image } from 'react-native'
import React from 'react'
import UserCancelStyle from './style'

const UserCancel = () => {
  return (
    <View>
     <View style={UserCancelStyle.header}>
        <Image
        style={UserCancelStyle.imgHeader}
        source={require('../../../src/assets/chevron-left.png')}
        />
        <Text style={UserCancelStyle.txtHeader}>Yêu cầu hủy tài khoản</Text>
     </View>
    </View>
  )
}

export default UserCancel