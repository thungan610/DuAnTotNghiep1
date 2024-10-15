import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import RegisterStyle from './style'
import axios from 'axios'

const Register = (prop) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [rememberAccount, setRememberAccount] = useState(false);

    const NextLogin = () => {
        prop.navigation.navigate('Login')
    }

    const BtnRegister = async () => {
        try {
            // Gọi API đăng ký
            const response = await axios.post('http://192.168.1.61:6677/users/register', {
                email: email,
                password: password,
                name: fullName,
                phone: phone
            });

            if (response.data) {
                Alert.alert("Thông báo", "Đăng kí thành công!");

                setTimeout(() => {
                    prop.navigation.navigate('SMS');
                }, 1000);
            }
        } catch (error) {
            Alert.alert("Thông báo", "Đăng ký thất bại!");
        }
    };

const handleRememberAccount = () => {
    setRememberAccount(!rememberAccount);
};

return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={RegisterStyle.container}
    >
        <ScrollView>
            <View style={RegisterStyle.HDLogo}>
                <Image
                    style={RegisterStyle.logo}
                    source={require('../../../src/assets/logo.png')}
                />
            </View>
            <View style={RegisterStyle.body}>
                <View style={RegisterStyle.title}>
                    <Text style={RegisterStyle.text}>Đăng ký</Text>
                    <Text style={RegisterStyle.text1}>, để tiếp tục sử dụng</Text>
                </View>
                <View style={RegisterStyle.inputView}>
                    <Text style={RegisterStyle.tieudeInput}>Họ và tên</Text>
                    <View style={RegisterStyle.anhinput}>
                        <Image style={{ tintColor: "#2CA9C0", height: 24, width: 24 }} source={require("../../../src/assets/User_alt.png")} />
                        <TextInput
                            placeholder="Họ và tên"
                            onChangeText={(text) => setFullName(text)}
                            style={RegisterStyle.input}
                            value={fullName}
                        />
                    </View>

                    <Text style={RegisterStyle.tieudeInput}>Địa chỉ email</Text>
                    <View style={RegisterStyle.anhinput}>
                        <Image style={RegisterStyle.lockalt} source={require("../../../src/assets/Message.png")} />
                        <TextInput
                            placeholder="Nhập email"
                            onChangeText={(text) => setEmail(text)}
                            style={RegisterStyle.input}
                            value={email}
                        />
                    </View>

                    <Text style={RegisterStyle.tieudeInput}>Số điện thoại</Text>
                    <View style={RegisterStyle.anhinput}>
                        <Image style={{ tintColor: '#2CA9C0', width: 24, height: 24 }} source={require("../../../src/assets/Phone_fill.png")} />
                        <TextInput
                            placeholder="Số điện thoại"
                            onChangeText={(text) => setPhone(text)}
                            style={RegisterStyle.input}
                            value={phone}
                        />
                    </View>

                    <Text style={RegisterStyle.tieudeInput}>Mật khẩu</Text>
                    <View style={RegisterStyle.anhinput}>
                        <Image style={RegisterStyle.lockalt} source={require("../../../src/assets/Lock_alt.png")} />
                        <TextInput
                            placeholder="Nhập mật khẩu"
                            onChangeText={(text) => setPassword(text)}
                            style={RegisterStyle.input}
                            secureTextEntry={!isPasswordVisible}
                            keyboardType="default"
                            returnKeyType="done"
                        />
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            <Image
                                style={RegisterStyle.eye_closed}
                                source={isPasswordVisible
                                    ? require("../../../src/assets/eye.png")
                                    : require("../../../src/assets/eye-closed.png")
                                }
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={RegisterStyle.button}>
                    <TouchableOpacity onPress={BtnRegister} style={RegisterStyle.tout}>
                        <Text style={RegisterStyle.textDk}>
                            Đăng Ký
                        </Text>
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20
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
                        <Text style={RegisterStyle.checkboxLabel}>Nhớ tài khoản</Text>
                    </View>
                </View>

                <Text style={RegisterStyle.hoac}>Hoặc</Text>
                <View style={RegisterStyle.icon}>
                    <TouchableOpacity style={RegisterStyle.fb}>
                        <Image source={require('../../../src/assets/fb.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={RegisterStyle.fb}>
                        <Image source={require('../../../src/assets/gg.png')} />
                    </TouchableOpacity>
                </View>


                <View style={RegisterStyle.footer}>
                    <Text style={RegisterStyle.ftText}>Bạn đã có tài khoản?</Text>
                    <Text onPress={NextLogin} style={RegisterStyle.end}> Đăng Nhập</Text>
                </View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
)
}
export default Register;
