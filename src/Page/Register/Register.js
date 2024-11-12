import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import RegisterStyle from './style'
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../api/AxiosInstance'

const Register = () => {
    const navigation = useNavigation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [FullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [FullNameError, setFullNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rememberAccount, setRememberAccount] = useState(false);

    const NextLogin = () => {
        navigation.navigate('Login')
    }

    const BtnRegister = async () => {
        let hasError = false;
        setFullNameError('');
        setPhoneError('');
        setEmailError('');
        setPasswordError('');
    
        const validatePassword = (password) => {
            if (password.length < 8) {
                setPassword('');
                return 'Phải có ít nhất 8 ký tự.';
            }
            else if (!/\d/.test(password)) {
                setPassword('');
                return 'Phải chứa ít nhất một số.';
            }
            else if (!/[!@#$%^&*]/.test(password)) {
                setPassword('');
                return 'Phải chứa ít nhất một ký tự đặc biệt.';
            }
            else if (!/[A-Z]/.test(password)) {
                setPassword('');
                return 'Phải chứa ít nhất một chữ cái in hoa.';
            }
            return '';
        };
    
        if (FullName.trim() === '') {
            setFullNameError("Vui lòng nhập họ và tên");
            setFullName('');
            hasError = true;
        }
        if (email.trim() === '') {
            setEmailError("Vui lòng nhập email");
            setEmail('');
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError("Email không hợp lệ");
            setEmail('');
            hasError = true;
        }
        if (phone.trim() === '') {
            setPhoneError("Vui lòng nhập số điện thoại");
            setPhone('');
            hasError = true;
        } else if (!validatePhone(phone)) {
            setPhoneError("Số điện thoại không hợp lệ");
            setPhone('');
            hasError = true;
        }
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
    
        if (!hasError) {
            try {
                // Gọi API đăng ký
                const response = await axiosInstance.post('/users/register', {
                    email: email,
                    password: password,
                    name: FullName,
                    phone: phone
                });
    
                if (response.data) {
                    Alert.alert("Thông báo", "Đăng kí thành công!");
                    setTimeout(() => {
                        navigation.navigate('Login')
                    }, 1000);
                }
            } catch (error) {
                Alert.alert("Thông báo", "Đăng ký thất bại!");
            }
        }
    };
    
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
        // Kiểm tra số điện thoại hợp lệ
    }
    const validatePhone = (phone) => {
        const re = /^[0-9]{10,11}$/;
        return re.test(phone);
    };
    const handlePasswordChange = (text) => {
        setPassword(text);
        setPasswordError('');
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
                        <View style={[RegisterStyle.anhinput, FullNameError ? { borderColor: 'red', borderWidth: 1 } : {}]}>
                            <Image style={{ tintColor: "#2CA9C0", height: 24, width: 24 }} source={require("../../../src/assets/User_alt.png")} />
                            <TextInput
                                placeholder={FullNameError ? "Vui lòng nhập họ tên!" : "Nhập họ và tên"}
                                placeholderTextColor={FullNameError ? 'red' : '#999'}
                                onChangeText={(text) => {
                                    setFullName(text);
                                    setFullNameError('');
                                }}
                                style={[RegisterStyle.input, FullNameError ? { color: 'red' } : {}]}
                            />
                        </View>

                        <Text style={RegisterStyle.tieudeInput}>Địa chỉ email</Text>
                        <View style={[RegisterStyle.anhinput, emailError ? { borderColor: 'red', borderWidth: 1 } : {}]}>

                            <Image style={RegisterStyle.lockalt} source={require("../../../src/assets/Message.png")} />
                            <TextInput
                                value={email}
                                placeholder={emailError ? "Email không hợp lệ!" : "Nhập email"}
                                placeholderTextColor={emailError ? 'red' : '#999'}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setEmailError('');
                                }}
                                style={[RegisterStyle.input, emailError ? { color: 'red' } : {}]}
                            />
                        </View>

                        <Text style={RegisterStyle.tieudeInput}>Số điện thoại</Text>
                        <View style={[RegisterStyle.anhinput, phoneError ? { borderColor: 'red', borderWidth: 1 } : {}]}>
                            <Image style={{ tintColor: '#2CA9C0', width: 24, height: 24 }} source={require("../../../src/assets/Phone_fill.png")} />
                            <TextInput
                                value={phone}
                                placeholder={phoneError || "Nhập số điện thoại"}
                                placeholderTextColor={phoneError ? 'red' : '#999'}
                                keyboardType='phone-pad'
                                onChangeText={(text) => {
                                    setPhone(text);
                                    setPhoneError('');
                                }}
                                style={[RegisterStyle.input, phoneError ? { color: 'red' } : {}]}
                            />
                        </View>

                        <Text style={RegisterStyle.tieudeInput}>Mật khẩu</Text>
                        <View style={[RegisterStyle.anhinput, passwordError ? { borderColor: 'red', borderWidth: 1 } : {}]}>
                            <Image style={RegisterStyle.lockalt} source={require("../../../src/assets/Lock_alt.png")} />
                            <TextInput
                                value={password}
                                placeholder={passwordError || "Nhập mật khẩu"}
                                placeholderTextColor={passwordError ? 'red' : '#999'}
                                onChangeText={handlePasswordChange}
                                style={[RegisterStyle.input, passwordError ? { color: 'red' } : {}]}
                                secureTextEntry={!isPasswordVisible}
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
