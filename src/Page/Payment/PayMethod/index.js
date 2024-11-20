import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import PayMethodStyle from "./style";

const PayMethod = (prop) => {
    const [selectedMethod, setSelectedMethod] = useState(null); 

    return (
        <View style={PayMethodStyle.container}>
            <View style={PayMethodStyle.container1}>
                {/* Header */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity onPress={() => prop.navigation.goBack()}>
                        <Image
                            style={PayMethodStyle.backright}
                            source={require("../../../assets/notifi/backright.png")}
                        />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>
                        Phương thức thanh toán
                    </Text>
                    <Text />
                </View>

                {/* Body */}
                <View style={PayMethodStyle.body}>
                    <TouchableOpacity
                        style={PayMethodStyle.ViewCheck}
                        onPress={() => setSelectedMethod('payos')} 
                        accessible={true}
                        accessibilityLabel="Select Payos"
                    >
                        <Text style={PayMethodStyle.title}>Payos</Text>
                        <Image
                            style={PayMethodStyle.check}
                            source={selectedMethod === 'payos'
                                ? require("../../../assets/notifi/Check_fill.png")
                                : require("../../../assets/notifi/check_emty.jpg")}
                        />
                    </TouchableOpacity>

                    <Text style={PayMethodStyle.line} />
                    <TouchableOpacity
                        style={PayMethodStyle.ViewCheck}
                        onPress={() => setSelectedMethod('cash')} // Cập nhật trạng thái
                        accessible={true}
                        accessibilityLabel="Select Cash on Delivery"
                    >
                        <Text style={PayMethodStyle.title}>Thanh toán khi nhận hàng</Text>
                        <Image
                            style={PayMethodStyle.check}
                            source={selectedMethod === 'cash'
                                ? require("../../../assets/notifi/Check_fill.png")
                                : require("../../../assets/notifi/check_emty.jpg")}
                        />
                    </TouchableOpacity>

                    <Text style={PayMethodStyle.line} />
                </View>
            </View>

            {/* Footer */}
            <View style={PayMethodStyle.ViewSuss}>
                <TouchableOpacity
                    onPress={() => prop.navigation.navigate('Payment', { selectedMethod })} 
                    style={PayMethodStyle.BtnSuss}
                    disabled={!selectedMethod} 
                >
                    <Text style={PayMethodStyle.txtSuss}>ĐỒNG Ý</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PayMethod;
