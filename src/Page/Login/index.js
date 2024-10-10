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
    const [selectedId, setSelectedId] = useState();


    const BtnLogin = () => {
        let hasError = false;

        // Reset lỗi
        setEmailError('');
        setPasswordError('');
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

        if (hasError) {
            setEmail('');
            setPassword('');
            return;
        }

        // Kiểm tra đăng nhập
        if (email !== "cphat774@gmail.com" || password !== "Ngocphat123@") {
            setLoginError("Email hoặc mật khẩu không đúng!");
            setEmail('');
            setPassword('');
            return;
        }

        if (!hasError) {
            Alert.alert("Thông báo", "Đăng nhập thành công!");
            setTimeout(() => {
                prop.navigation.navigate('AddProduct');
            }, 1000);
        }
    };

    const validateEmail = (email) => {
        // Biểu thức chính quy để kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    // Cập nhật hàm kiểm tra mật khẩu
    const validatePassword = (password) => {
        if (password.length < 8) {
            return 'Phải có ít nhất 8 ký tự.';
        }
        if (!/\d/.test(password)) {
            return 'Phải chứa ít nhất một số.';
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return 'Phải chứa ít nhất một ký tự đặc biệt.';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Phải chứa ít nhất một chữ cái in hoa.';
        }
        return '';
    };
    const handlePasswordChange = (text) => {
        setPassword(text);
        setPasswordError('');
        setLoginError('');
    };

    const ClickForgotPass = () => {
        prop.navigation.navigate('ForgotPassword');
    };

    const radioButtons = useMemo(() => ([{
        id: '1',
        label: 'Nhớ tài khoản',
        value: 'nhotaikhoan',
        color: '#37C5DF',
        selectedColor: '#2CA9C0',
    }]), []);

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
                                onChangeText={handlePasswordChange} 
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
                        onPress={setSelectedId} // Cần định nghĩa selectedId
                        selectedId={selectedId} // Cần định nghĩa selectedId
                    />
                    <TouchableOpacity onPress={ClickForgotPass}>
                        <Text style={LoginStyle.forgot}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
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