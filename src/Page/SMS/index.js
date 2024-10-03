import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SmsStyle from './style'

const SMS = () => {
    const phoneNumber = "0329492562"; // Thay bằng số điện thoại thật
    const [code, setCode] = useState(["", "", "", ""]); // Lưu trữ mã SMS nhập vào

    const handleChange = (text, index) => {
        let newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
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
                        style={SmsStyle.input}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        maxLength={1}
                        keyboardType="number-pad"
                    />
                ))}
            </View>

            <TouchableOpacity style={SmsStyle.button}>
                <Text style={SmsStyle.buttonText}>Xác nhận</Text>
            </TouchableOpacity>

            <Image style={SmsStyle.gocduoi} source={require("../../../src/assets/gocduoi.png")} />
        </View>
    )
}

export default SMS;