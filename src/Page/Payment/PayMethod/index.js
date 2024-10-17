import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import PayMethodStyle from "./style";

const PayMethod = (prop) => {

    const [selectedMethod, setSelectedMethod] = useState(null); //Để xử lý trạng thái chọn hoặc không

    return (
        <View style={PayMethodStyle.container}>
            <View style={PayMethodStyle.container1}>
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between'
                }}>
                    <TouchableOpacity onPress={() => prop.navigation.navigate('Payment')}>
                        <Image style={PayMethodStyle.backright} source={require("../../../assets/notifi/backright.png")} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize:24,
                        fontWeight:'bold',
                        color:'black'
                    }}>Phương thức thanh toán</Text>
                    <Text />
                </View>

                <View style={PayMethodStyle.body}>
                    <TouchableOpacity
                        style={PayMethodStyle.ViewCheck}
                        onPress={() => prop.navigation.navigate('ZaloPay')}
                        accessible={true}
                        accessibilityLabel="Select Zalo Pay"
                    >
                        <Text style={PayMethodStyle.title}>Zalo Pay</Text>
                        <Image
                            style={PayMethodStyle.check}
                            source={selectedMethod === 'zalopay'  // Hiện lên khi tick Zalo Pay
                                ? require("../../../assets/notifi/Check_fill.png")
                                : require("../../../assets/notifi/check_emty.jpg")}
                        />
                    </TouchableOpacity>

                    <Text style={PayMethodStyle.line} />

                    <TouchableOpacity
                        style={PayMethodStyle.ViewCheck}
                        onPress={() => setSelectedMethod('payment')}
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
            <View style={[PayMethodStyle.ViewSuss]}>
                <TouchableOpacity onPress={() => prop.navigation.navigate('Payment')} style={PayMethodStyle.BtnSuss}>
                    <Text style={PayMethodStyle.txtSuss}>ĐỒNG Ý</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PayMethod;
