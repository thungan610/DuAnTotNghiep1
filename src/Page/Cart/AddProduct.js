import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PayMethodStyle from '../Payment/PayMethod/style';
const AddProduct = (prop) => {
    const { navigation } = prop;
    const HandTT = () => {
        navigation.navigate('NextPayment')
    }
    const [cartItems, setCartItems] = useState([
        { id: '1', name: 'Bắp cải trắng', category: 'Rau củ', price: 19000, quantity: 1, selected: false, image: require('../../../src/assets/image/image1.png') },
        { id: '2', name: 'Sườn non', category: 'Thịt', price: 45000, quantity: 1, selected: false, image: require('../../../src/assets/image/image4.png') },
        { id: '3', name: 'Khoai tây', category: 'Rau củ', price: 30000, quantity: 1, selected: false, image: require('../../../src/assets/image/image3.png') },
    ]);

    const toggleSelectProduct = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        );
    };

    const removeSelectedItems = () => {
        setCartItems(prevItems => prevItems.filter(item => !item.selected));
    };

    // Xóa tất cả sản phẩm trong giỏ hàng
    const clearCart = () => {
        setCartItems([]);
    };

    // Tăng hoặc giảm số lượng
    const updateQuantity = (id, action) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
                    if (newQuantity < 1) {
                        return null; // Hoặc có thể xóa item
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(Boolean) // Xóa các phần tử null
        );
    };

    const renderItem = ({ item }) => (
        <View style={AddProductStyle.itemContainer}>
            <TouchableOpacity onPress={() => toggleSelectProduct(item.id)}>
                <Image
                    source={item.selected ? require("../../../src/assets/check.png") : require("../../../src/assets/uncheck.png")}
                    style={AddProductStyle.checkbox} // Tạo một style cho checkbox
                />
            </TouchableOpacity>
            <View style={AddProductStyle.borderImage}>
                <Image source={item.image} style={AddProductStyle.image} />
            </View>
            <View style={AddProductStyle.itemDetails}>
                <Text style={AddProductStyle.itemName}>{item.name}</Text>
                <Text style={AddProductStyle.itemCategory}>{item.category}</Text>
                <Text style={AddProductStyle.itemPrice}>${item.price.toLocaleString()}đ</Text>
            </View>
            <View style={AddProductStyle.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 'decrease')} style={AddProductStyle.quantityButton}>
                    <Text style={AddProductStyle.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={AddProductStyle.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 'increase')} style={AddProductStyle.quantityButton}>
                    <Text style={AddProductStyle.quantityText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={AddProductStyle.container}>
            <View style={AddProductStyle.header}>
                <Text style={AddProductStyle.title}>Giỏ hàng</Text>
                <TouchableOpacity style={AddProductStyle.iconTrash} onPress={removeSelectedItems}>
                    <Image source={require("../../../src/assets/Trash.png")} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={AddProductStyle.list}
            />
            <View>
                <View style={AddProductStyle.total}>
                    <Text style={AddProductStyle.totalPrice}>Tổng cộng:</Text>
                    <Text style={AddProductStyle.totalPrice}>{cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toLocaleString()}đ</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={HandTT} style={PayMethodStyle.BtnSuss}>
                        <Text style={PayMethodStyle.txtSuss}>THANH TOÁN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


const AddProductStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: 20
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
        textAlign: 'center'
    },
    iconTrash: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 15,
    },
    borderImage: {
        width: 72,
        height: 72,
        borderRadius: 10,
        borderColor: '#73D6E9',
        backgroundColor: '#73D6E9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 56,
        height: 56,
        // marginRight: 16,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 16
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    itemCategory: {
        fontSize: 14,
        color: '#C7C7C7',
        marginVertical: 4,
    },
    itemPrice: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantity: {
        marginHorizontal: 2,
        fontSize: 18,
    },
    checkbox: {
        width: 18,
        height: 18,
        marginRight: 10,
    },
    total:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    totalPrice:{
        fontSize:24,
        fontWeight:'bold',
        color:'black',
        marginBottom:10
    }
});

export default AddProduct;
