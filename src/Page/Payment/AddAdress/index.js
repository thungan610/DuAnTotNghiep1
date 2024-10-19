import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import AddAdressStyle from "./style";

const AddAdress = (prop) => {
    const BackRight = () => {
        prop.navigation.navigate('ProfileDetail')
    }
    const HandSubmitTrue = () => {
        prop.navigation.navigate('SubmitTrue')
    }
    return (
        <View style={AddAdressStyle.container}>
            <View style={AddAdressStyle.header}>
                <TouchableOpacity onPress={BackRight}>
                    <Image style={AddAdressStyle.backright} source={require("../../../assets/notifi/backright.png")} />
                </TouchableOpacity>
                <Text  style={AddAdressStyle.title}>Thêm địa chỉ mới</Text>
                <Text/>
            </View>
            <View>
                <Text style={AddAdressStyle.txtLH}>Thông tin liên hệ</Text>
                <View style={AddAdressStyle.body}>
                    <TextInput style={AddAdressStyle.input} placeholder="Họ và tên"/>
                    <TextInput style={AddAdressStyle.input} placeholder="Số điện thoại"/>
                </View>
            </View>
            <View>
                <Text style={AddAdressStyle.txtLH}>Thông tin địa chỉ</Text>
                <View style={AddAdressStyle.body}>
                    <Text style={AddAdressStyle.input}>Việt Nam</Text>
                    <TextInput style={AddAdressStyle.input} placeholder="Nhập khu vực"/>
                    <TextInput style={AddAdressStyle.input} placeholder="Nhập quận/phường"/>
                    <TextInput style={AddAdressStyle.input} placeholder="Nhập số nhà/hẻm chi tiết"/>
                </View>
            </View>
            <TouchableOpacity onPress={() => prop.navigation.navigate('MapAdress')} style={{
                flexDirection:'row',
                alignItems:'center'
            }}>
                <Text style={{
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins',
                    marginTop: 20,
                    marginLeft: 20
                }}>Địa chỉ hiện tại: </Text>
                <Image style={{marginTop: 20,
                    marginLeft: 5}} 
                source={require('../../../assets/map.png')}/>
            </TouchableOpacity>
            <View style={AddAdressStyle.footer}>
                <TouchableOpacity onPress={HandSubmitTrue} style={AddAdressStyle.button}>
                    <Text style={AddAdressStyle.buttonText}>LƯU</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default AddAdress;