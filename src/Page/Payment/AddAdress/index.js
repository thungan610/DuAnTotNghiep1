import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import AddAdressStyle from "./style";
import axios from "axios";

const AddAdress = (prop) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [region, setRegion] = useState('');
    const [district, setDistrict] = useState('');
    const [details, setDetails] = useState('');

    const BackRight = () => {
        prop.navigation.navigate('ProfileDetail');
    };

    const handleSubmit = async () => {
        if (!name || !phone || !region || !district || !details) {
            Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin!");
            return;
        }

        try {
            const response = await axios.post('http://192.168.2.21:6677/addresses/addAddress', {
                name,
                phone,
                region,
                district,
                details,
            });

            if (response.status === 200) {
                Alert.alert("Thành công", "Địa chỉ đã được thêm!");
                prop.navigation.navigate('SubmitTrue');
            } else {
                Alert.alert("Lỗi", "Không thể thêm địa chỉ.");
            }
        } catch (error) {
            console.error('Error submitting address:', error);
            Alert.alert("Lỗi", "Đã có lỗi xảy ra. Vui lòng thử lại.");
        }
    };

    return (
        <ScrollView style={AddAdressStyle.container}>
            <View style={AddAdressStyle.header}>
                <TouchableOpacity onPress={BackRight}>
                    <Image style={AddAdressStyle.backright} source={require("../../../assets/notifi/backright.png")} />
                </TouchableOpacity>
                <Text style={AddAdressStyle.title}>Thêm địa chỉ mới</Text>
                <Text />
            </View>
            <View>
                <Text style={AddAdressStyle.txtLH}>Thông tin liên hệ</Text>
                <View style={AddAdressStyle.body}>
                    <TextInput 
                        style={AddAdressStyle.input} 
                        placeholder="Họ và tên"
                        value={name} 
                        onChangeText={setName} 
                    />
                    <TextInput 
                        style={AddAdressStyle.input} 
                        placeholder="Số điện thoại"
                        value={phone} 
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                </View>
            </View>
            <View>
                <Text style={AddAdressStyle.txtLH}>Thông tin địa chỉ</Text>
                <View style={AddAdressStyle.body}>
                    <Text style={AddAdressStyle.input}>Việt Nam</Text>
                    <TextInput 
                        style={AddAdressStyle.input} 
                        placeholder="Nhập khu vực"
                        value={region} 
                        onChangeText={setRegion} 
                    />
                    <TextInput 
                        style={AddAdressStyle.input} 
                        placeholder="Nhập quận/phường"
                        value={district} 
                        onChangeText={setDistrict}
                    />
                    <TextInput 
                        style={AddAdressStyle.input} 
                        placeholder="Nhập số nhà/hẻm chi tiết"
                        value={details} 
                        onChangeText={setDetails} 
                    />
                </View>
            </View>
            <View style={AddAdressStyle.footer}>
                <TouchableOpacity onPress={handleSubmit} style={AddAdressStyle.button}>
                    <Text style={AddAdressStyle.buttonText}>LƯU</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default AddAdress;
