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
        <Text style={PromotionStyle.txtHeader}>Chương trình khuyến mãi</Text>
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

      <View style={PromotionStyle.promotionBox}>
      <TouchableOpacity>
        <Image
        style={PromotionStyle.image1}
        source={require('../../assets/promotion1.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
        style={PromotionStyle.image1}
        source={require('../../assets/promotion1.png')}
        />
      </TouchableOpacity>
      </View>

      
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