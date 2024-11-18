import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PayMethodStyle from '../Payment/PayMethod/style';
import AddProductStyle from './AddProductStyle';
import { useFocusEffect } from '@react-navigation/native';
import AxiosInstance from '../api/AxiosInstance';

const CartItem = React.memo(({ item, toggleSelect, updateQuantity }) => {
    if (!item) return null;
    const imageUri = Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : null;

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

    // Ensure the user selector is correctly fetching the user data
    const user = useSelector(state => state.user);
    const userId = user?.userData?._id || 'default_id';

    const dispatch = useDispatch();

    const getCart = async (userId) => {
        try {
            // Kiểm tra tính hợp lệ của userId
            if (!userId || userId === 'default_id') {
                console.error('Lỗi: userId không hợp lệ hoặc chưa được xác định');
                throw new Error("userId is required");
            }
            // Gửi yêu cầu GET tới API để lấy giỏ hàng
            const response = await AxiosInstance.get(`/carts/getCarts?userId=${userId}`);
            const cartData = response.data; 
            console.log('cartData', cartData);
            // Ensure you extract data from the response
    
            if (cartData.length === 0) {
                console.warn('Giỏ hàng trống!');
            }
    
            // Cập nhật state với dữ liệu giỏ hàng đã lấy
            setCartItems(cartData);
            return cartData;
        } catch (error) {
            console.error('Lỗi khi lấy giỏ hàng:', error);
            throw error;
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const loadCartFromAPI = async () => {
                try {
                    // Pass userId to getCart
                    const cartData = await getCart(userId);
                    if (Array.isArray(cartData)) {
                        setCartItems(cartData);
                        const selectedCount = cartData.filter(item => item.selected).length;
                        setSelectedCount(selectedCount);

                        const total = cartData
                            .filter(item => item.selected)
                            .reduce((total, item) => total + (item.price * item.quantity), 0);
                        setTotalAmount(total);
                    } else {
                        console.error('Dữ liệu trả về không phải mảng');
                    }
                } catch (error) {
                    console.error("Lỗi khi tải dữ liệu giỏ hàng:", error);
                }
            };

            loadCartFromAPI();
        }, [userId]) // Add userId as a dependency
    );

    useEffect(() => {
        const saveCartToStorage = async () => {
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
            } catch (error) {
                console.error('Lỗi khi lưu giỏ hàng vào AsyncStorage:', error);
            }
        };

        saveCartToStorage();
    }, [cartItems]);

    const toggleSelectProduct = (cart_id) => {
        console.log('Toggle select product cart_id:', cart_id);
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.cart_id === cart_id) { // Sử dụng cart_id thay vì id
                    const newItem = { ...item, selected: !item.selected };
                    return newItem;
                }
                return item;
            });

            const newSelectedCount = updatedItems.filter(item => item.selected).length;
            setSelectedCount(newSelectedCount);

            const newTotal = updatedItems
                .filter(item => item.selected)
                .reduce((total, item) => total + (item.price * item.quantity), 0);
            setTotalAmount(newTotal);

            console.log('Updated cart items:', updatedItems);
            return updatedItems;
        });
    };



    useEffect(() => {
        const total = cartItems
            .filter(item => item.selected)
            .reduce((total, item) => total + (item.price * item.quantity), 0);
        setTotalAmount(total);
    }, [cartItems]);

    const updateQuantity = (cart_id, action) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.cart_id === cart_id) {
                    const currentQuantity = item.quantity;
                    let newQuantity = currentQuantity;

                    newQuantity = action === 'increase' ? currentQuantity + 1 : Math.max(1, currentQuantity - 1);

                    console.log(`New quantity for product cart_id: ${cart_id} is ${newQuantity}`);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };
    const deleteItemsFromCart = async (cart_id) => {
        try {
            if (!cart_id) {
                console.error('Invalid cart_id:', cart_id);
                return;
            }
            const response = await AxiosInstance.delete(`/carts/deleteCart/${cart_id}`);
            console.log('Deleted cart:', response.data);
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Server error:', error.response.data);
                Alert.alert('Lỗi', `Lỗi khi xóa sản phẩm: ${error.response.data.message}`);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    const removeSelectedItems = async () => {
        const selectedItems = cartItems.filter(item => item.selected);
        console.log('Selected items to remove:', selectedItems);
        if (selectedItems.length === 0) {
            Alert.alert("Thông báo", "Không có sản phẩm để xóa");
        } else {
            try {
                for (const item of selectedItems) {
                    const response = await deleteItemsFromCart(item.cart_id);
                    if (response && response.success) {
                        setCartItems(prevItems => prevItems.filter(cartItem => cartItem.cart_id !== item.cart_id));
                    }
                }
                setModalVisible(false);
                Alert.alert('Thông báo', 'Xóa sản phẩm thành công');
                const updatedCartItems = await getCart();
                setCartItems(updatedCartItems);

            } catch (error) {
                Alert.alert("Lỗi", "Có lỗi xảy ra khi xóa sản phẩm.");
            }
        }
    };

    const confirmDelete = () => {
        const selectedItems = cartItems.filter(item => item.selected);
        console.log('Items to confirm delete:', selectedItems);
        if (selectedItems.length === 0) {
            Alert.alert('Thông báo', 'Chưa chọn sản phẩm để xóa');
        } else {
            setModalVisible(true);
        }
    };

    return (
        <View style={AddProductStyle.container}>
            <View style={AddProductStyle.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../../../src/assets/notifi/backright.png")} />
                </TouchableOpacity>
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
                keyExtractor={(item) => `${item._id}`} // Use item._id as the key
            />
            )}
            {totalAmount > 0 && (
                <View style={{
                    borderColor: '#27AAE1',
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 10,
                }}>
                    <View style={AddProductStyle.total}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={AddProductStyle.totalPrice}>Tổng số lượng: </Text>
                            <Text style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                color: 'black',
                                marginBottom: 10,
                            }}>{selectedCount}</Text>
                        </View>
                        <Text style={AddProductStyle.totalPrice}>Tổng tiền: {totalAmount.toLocaleString()}.000đ</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('NextPayment')} style={PayMethodStyle.BtnSuss}>
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