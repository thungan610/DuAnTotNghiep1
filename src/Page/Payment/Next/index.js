import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import NextPaymentStyle from "./style"
const NextPayment = (prop) => {
    const { navigation } = prop
    const BackRight = () => {
        navigation.goBack()
    }

    const HandAddAddress = () => {
        navigation.navigate('TabAddress')
    }
    return (
        <View style={NextPaymentStyle.container}>
            <TouchableOpacity onPress={BackRight}>
                <Image style={NextPaymentStyle.backright} source={require('../../../assets/notifi/backright.png')} />
            </TouchableOpacity>
            <View style={NextPaymentStyle.body}>
                <Text style={NextPaymentStyle.title}>Thêm địa chỉ nhận hàng để tiến hành thanh toán!!</Text>
                <TouchableOpacity onPress={HandAddAddress} style={NextPaymentStyle.buttonContainer}>
                    <Text style={NextPaymentStyle.button}>TIẾP TỤC</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NextPayment