import { View, Text,Alert, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ResetPasswordStyle from './style'

const ResetPassword = (prop) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);


    const BtnResetPass = () => {
        Alert.alert("Đổi mật khẩu thành công");
        prop.navigation.navigate('Login');
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
                                placeholder={"Nhập mật khẩu"}
                                onChangeText={(text) => {
                                    setPassword(text);
                                }}
                                style={[ResetPasswordStyle.input]}
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
                                placeholder={"Nhập lại mật khẩu"}
                                onChangeText={(text) => {
                                    setConfirmPassword(text);
                                }}
                                style={[ResetPasswordStyle.input]}
                                secureTextEntry={!isConfirmPasswordVisible} 
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