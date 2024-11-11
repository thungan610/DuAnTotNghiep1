import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PayMethodStyle from '../Payment/PayMethod/style';
import AddProductStyle from './AddProductStyle';
import axiosInstance from '../api/AxiosInstance';

const CartItem = React.memo(({ item, toggleSelect, updateQuantity }) => {
    if (!item) return null;

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
    const [cartItems, setCartItems] = useState([]);
    const [setUserId] = useState(null);
    const userId = useSelector(state => state.user.id);
    const dispatch = useDispatch();

    const getCart = async (id) => {
        try {
            const response = await axiosInstance.get('/carts/getCart/' + id);
            const cartData = response.data;

            setCartItems(cartData.products);

            if (cartData.user && cartData.user._id) {
                console.log("User ID:", cartData.user._id);
            }
        } catch (error) {
            console.error("Lỗi khi tải giỏ hàng:", error);
            Alert.alert("Thông báo", "Không thể tải giỏ hàng.");
        }
    };

    useEffect(() => {
        if (userId) {
            getCart(userId);
        }
    }, [userId]);

    // Tải dữ liệu giỏ hàng từ AsyncStorage khi mở màn hình
    useEffect(() => {
        const loadCart = async () => {
            const storedItems = await AsyncStorage.getItem('cartItems');
            if (storedItems) setCartItems(JSON.parse(storedItems));
        };
        loadCart();
    }, []);

    // Thêm sản phẩm mới vào đầu danh sách và lưu vào AsyncStorage
    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const savedCart = await AsyncStorage.getItem('cartItems');
                if (savedCart) {
                    setCartItems(JSON.parse(savedCart));
                }
            } catch (error) {
                console.error("Lỗi khi tải giỏ hàng:", error);
            }
        };
        loadCartItems();
    }, []);

    // Cập nhật tổng giá trị khi giỏ hàng thay đổi và lưu lại giỏ hàng vào AsyncStorage
    useEffect(() => {
        if (data) {
            setCartItems(prevItems => {
                const updatedCartItems = [data, ...prevItems];
                AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                return updatedCartItems;
            });
        }
    }, [data]);


    const toggleSelectProduct = (id) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => 
                item.id === id ? { ...item, selected: !item.selected } : item
            );
            
            // Cập nhật totalAmount sau khi thay đổi trạng thái sản phẩm
            const newTotal = updatedItems
                .filter(item => item.selected)
                .reduce((total, item) => total + (item.price * item.quantity), 0);
    
            setTotalAmount(newTotal); // Cập nhật tổng số tiền
    
            return updatedItems;
        });
    };
    
    useEffect(() => {
        const total = cartItems
            .filter(item => item.selected)
            .reduce((total, item) => total + (item.price * item.quantity), 0);
        
        setTotalAmount(total);
    }, [cartItems]); 
    

    const updateQuantity = (id, action) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    const newQuantity = action === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
                    if (newQuantity === 1 && action === 'decrease') {
                        Alert.alert("Thông báo", "Số lượng không thể thấp hơn 1.");
                    }
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
                    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                />
            )}

            {totalAmount > 0 && (
                <View>
                    <View style={AddProductStyle.total}>
                        <Text style={AddProductStyle.totalPrice}>Tổng cộng:</Text>
                        <Text style={AddProductStyle.totalPrice}>{totalAmount.toLocaleString()}.000đ</Text>
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
