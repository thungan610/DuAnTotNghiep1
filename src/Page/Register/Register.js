import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import RegisterStyle from './style';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../api/AxiosInstance';

const Register = () => {
    const navigation = useNavigation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rememberAccount, setRememberAccount] = useState(false);

    const NextLogin = () => {
        navigation.navigate('Login')
    };
    // Hàm lưu tài khoản vào AsyncStorage
    const saveAccount = async (email, password) => {
        try {
            await AsyncStorage.setItem('userCredentials', JSON.stringify({ email, password }));
        } catch (error) {
            console.error('Error saving user credentials: ', error);
        }
    };

    // Hàm kiểm tra tài khoản đã lưu
    const checkSavedAccount = async () => {
        try {
            const savedCredentials = await AsyncStorage.getItem('userCredentials');
            if (savedCredentials) {
                const { email, password } = JSON.parse(savedCredentials);
                // Điều hướng đến màn hình chính nếu tìm thấy tài khoản đã lưu
                navigation.replace('Home', { email, password });
            }
        } catch (error) {
            console.error('Error checking saved credentials: ', error);
        }
    };

    // Kiểm tra tài khoản đã lưu khi ứng dụng mở
    useEffect(() => {
        checkSavedAccount();
    }, []);

    // Hàm đăng ký
    const BtnRegister = async () => {
        let hasError = false;
        setFullNameError('');
        setPhoneError('');
        setEmailError('');
        setPasswordError('');

        const validatePassword = (password) => {
            if (password.length < 8) {
                return 'Phải có ít nhất 8 ký tự.';
            } else if (!/\d/.test(password)) {
                return 'Phải chứa ít nhất một số.';
            } else if (!/[!@#$%^&*]/.test(password)) {
                return 'Phải chứa ít nhất một ký tự đặc biệt.';
            } else if (!/[A-Z]/.test(password)) {
                return 'Phải chứa ít nhất một chữ cái in hoa.';
            }
            return '';
        };

        if (fullName.trim() === '') {
            setFullNameError('Vui lòng nhập họ và tên');
            hasError = true;
        }
        if (email.trim() === '') {
            setEmailError('Vui lòng nhập email');
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError('Email không hợp lệ');
            hasError = true;
        }
        if (phone.trim() === '') {
            setPhoneError('Vui lòng nhập số điện thoại');
            hasError = true;
        } else if (!validatePhone(phone)) {
            setPhoneError('Số điện thoại không hợp lệ');
            hasError = true;
        }
        if (password === '') {
            setPasswordError('Vui lòng nhập mật khẩu');
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
                    email,
                    password,
                    name: fullName,
                    phone,
                });

                if (response.data) {
                    Alert.alert('Thông báo', 'Đăng ký thành công!');
                    if (rememberAccount) {
                        // Lưu tài khoản nếu chọn "Nhớ tài khoản"
                        await saveAccount(email, password);
                    }
                    setTimeout(() => {
                        navigation.navigate('Login');
                    }, 1000);
                }
            } catch (error) {
                Alert.alert('Thông báo', 'Đăng ký thất bại!');
            }
        }
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

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
            style={RegisterStyle.container}>
            <ScrollView>
                <View style={RegisterStyle.HDLogo}>
                    <Image style={RegisterStyle.logo} source={require('../../../src/assets/logo.png')} />
                </View>
                <View style={RegisterStyle.body}>
                    <View style={RegisterStyle.title}>
                        <Text style={RegisterStyle.text}>Đăng ký</Text>
                        <Text style={RegisterStyle.text1}>, để tiếp tục sử dụng</Text>
                    </View>
                    <View style={RegisterStyle.inputView}>
                        <Text style={RegisterStyle.tieudeInput}>Họ và tên</Text>
                        <View
                            style={[
                                RegisterStyle.anhinput,
                                fullNameError ? { borderColor: 'red', borderWidth: 1 } : {},
                            ]}>
                            <Image
                                style={{ tintColor: '#2CA9C0', height: 24, width: 24 }}
                                source={require('../../../src/assets/User_alt.png')}
                            />
                            <TextInput
                                placeholder={fullNameError ? 'Vui lòng nhập họ tên!' : 'Nhập họ và tên'}
                                placeholderTextColor={fullNameError ? 'red' : '#999'}
                                onChangeText={(text) => {
                                    setFullName(text);
                                    setFullNameError('');
                                }}
                                style={[RegisterStyle.input, fullNameError ? { color: 'red' } : {}]}
                            />
                        </View>

                        <Text style={RegisterStyle.tieudeInput}>Địa chỉ email</Text>
                        <View
                            style={[
                                RegisterStyle.anhinput,
                                emailError ? { borderColor: 'red', borderWidth: 1 } : {},
                            ]}>
                            <Image
                                style={RegisterStyle.lockalt}
                                source={require('../../../src/assets/Message.png')}
                            />
                            <TextInput
                                value={email}
                                placeholder={emailError ? 'Email không hợp lệ!' : 'Nhập email'}
                                placeholderTextColor={emailError ? 'red' : '#999'}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setEmailError('');
                                }}
                                style={[RegisterStyle.input, emailError ? { color: 'red' } : {}]}
                            />
                        </View>

                        <Text style={RegisterStyle.tieudeInput}>Số điện thoại</Text>
                        <View
                            style={[
                                RegisterStyle.anhinput,
                                phoneError ? { borderColor: 'red', borderWidth: 1 } : {},
                            ]}>
                            <Image
                                style={{ tintColor: '#2CA9C0', width: 24, height: 24 }}
                                source={require('../../../src/assets/Phone_fill.png')}
                            />
                            <TextInput
                                value={phone}
                                placeholder={phoneError || 'Nhập số điện thoại'}
                                placeholderTextColor={phoneError ? 'red' : '#999'}
                                keyboardType="phone-pad"
                                onChangeText={(text) => {
                                    setPhone(text);
                                    setPhoneError('');
                                }}
                                style={[RegisterStyle.input, phoneError ? { color: 'red' } : {}]}
                            />
                        </View>

                        <Text style={RegisterStyle.tieudeInput}>Mật khẩu</Text>
                        <View
                            style={[
                                RegisterStyle.anhinput,
                                passwordError ? { borderColor: 'red', borderWidth: 1 } : {},
                            ]}>
                            <Image
                                style={RegisterStyle.lockalt}
                                source={require('../../../src/assets/Lock_alt.png')}
                            />
                            <TextInput
                                value={password}
                                placeholder={passwordError || 'Nhập mật khẩu'}
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
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical:10
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
                                {rememberAccount && (
                                    <Image source={require('../../../src/assets/check.png')} />
                                )}
                            </TouchableOpacity>
                            <Text style={RegisterStyle.tieudeInput}>Nhớ tài khoản</Text>
                        </View>
                        <TouchableOpacity onPress={BtnRegister} style={RegisterStyle.tout}>
                            <Text style={RegisterStyle.textDk}>
                                Đăng Ký
                            </Text>
                        </TouchableOpacity>
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
    );
};

export default Register;
