import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const NewNotifi = ({ navigation }) => {
    return (
        <View style={NewnotifiStyle.container}>
            <View style={NewnotifiStyle.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={NewnotifiStyle.iconBack} source={require("../../assets/notifi/backright.png")} />
                </TouchableOpacity>
                <Text style={NewnotifiStyle.tieude}>Thông báo</Text>
                <Text />
            </View>

            <View style={NewnotifiStyle.body}>  
                <Text style={NewnotifiStyle.chu}>Hiện chưa có thông báo!!!!</Text>
            </View>
        </View>
    );
};

export default NewNotifi;

const NewnotifiStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconBack: {
        width: 34,
        height: 35,
        tintColor: "black",
    },
    tieude: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        fontFamily: "Poppins"
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    chu: {
        color: '#8B8B8B',
        fontSize: 20
    }
});
