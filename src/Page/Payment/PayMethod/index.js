import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import PayMethodStyle from "./style";
import { useNavigation } from '@react-navigation/native';
import AddAdressStyle from "../AddAdress/style";

const PayMethod = () => {
   const navigation = useNavigation();

    const BackRight = () => {
        navigation.goBack()
    }
    const [selectedMethod, setSelectedMethod] = useState(null); //Để xử lý trạng thái chọn hoặc không

    return (
        <View style={PayMethodStyle.container}>
            <View style={PayMethodStyle.container1}>
                <View style={AddAdressStyle.header}>
                    <TouchableOpacity onPress={BackRight}>
                        <Image style={AddAdressStyle.backright} source={require("../../../assets/notifi/backright.png")} />
                    </TouchableOpacity>
                    <Text style={AddAdressStyle.title}>Phương thức thanh toán</Text>
                    <Text />
                </View>

                <View style={PayMethodStyle.body}>
                    <TouchableOpacity
                        style={PayMethodStyle.ViewCheck}
                        onPress={() => setSelectedMethod('zalopay')} // Hiện dầu tick khi nhấn Zalo Pay
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
                        onPress={() => setSelectedMethod('cash')}
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
                <TouchableOpacity onPress={BackRight} style={PayMethodStyle.BtnSuss}>
                    <Text style={PayMethodStyle.txtSuss}>ĐỒNG Ý</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PayMethod;
