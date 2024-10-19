import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';



const Processing1 = (prop) => {
    
    return (
        <View style={ProcessingStyle.container}>
            <View style={ProcessingStyle.headertop}>
                <TouchableOpacity onPress={() => prop.navigation.goBack()}>
                    <Image style={ProcessingStyle.backright} source={require('../../../src/assets/notifi/backright.png')} />
                </TouchableOpacity>
                <Text style={ProcessingStyle.title}>Đơn hàng</Text>
            </View>
            <View style={ProcessingStyle.body}>

                <View style={ProcessingStyle.banner}>
                    <Text style={ProcessingStyle.bannerText}>Đơn hàng đang xử lý</Text>
                </View>
                <View style={ProcessingStyle.header}>
                    <Text style={ProcessingStyle.headerText}>Thông tin vận chuyển</Text>
                    <Text style={ProcessingStyle.subText}>17h00, Ngày 19/9/2024, Nhanh</Text>
                </View>

                <View style={ProcessingStyle.address}>
                    <Text style={ProcessingStyle.label}>Địa chỉ:</Text>
                    <Text>Số nhà 123, hẻm 222, khu phố 4</Text>
                    <Text>Hiệp Thành, quận 12, Hồ Chí Minh</Text>
                </View>

                <View style={ProcessingStyle.product}>
                    <Image
                        source={require('../../assets/image/image1.png')}
                        style={ProcessingStyle.productImage}
                    />
                    <View style={ProcessingStyle.productInfo}>
                        <Text style={ProcessingStyle.productName}>Bắp cải trắng</Text>
                        <Text style={ProcessingStyle.category}>Rau củ</Text>
                        <Text style={ProcessingStyle.price}>$ 19.000đ</Text>
                    </View>
                </View>

                

                <View style={ProcessingStyle.paymentInfo}>
                    <Text style={ProcessingStyle.label}>Chi tiết thanh toán</Text>
                    <Text>Khuyến mãi: 0</Text>
                    <Text>Tổng tiền sản phẩm: 19.000</Text>
                    <Text>Tiền vận chuyển: 10.000</Text>
                    <Text style={ProcessingStyle.total}>Tổng thanh toán: 29.000</Text>
                </View>

                <TouchableOpacity onPress={() => prop.navigation.navigate('ProductCancel')} style={ProcessingStyle.cancelButton}>
                    <Text style={ProcessingStyle.cancelButtonText}>Hủy đơn</Text>
                </TouchableOpacity>
            </View>
        </View> 
    );
};

const ProcessingStyle = StyleSheet.create({
    banner: {
        padding: 10,
        backgroundColor: '#FF7400',
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
        paddingLeft: 10,

    },
    productImage: {
        width: 20,
        height: 20,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#37C5DF'
    },
    productInfo: {
        justifyContent: 'center',
        flexDirection:'row',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft:'10'
    },
    category: {
        color: '#777',
        marginVertical: 2,
        marginLeft:10
    },
    price: {
        color: '#000',
        marginLeft:10
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

export default Processing1;
