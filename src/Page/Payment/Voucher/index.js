import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import VoucherStyle from "./style";
// import VoucherStyle from "../AddAdress/style";
// import VoucherStyle from "../PayMethod/style";
import axiosInstance from "../../api/AxiosInstance";

const Voucher = (prop) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [voucherData, setVoucherData] = useState([]);
    const { totalPrice } = prop.route.params || {};

    console.log('totalPrice', totalPrice);


    useEffect(() => {
        const getVoucherData = async () => {
            try {
                const voucherResponse = await axiosInstance.get("/sale/getSale");
                console.log("Dữ liệu trả về từ API:", voucherResponse.data);
                setVoucherData(voucherResponse.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        getVoucherData();
    }, []);

    const handlePress = (index) => {
        const selectedVoucher = voucherData[index];
        if (!selectedVoucher) {
            Alert.alert("Lỗi", "Voucher không hợp lệ.");
            return;
        }
        const minOrderValue = selectedVoucher.minOrderValue;

        const totalPrice = prop.route.params.totalPrice * 1000;

        if (totalPrice >= minOrderValue) {
            setSelectedIndex(index);
            prop.navigation.navigate("Payment", { selectedVoucher });
        } else {
            Alert.alert(
                "Thông báo",
                `Tổng tiền sản phẩm phải từ ${minOrderValue.toLocaleString()} đ để áp dụng khuyến mãi này.`
            );
        }
    };


    const BackRight = () => {
        prop.navigation.goBack();
    };

    return (
        <View style={VoucherStyle.container}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    width: '68%'
                }}>
                <TouchableOpacity onPress={BackRight}>
                    <Image source={require("../../../assets/notifi/backright.png")} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: 'black',
                    marginBottom:20
                }}>Khuyến mãi</Text>
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

            {voucherData.map((option, index) => (
                <View style={VoucherStyle.bodyMain} key={index}>
                    <TouchableOpacity
                        onPress={() => handlePress(index)}
                        style={[
                            VoucherStyle.body,
                            selectedIndex === index ? styles.selectedButton : styles.unselectedButton,
                        ]}
                    >
                        <Text style={VoucherStyle.title}>Giảm {option.discountAmount.toLocaleString()} đ</Text>
                        <Text style={VoucherStyle.title}>{option.title}</Text>
                        <Text style={VoucherStyle.minOrderValue}>
                            Cho hoá đơn từ {option.minOrderValue.toLocaleString()} đ
                        </Text>
                        <Text style={VoucherStyle.time}>
                            Hạn sử dụng: {new Date(option.expirationDate).toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}

            <View style={VoucherStyle.ViewSuss}>
                <TouchableOpacity onPress={BackRight} style={VoucherStyle.BtnSuss}>
                    <Text style={VoucherStyle.txtSuss}>ĐỒNG Ý</Text>
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
