import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PayMethodStyle from '../Payment/PayMethod/style';
import AddProductStyle from './AddProductStyle';
import axiosInstance from '../api/AxiosInstance';
import { useFocusEffect } from '@react-navigation/native';

const CartItem = React.memo(({ item, toggleSelect, updateQuantity }) => {
    if (!item) return null;
    const [fixedPrice, setFixedPrice] = useState(item?.price || 0);
    const imageUri = Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : null;

    useEffect(() => {
        if (item) {
            setFixedPrice(item.price || 0);
        }
    }, [item]);

    return (
        <View style={AddProductStyle.itemContainer}>
            <TouchableOpacity onPress={() => toggleSelect(item.cart_id)}>
                <Image
                    source={item.selected ? require("../../../src/assets/check.png") : require("../../../src/assets/uncheck.png")}
                    style={AddProductStyle.checkbox}
                />
            </TouchableOpacity>
            <View style={AddProductStyle.borderImage}>
                <Image source={{ uri: imageUri }} style={AddProductStyle.image} />
            </View>
            <View style={AddProductStyle.itemDetails}>
                <Text style={AddProductStyle.itemName}>{item.name || 'Không có tên'}</Text>
                <Text style={AddProductStyle.itemCategory}>{item.category_name || 'Không có danh mục'}</Text>
                <View>
                    <Text style={{ fontSize: 14 }}>
                        {fixedPrice.toLocaleString()}.000đ
                    </Text>
                </View>
                <Text style={AddProductStyle.itemPrice}>
                    {(item.price && item.quantity) ?
                        ((item.price ?? 0) * (item.quantity ?? 1)).toLocaleString() : 'Không có giá hoặc số lượng'}
                    .000đ
                </Text>
            </View>
            <View style={AddProductStyle.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.cart_id, 'decrease')} style={AddProductStyle.quantityButton}>
                    <Text style={AddProductStyle.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={AddProductStyle.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.cart_id, 'increase')} style={AddProductStyle.quantityButton}>
                    <Text style={AddProductStyle.quantityText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

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

const AddProduct = ({ route, navigation }) => {
    const { data } = route.params || {};
    const [modalVisible, setModalVisible] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedCount, setSelectedCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const user = useSelector(state => state.user);
    const userId = user?.userData?._id;

    useFocusEffect(
        useCallback(() => {
            const fetchCart = async () => {
                try {
                    setLoading(true);
                    const response = await axiosInstance.get(`/carts/getcartbyiduser/${userId}`);
                    const cartData = Array.isArray(response) ? response : [];
                    const activeCartData = cartData.filter(cart => cart.status === 1);

                    if (activeCartData.length === 0) {
                        setCartItems([]);
                        setSelectedCount(0);
                        setTotalAmount(0);
                        return;
                    }

                    const productsData = activeCartData.flatMap(cart =>
                        cart.products.map(product => ({
                            cart_id: cart._id,
                            product_id: product._id,
                            name: product.name,
                            category_name: product.category?.category_name || 'Không có danh mục',
                            price: product.price,
                            quantity: product.quantity,
                            images: product.images,
                            selected: true,
                        }))
                    );
                    setCartItems(productsData);
                    updateTotal(productsData);
                } catch (error) {
                    setCartItems([]);
                    setSelectedCount(0);
                    setTotalAmount(0);
                } finally {
                    setLoading(false);
                }
            };

            fetchCart();
        }, [userId])
    );

    const toggleSelectProduct = (cart_id) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item =>
                item.cart_id === cart_id ? { ...item, selected: !item.selected } : item
            );
            updateTotal(updatedItems);
            return updatedItems;
        });
    };

    const updateQuantity = async (cart_id, action) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.cart_id === cart_id) {
                    const currentQuantity = item.quantity;
                    const newQuantity = action === 'increase' ? currentQuantity + 1 : Math.max(1, currentQuantity - 1);
                    updateQuantityInCart(cart_id, item.product_id, newQuantity);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            updateTotal(updatedItems);
            return updatedItems;
        });
    };

    const updateQuantityInCart = async (cart_id, product_id, quantity) => {
        try {
            await axiosInstance.put(`/carts/updateQuantity/${cart_id}/${product_id}`, { quantity });
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const deleteItemsFromCart = async (cart_id) => {
        try {
            await axiosInstance.delete(`/carts/deleteCart/${cart_id}`);
        } catch (error) {
            console.error('Error while deleting cart:', error);
            Alert.alert("Lỗi", "Không thể xóa sản phẩm, vui lòng thử lại.");
        }
    };

    const removeSelectedItems = async () => {
        const selectedItems = cartItems.filter(item => item.selected);
        if (selectedItems.length === 0) {
            Alert.alert("Thông báo", "Không có sản phẩm để xóa");
            return;
        }

        try {
            const deletePromises = selectedItems.map(item => deleteItemsFromCart(item.cart_id));
            await Promise.all(deletePromises);

            const remainingItems = cartItems.filter(item => !item.selected);
            setCartItems(remainingItems);
            updateTotal(remainingItems);
            setModalVisible(false);
            Alert.alert("Thông báo", "Xóa sản phẩm thành công");
        } catch (error) {
            Alert.alert("Lỗi", "Có lỗi xảy ra khi xóa sản phẩm.");
        }
    };

    const updateTotal = (items) => {
        const selectedItems = items.filter(item => item.selected);
        setSelectedCount(selectedItems.length);
        setTotalAmount(selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0));
    };

    const confirmDelete = () => {
        const selectedItems = cartItems.filter(item => item.selected);
        if (selectedItems.length === 0) {
            Alert.alert('Thông báo', 'Chưa chọn sản phẩm để xóa');
        } else {
            setModalVisible(true);
        }
    };

    const handlePayment = async () => {
        const selectedCartIds = cartItems
            .filter(item => item.selected)
            .map(item => item.cart_id);

        if (selectedCartIds.length > 0) {
            await AsyncStorage.setItem('selectedCartIds', JSON.stringify(selectedCartIds));
            navigation.navigate('NextPayment', { cartIds: selectedCartIds });
        } else {
            Alert.alert('Thông báo', 'Chưa chọn sản phẩm để thanh toán');
        }
    };

    return (
        <View style={AddProductStyle.container}>
            <View style={AddProductStyle.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../../../src/assets/notifi/backright.png")} />
                </TouchableOpacity>
                <Text style={AddProductStyle.title}>Giỏ hàng</Text>
            </View>
            <View style={AddProductStyle.content}>
                {loading ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (
                    <FlatList
                        data={cartItems}
                        renderItem={({ item }) => (
                            <CartItem item={item} toggleSelect={toggleSelectProduct} updateQuantity={updateQuantity} />
                        )}
                        keyExtractor={item => item.cart_id}
                    />
                )}
            </View>
            <View style={AddProductStyle.footer}>
                <TouchableOpacity onPress={confirmDelete} style={AddProductStyle.deleteButton}>
                    <Text style={AddProductStyle.deleteText}>Xóa</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePayment} style={AddProductStyle.payButton}>
                    <Text style={AddProductStyle.payText}>Thanh toán ({selectedCount})</Text>
                </TouchableOpacity>
                <Text style={AddProductStyle.totalAmount}>{totalAmount.toLocaleString()}.000đ</Text>
            </View>
            <ConfirmationModal
                visible={modalVisible}
                onConfirm={removeSelectedItems}
                onCancel={() => setModalVisible(false)}
            />
        </View>
    );
};

export default AddProduct;
