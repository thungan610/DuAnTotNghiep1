import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Delivering = (prop) => {
    const { order } = prop.route.params;
    
    console.log('order', order);
    const transferOptions = [
        { label: "Tiết kiệm", ship: "8", note: "Đảm bảo nhận hàng trong vòng 60 phút kể từ khi nhận đơn" },
        { label: "Nhanh", ship: "10", note: "Đảm bảo nhận hàng trong vòng 45 phút kể từ khi nhận đơn" },
        { label: "Hoả tốc", ship: "20", note: "Đảm bảo nhận hàng trong vòng 30 phút kể từ khi nhận đơn" },
    ];

    const getShippingLabel = (ship) => {
        const option = transferOptions.find(option => option.ship === ship.toString());
        return option ? option.label : "Không xác định";
    };
    return (
        <View style={DeliveringStyle.container}>
            <View style={DeliveringStyle.headertop}>
                <TouchableOpacity onPress={() => prop.navigation.goBack()}>
                    <Image style={DeliveringStyle.backright} source={require('../../../src/assets/notifi/backright.png')} />
                </TouchableOpacity>
                <Text style={DeliveringStyle.title}>Đơn hàng</Text>
            </View>

            <ScrollView style={DeliveringStyle.body}>
                <View style={DeliveringStyle.banner}>
                    <Text style={DeliveringStyle.bannerText}>Đơn hàng đang giao</Text>
                </View>
                <View style={DeliveringStyle.header}>
                    <Text style={DeliveringStyle.headerText}>Thông tin vận chuyển</Text>
                    <Text style={DeliveringStyle.subText}>
                        {`${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).getHours()}h${new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).getMinutes()}, Ngày ${new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).getDate()}/${new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).getMonth() + 1}/${new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).getFullYear()}`}
                        , {getShippingLabel(order.ship)}
                    </Text>
                </View>


                <View style={DeliveringStyle.address}>
                    <Text style={DeliveringStyle.label}>Địa chỉ:</Text>
                    <Text>{`Số nhà ${order.address.houseNumber}, hẻm ${order.address.alley}, ${order.address.quarter}`}</Text>
                    <Text>{`${order.address.district}, ${order.address.city}, ${order.address.country}`}</Text>
                </View>

                {order.products.map((product, index) => (
                    <View key={index} style={DeliveringStyle.product}>
                        <Image source={{ uri: product.images[0] }} style={DeliveringStyle.productImage} />
                        <View style={DeliveringStyle.productInfo}>
                            <Text style={DeliveringStyle.productName}>{product.name}</Text>
                            <Text style={DeliveringStyle.category}>{product.category.category_name}</Text>
                            <Text style={DeliveringStyle.price}>{`${product.price}.000 đ`}</Text>
                        </View>
                    </View>
                ))}

       
                <View style={DeliveringStyle.paymentInfo}>
                    <Text style={DeliveringStyle.label}>Chi tiết thanh toán</Text>
                    <Text>Khuyến mãi: 0</Text>
                    <Text>{`Tổng tiền sản phẩm: ${order.totalOrder - order.ship}.000 đ`}</Text>
                    <Text>{`Tiền vận chuyển: ${order.ship}.000 đ`}</Text>
                    <Text style={DeliveringStyle.total}>{`Tổng thanh toán: ${order.totalOrder}.000 đ`}</Text>
                </View>
            </ScrollView>
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
        marginBottom: 40
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
