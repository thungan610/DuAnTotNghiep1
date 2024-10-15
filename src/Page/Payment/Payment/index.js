import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import PaymentStyle from "./style";
import AddAdressStyle from "../AddAdress/style";
import AddTranfer from "../AddTranfer";
const Payment = (prop) => {
    const BackRight = () => {
        prop.navigation.goBack()
    }
    const HandMethod = () => {
        prop.navigation.navigate('PayMethod')
    }
    const HandVoucher = () => {
        prop.navigation.navigate('Voucher')
    }
    const HandTransfer = () => {
        prop.navigation.navigate('AddTranfer')
    }
    const HandPaySuccess = () => {
        prop.navigation.navigate('PaySusses')
    }
    const BtnTabAddress = () => {
        prop.navigation.navigate('InsertAddress')
    }
    return (
        <ScrollView style={PaymentStyle.container}>
            <View style={[AddAdressStyle.header, PaymentStyle.Padding]}>
                <TouchableOpacity onPress={BackRight}>
                    <Image style={AddAdressStyle.backright} source={require("../../../assets/notifi/backright.png")} />
                </TouchableOpacity>
                <Text style={AddAdressStyle.title}>Thanh toán</Text>
                <Text />
            </View>
            <TouchableOpacity onPress={BtnTabAddress} style={[PaymentStyle.body, PaymentStyle.paddingHorizontal, PaymentStyle.paddingBottom]}>
                <Image style={PaymentStyle.imgmap} source={require("../../../assets/notifi/map.png")} />
                <View style={{marginRight:30}}>
                    <Text style={PaymentStyle.txtDC}>Địa chỉ nhận hàng</Text>
                    <Text style={PaymentStyle.txtLH}>Bé phát, <Text style={PaymentStyle.txtLH}>0329 999 999</Text></Text>
                    <Text style={PaymentStyle.txtLH}>Tân thới nhất, quận 12, Hồ Chí Minh</Text>
                </View>

                <Image source={require("../../../assets/notifi/expand_right.png")} />

            </TouchableOpacity>
            <Text style={PaymentStyle.Line} />
            <View style={[PaymentStyle.body, PaymentStyle.Padding]}>
                <View style={PaymentStyle.Viewimg}>
                    <Image style={PaymentStyle.img} source={require("../../../assets/image/image1.png")} />
                </View>
                <View>
                    <Text style={PaymentStyle.txtDC}>Bắp cải trắng</Text>
                    <Text style={PaymentStyle.txtLH}>Rau củ</Text>
                    <Text />
                    <View style={PaymentStyle.ViewPrice}>
                        <Image source={require("../../../assets/notifi/Dollar.png")} />
                        <Text style={PaymentStyle.txtPrice}>19.000đ</Text>
                    </View>
                </View>
                <View>
                    <Text style={PaymentStyle.txtLH}>SL: 1</Text>
                </View>
            </View>
            <TouchableOpacity onPress={HandTransfer} style={PaymentStyle.BtnTranfer}>
                <Text style={PaymentStyle.txtDC}>Phương thức vận chuyển (Nhấp để chọn)</Text>
                <View style={PaymentStyle.ViewTranfer}>
                    <Text style={PaymentStyle.txtPrice}>Nhanh</Text>
                    <Text style={PaymentStyle.txtPrice}>10.000đ</Text>
                </View>
                <Text style={PaymentStyle.txtLH}>Đảm bảo nhận hàng trong 2 tiếng kể từ khi nhận đơn</Text>
            </TouchableOpacity>

            <View style={PaymentStyle.ViewBodyContainer}>
                <View style={PaymentStyle.ViewBody}>
                    <Text style={PaymentStyle.txtDC}>Ghi chú:</Text>
                    <TextInput style={{
                        width: '100%',
                        height: 40,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 5,
                        marginLeft:5
                    }} 
                    placeholder="Để lại ghi chú" 
                    multiline 
                    numberOfLines={4} />
                </View>
                <Text style={PaymentStyle.Line} />
                <View style={PaymentStyle.ViewBody}>
                    <Text style={PaymentStyle.txtDC}>Tổng tiền sản phẩm:</Text>
                    <Text style={PaymentStyle.txtPrice}>19.000đ</Text>
                </View>
                <Text style={PaymentStyle.Line} />
                <View style={PaymentStyle.ViewBody}>
                    <Text style={PaymentStyle.txtDC}>Phương thúc thanh toán:</Text>
                    <TouchableOpacity onPress={HandMethod} style={PaymentStyle.btnThem}>
                        <Text style={PaymentStyle.txtDC}>Khi nhận hàng</Text>
                        <Image source={require("../../../assets/notifi/expand_right.png")} />
                    </TouchableOpacity>
                </View>
                <Text style={PaymentStyle.Line} />
                <View style={PaymentStyle.ViewBody}>
                    <Text style={PaymentStyle.txtDC}>Chọn khuyến mãi:</Text>
                    <TouchableOpacity onPress={HandVoucher} style={PaymentStyle.btnThem}>
                        <Text style={PaymentStyle.txtDC}>Nhấp vào để chọn</Text>
                        <Image source={require("../../../assets/notifi/expand_right.png")} />
                    </TouchableOpacity>
                </View>
                <Text style={PaymentStyle.Line} />
                <View>
                    <Text style={[PaymentStyle.txtDC, PaymentStyle.paddingHorizontal]}>Chi tiết thanh toán</Text>
                    <View style={[PaymentStyle.ViewBody, PaymentStyle.Height]}>
                        <Text style={PaymentStyle.txtDC1}>Khuyến mãi:</Text>
                        <Text style={PaymentStyle.txtPrice1}>0đ</Text>
                    </View>
                    <View style={[PaymentStyle.ViewBody, PaymentStyle.Height]}>
                        <Text style={PaymentStyle.txtDC1}>Tổng tiền sản phẩm:</Text>
                        <Text style={PaymentStyle.txtPrice1}>19.000đ</Text>
                    </View>
                    <View style={[PaymentStyle.ViewBody, PaymentStyle.Height]}>
                        <Text style={PaymentStyle.txtDC1}>Tiền vận chuyển:</Text>
                        <Text style={PaymentStyle.txtPrice1}>10.000đ</Text>
                    </View>
                    <View style={[PaymentStyle.ViewBody, PaymentStyle.Height]}>
                        <Text style={PaymentStyle.txtDC}>Tổng thanh toán:</Text>
                        <Text style={PaymentStyle.txtDC}>29.000đ</Text>
                    </View>
                </View>
                <Text style={[PaymentStyle.Line, PaymentStyle.maginButtom]} />
                <View style={PaymentStyle.ViewFooter}>
                    <View>
                        <Text style={PaymentStyle.txtDC1}>Tổng thanh toán:</Text>
                        <Text style={PaymentStyle.txtDC2}>29.000đ</Text>
                    </View>
                    <TouchableOpacity onPress={HandPaySuccess} style={PaymentStyle.btnSubmit}>
                        <Text style={PaymentStyle.txtBtn}>THANH TOÁN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )

}

export default Payment