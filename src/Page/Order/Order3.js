import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const Order3 = () => {
    const [selectedTabs, setSelectedTabs] = useState(0);
    const { width, height } = Dimensions.get('window');

    const tabs = ['Chờ xác nhận', 'Đang giao', 'Đã nhận', 'Đã hủy'];

    const orders = [
        {
            id: 1,
            name: 'Bắp cải trắng',
            quantity: 1,
            price: 29000,
            image: require('../../../src/assets/image/image1.png')
        },
        {
            id: 1,
            name: 'Bắp cải trắng',
            quantity: 1,
            price: 29000,
            image: require('../../../src/assets/image/image1.png')
        },
    ];

    return (
        <View style={WaitconfirmedStyle.container}>
            <View style={WaitconfirmedStyle.header}>
                <Image style={WaitconfirmedStyle.backright} source={require('../../../src/assets/notifi/backright.png')} />
                <Text style={WaitconfirmedStyle.title}>Đơn hàng</Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={WaitconfirmedStyle.TabsContainer}
            >
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[WaitconfirmedStyle.tabsButton, selectedTabs === index && WaitconfirmedStyle.selectedTabsButton]}
                        onPress={() => setSelectedTabs(index)}
                    >
                        <Text style={{
                            fontSize: 16,
                            fontWeight: selectedTabs === index ? 'bold' : 'normal',
                            textDecorationLine: selectedTabs === index ? 'underline' : 'none',
                            marginHorizontal: 8,
                            marginTop: 7,
                            color: 'black',
                            textAlign: 'center',
                            marginRight: 12
                        }}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView style={WaitconfirmedStyle.orderContainer}>
                {orders.map(order => (

                    <View key={order.id} style={WaitconfirmedStyle.orderCard}>
                        <View style={WaitconfirmedStyle.body}>
                            <View style={WaitconfirmedStyle.borderimage}>
                                <Image source={order.image} style={WaitconfirmedStyle.image} />
                            </View>

                            <View style={WaitconfirmedStyle.orderInfo}>
                                <Text style={WaitconfirmedStyle.orderName}>{order.name}</Text>
                                <Text style={WaitconfirmedStyle.orderQuantity}>SL: {order.quantity}</Text>
                                <Text style={WaitconfirmedStyle.orderPrice}>Tổng tiền: {order.price.toLocaleString('vi-VN')}đ</Text>
                            </View>
                        </View>


                        <View style={WaitconfirmedStyle.actionsContainer}>
                            <Text style={WaitconfirmedStyle.text}>Hoàn thành</Text>
                            <View style={WaitconfirmedStyle.banner}>
                                <TouchableOpacity style={WaitconfirmedStyle.actionButton}>
                                    <Text style={WaitconfirmedStyle.actionText}>Mua lại</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={WaitconfirmedStyle.actionButtonOrange}>
                                    <Text style={WaitconfirmedStyle.actionTextOrange}>Đánh giá</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const WaitconfirmedStyle = StyleSheet.create({
    body:{
        flexDirection: 'row',
    },
    text: {
        justifyContent: 'flex-start',
        color: '#1976D2'
    },
    banner: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    container: {
        padding: 20,
    },
    header: {
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
    orderCard: {
        marginTop: 14,
        padding: 8,
        borderColor: '#BBAFAF',
        borderWidth: 1,
        borderRadius: 8,
    },
    borderimage: {
        borderRadius: 10,
        backgroundColor: '#73D6E9',
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginLeft: 14
    },
    orderInfo: {
        marginLeft: 16,
        flex: 1
    },
    orderName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    orderQuantity: {
        fontSize: 14,
        color: '#555',
    },
    orderPrice: {
        fontSize: 14,
        color: '#FF3434',
    },
    actionsContainer: {

        marginTop: 8,
    },
    actionButton: {
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 5,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginHorizontal: 4,
    },
    actionButtonOrange: {
        borderWidth: 1,
        borderColor: '#FFA500',
        borderRadius: 5,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginHorizontal: 4,
    },
    actionText: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    actionTextOrange: {
        color: '#FFA500',
        fontWeight: 'bold',
    },
});

export default Order3;
