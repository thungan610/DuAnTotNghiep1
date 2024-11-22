import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import PaymentStyle from "./style";
import VoucherStyle from "./style";
import AddAdressStyle from "../AddAdress/style";
import PayMethodStyle from "../PayMethod/style";

const VoucherData = [
    {
        id: 1,
        voucher: "Giảm 15.000đ",
        price: "15",
        Dieukien: "Cho hoá đơn từ 80.000đ",
        time: "Vô thời hạn",
    },
    {
        id: 2,
        voucher: "Giảm 10%",
        price: "10%",
        Dieukien: "Cho hoá đơn này 100.000đ",
        time: "Từ 00h-23h ngày 24 tháng 12 ngày lễ Noel",
    }
];

const Voucher = (prop) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handlePress = (index) => {
        const selectedVoucher = VoucherData[index];
        const minOrderValue = parseFloat(selectedVoucher.Dieukien.match(/\d+/)[0]);
        if (prop.route.params.totalPrice >= minOrderValue) {
            setSelectedIndex(index);
            prop.navigation.navigate("Payment", { selectedVoucher });
        } else {
            Alert.alert("Thông báo", `Tổng tiền sản phẩm phải từ ${minOrderValue.toLocaleString()}.000 đ để áp dụng khuyến mãi này.`);
        }
    };

    const BackRight = () => {
        prop.navigation.goBack();
    };

    return (
        <View style={VoucherStyle.container}>
            <View style={[AddAdressStyle.header, { padding: 20 }]}>
                <TouchableOpacity onPress={BackRight}>
                    <Image style={AddAdressStyle.backright} source={require("../../../assets/notifi/backright.png")} />
                </TouchableOpacity>
                <Text style={AddAdressStyle.title}>Khuyến mãi</Text>
                <Text />
            </View>
            <View style={VoucherStyle.ViewAdd}>
                <TextInput
                    placeholder="Nhập mã khuyến mãi"
                    style={VoucherStyle.input}
                />
                <TouchableOpacity style={VoucherStyle.button}>
                    <Text style={VoucherStyle.buttonText}>ÁP DỤNG</Text>
                </TouchableOpacity>
            </View>

            {VoucherData.map((option, index) => (
                <View style={VoucherStyle.bodyMain} key={index}>
                    <TouchableOpacity
                        onPress={() => handlePress(index)}
                        style={[VoucherStyle.body,
                        selectedIndex === index ? styles.selectedButton : styles.unselectedButton]}
                    >
                        <Text style={VoucherStyle.title}>{option.voucher}</Text>
                        <Text style={VoucherStyle.Dieukien}>{option.Dieukien}</Text>
                        <Text style={VoucherStyle.time}>{option.time}</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <View style={VoucherStyle.ViewSuss}>
                <TouchableOpacity onPress={BackRight} style={PayMethodStyle.BtnSuss}>
                    <Text style={PayMethodStyle.txtSuss}>ĐỒNG Ý</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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

export default Voucher;