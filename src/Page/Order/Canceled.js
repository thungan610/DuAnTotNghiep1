import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Canceled = (prop) => {

    return (
        <View style={CanceledStyle.container}>
            <View style={CanceledStyle.headertop}>
                <TouchableOpacity onPress={() => prop.navigation.goBack()}>
                    <Image style={CanceledStyle.backright} source={require('../../../src/assets/notifi/backright.png')} />
                </TouchableOpacity>
                <Text style={CanceledStyle.title}>Đơn hàng</Text>
            </View>

            <View style={CanceledStyle.body}>

                <View style={CanceledStyle.banner}>
                    <Text style={CanceledStyle.bannerText}>Đơn hàng đã hủy</Text>
                </View>
                <View style={CanceledStyle.header}>
                    <Text style={CanceledStyle.headerText}>Thông tin vận chuyển</Text>
                    <Text style={CanceledStyle.subText}>17h00, Ngày 19/9/2024, Nhanh</Text>
                </View>

                <View style={CanceledStyle.address}>
                    <Text style={CanceledStyle.label}>Địa chỉ:</Text>
                    <Text>Số nhà 123, hẻm 222, khu phố 4</Text>
                    <Text>Hiệp Thành, quận 12, Hồ Chí Minh</Text>
                </View>

                <View style={CanceledStyle.product}>
                    <Image
                        source={require('../../assets/image/image1.png')}
                        style={CanceledStyle.productImage}
                    />
                    <View style={CanceledStyle.productInfo}>
                        <Text style={CanceledStyle.productName}>Bắp cải trắng</Text>
                        <Text style={CanceledStyle.category}>Rau củ</Text>
                        <Text style={CanceledStyle.price}>$ 19.000đ</Text>
                    </View>
                </View>

                <View style={CanceledStyle.paymentInfo}>
                    <Text style={CanceledStyle.label}>Chi tiết thanh toán</Text>
                    <Text>Khuyến mãi: 0</Text>
                    <Text>Tổng tiền sản phẩm: 19.000</Text>
                    <Text>Tiền vận chuyển: 10.000</Text>
                    <Text style={CanceledStyle.total}>Tổng thanh toán: 29.000</Text>
                </View>

                <TouchableOpacity onPress={() => prop.navigation.navigate('Payment')} style={CanceledStyle.cancelButton}>
                    <Text style={CanceledStyle.cancelButtonText}>Mua lại</Text>
                </TouchableOpacity>
            </View>




        </View>
    );
};

const CanceledStyle = StyleSheet.create({
    banner: {
        padding: 10,
        backgroundColor: '#FF3434',
        height: 45,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,

    },
    bannerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 20,
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: '#FF6600',
        borderRadius: 5,
        paddingVertical: 8,
        alignItems: 'center',
        margin: 10,
        alignSelf: 'flex-end',
        width: 80
    },
    cancelButtonText: {
        color: '#FF6600',
        fontWeight: 'bold',
        fontSize: 14,
    },
    body: {
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 20,
    },
    headertop: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '68%'
    },
    backright: {
        width: 28,
        height: 28,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'black',
        alignContent: 'center'
    },
    container: {
        padding: 20,
    },
    header: {
        marginBottom: 10,
        marginTop: 20,
        paddingLeft: 20,


    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    subText: {
        fontSize: 14,
        color: '#777',
    },
    address: {
        marginVertical: 10,
        paddingLeft: 20
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    product: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingLeft: 10
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#37C5DF'
    },
    productInfo: {
        justifyContent: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    category: {
        color: '#777',
        marginVertical: 2,
    },
    price: {
        color: '#000',
    },
    paymentInfo: {
        marginVertical: 10,
        paddingLeft: 20
    },
    total: {
        fontWeight: 'bold',
        marginTop: 5,
    },
    TabsContainer: {
        marginTop: 10,
    },
    tabsButton: {
        marginTop: 10,
    },
    selectedTabsButton: {
        borderBottomWidth: 2,

    },
});

export default Canceled;
