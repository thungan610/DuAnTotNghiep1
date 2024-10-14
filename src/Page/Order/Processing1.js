import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';



const Processing1 = ({ route, prop }) => {
    const { order } = route.params;
    const tabs = ['Chờ xác nhận', 'Đang giao', 'Đã nhận', 'Đã hủy'];
    
    const [selectedTabs, setSelectedTabs] = useState(0);
    const { width, height } = Dimensions.get('window');

    const handleCancelOrder = () => {
        Alert.alert("Hủy đơn", "Bạn có chắc muốn hủy đơn hàng?", [
            { text: "Không", style: "cancel" },
            { text: "Đồng ý", onPress: () => console.log("Đã hủy đơn hàng") },
        ]);
    };

    return (
        <View style={styles.container}>
            {/* <View style={styles.headertop}>
                <Image style={styles.backright} source={require('../../../src/assets/notifi/backright.png')} />
                <Text style={styles.title}>Đơn hàng</Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.TabsContainer}
            >
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.tabsButton, selectedTabs === index && styles.selectedTabsButton]}
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
            </ScrollView> */}

            <View style={styles.body}>

                <View style={styles.banner}>
                    <Text style={styles.bannerText}>Đơn hàng đang xử lý</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Thông tin vận chuyển</Text>
                    <Text style={styles.subText}>Ngày 19/9/2024, Nhanh</Text>
                </View>

                <View style={styles.address}>
                    <Text style={styles.label}>Địa chỉ:</Text>
                    <Text>Số nhà 123, hẻm 222, khu phố 4</Text>
                    <Text>Hiệp Thành, quận 12, Hồ Chí Minh</Text>
                </View>

                <View style={styles.product}>
                    <Image
                        source={require('../../assets/image/image1.png')} 
                        style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                        <Text style={styles.productName}>Bắp cải trắng</Text>
                        <Text style={styles.category}>Rau củ</Text>
                        <Text style={styles.price}>$ 19.000đ</Text>
                    </View>
                </View>

                <View style={styles.paymentInfo}>
                    <Text style={styles.label}>Chi tiết thanh toán</Text>
                    <Text>Khuyến mãi: 0</Text>
                    <Text>Tổng tiền sản phẩm: 19.000</Text>
                    <Text>Tiền vận chuyển: 10.000</Text>
                    <Text style={styles.total}>Tổng thanh toán: 29.000</Text>
                </View>

                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelOrder}>
                    <Text style={styles.cancelButtonText}>Hủy đơn</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // button: {
    //     fontSize: 14,
    //     color: '#FF7400',
    //     alignSelf: 'flex-end',
    //     padding: 10,
        

    // },
    banner: {
        padding: 10,
        backgroundColor: '#FF7400',
        height:45,
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
        width:80
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
        paddingLeft:10
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderWidth:1,
        borderRadius:5,
        backgroundColor:'#37C5DF'
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

export default Processing1;
