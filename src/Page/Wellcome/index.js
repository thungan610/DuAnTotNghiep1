import React, { useEffect } from "react"; // Thêm useEffect
import { View, Image } from "react-native";
import wellcomeStyle from "./style";
import { useNavigation } from '@react-navigation/native';

const Wellcome = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Login'); // Chuyển đến màn hình Login sau 3 giây
        }, 3000);

        return () => clearTimeout(timer); // Dọn dẹp timer khi component bị hủy
    }, [navigation]);

    return (
        <View style={wellcomeStyle.container}>
            <Image style={wellcomeStyle.goctren} source={require("../../../src/assets/goctren.png")} />
            <Image style={wellcomeStyle.phukien1} source={require("../../../src/assets/phukien1.png")} />
            <Image style={{
                position:'absolute',
                right:0,
                top:0
            }} source={require("../../../src/assets/phukien2.png")} />
            <Image style={wellcomeStyle.anhgiua} source={require("../../../src/assets/Logoshop.png")} />

            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}>
                <Image style={{marginBottom: 0}} source={require("../../../src/assets/phukien3.png")} />
                <Image style={{marginTop:-66}} source={require("../../../src/assets/phukien5.png")} />
            </View>

            <View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                flexDirection: 'column',
                alignItems: 'flex-end',

            }}>
                <Image source={require("../../../src/assets/phukien4.png")} />
                <Image source={require("../../../src/assets/gocduoi.png")} />
            </View>
        </View>
    );
};

export default Wellcome;
