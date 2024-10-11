import { View, Text,Alert, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ResetPasswordStyle from './style'

const ResetPassword = (prop) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);


    const BtnResetPass = () => {
        let hasError = false;

        setPasswordError('');
        setConfirmPasswordError('');

        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            setPassword('');
            setConfirmPassword('');
            hasError = true;
        }

        if (confirmPassword === '') {
            setConfirmPasswordError("Vui lòng nhập lại mật khẩu");
            setPassword('');
            setConfirmPassword('');
            hasError = true;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Mật khẩu không khớp!");
            setPassword('');
            setConfirmPassword('');
            hasError = true;
        }

        if (hasError) {
            return;
        }
        Alert.alert("Đổi mật khẩu thành công");
        prop.navigation.navigate('Login');
    };

    const validatePassword = (password) => {
        if (password.length < 8) {
            return "Mật khẩu phải có ít nhất 8 ký tự.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Mật khẩu phải có ít nhất một chữ cái in hoa.";
        }
        if (!/[a-z]/.test(password)) {
            return "Mật khẩu phải có ít nhất một chữ cái thường.";
        }
        if (!/\d/.test(password)) {
            return "Mật khẩu phải có ít nhất một số.";
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return "Mật khẩu phải có ít nhất một ký tự đặc biệt.";
        }
        return '';
    };

    return (
        <View style={ResetPasswordStyle.container}>
            <View style={ResetPasswordStyle.headerLogo}>
                <Image
                    style={ResetPasswordStyle.logo}
                    source={require('../../../../src/assets/logo.png')}
                />
            </View>
            <View style={ResetPasswordStyle.body}>
                <View>
                    <View style={ResetPasswordStyle.tieude}>
                        <Text style={ResetPasswordStyle.tieudedn}>Đặt lại mật khẩu</Text>
                    </View>

                    <View style={ResetPasswordStyle.inputall}>
                        <Text style={ResetPasswordStyle.tieudeinput}>Nhập mật khẩu</Text>
                        <View style={ResetPasswordStyle.anhinput}>
                            <Image
                                style={ResetPasswordStyle.message}
                                source={require('../../../../src/assets/Lock_alt.png')}
                            />
                            <TextInput
                                value={password}
                                placeholder={passwordError ? "Mật khẩu không hợp lệ!" : "Nhập mật khẩu"}
                                placeholderTextColor={passwordError ? 'red' : '#999'}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordError('');
                                    setConfirmPasswordError('');
                                }}
                                style={[ResetPasswordStyle.input, passwordError ? { color: 'red' } : {}]}
                                secureTextEntry={!isPasswordVisible}
                            />
                            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                <Image
                                    style={ResetPasswordStyle.eye}
                                    source={isPasswordVisible
                                        ? require("../../../../src/assets/eye.png")
                                        : require("../../../../src/assets/eye-closed.png")
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={ResetPasswordStyle.tieudeinput}>Nhập lại mật khẩu</Text>
                        <View style={ResetPasswordStyle.anhinput}>
                            <Image
                                style={ResetPasswordStyle.message}
                                source={require('../../../../src/assets/Lock_alt.png')}
                            />
                            <TextInput
                                value={confirmPassword}
                                placeholder={confirmPasswordError ? "Mật khẩu không giống trên" : "Nhập lại mật khẩu"}
                                placeholderTextColor={confirmPasswordError ? 'red' : '#999'}
                                onChangeText={(text) => {
                                    setConfirmPassword(text);
                                    setConfirmPasswordError('');
                                }}
                                style={[ResetPasswordStyle.input, confirmPasswordError ? { color: 'red' } : {}]}
                                secureTextEntry={!isConfirmPasswordVisible} // Sử dụng trạng thái riêng
                            />
                            <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                                <Image
                                    style={ResetPasswordStyle.eye}
                                    source={isConfirmPasswordVisible
                                        ? require("../../../../src/assets/eye.png")
                                        : require("../../../../src/assets/eye-closed.png")
                                    }
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={BtnResetPass} style={ResetPasswordStyle.dn}>
                            <Text style={ResetPasswordStyle.chudn}>TIẾP TỤC</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default ResetPassword