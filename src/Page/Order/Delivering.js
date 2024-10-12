import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';



const Delivering = (prop) => {

    return (
        <View style={DeliveringStyle.container}>
            <View style={DeliveringStyle.headertop}>
                <TouchableOpacity onPress={() => prop.navigation.navigate('Order')}>
                    <Image style={DeliveringStyle.backright} source={require('../../../src/assets/notifi/backright.png')} />
                </TouchableOpacity>
                <Text style={DeliveringStyle.title}>Đơn hàng</Text>
            </View>

            <View style={DeliveringStyle.body}>

                <View style={DeliveringStyle.banner}>
                    <Text style={DeliveringStyle.bannerText}>Đơn hàng đang giao</Text>
                </View>
                <View style={DeliveringStyle.header}>
                    <Text style={DeliveringStyle.headerText}>Thông tin vận chuyển</Text>
                    <Text style={DeliveringStyle.subText}>Ngày 19/9/2024, Nhanh</Text>
                </View>

                <View style={DeliveringStyle.address}>
                    <Text style={DeliveringStyle.label}>Địa chỉ:</Text>
                    <Text>Số nhà 123, hẻm 222, khu phố 4</Text>
                    <Text>Hiệp Thành, quận 12, Hồ Chí Minh</Text>
                </View>

                <View style={DeliveringStyle.product}>
                    <Image
                        source={require('../../assets/image/image1.png')}
                        style={DeliveringStyle.productImage}
                    />
                    <View style={DeliveringStyle.productInfo}>
                        <Text style={DeliveringStyle.productName}>Bắp cải trắng</Text>
                        <Text style={DeliveringStyle.category}>Rau củ</Text>
                        <Text style={DeliveringStyle.price}>$ 19.000đ</Text>
                    </View>
                </View>

                <View style={DeliveringStyle.paymentInfo}>
                    <Text style={DeliveringStyle.label}>Chi tiết thanh toán</Text>
                    <Text>Khuyến mãi: 0</Text>
                    <Text>Tổng tiền sản phẩm: 19.000</Text>
                    <Text>Tiền vận chuyển: 10.000</Text>
                    <Text style={DeliveringStyle.total}>Tổng thanh toán: 29.000</Text>
                </View>

            </View>




        </View>
    );
};

const DeliveringStyle = StyleSheet.create({
    // button: {
    //     fontSize: 14,
    //     color: '#FF7400',
    //     alignSelf: 'flex-end',
    //     padding: 10,


    // },
    banner: {
        padding: 10,
        backgroundColor: '#4CAF50',
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

export default Delivering;
