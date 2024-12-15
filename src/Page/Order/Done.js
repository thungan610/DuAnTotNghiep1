import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axiosInstance from '../api/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const Done = (prop) => {
    const { order } = prop.route.params;
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const userid = user?.userData?._id || 'default_id';
    const orderDate = new Date(order.date).toLocaleString();

    const transferOptions = [
        { label: "Tiết kiệm", ship: "8000", note: "Đảm bảo nhận hàng trong vòng 60 phút kể từ khi nhận đơn", time: "60" },
        { label: "Nhanh", ship: "10000", note: "Đảm bảo nhận hàng trong vòng 45 phút kể từ khi nhận đơn", time: "45" },
        { label: "Hoả tốc", ship: "20000", note: "Đảm bảo nhận hàng trong vòng 30 phút kể từ khi nhận đơn", time: "30" },
    ];

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

    const discountAmount = order?.sale[0]?.discountAmount || 0; // Khuyến mãi
    const shippingCost = Number(getShippingLabel(order.ship)); // Tiền vận chuyển
    const totalPayment = order.totalOrder - discountAmount + shippingCost; // Tính tổng thanh toán


    const addToCartHandler = async () => {
        const productsToAdd = order.products.map(product => ({
            id: product._id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            category: product.category,
            images: product.images,
            selected: true,
        }));

        try {
            const response = await axiosInstance.post('/carts/addCart_App', {
                user: userid,
                products: productsToAdd,
            });

            if (response.data.error) {

            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Thông báo',
                    text2: 'Thêm sản phẩm thành công!',
                    visibilityTime: 2000,
                    position: 'top'
                });
                prop.navigation.navigate('AddProduct');

                productsToAdd.forEach(product => dispatch(addToCart(product)));
            }
        } catch (error) {

        }
    };


    return (
        <View style={DoneStyle.container}>
            <View style={DoneStyle.headertop}>
                <TouchableOpacity onPress={() => prop.navigation.goBack()}>
                    <Image style={DoneStyle.backright} source={require('../../../src/assets/notifi/backright.png')} />
                </TouchableOpacity>
                <Text style={DoneStyle.title}>Đơn hàng</Text>
            </View>

            <ScrollView style={DoneStyle.body}>

                <View style={DoneStyle.banner}>
                    <Text style={DoneStyle.bannerText}>Đơn hàng đã hoàn thành</Text>
                </View>
                <View style={DoneStyle.header}>
                    <Text style={DoneStyle.headerText}>Thông tin vận chuyển</Text>
                    <Text style={DoneStyle.subText}>
                        {'Thời gian đặt hàng ' + orderDate}
                        {'\n'}
                        <Text style={{ color: 'red' }}>Đã nhận được hàng</Text>
                    </Text>

                </View>


                <View style={DoneStyle.address}>
                    <Text style={DoneStyle.label}>Địa chỉ:</Text>
                    <Text>{`Số nhà ${order.address.houseNumber}, hẻm ${order.address.alley}, ${order.address.quarter}`}</Text>
                    <Text>{`${order.address.district}, ${order.address.city}, ${order.address.country}`}</Text>
                </View>

                {order.products.map((product, index) => (
                    <View key={index} style={DoneStyle.product}>
                        <Image source={{ uri: product.images[0] }} style={DoneStyle.productImage} />
                        <View style={DoneStyle.productInfo}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={DoneStyle.productName}>{product.name}</Text>
                                <Text style={DoneStyle.quantity}>   Số lượng: {product.quantity}</Text>
                            </View>
                            <Text style={DoneStyle.category}>{product.category.category_name}</Text>
                            <Text style={DoneStyle.price}>
                                {`${(product.price * product.quantity).toLocaleString()} đ`}
                            </Text>

                        </View>
                    </View>
                ))}


                <View style={DoneStyle.paymentInfo}>
                    <Text style={DoneStyle.label}>Chi tiết thanh toán</Text>
                    <Text>{`Khuyến mãi: ${order?.sale[0]?.discountAmount.toLocaleString()} đ`}</Text>
                    <Text>{`Tổng tiền sản phẩm: ${order.totalOrder.toLocaleString()}đ`}</Text>
                    <Text>{`Tiền vận chuyển: ${Number(getShippingLabel(order.ship)).toLocaleString()} đ`}</Text>
                    <Text style={DoneStyle.total}>{`Tổng thanh toán: ${totalPayment.toLocaleString()} đ`}</Text>
                </View>
                <View style={DoneStyle.buttonContainer}>
                    <TouchableOpacity onPress={() => prop.navigation.navigate('BotChat')}>
                        <Text style={DoneStyle.text}>Tôi muốn hoàn trả?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addToCartHandler} style={DoneStyle.buttonnhan}>
                        <Text style={DoneStyle.buttonTextnhan}>Mua lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => prop.navigation.navigate('ProductReview')} style={DoneStyle.buttonhuy}>
                        <Text style={DoneStyle.buttonTexthuy}>Đánh giá</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

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
        marginTop: 20,
        borderWidth: 1,
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
    buttonContainer: {
        flexDirection: 'row',
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
    text: {
        color: 'red',
        marginTop: 5,
        marginRight: 20,
    }
});

export default Done;
