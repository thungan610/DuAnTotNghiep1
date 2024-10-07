import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React, { useMemo, useState } from 'react';
import { RadioGroup } from 'react-native-radio-buttons-group';
import LoginStyle from './style';

const Login = (prop) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const BtnLogin = () => {
        let hasError = false;

        setEmailError('');
        setPasswordError('');
        setLoginError('');

        if (email === '') {
            setEmailError("Vui lòng nhập Email");
            setEmail(''); 
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError("Email không hợp lệ!");
            setEmail(''); 
            hasError = true;
        }
        if (password === '') {
            setPasswordError("Vui lòng nhập mật khẩu");
            setPassword(''); 
            hasError = true;
        } else if (password.length < 6) {
            setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
            setPassword(''); 
            hasError = true;
        }

        // Kiểm tra đăng nhập
        if (!hasError) {
            if (email !== "example@mail.com" || password !== "password") { 
                setLoginError("Email hoặc mật khẩu không đúng!");
                setEmail('');
                setPassword(''); 
                return;
            }

            Alert.alert("Đăng nhập thành công");
            prop.navigation.navigate('BottomNav');
        }
    };

    // Kiểm tra email hợp lệ
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const ClickRegister = () => {
        prop.navigation.navigate('Register');
    };

    const radioButtons = useMemo(() => ([{
        id: '1',
        label: 'Nhớ tài khoản',
        value: 'nhotaikhoan',
        color: '#37C5DF',
        selectedColor: '#2CA9C0',
    }]), []);

    const [selectedId, setSelectedId] = useState();

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
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordError(''); 
                                    setLoginError(''); 
                                }}
                                style={[LoginStyle.input, passwordError ? { color: 'red' } : {}]}
                                secureTextEntry={!isPasswordVisible}
                            />
                            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                <Image
                                    style={LoginStyle.eye_closed}
                                    source={isPasswordVisible
                                        ? require("../../../src/assets/eye.png")
                                        : require("../../../src/assets/eye-closed.png")}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={LoginStyle.nhotk}>
                    <RadioGroup
                        labelStyle={LoginStyle.radio}
                        containerStyle={{ alignItems: 'flex-start' }}
                        radioButtons={radioButtons}
                        onPress={setSelectedId}
                        selectedId={selectedId}
                    />
                    <Text style={LoginStyle.forgot}>Quên mật khẩu?</Text>
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
                    <Text onPress={ClickRegister} style={LoginStyle.footerduoi}> Đăng ký</Text>
                </View>
            </View>
        </View>
    );
};

export default Login;
