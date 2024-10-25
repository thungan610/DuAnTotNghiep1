import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import PayMethodStyle from '../Payment/PayMethod/style';

const CartItem = ({ item, toggleSelect, updateQuantity }) => (
    <View style={AddProductStyle.itemContainer}>
        <TouchableOpacity onPress={() => toggleSelect(item.id)}>
            <Image
                source={item.selected ? require("../../../src/assets/check.png") : require("../../../src/assets/uncheck.png")}
                style={AddProductStyle.checkbox}
            />
        </TouchableOpacity>
        <View style={AddProductStyle.borderImage}>
            <Image source={item.image} style={AddProductStyle.image} />
        </View>
        <View style={AddProductStyle.itemDetails}>
            <Text style={AddProductStyle.itemName}>{item.name}</Text>
            <Text style={AddProductStyle.itemCategory}>{item.category}</Text>
            <Text style={AddProductStyle.itemPrice}>{(item.price ?? 0).toLocaleString()}.000đ</Text>
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

const ConfirmationModal = ({ visible, onConfirm, onCancel }) => (
    <Modal transparent={true} animationType="slide" visible={visible}>
        <View style={AddProductStyle.modalContainer}>
            <View style={AddProductStyle.modalContent}>
                <Image source={require("../../../src/assets/error.png")} style={{ height: 40, width: 40 }} />
                <Text style={AddProductStyle.modalTitle}>Xác nhận xóa sản phẩm</Text>
                <View style={AddProductStyle.modalButtons}>
                    <TouchableOpacity onPress={onCancel} style={AddProductStyle.cancelButton}>
                        <Text style={AddProductStyle.buttonText}>Quay lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onConfirm} style={AddProductStyle.confirmButton}>
                        <Text style={AddProductStyle.buttonText}>Xóa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);

const AddProduct = ({ prop, route }) => {
    const product = route.params;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [itemsToDelete, setItemsToDelete] = useState([]);

    const { id, name, price, image, quantity, category } = route.params;

    const [cartItems, setCartItems] = useState(route.params ? [{
        id: id,
        name: name,
        price: price || 0, 
        category: category || '', 
        image: image,
        quantity: quantity || 1, 
        selected: false 
    }] : []);

    const toggleSelectProduct = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item => item.id === id ? { ...item, selected: !item.selected } : item)
        );
    };

    const updateQuantity = async (id, action) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    const newQuantity = action === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const removeSelectedItems = () => {
        setCartItems(prevItems => prevItems.filter(item => !item.selected));
        setModalVisible(false);
    };

    const confirmDelete = () => {
        const selectedItems = cartItems.filter(item => item.selected);
        if (selectedItems.length === 0) {
            Alert.alert("Thông báo", "Không có sản phẩm để xóa");
        } else {
            setItemsToDelete(selectedItems);
            setModalVisible(true);
        }
    };

    const totalAmount = cartItems
    .filter(item => item.selected)
    .reduce((total, item) => total + (item.price ?? 0) * (item.quantity ?? 0), 0);

    // const handleCheckout = async () => {
    //     if (!isLoggedIn) {
    //         prop.navigation.navigate('Login_required');
    //     } else {
    //         try {
    //             await updateCart(cartItems);
    //             prop.navigation.navigate('NextPayment');
    //         } catch (error) {
    //             Alert.alert("Lỗi", error.message);
    //         }
    //     }
    // };

    // const updateCart = async (cartItems) => {
    //     try {
    //         const response = await fetch('https://yourapi.com/update-cart', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ items: cartItems }),
    //         });
    
    //         if (!response.ok) {
    //             const textResponse = await response.text(); 
    //             console.error('Error response:', textResponse); 
    //             throw new Error('Cập nhật giỏ hàng không thành công');
    //         }
    
    //         return await response.json(); 
    //     } catch (error) {
    //         console.error('Error fetching cart items:', error);
    //         throw error; 
    //     }
    // };
    

    return (
        <View style={AddProductStyle.container}>
            <View style={AddProductStyle.header}>
                <Text style={AddProductStyle.title}>Giỏ hàng</Text>
                <TouchableOpacity style={AddProductStyle.iconTrash} onPress={confirmDelete}>
                    <Image source={require("../../../src/assets/Trash.png")} />
                </TouchableOpacity>
            </View>
 
                <View style={{ width:'100%', height:'100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#666' }}>Hiện chưa có sản phẩm!!!</Text>
                </View>

                <FlatList
                    data={cartItems}
                    renderItem={({ item }) => (
                        <CartItem item={item} toggleSelect={toggleSelectProduct} updateQuantity={updateQuantity} />
                    )}
                    keyExtractor={item => item._id ? item._id.toString() : Math.random().toString()}
                    contentContainerStyle={AddProductStyle.list}
                />

            {totalAmount > 0 && (
                <View>
                    <View style={AddProductStyle.total}>
                        <Text style={AddProductStyle.totalPrice}>Tổng cộng:</Text>
                        <Text style={AddProductStyle.totalPrice}>{totalAmount.toLocaleString()}đ</Text>
                    </View>
                    <TouchableOpacity style={PayMethodStyle.BtnSuss}>
                        <Text style={PayMethodStyle.txtSuss}>THANH TOÁN</Text>
                    </TouchableOpacity>
                </View>
            )}
            <ConfirmationModal
                visible={modalVisible}
                onConfirm={removeSelectedItems}
                onCancel={() => setModalVisible(false)}
            />
        </View>
    );
};

const AddProductStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
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
        alignItems: 'center',
    },
    image: {
        width: 56,
        height: 56,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 16,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
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
        fontWeight: 'bold',
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
    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0,5 )'
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: '#75D379',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    confirmButton: {
        backgroundColor: '#FF7B7B',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default AddProduct;
