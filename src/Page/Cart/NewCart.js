import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const NewCart = () => {
    return (
        <View style={NewCartStyle.container}>
            <View style={NewCartStyle.header}>
                <Text style={NewCartStyle.tieude}>Giỏ hàng</Text>
                <Image style={NewCartStyle.iconTrash} source={require("../../../src/assets/Trash.png")} />
                <Text />
            </View>

            <View style={NewCartStyle.body}>
                <Image style={NewCartStyle.iconCart} source={require("../../../src/assets/bigcart.png")} />
                <Text style={NewCartStyle.chu}>Hiện chưa có sản phẩm</Text>
            </View>
        </View>
    )   
}
export default NewCart;


const NewCartStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position:'relative',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
    },
    iconTrash: {
        position:'absolute',
        width: 25,
        height: 25,
        right:0,
        top:0
    },
    tieude: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        fontFamily: "Poppins"
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    chu: {
        color: '#8B8B8B',
        fontSize: 20
    }
});