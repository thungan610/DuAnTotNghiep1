import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import PaySussesStyle from "./style";

const PaySusses = (prop) => {
    const { navigation } = prop;

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('BottomNav'); 
        }, 3000);

        return () => clearTimeout(timer); 
    }, [navigation]);

    return (
        <View style={PaySussesStyle.container}>
            <View style={PaySussesStyle.body}>
                <Image source={require('../../../assets/notifi/PaySusses.png')} />
                <Text style={PaySussesStyle.text}>Đặt hàng thành công</Text>
            </View>
        </View>
    );
};

export default PaySusses;
