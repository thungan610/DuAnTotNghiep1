import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import PromotionStyle from './style'

const Promotion = (prop) => {
    const BackRight = () => {
        prop.navigation.goBack()
    }
  return (
    <ScrollView>
        <View style={PromotionStyle.container}>
      <View style={PromotionStyle.header}>
       <TouchableOpacity onPress={BackRight}>
       <Image
        style={PromotionStyle.imHeader}
        source={require('../../../src/assets/chevron-left.png')}
        />
       </TouchableOpacity>
        <Text style={PromotionStyle.txtHeader}>Khuyến mãi trong tháng</Text>
      </View>
      <TouchableOpacity>
        <Image
        style={PromotionStyle.image}
        source={require('../../assets/promotion3.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
        style={PromotionStyle.image}
        source={require('../../assets/promotion2.png')}
        />
      </TouchableOpacity>
            
      <TouchableOpacity>
        <Image
        style={PromotionStyle.image}
        source={require('../../assets/promotion2.png')}
        />
      </TouchableOpacity>
       
      <TouchableOpacity>
        <Image
        style={PromotionStyle.image}
        source={require('../../assets/promotion3.png')}
        />
      </TouchableOpacity>

    </View>
    </ScrollView>
  )
}

export default Promotion