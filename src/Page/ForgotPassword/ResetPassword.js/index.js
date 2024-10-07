import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ResetPasswordStyle from './style'

const ResetPassword = () => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State để kiểm soát mật khẩu
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const BtnResetPass = () => {
        let hasError = false;

        setPasswordError('');
        setConfirmPasswordError('');

        if (password === '') {
            setPasswordError("Vui lòng nhập mật khẩu");
            setPassword('');
            hasError = true;
        } else if (password.length < 6) {
            setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
            setPassword('');
            hasError = true;
        }

        if (confirmPassword === '') {
            setConfirmPasswordError("Vui lòng nhập lại mật khẩu");
            setConfirmPassword('');
            hasError = true;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Vui longf nhập mật khẩu!");
            setConfirmPassword('');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        Alert.alert("Đổi mật khẩu thành công");
        // Điều hướng đến trang khác nếu cần
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