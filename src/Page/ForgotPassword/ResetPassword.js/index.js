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

    const validatePassword = (password) => {
        const uppercaseRegex = /[A-Z]/;  
        const numberRegex = /\d/;        

        if (!uppercaseRegex.test(password)) {
            return 'Mật khẩu phải chứa ít nhất một chữ in hoa.';
        }

        if (!numberRegex.test(password)) {
            return 'Mật khẩu phải chứa ít nhất một số.';
        }

        return '';
    };

    const handleSubmit = () => {
        let isValid = true;

        const passwordValidationError = validatePassword(password);

        // Kiểm tra trường mật khẩu
        if (password === '') {
            setPasswordError('Vui lòng nhập mật khẩu.');
            isValid = false;
        } else if (passwordValidationError !== '') {
            setPasswordError(passwordValidationError);  // Hiển thị lỗi từ hàm kiểm tra mật khẩu
            isValid = false;
        } else {
            setPasswordError('');
        }

        // Kiểm tra trường xác nhận mật khẩu
        if (confirmPassword === '') {
            setConfirmPasswordError('Vui lòng nhập lại mật khẩu.');
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Mật khẩu không khớp.');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        // Nếu hợp lệ, hiển thị thông báo thành công (hoặc thực hiện điều hướng)
        if (isValid) {
            prop.navigation.navigate('Login'); 
        }
    };

    // Hàm chuyển đổi hiển thị mật khẩu
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // Hàm chuyển đổi hiển thị mật khẩu xác nhận
    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
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
                                onChangeText={setPassword}
                                style={[ResetPasswordStyle.input]}
                                secureTextEntry={!isPasswordVisible}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <Image
                                    style={ResetPasswordStyle.eye}
                                    source={isPasswordVisible
                                        ? require("../../../../src/assets/eye.png")
                                        : require("../../../../src/assets/eye-closed.png")
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                        {passwordError ? <Text style={ResetPasswordStyle.errorText}>{passwordError}</Text> : null}

                        <Text style={ResetPasswordStyle.tieudeinput}>Nhập lại mật khẩu</Text>
                        <View style={ResetPasswordStyle.anhinput}>
                            <Image
                                style={ResetPasswordStyle.message}
                                source={require('../../../../src/assets/Lock_alt.png')}
                            />
                            <TextInput
                                value={confirmPassword}
                                placeholder={"Nhập lại mật khẩu"}
                                onChangeText={setConfirmPassword}
                                style={[ResetPasswordStyle.input]}
                                secureTextEntry={!isConfirmPasswordVisible} 
                            />
                            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                                <Image
                                    style={ResetPasswordStyle.eye}
                                    source={isConfirmPasswordVisible
                                        ? require("../../../../src/assets/eye.png")
                                        : require("../../../../src/assets/eye-closed.png")
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                        {confirmPasswordError ? <Text style={ResetPasswordStyle.errorText}>{confirmPasswordError}</Text> : null}


                        <TouchableOpacity  onPress={handleSubmit}  style={ResetPasswordStyle.dn}>
                            <Text style={ResetPasswordStyle.chudn}>TIẾP TỤC</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default ResetPassword