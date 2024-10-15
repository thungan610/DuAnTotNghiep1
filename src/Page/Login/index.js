import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import LoginStyle from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = (prop) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [rememberAccount, setRememberAccount] = useState(false);


    const BtnLogin = async () => {
        try {
            // Gọi API đăng ký
            const response = await axios.post('URL_API_CỦA_BẠN', {
                email: email,
                password: password,
            });

            if (response.data) {
                Alert.alert("Thông báo", "Đăng nhập thành công!");
                setTimeout(() => {
                    prop.navigation.navigate('SMS');
                }, 1000);
            }
        } catch (error) {
            Alert.alert("Thông báo", error.response ? error.response.data.message : "Đăng nhập thất bại!");
        }
    };

    useEffect(() => {
        const loadAccount = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('savedEmail');
                const savedPassword = await AsyncStorage.getItem('savedPassword');

                if (savedEmail !== null && savedPassword !== null) {
                    setEmail(savedEmail);
                    setPassword(savedPassword);
                    setRememberAccount(true);
                }
            } catch (error) {
                console.error("Không thể tải tài khoản đã lưu", error);
            }
        };
        loadAccount();
    }, []);

    const handlePasswordChange = (text) => {
        setPassword(text);
        setEmail(text)
    };

    const handleRememberAccount = () => {
        setRememberAccount(!rememberAccount); 
    };

    return (
        <View style={LoginStyle.container}>
            <View style={LoginStyle.headerlogo}>
                <Image style={LoginStyle.logo} source={require("../../../src/assets/logo.png")} />
            </View>
            <View style={LoginStyle.body}>
                <View>
                    <View style={LoginStyle.tieude}>
                        <Text style={LoginStyle.tieudedn}>Đăng nhập</Text>
                        <Text style={LoginStyle.tieudednphu}>, để tiếp tục sử dụng</Text>
                    </View>
                    <View style={LoginStyle.inputall}>
                        <Text style={LoginStyle.tieudeinput}>Địa chỉ email</Text>
                        <View style={[LoginStyle.anhinput]}>
                            <Image style={LoginStyle.message} source={require("../../../src/assets/Message.png")} />
                            <TextInput
                                value={email}
                                placeholder={"Nhập email"}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setPassword(text);
                                }}
                            />
                        </View>
                        <Text style={LoginStyle.tieudeinput}>Mật khẩu</Text>
                        <View style={[LoginStyle.anhinput]}>
                            <Image style={LoginStyle.lockalt} source={require("../../../src/assets/Lock_alt.png")} />
                            <TextInput
                                value={password}
                                placeholder={"Nhập mật khẩu"}
                                style={{
                                    flex: 1,
                                    paddingVertical: 11,
                                    color: '#2CA9C0',
                                }}
                                onChangeText={handlePasswordChange}
                                secureTextEntry={!isPasswordVisible}
                            />
                            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                <Image
                                    source={isPasswordVisible
                                        ? require("../../../src/assets/eye.png")
                                        : require("../../../src/assets/eye-closed.png")}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    marginLeft:20
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10
                    }}>
                        <TouchableOpacity onPress={handleRememberAccount} style={{
                            width: 20,
                            height: 20,
                            borderWidth: 1,
                            borderColor: '#2CA9C0',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 10,
                        }}>
                            {rememberAccount && <Image source={require("../../../src/assets/check.png")} />}
                        </TouchableOpacity>
                        <Text style={LoginStyle.checkboxLabel}>Nhớ tài khoản</Text>
                    </View>
                    <Text onPress={() => prop.navigation.navigate('ForgotPassword')} 
                    style={{
                        color:'#2CA9C0',
                        fontSize:15,
                        marginTop:10,
                        marginLeft: 120
                    }}> Quên mật khẩu ?</Text>
                </View>

                <View style={LoginStyle.button}>
                    <TouchableOpacity onPress={BtnLogin} style={LoginStyle.dn}>
                        <Text style={LoginStyle.chudn}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
                <Text style={LoginStyle.or}>Hoặc</Text>
                <View style={LoginStyle.buttonall}>
                    <TouchableOpacity style={LoginStyle.buttonfb}>
                        <Image style={LoginStyle.fb} source={require('../../../src/assets/fb.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={LoginStyle.buttongg}>
                        <Image style={LoginStyle.gg} source={require("../../../src/assets/gg.png")} />
                    </TouchableOpacity>
                </View>
                <View style={LoginStyle.footer}>
                    <Text style={LoginStyle.footerdau}>Bạn chưa có tài khoản?</Text>
                    <Text onPress={() => prop.navigation.navigate('Register')} style={LoginStyle.footerduoi}> Đăng ký</Text>
                </View>
            </View>
        </View>
    );
};

export default Login;