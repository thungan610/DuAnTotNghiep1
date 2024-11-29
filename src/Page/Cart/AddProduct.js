import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PayMethodStyle from '../Payment/PayMethod/style';
import AddProductStyle from './AddProductStyle';
import axiosInstance from '../api/AxiosInstance';

        </View>
        <Text style={AddProductStyle.itemPrice}>
          {item.price && item.quantity
            ? ((item.price ?? 0) * (item.quantity ?? 1)).toLocaleString()
            : 'Không có giá hoặc số lượng'}
          .000đ
        </Text>
      </View>
      <View style={AddProductStyle.quantityContainer}>
        <TouchableOpacity
          onPress={() => updateQuantity(item.cart_id, 'decrease')}
          style={AddProductStyle.quantityButton}>
          <Text style={AddProductStyle.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={AddProductStyle.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => updateQuantity(item.cart_id, 'increase')}
          style={AddProductStyle.quantityButton}>
          <Text style={AddProductStyle.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const ConfirmationModal = ({visible, onConfirm, onCancel}) => (
  <Modal transparent={true} animationType="slide" visible={visible}>
    <View style={AddProductStyle.modalContainer}>
      <View style={AddProductStyle.modalContent}>
        <Image
          source={require('../../../src/assets/error.png')}
          style={{height: 40, width: 40}}
        />
        <Text style={AddProductStyle.modalTitle}>Xác nhận xóa sản phẩm</Text>
        <View style={AddProductStyle.modalButtons}>
          <TouchableOpacity
            onPress={onCancel}
            style={AddProductStyle.cancelButton}>
            <Text style={AddProductStyle.buttonText}>Quay lại</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirm}
            style={AddProductStyle.confirmButton}>
            <Text style={AddProductStyle.buttonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const AddProduct = ({route, navigation}) => {
  const {data} = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  const user = useSelector(state => state.user);
  console.log('user', user);

  const userId = user?.userData?._id;
  console.log('userId', userId);

  useFocusEffect(
    useCallback(() => {
      const fetchAndProcessCart = async () => {
        try {
          setLoading(true);
          console.log('userId:', userId);
          const response = await axiosInstance.get(
            `/carts/getcartbyiduser/${userId}`,
          );
          console.log('response', response);
          const cartData = Array.isArray(response) ? response : [];
          console.log('cartData', cartData);
          const activeCartData = cartData.filter(cart => cart.status === 1);
          if (activeCartData.length === 0) {
            console.warn(
              'Giỏ hàng trống hoặc không có giỏ hàng đang hoạt động!',
            );
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
              category_name:
                product.category?.category_name || 'Không có danh mục',
              price: product.price,
              quantity: product.quantity,
              images: product.images,
              selected: true,
            })),
          );
          setCartItems(productsData);
          const selectedCount = productsData.filter(
            item => item.selected,
          ).length;
          setSelectedCount(selectedCount);

          const total = productsData
            .filter(item => item.selected)
            .reduce((total, item) => total + item.price * item.quantity, 0);
          setTotalAmount(total);
        } catch (error) {
          setCartItems([]);
          setSelectedCount(0);
          setTotalAmount(0);
        } finally {
          setLoading(false);
        }
      };

      fetchAndProcessCart();
    }, [userId]),
  );

  const toggleSelectProduct = cart_id => {
    console.log('Toggle select product cart_id:', cart_id);
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.cart_id === cart_id) {
          const newItem = {...item, selected: !item.selected};
          return newItem;
        }
        return item;
      });

      const newSelectedCount = updatedItems.filter(
        item => item.selected,
      ).length;
      setSelectedCount(newSelectedCount);

      const newTotal = updatedItems
        .filter(item => item.selected)
        .reduce((total, item) => total + item.price * item.quantity, 0);
      setTotalAmount(newTotal);

      console.log('Updated cart items:', updatedItems);
      return updatedItems;
    });
  };

  const updateQuantityInCart = async (cart_id, product_id, quantity) => {
    try {
      const response = await axiosInstance.put(
        `/carts/updateQuantity/${cart_id}/${product_id}`,
        {quantity},
      );
      if (response) {
        return response;
      } else {
        console.error(
          'Failed to update quantity:',
          response.data || 'No data returned',
        );
        Alert.alert('Lỗi', 'Cập nhật số lượng không thành công.');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const updateQuantity = async (cart_id, action) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.cart_id === cart_id) {
          const currentQuantity = item.quantity;
          let newQuantity =
            action === 'increase'
              ? currentQuantity + 1
              : Math.max(1, currentQuantity - 1);
          updateQuantityInCart(cart_id, item.product_id, newQuantity);
          return {...item, quantity: newQuantity};
        }
        return item;
      });
    });
  };

  const deleteItemsFromCart = async cart_id => {
    try {
      if (!cart_id) {
        console.error('Invalid cart_id:', cart_id);
        return;
      }
      const response = await axiosInstance.delete(
        `/carts/deleteCart/${cart_id}`,
      );
      console.log('res: ', response);
      if (response) {
        return response.data;
      }
    } catch (error) {}
  };

  const removeSelectedItems = async () => {
    const selectedItems = cartItems.filter(item => item.selected);

    if (selectedItems.length === 0) {
      Alert.alert('Thông báo', 'Không có sản phẩm để xóa');
    } else {
      try {
        for (const item of selectedItems) {
          const response = await deleteItemsFromCart(item.cart_id);
          if (response) {
            console.log('respone: ', response);
            setCartItems(prevItems =>
              prevItems.filter(cartItem => cartItem.cart_id !== item.cart_id),
            );
          }
        }

            />
          )}
          keyExtractor={(item, index) => `${item.cart_id}-${index}`}
        />
      )}

      {totalAmount > 0 && (
        <View
          style={{
            borderColor: '#27AAE1',
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
          }}>
          <View style={AddProductStyle.total}>
            <View style={{flexDirection: 'row'}}>
              <Text style={AddProductStyle.totalPrice}>Tổng số lượng: </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: 'black',
                  marginBottom: 10,
                }}>
                {selectedCount}
              </Text>
            </View>
            <Text style={AddProductStyle.totalPrice}>
              Tổng tiền: {totalAmount.toLocaleString()}.000đ
            </Text>
          </View>
          <TouchableOpacity
            onPress={handlePayment}
            style={PayMethodStyle.BtnSuss}>
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
