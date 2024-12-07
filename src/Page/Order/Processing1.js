import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Processing1 = (prop) => {
    const { order } = prop.route.params;
    console.log('order', order);
    if (!order.createdAt) {
        order.createdAt = new Date(); // Gán ngày giờ hiện tại
    }

    const orderCreatedAt = new Date(order.createdAt).toLocaleString();
    const orderDate = new Date(order.date).toLocaleString();

    console.log("Ngày giờ đơn hàng:", orderDate);

    const transferOptions = [
        { label: "Tiết kiệm", ship: "8000", note: "Đảm bảo nhận hàng trong vòng 60 phút kể từ khi nhận đơn", time: "60" },
        { label: "Nhanh", ship: "10000", note: "Đảm bảo nhận hàng trong vòng 45 phút kể từ khi nhận đơn", time: "45" },
        { label: "Hoả tốc", ship: "20000", note: "Đảm bảo nhận hàng trong vòng 30 phút kể từ khi nhận đơn", time: "30" },
    ];
    const selectedOption = transferOptions.find(option => option.ship === order.ship);


    const getShippingLabel = (shipIndex) => {
        if (shipIndex < 1 || shipIndex > transferOptions.length) {
            console.warn(`Không tìm thấy nhãn vận chuyển cho chỉ số ship: ${shipIndex}`);
            return "Không xác định";
        }
        const option = transferOptions[shipIndex - 1];
        return option ? option.ship : "Không xác định";
    };
    const getShippingTime = (shipIndex) => {
        if (shipIndex < 1 || shipIndex > transferOptions.length) {
            return "Không xác định";
        }
        const option = transferOptions[shipIndex - 1];
        return option ? option.time : "Không xác định";
    }

    const orderShipIndex = parseInt(order.ship, 10);
    const shippingTime = getShippingTime(orderShipIndex);
    return (
        <View style={ProcessingStyle.container}>
            <View style={ProcessingStyle.headertop}>
                <TouchableOpacity onPress={() => prop.navigation.goBack()}>
                    <Image style={ProcessingStyle.backright} source={require('../../../src/assets/notifi/backright.png')} />
                </TouchableOpacity>
                <Text style={ProcessingStyle.title}>Đơn hàng</Text>
            </View>

            <ScrollView style={ProcessingStyle.body}>
                <View style={ProcessingStyle.banner}>
                    <Text style={ProcessingStyle.bannerText}>Đơn hàng đang xử lý</Text>
                </View>
                <View style={ProcessingStyle.header}>
                    <Text style={ProcessingStyle.headerText}>Thông tin vận chuyển</Text>
                    <Text style={ProcessingStyle.subText}>
                        {'Thời gian đặt hàng ' + orderDate}
                        {'\n'}
                        {'Thời gian giao hàng dự kiến: ' + shippingTime + ' phút'}
                    </Text>
                </View>

                <View style={ProcessingStyle.address}>
                    <Text style={ProcessingStyle.label}>Địa chỉ:</Text>
                    <Text>{`Số nhà ${order.address.houseNumber}, hẻm ${order.address.alley}, ${order.address.quarter}`}</Text>
                    <Text>{`${order.address.district}, ${order.address.city}, ${order.address.country}`}</Text>
                </View>

                {order.products.map((product, index) => (
                    <View key={index} style={ProcessingStyle.product}>
                        <Image source={{ uri: product.images[0] }} style={ProcessingStyle.productImage} />
                        <View style={ProcessingStyle.productInfo}>
                            <Text style={ProcessingStyle.productName}>{product.name}</Text>
                            <Text style={ProcessingStyle.category}>{product.category.category_name}</Text>
                            <Text style={ProcessingStyle.price}>{`${product.price.toLocaleString()} đ`}</Text>
                        </View>
                    </View>
                ))}

                <View style={ProcessingStyle.paymentInfo}>
                    <Text style={ProcessingStyle.label}>Chi tiết thanh toán</Text>
                    <Text>{`Khuyến mãi: ${order?.sale[0]?.discountAmount.toLocaleString()} đ`}</Text>
                    <Text>{`Tổng tiền sản phẩm: ${order.totalOrder.toLocaleString()}đ`}</Text>
                    <Text>{`Tiền vận chuyển: ${Number(getShippingLabel(order.ship)).toLocaleString()} đ`}</Text>

                    <Text style={ProcessingStyle.total}>{`Tổng thanh toán: ${order.totalOrder.toLocaleString()}đ`}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => prop.navigation.navigate('ProductCancel', { order: order })}
                    style={ProcessingStyle.cancelButton}
                >
                    <Text style={ProcessingStyle.cancelButtonText}>Hủy đơn</Text>
                </TouchableOpacity>
            </ScrollView>
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
        paddingLeft: 10,
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
        flexDirection: 'column',
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    category: {
        color: '#777',
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

export default Processing1;
