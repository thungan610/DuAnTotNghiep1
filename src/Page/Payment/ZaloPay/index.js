import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import ZaloPayStyle from "./style";
import AddAdressStyle from "../AddAdress/style";
import PayMethodStyle from "../PayMethod/style";
const ZaloPay = () => {
    return (
        <View style={ZaloPayStyle.container}> 
             <View style={AddAdressStyle.header}>
                <Image style={AddAdressStyle.backright} source={require("../../../assets/notifi/backright.png")} />
                <Text style={AddAdressStyle.title}>Quét mã zalo pay</Text>
                <Text/>
            </View>
            <View style={ZaloPayStyle.body}>
                <Image style={ZaloPayStyle.imgQR} source={require("../../../assets/notifi/MyQR.png")}/>
            </View>
            <View style={PayMethodStyle.ViewSuss}>
                <TouchableOpacity style={PayMethodStyle.BtnSuss}>
                    <Text style={PayMethodStyle.txtSuss}>ĐỒNG Ý</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ZaloPay