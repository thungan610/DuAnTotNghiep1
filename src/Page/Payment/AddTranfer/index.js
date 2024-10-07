import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AddTranferStyle from "./style";
import AddAdressStyle from "../AddAdress/style";
import PayMethodStyle from "../PayMethod/style";
// Define the transfer options as a constant
const transferOptions = [
    { label: "Tiết kiệm", price: "8.000đ", note: "Đảm bảo nhận hàng trong vòng 60 phút kể từ khi nhận đơn" },
    { label: "Nhanh", price: "10.000đ", note: "Đảm bảo nhận hàng trong vòng 45 phút kể từ khi nhận đơn" },
    { label: "Hoả tốc", price: "20.000đ", note: "Đảm bảo nhận hàng trong vòng 30 phút kể từ khi nhận đơn" },
];

const AddTranfer = () => {
    const [selectedIndex, setSelectedIndex] = useState(null); // State to track selected button index

    // Handle button press
    const handlePress = (index) => {
        setSelectedIndex(index); // Set the selected index
    };

    return (
        <View style={AddTranferStyle.container}>
            <View style={[AddAdressStyle.header, { padding: 20 }]}>
                <Image style={AddAdressStyle.backright} source={require("../../../assets/notifi/backright.png")} />
                <Text style={AddAdressStyle.title}>Phương thức vận chuyển</Text>
                <Text />
            </View>
            {transferOptions.map((option, index) => ( // Map through options to create buttons
                <View style={AddTranferStyle.body} key={index}>
                    <TouchableOpacity
                        style={[
                            AddTranferStyle.BtnPT,
                            selectedIndex === index ? styles.selectedButton : styles.unselectedButton
                        ]}
                        onPress={() => handlePress(index)}
                    >
                        <View style={AddTranferStyle.ViewVC}>
                            <Text style={AddTranferStyle.txtVC}>{option.label}</Text>
                            <Text style={AddTranferStyle.txtVC}>{option.price}</Text>
                        </View>
                        <View>
                            <Text style={AddTranferStyle.txtNote}>{option.note}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
            <View style={[PayMethodStyle.ViewSuss, { padding: 20 }]}>
                <TouchableOpacity style={PayMethodStyle.BtnSuss}>
                    <Text style={PayMethodStyle.txtSuss}>ĐỒNG Ý</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Styles for selected and unselected buttons
const styles = StyleSheet.create({
    selectedButton: {
        borderColor: '#27AAE1',
        borderWidth: 2,
        shadowColor: '#27AAE1',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
    unselectedButton: {
        borderColor: '#8B8B8B',
        borderWidth: 1,
        shadowColor: '#8B8B8B',
    },
});

export default AddTranfer;
