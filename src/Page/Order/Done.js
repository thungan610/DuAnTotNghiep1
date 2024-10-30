import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Done = (prop) => {

    return (
        <View style={DoneStyle.container}>
            <View style={DoneStyle.headertop}>
                <TouchableOpacity onPress={() => prop.navigation.goBack()}>
                    <Image style={DoneStyle.backright} source={require('../../../src/assets/notifi/backright.png')} />
                </TouchableOpacity>
                <Text style={DoneStyle.title}>Đơn hàng</Text>
            </View>

            <View style={DoneStyle.body}>

                <View style={DoneStyle.banner}>
                    <Text style={DoneStyle.bannerText}>Đơn hàng đã hoàn thành</Text>
                </View>
                <View style={DoneStyle.header}>
                    <Text style={DoneStyle.headerText}>Thông tin vận chuyển</Text>
                    <Text style={DoneStyle.subText}>17h00, Ngày 19/9/2024, Nhanh</Text>
                </View>

                <View style={DoneStyle.address}>
                    <Text style={DoneStyle.label}>Địa chỉ:</Text>
                    <Text>Số nhà 123, hẻm 222, khu phố 4</Text>
                    <Text>Hiệp Thành, quận 12, Hồ Chí Minh</Text>
                </View>

                <View style={DoneStyle.product}>
                    <Image
                        source={require('../../assets/image/image1.png')}
                        style={DoneStyle.productImage}
                    />
                    <View style={DoneStyle.productInfo}>
                        <Text style={DoneStyle.productName}>Bắp cải trắng</Text>
                        <Text style={DoneStyle.category}>Rau củ</Text>
                        <Text style={DoneStyle.price}>$ 19.000đ</Text>
                    </View>
                </View>

                <View style={DoneStyle.paymentInfo}>
                    <Text style={DoneStyle.label}>Chi tiết thanh toán</Text>
                    <Text>Khuyến mãi: 0</Text>
                    <Text>Tổng tiền sản phẩm: 19.000</Text>
                    <Text>Tiền vận chuyển: 10.000</Text>
                    <Text style={DoneStyle.total}>Tổng thanh toán: 29.000</Text>
                </View>

                <View style={DoneStyle.buttonContainer}>
                    <TouchableOpacity onPress={() => prop.navigation.navigate('BotChat')}>
                    <Text style={DoneStyle.text}>Tôi muốn hoàn trả?</Text>

                    </TouchableOpacity>
              <TouchableOpacity onPress={() => prop.navigation.navigate('Payment')} style={DoneStyle.buttonnhan}>
                <Text style={DoneStyle.buttonTextnhan}>Mua lại</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => prop.navigation.navigate('ProductReview')} style={DoneStyle.buttonhuy}>
                <Text style={DoneStyle.buttonTexthuy}>Đánh giá</Text>
              </TouchableOpacity>
            </View>

            </View>




        </View>
    );
};

const DoneStyle = StyleSheet.create({
    // button: {
    //     fontSize: 14,
    //     color: '#FF7400',
    //     alignSelf: 'flex-end',
    //     padding: 10,


    // },
    banner: {
        padding: 10,
        backgroundColor: '#27AAE1',
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
        height:450,
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
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end'
      },
      buttonnhan: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
        borderWidth: 1,
        width: 80,
        height: 34,
        borderColor: '#BBAFAF',
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonhuy: {
        backgroundColor: 'white',
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 5,
        width: 80,
        height: 34,
        borderColor: '#FF7400',
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonTextnhan: {
        color: 'black',
        fontSize: 16,
      },
      buttonTexthuy: {
        color: '#FF7400',
        fontSize: 16,
      },
      text:{
        color: 'red',
        marginTop:5,
        marginRight:55,
      }
});

export default Done;
