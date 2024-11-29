    import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import PaySussesStyle from "./style"
import PayMethodStyle from "../PayMethod/style"
const PaySusses = (prop) => {
    const { navigation } = prop
    const HandNav = () => {
        navigation.navigate('BottomNav')
    }
    return (
        <View style={PaySussesStyle.container}>
            <View style={PaySussesStyle.body}>
                <Image source={require('../../../assets/notifi/PaySusses.png')} />
                <TouchableOpacity>
                    <Text style={PaySussesStyle.text}>Thanh toán thanh công</Text>
                </TouchableOpacity>
            </View>
            <View style={[PayMethodStyle.ViewSuss, { padding: 20 }]}>
                <TouchableOpacity onPress={HandNav} style={PayMethodStyle.BtnSuss}>
                    <Text style={PayMethodStyle.txtSuss}>QUAY LẠI TRANG CHỦ</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PaySusses