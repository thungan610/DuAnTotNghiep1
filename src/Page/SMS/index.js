import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import SmsStyle from './style';
import axios from 'axios';

const SMS = ({ prop, route }) => {
    const { phoneNumber } = route.params; // Nhận số điện thoại từ params
    const [code, setCode] = useState(["", "", "", ""]);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [timeLeft, setTimeLeft] = useState(60); // Thời gian còn lại là 60 giây

    useEffect(() => {
        if (timeLeft === 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleChange = (text, index) => {
        let newCode = [...code];

        if (text && !isNaN(text)) {
            newCode[index] = text;
            setCode(newCode);

            if (index < 3) {
                setTimeout(() => {
                    if (inputRefs[index + 1].current) {
                        inputRefs[index + 1].current.focus();
                    }
                }, 100);
            }
        } else if (text === "") {
            newCode[index] = "";
            setCode(newCode);

            if (index > 0) {
                setTimeout(() => {
                    if (inputRefs[index - 1].current) {
                        inputRefs[index - 1].current.focus();
                    }
                }, 100);
            }
        }
    };

    const handleConfirm = async () => {
        if (code.some(digit => digit === "")) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ mã xác nhận!");
            return;
        }
    
        if (timeLeft <= 0) {
            Alert.alert("Thông báo", "Mã xác nhận đã hết hạn. Vui lòng yêu cầu mã mới.");
            return;
        }
    
        const inputCode = code.join(''); // Kết hợp các chữ số thành một chuỗi
    
        try {
            const response = await axios.post('https://api-h89c.onrender.com/users/register', { phone: phoneNumber, verificationCode: inputCode });
            if (response.data.success) {
                Alert.alert("Thông báo", response.data.message, [
                    {
                        text: 'OK',
                        onPress: () => prop.navigation.navigate('Registration_successful'),
                    },
                ]);
            } else {
                Alert.alert("Thông báo", response.data.message);
            }
        } catch (error) {
            Alert.alert("Thông báo", "Xác nhận thất bại: " + (error.response ? error.response.data.message : error.message));
        }
    };
    
    return (
        <View style={SmsStyle.container}>
            <Image style={SmsStyle.goctren} source={require("../../../src/assets/goctren.png")} />

            <Text style={SmsStyle.txtdau}>Nhập mã từ SMS của bạn</Text>
            <Text style={SmsStyle.txtgiua}>Chúng tôi đã gửi mã đến</Text>
            <View style={SmsStyle.alltxtcuoi}>
                <Text style={SmsStyle.txtchusdt}>số điện thoại: </Text>
                <Text style={SmsStyle.txtsdt}>{phoneNumber}</Text>
            </View>

            <Text style={{
                marginTop:10,
                marginBottom:10
            }}>
                {timeLeft} giây còn lại
            </Text>

            <View style={SmsStyle.oinput}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={inputRefs[index]}
                        style={SmsStyle.input}
                        value={digit || ""}
                        onChangeText={(text) => handleChange(text, index)}
                        maxLength={1}
                        keyboardType="number-pad"
                    />
                ))}
            </View>

            <TouchableOpacity onPress={handleConfirm} style={SmsStyle.button}>
                <Text style={SmsStyle.buttonText}>Xác nhận</Text>
            </TouchableOpacity>

            <Image style={SmsStyle.gocduoi} source={require("../../../src/assets/gocduoi.png")} />
        </View>
    );
};

export default SMS;
