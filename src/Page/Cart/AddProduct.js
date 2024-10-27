import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import PayMethodStyle from '../Payment/PayMethod/style';
import axios from 'axios';

const CartItem = ({ item, toggleSelect, updateQuantity }) => (
    <View style={AddProductStyle.itemContainer}>
        <TouchableOpacity onPress={() => toggleSelect(item.id)}>
            <Image
                source={item.selected ? require("../../../src/assets/check.png") : require("../../../src/assets/uncheck.png")}
                style={AddProductStyle.checkbox}
            />
        </TouchableOpacity>
        <View style={AddProductStyle.borderImage}>
            <Image source={{ uri: item.image }} style={AddProductStyle.image} />
        </View>
        <View style={AddProductStyle.itemDetails}>
            <Text style={AddProductStyle.itemName}>{item.name}</Text>
            <Text style={AddProductStyle.itemCategory}>{item.category}</Text>
            <Text style={AddProductStyle.itemPrice}>
                {((item.price ?? 0) * (item.quantity ?? 1)).toLocaleString()}.000đ
            </Text>
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
    const { data } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (data) {

            axios.post('https://api-h89c.onrender.com/carts/addCart_App', {
                name: data.name,
                price: data.price,
                category: data.category,
                image: data.image,
                quantity: data.quantity || 1,
            })

                .then(response => {
                    setCartItems(prevItems => [
                        ...prevItems,
                        {
                            ...data,
                            quantity: data.quantity || 1,
                            selected: false,
                        },
                    ]);
                })
                .catch(error => {
                    if (error.response) {
                        // Thông báo lỗi cho người dùng
                        Alert.alert("Thông báo", "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
                        console.error('Error data:', error.response.data);
                        console.error('Error status:', error.response.status);
                        console.error('Error headers:', error.response.headers);
                    } else if (error.request) {
                        console.error('Error request:', error.request);
                    } else {
                        console.error('Error message:', error.message);
                    }
                });
        }
    }, [data]);


    const toggleSelectProduct = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item => item.id === id ? { ...item, selected: !item.selected } : item)
        );
    }; 

    const updateQuantity = (id, action) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    const newQuantity = action === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
                    return {
                        ...item,
                        quantity: newQuantity,
                    };
                }
                return item;
            })
        );
    };


    useEffect(() => {
        const calculatedTotal = cartItems.reduce(
            (total, item) => total + (item.price * (item.quantity || 1)), // Tính tổng giá
            0
        );
        setTotalAmount(calculatedTotal);
    }, [cartItems]);




    const removeSelectedItems = () => {
        setCartItems(prevItems => prevItems.filter(item => !item.selected));
        setModalVisible(false);
    };
    
    const confirmDelete = () => {
        const selectedItems = cartItems.filter(item => item.selected);
        if (selectedItems.length === 0) {
            Alert.alert("Thông báo", "Không có sản phẩm để xóa");
        } else {
            setModalVisible(true);
        }
    };

    return (
        <View style={AddProductStyle.container}>
            <View style={AddProductStyle.header}>
                <Text style={AddProductStyle.title}>Giỏ hàng</Text>
                <TouchableOpacity style={AddProductStyle.iconTrash} onPress={confirmDelete}>
                    <Image source={require("../../../src/assets/Trash.png")} />
                </TouchableOpacity>
            </View>

            {cartItems.length === 0 ? (
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#666' }}>Hiện chưa có sản phẩm!!!</Text>
                </View>
            ) : (
                <FlatList
                    data={cartItems}
                    renderItem={({ item }) => (
                        <CartItem item={item} toggleSelect={toggleSelectProduct} updateQuantity={updateQuantity} />
                    )}
                    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                    contentContainerStyle={AddProductStyle.list}
                    initialNumToRender={10} // Số lượng item render ban đầu
                    maxToRenderPerBatch={5} // Số lượng item tối đa render mỗi lần
                />


            )}

            {totalAmount > 0 && (
                <View>
                    <View style={AddProductStyle.total}>
                        <Text style={AddProductStyle.totalPrice}>Tổng cộng:</Text>
                        <Text style={AddProductStyle.totalPrice}>{totalAmount.toLocaleString()}.000đ</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
        alignItems: 'center',
    },
    confirmButton: {
        flex: 1,
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AddProduct;
