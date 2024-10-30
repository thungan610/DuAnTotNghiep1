import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ForgotPasswordStyle from './style';

const ForgotPassword = (prop) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNumber = (phoneNumber) => {
        const re = /^\d{10,11}$/;  // Kiểm tra số điện thoại có 10-11 chữ số
        return re.test(String(phoneNumber));
    };

    const handleSubmit = () => {
        setError('');
        if (validateEmail(input) || validatePhoneNumber(input)) {
            prop.navigation.navigate('ResetPassword');
        } else {
            setError('Vui lòng nhập email hoặc số điện thoại hợp lệ.');
        }
    };

    return (
        <View style={ForgotPasswordStyle.container}>
            <View style={ForgotPasswordStyle.headerLogo}>
                <Image
                    style={ForgotPasswordStyle.logo}
                    source={require('../../../src/assets/logo.png')}
                />
            </View>
            <View style={ForgotPasswordStyle.body}>
                <View>
                    <View style={ForgotPasswordStyle.tieude}>
                        <Text style={ForgotPasswordStyle.tieudedn}>Quên mật khẩu</Text>
                    </View>

                    <View style={ForgotPasswordStyle.inputall}>
                        <Text style={ForgotPasswordStyle.tieudeinput}>Nhập email/ số điện thoại</Text>
                        <View style={ForgotPasswordStyle.anhinput}>
                            <Image
                                style={ForgotPasswordStyle.message}
                                source={require('../../../src/assets/Message.png')}
                            />
                            <TextInput
                                value={input}
                                placeholder={"Nhập email hoặc số điện thoại"}
                                onChangeText={setInput}
                                keyboardType="default"
                                style={ForgotPasswordStyle.input} // Thêm style cho TextInput nếu cần
                            />
                        </View>

                         <Text>{error ? <Text style={ForgotPasswordStyle.errorText}>{error}</Text> : null} {/* Hiển thị thông báo lỗi */}</Text>
                    </View>
                    <View style={ForgotPasswordStyle.button}>
                        <TouchableOpacity style={ForgotPasswordStyle.dn} onPress={handleSubmit}>
                            <Text style={ForgotPasswordStyle.chudn}>TIẾP TỤC</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ForgotPasswordStyle.footer}>
                        <Text style={ForgotPasswordStyle.footerdau}>Bạn đã có tài khoản?</Text>
                        <TouchableOpacity onPress={() => prop.navigation.navigate('Login')}>
                            <Text style={ForgotPasswordStyle.footerduoi}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ForgotPassword;
