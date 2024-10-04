import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import SubmitTrueStyle from "./style";
import AddAdressStyle from "../AddAdress/style";
const SubmitTrue = () => {
    return (
        <View style={SubmitTrueStyle.container}>
            <Image style={SubmitTrueStyle.img} source={require("../../../assets/notifi/imagelike.png")} />
            <Text style={SubmitTrueStyle.text}>Thêm địa chỉ thành công</Text>
            <TouchableOpacity style={AddAdressStyle.button}>
                <Text style={AddAdressStyle.buttonText}>TIẾP TỤC THANH TOÁN</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SubmitTrue
