import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useRef } from 'react'
import SmsStyle from './style'
import { useNavigation } from '@react-navigation/native';

const SMS = (prop) => {
    const phoneNumber = "0329492562";
    const navigation = useNavigation();
    const [code, setCode] = useState(["", "", "", ""]);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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
        } else {
            newCode[index] = text;
            setCode(newCode);
        }
    };
    const handleConfirm = () => {
        if (code.some(digit => digit === "")) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ mã xác nhận!");
            return;
        }

        // Thực hiện xác nhận mã (có thể gọi API hoặc xử lý tiếp theo)
        Alert.alert("Thông báo", "Mã xác nhận thành công!", [
            {
                text:'OK',
                onPress: () => prop.navigation.navigate('Registration_successful'),
            },
        ]);
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

            {/* 4 ô nhập mã SMS */}
            <View style={SmsStyle.oinput}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={inputRefs[index]}
                        style={SmsStyle.input}
                        value={digit}
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
    )
}
export default SMS;