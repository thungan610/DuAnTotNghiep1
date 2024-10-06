import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useMemo, useState } from 'react'
import { RadioGroup } from 'react-native-radio-buttons-group'
import RegisterStyle from './style'

const Register = (prop) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const NextLogin = () => {
        prop.navigation.navigate('Login')
    }

    const BtnRegister = () => {
        Alert.alert("Đăng ký thành công")
        prop.navigation.navigate('Login')
    }

    const radioButtons = useMemo(() => ([{
        id: '1',
        label: 'Nhớ tài khoản',
        value: 'nhotaikhoan',
        color: '#37C5DF',
        selectedColor: '#2CA9C0',
    }]), []);

    const [selectedId, setSelectedId] = useState();

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
                            <TextInput placeholder="Họ và tên" onChangeText={(text) => setEmail(text)} style={RegisterStyle.input} />
                        </View>

                        <Text style={RegisterStyle.tieudeInput}>Địa chỉ email</Text>
                        <View style={RegisterStyle.anhinput}>
                            <Image style={RegisterStyle.lockalt} source={require("../../../src/assets/Message.png")} />
                            <TextInput placeholder="Nhập email" onChangeText={(text) => setEmail(text)} style={RegisterStyle.input} />
                        </View>

                        <Text style={RegisterStyle.tieudeInput}>Số điện thoại</Text>
                        <View style={RegisterStyle.anhinput}>
                            <Image style={{ tintColor: '#2CA9C0', width: 24, height: 24 }} source={require("../../../src/assets/Phone_fill.png")} />
                            <TextInput placeholder="Số điện thoại" onChangeText={(text) => setEmail(text)} style={RegisterStyle.input} />
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
                        <View style={RegisterStyle.radio}>
                            <RadioGroup labelStyle={RegisterStyle.radio}
                                containerStyle={{ alignItems: 'flex-start' }}
                                radioButtons={radioButtons}
                                onPress={setSelectedId}
                                selectedId={selectedId} />
                            <Text style={RegisterStyle.fogotPass}>Quên mật khẩu?</Text>
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
                        <Text onPress={NextLogin} style={RegisterStyle.end}>Đăng Nhập</Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Register;
