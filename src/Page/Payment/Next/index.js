import React, { useEffect } from "react";
import { View, Text } from "react-native";

const NextPayment = ({ navigation, route }) => {
    const { cartIds } = route.params || {};
    console.log('cartIds', cartIds);
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Payment', { cartIds });
        }, 1500);
        return () => clearTimeout(timer);
    }, [navigation, cartIds]);

    return (
        <View style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{
                flexDirection: 'column',
            }}>
                <Text style={{
                    fontSize: 26,
                    color: 'black',
                    fontWeight: 'bold',
                }}>Địa chỉ có thể thay đổi </Text>
                <Text style={{
                    fontSize: 26,
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}>khi thanh toán!!! </Text>
            </View>
        </View>
    );
}

export default NextPayment;