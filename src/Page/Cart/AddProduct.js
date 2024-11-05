import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import PayMethodStyle from '../Payment/PayMethod/style';
import AddProductStyle from './AddProductStyle';
import AxiosInstance from "../api/AxiosInstance";

const CartItem = ({ item, toggleSelect, updateQuantity }) => {
    const imageUri = item.images && item.images.length > 0 ? item.images[0] : null;

    return (
        <View style={AddProductStyle.itemContainer}>
            <TouchableOpacity onPress={() => toggleSelect(item.id)}>
                <Image
                    source={item.selected ? require("../../../src/assets/check.png") : require("../../../src/assets/uncheck.png")}
                    style={AddProductStyle.checkbox}
                />
            </TouchableOpacity>
            <View style={AddProductStyle.borderImage}>
                <Image source={{ uri: imageUri }} style={AddProductStyle.image} />
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
};

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

const AddProduct = ({ route }) => {
    const { data } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (data) {
            setCartItems(prevItems => [
                ...prevItems,
                {
                    ...data,
                    quantity: data.quantity || 1,
                    selected: false,
                },
            ]);
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
            (total, item) => total + (item.price * (item.quantity || 1)),
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
                    initialNumToRender={10}
                    maxToRenderPerBatch={5}
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

export default AddProduct;

