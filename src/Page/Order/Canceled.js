import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../api/AxiosInstance';
import Toast from 'react-native-toast-message';

const Canceled = (prop) => {
    const { order } = prop.route.params;
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const userid = user?.userData?._id || 'default_id';

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
        <View style={CanceledStyle.container}>
            <View style={CanceledStyle.headertop}>
                <TouchableOpacity onPress={() => prop.navigation.goBack()}>
                    <Image style={CanceledStyle.backright} source={require('../../../src/assets/notifi/backright.png')} />
                </TouchableOpacity>
                <Text style={CanceledStyle.title}>Đơn hàng</Text>
            </View>

            <ScrollView style={CanceledStyle.body}>

                <View style={CanceledStyle.banner}>
                    <Text style={CanceledStyle.bannerText}>Đơn hàng đã hủy</Text>
                </View>
                <View style={CanceledStyle.header}>
                    <Text style={CanceledStyle.headerText}>Thông tin vận chuyển</Text>
                    <Text style={CanceledStyle.subText}>
                        {`${new Date().getHours()}h${new Date().getMinutes()}, Ngày ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}
                        , {getShippingLabel(order.ship)}
                    </Text>
                </View>


                <View style={CanceledStyle.address}>
                    <Text style={CanceledStyle.label}>Địa chỉ:</Text>
                    <Text>{`Số nhà ${order.address.houseNumber}, hẻm ${order.address.alley}, ${order.address.quarter}`}</Text>
                    <Text>{`${order.address.district}, ${order.address.city}, ${order.address.country}`}</Text>
                </View>

                {order.products.map((product, index) => (
                    <View key={index} style={CanceledStyle.product}>
                        <Image source={{ uri: product.images[0] }} style={CanceledStyle.productImage} />
                        <View style={CanceledStyle.productInfo}>
                            <Text style={CanceledStyle.productName}>{product.name}</Text>
                            <Text style={CanceledStyle.category}>{product.category.category_name}</Text>
                            <Text style={CanceledStyle.price}>{`${product.price}đ`}</Text>
                        </View>
                    </View>
                ))}


                <View style={CanceledStyle.paymentInfo}>
                    <Text style={CanceledStyle.label}>Chi tiết thanh toán</Text>
                    <Text>Khuyến mãi: 0</Text>
                    <Text>{`Tổng tiền sản phẩm: ${order.totalOrder - order.ship} đ`}</Text>
                    <Text>{`Tiền vận chuyển: ${order.ship}đ`}</Text>
                    <Text style={CanceledStyle.total}>{`Tổng thanh toán: ${order.totalOrder} đ`}</Text>
                </View>

                <TouchableOpacity onPress={addToCartHandler} style={CanceledStyle.cancelButton}>
                    <Text style={CanceledStyle.cancelButtonText}>Mua lại</Text>
                </TouchableOpacity>
            </ScrollView>
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

export default Canceled;
