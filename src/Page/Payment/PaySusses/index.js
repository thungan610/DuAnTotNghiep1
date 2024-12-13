import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import PaySussesStyle from "./style";
import PayMethodStyle from "../PayMethod/style";
import { addNotification } from "../../Reducers/notificationSlice";
import Toast from "react-native-toast-message";

const PaySusses = ({ navigation }) => {
    const dispatch = useDispatch();

    const handlePaymentSuccess = () => {
        // Thêm thông báo vào Redux mà không cần kiểm tra lại sự tồn tại của thông báo
        dispatch(addNotification({
            id: Date.now(),
            title: "Thông báo",
            message: "Bạn đã đặt hàng thành công đơn hàng. 🎉",
        }));
        Toast.show({
            type: "success",
            text1: "Bạn có thông báo mới",
        });
    };

    const HandNav = () => {
        setTimeout(() => {
            navigation.navigate('Order');
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
