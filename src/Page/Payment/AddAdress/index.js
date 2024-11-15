import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import AddAdressStyle from "./style";
import AxiosInstance from "../../api/AxiosInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAdress = (prop) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [quarter, setQuarter] = useState('');
    const [alley, setAlley] = useState('');
    const [homenumber, setHomenumber] = useState('');

    const BackRight = () => {
        prop.navigation.navigate('AddProductsScreen');
    };  

                district,
                quarter,
                alley,
                homenumber
            });
            console.log(response.data);
            if (response.status === 200) {
                Alert.alert("Success", "Thêm địa chỉ thành công");
                BackRight(); // Navigate back after saving
            } else {
                Alert.alert("Error", "Thêm không thành công.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Thêm không được rồi, lồi 500 kìa sửa đi.");
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
                    />
                </View>
            </View>
            <View>
                <Text style={AddAdressStyle.txtLH}>Thông tin địa chỉ</Text>
                <View style={AddAdressStyle.body}>
                    <TextInput
                        style={AddAdressStyle.input}
                        placeholder="Nhập quốc gia"
                        value={country}
                    />
                    <TextInput
                        style={AddAdressStyle.input}
                        placeholder="Nhập khu vực"
                        value={city}
                      />

                    <TextInput
                        style={AddAdressStyle.input}
                        placeholder="Nhập quận"
                        value={district}
                        onChangeText={setDistrict}
                    />
                    <TextInput
                        style={AddAdressStyle.input}
                        placeholder="Nhập phường"
                        value={quarter}
                    />
                    <TextInput
                        style={AddAdressStyle.input}
                        placeholder="Nhập hẻm"
                        value={alley}
                    />
                    <TextInput
                        style={AddAdressStyle.input}
                        placeholder="Nhập số nhà"
                    />
                </View>
            </View>
            <View style={AddAdressStyle.footer}>
                <TouchableOpacity style={AddAdressStyle.button} onPress={handleSaveAddress}>
                    <Text style={AddAdressStyle.buttonText}>LƯU</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default AddAdress;