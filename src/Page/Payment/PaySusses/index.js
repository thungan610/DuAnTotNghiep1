import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import PaySussesStyle from "./style";
import PayMethodStyle from "../PayMethod/style";
import { addNotification } from "../../Reducers/notificationSlice";

const PaySusses = ({ navigation }) => {
    const dispatch = useDispatch();

    const handlePaymentSuccess = () => {
        // Thêm thông báo vào Redux mà không cần kiểm tra lại sự tồn tại của thông báo
        dispatch(addNotification({
            id: Date.now(),
            title: "Đặt hàng thành công",
            message: "Bạn đã đặt hàng thành công đơn hàng.",
        }));
    };

    const HandNav = () => {
        setTimeout(() => {
            navigation.navigate('BottomNav');
        }, 2000);
    };

    useEffect(() => {
        handlePaymentSuccess(); 
        HandNav();
    }, []); 

    return (
        <View style={PaySussesStyle.container}>
            <View style={PaySussesStyle.body}>
                <Image source={require('../../../assets/notifi/PaySusses.png')} />
                <TouchableOpacity>
                    <Text style={PaySussesStyle.text}>Đặt hàng thành công</Text>
                </TouchableOpacity>
            </View>

            <View style={[PayMethodStyle.ViewSuss, { padding: 20 }]} />
        </View>
    );
};

export default PaySusses;
