import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useMemo, useState } from 'react';
import { RadioGroup } from 'react-native-radio-buttons-group';
import RegisterStyle from './style';

const Register = (prop) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const BtnRegister = () => {
        let hasError = false;

        setFullNameError('');
        setEmailError('');
        setPhoneError('');
        setPasswordError('');

        if (fullName === '') {
            setFullNameError("Vui lòng nhập họ và tên");
            setFullName(''); 
            hasError = true;
        }

        if (email === '') {
            setEmailError("Vui lòng nhập email");
            setEmail(''); 
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError("Email không hợp lệ!");
            setEmail(''); 
            hasError = true;
        }

        if (phone === '') {
            setPhoneError("Vui lòng nhập số điện thoại");
            setPhone(''); 
            hasError = true;
        } else if (!validatePhone(phone)) {
            setPhoneError("Số điện thoại không hợp lệ!");
            setPhone(''); 
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

        if (hasError) {
            return;
        }

        Alert.alert("Đăng ký thành công");
        prop.navigation.navigate('Login');
    };

    // Kiểm tra email hợp lệ
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    // Kiểm tra số điện thoại hợp lệ
    const validatePhone = (phone) => {
        const re = /^[0-9]{10,11}$/; // Kiểm tra số điện thoại có 10-11 chữ số
        return re.test(phone);
    };

    const NextLogin = () => {
        prop.navigation.navigate('Login');
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
                        <View style={[RegisterStyle.anhinput, fullNameError ? { borderColor: 'red', borderWidth: 1 } : {}]}>
                            <Image style={{ tintColor: "#2CA9C0", height: 24, width: 24 }} source={require("../../../src/assets/User_alt.png")} />
                            <TextInput
                                value={fullName}
                                placeholder={fullNameError ? "Họ và tên không hợp lệ!" : "Nhập họ và tên"}
                                placeholderTextColor={fullNameError ? 'red' : '#999'}
                                onChangeText={(text) => {
                                    setFullName(text);
                                    setFullNameError(''); 
                                }}
                                style={[RegisterStyle.input, fullNameError ? { color: 'red' } : {}]}
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
                                placeholder={phoneError ? "Số điện thoại không hợp lệ!" : "Nhập số điện thoại"}
                                placeholderTextColor={phoneError ? 'red' : '#999'}
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
                                placeholder={passwordError ? "Mật khẩu không hợp lệ!" : "Nhập mật khẩu"}
                                placeholderTextColor={passwordError ? 'red' : '#999'}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordError(''); 
                                }}
                                style={[RegisterStyle.input, passwordError ? { color: 'red' } : {}]}
                                secureTextEntry={!isPasswordVisible}
                            />
                            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                <Image
                                    style={RegisterStyle.eye_closed}
                                    source={isPasswordVisible
                                        ? require("../../../src/assets/eye.png")
                                        : require("../../../src/assets/eye-closed.png")}
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
                            <RadioGroup
                                labelStyle={RegisterStyle.radio}
                                containerStyle={{ alignItems: 'flex-start' }}
                                radioButtons={radioButtons}
                                onPress={setSelectedId}
                                selectedId={selectedId}
                            />
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
    );
}

export default Register;
