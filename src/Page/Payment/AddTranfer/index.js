import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AddTranferStyle from "./style";
import AddAdressStyle from "../AddAdress/style";
import PayMethodStyle from "../PayMethod/style";

const transferOptions = [
    { label: "Tiết kiệm", status: 1, price: "8000", note: "Đảm bảo nhận hàng trong vòng 60 phút kể từ khi nhận đơn" },
    { label: "Nhanh", status: 2, price: "10000", note: "Đảm bảo nhận hàng trong vòng 45 phút kể từ khi nhận đơn" },
    { label: "Hoả tốc", status: 3, price: "20000", note: "Đảm bảo nhận hàng trong vòng 30 phút kể từ khi nhận đơn" },
];

const AddTranfer = (prop) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const BackRight = () => {
        prop.navigation.goBack();
    };

    const handlePress = (index) => {
        setSelectedIndex(index);
    };

    const handleConfirm = () => {
        if (selectedIndex !== null) {
            const selectedOption = transferOptions[selectedIndex];
            prop.navigation.navigate("Payment", {
                selectedTransfer: selectedOption
            });
        }
    };

    return (
        <View style={AddTranferStyle.container}>
            <View style={[AddAdressStyle.header, { padding: 20 }]}>
                <TouchableOpacity style={{
                    position: 'absolute',
                    padding:20,
                    left: 0,
                    top: 0,
                }} onPress={BackRight}>
                    <Image
                        style={AddAdressStyle.backright}
                        source={require("../../../assets/notifi/backright.png")}
                    />
                </TouchableOpacity>
                <Text style={AddAdressStyle.title}>Phương thức vận chuyển</Text>
                <Text />
            </View>

            <View style={AddTranferStyle.body}>
                {transferOptions.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[AddTranferStyle.BtnPT, selectedIndex === index ? styles.selectedButton : styles.unselectedButton]}
                        onPress={() => handlePress(index)}
                    >
                        <View style={AddTranferStyle.ViewVC}>
                            <Text style={AddTranferStyle.txtVC}>{option.label}</Text>
                            <Text style={AddTranferStyle.txtVC}>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(option.price)}
                            </Text>
                        </View>
                        <Text style={AddTranferStyle.txtNote}>{option.note}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={[PayMethodStyle.ViewSuss, { padding: 20 }]}>
                <TouchableOpacity
                    onPress={handleConfirm}
                    style={PayMethodStyle.BtnSuss}
                    disabled={selectedIndex === null}
                >
                    <Text style={PayMethodStyle.txtSuss}>ĐỒNG Ý</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    selectedButton: {
        borderColor: "#27AAE1",
        borderWidth: 2,
        shadowColor: "#27AAE1",
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: "#E6F7FF",
    },
    unselectedButton: {
        borderColor: "#8B8B8B",
        borderWidth: 1,
        shadowColor: "#8B8B8B",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
        backgroundColor: "#FFFFFF",
    },
});

export default AddTranfer;
