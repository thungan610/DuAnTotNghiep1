import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import LoginStyle from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = (prop) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [rememberAccount, setRememberAccount] = useState(false);
    
        const BtnLogin = async () => {
        let hasError = false;
        setLoginError('');
    
        // Kiểm tra email
        if (email === '') {
            setEmailError("Vui lòng nhập Email");
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError("Email không hợp lệ!");
            hasError = true;
        }
    
        // Kiểm tra mật khẩu
        if (password === '') {
            setPasswordError("Vui lòng nhập mật khẩu");
            hasError = true;
        } else {
            const passwordValidationError = validatePassword(password);
            if (passwordValidationError) {
                setPasswordError(passwordValidationError);
                hasError = true;
            }
        }
    
        if (hasError) return;
    
        try {
            // Gọi API đăng nhập
            const response = await axios.post('URL_API_CỦA_BẠN', {
                email: email,
                password: password,
            });
    
            if (response.data) {
                Alert.alert("Thông báo", "Đăng nhập thành công!");
    
                if (rememberAccount) {
                    await AsyncStorage.setItem('savedEmail', email);
                    await AsyncStorage.setItem('savedPassword', password);
                }
    
                setTimeout(() => {
                    prop.navigation.navigate('NextPayment'); 
                }, 1000);
            }
        } catch (error) {
            Alert.alert("Thông báo", error.response ? error.response.data.message : "Đăng nhập thất bại!");
        }
    };    

    // Hàm kiểm tra định dạng email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Hàm kiểm tra mật khẩu
    const validatePassword = (password) => {
        if (password.length < 8) {
            return 'Phải có ít nhất 8 ký tự.';
        }
        else if (!/\d/.test(password)) {
            return 'Phải chứa ít nhất một số.';
        }
        else if (!/[!@#$%^&*]/.test(password)) {
            return 'Phải chứa ít nhất một ký tự đặc biệt.';
        }
        else if (!/[A-Z]/.test(password)) {
            return 'Phải chứa ít nhất một chữ cái in hoa.';
        }
        return '';
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
        setPasswordError('');
        setLoginError('');
    };

    const handleRememberAccount = () => {
        setRememberAccount(!rememberAccount);
    };
    const handleSubmit = () => {
        BtnLogin();
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
                        <View style={[LoginStyle.anhinput, emailError ? { borderColor: 'red', borderWidth: 1 } : {}]}>
                            <Image style={LoginStyle.message} source={require("../../../src/assets/Message.png")} />
                            <TextInput
                                value={email}
                                placeholder={emailError || "Nhập email"}
                                placeholderTextColor={emailError ? 'red' : '#999'}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setEmailError('');
                                    setLoginError('');
                                }}
                                style={[LoginStyle.input, emailError ? { color: 'red' } : {}]}
                            />
                        </View>
                        <Text style={LoginStyle.tieudeinput}>Mật khẩu</Text>
                        <View style={[LoginStyle.anhinput, passwordError ? { borderColor: 'red', borderWidth: 1 } : {}]}>
                            <Image style={LoginStyle.lockalt} source={require("../../../src/assets/Lock_alt.png")} />
                            <TextInput
                                value={password}
                                placeholder={passwordError || "Nhập mật khẩu"}
                                placeholderTextColor={passwordError ? 'red' : '#999'}
                                style={[LoginStyle.input, passwordError ? { color: 'red' } : {}]}
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
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 20
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
                            color: '#2CA9C0',
                            fontSize: 15,
                            marginTop: 10,
                            marginLeft: 120
                        }}> Quên mật khẩu ?</Text>
                </View>

                <View style={LoginStyle.button}>
                    <TouchableOpacity onPress={handleSubmit} style={LoginStyle.dn}>
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
