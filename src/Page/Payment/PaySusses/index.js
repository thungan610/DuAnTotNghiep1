import React, {useEffect} from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import PaySussesStyle from "./style"
import PayMethodStyle from "../PayMethod/style"
const PaySusses = (prop) => {
    const { navigation } = prop
    const HandNav = () => {
        setTimeout(() => {
            navigation.navigate('BottomNav');
        }, 2000); 
    };
    
    useEffect(() => {
        HandNav();
    }, []);
    return (
        <View style={PaySussesStyle.container}>
            
            <View style={PaySussesStyle.body}>
                <Image source={require('../../../assets/notifi/PaySusses.png')} />
                <TouchableOpacity>
                    <Text style={PaySussesStyle.text}>Thanh toán thành công</Text>
                </TouchableOpacity>
            </View>
            <View style={[PayMethodStyle.ViewSuss, { padding: 20 }]}>
            </View>
        </View>
    )
}

export default PaySusses