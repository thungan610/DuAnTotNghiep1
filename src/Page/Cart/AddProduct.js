import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, FlatList, Image, TouchableOpacity, Modal, Alert, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PayMethodStyle from '../Payment/PayMethod/style';
import AddProductStyle from './AddProductStyle';
import axiosInstance from '../api/AxiosInstance';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const CartItem = React.memo(({item, toggleSelect, updateQuantity}) => {
  if (!item) return null;
  const [fixedPrice, setFixedPrice] = useState(item?.price || 0);
  const maxQuantity = parseInt(item.quantityMax);
  console.log('max SL: ', maxQuantity)
  const imageUri =
    Array.isArray(item.images) && item.images.length > 0
      ? item.images[0]
      : null;
  useEffect(() => {
    if (item) {
      setFixedPrice(item.price || 0);
    }
  }, [item]);

  return (
    <View style={AddProductStyle.itemContainer}>
      <TouchableOpacity onPress={() => toggleSelect(item.product_id)}>
        <Image
          source={
            item.selected
              ? require('../../../src/assets/check.png')
              : require('../../../src/assets/uncheck.png')
          }
          style={AddProductStyle.checkbox}
        />
      </TouchableOpacity>
      <View style={AddProductStyle.borderImage}>
        <Image source={{uri: imageUri}} style={AddProductStyle.image} />
      </View>
      <View style={AddProductStyle.itemDetails}>
        <Text style={AddProductStyle.itemName}>
          {item.name || 'Không có tên'}
        </Text>
        <Text style={AddProductStyle.itemCategory}>
          {item.category_name || 'Không có danh mục'}
        </Text>
        <View>
          <Text style={{fontSize: 14}}>{fixedPrice.toLocaleString()}đ</Text>
        </View>
        <Text style={AddProductStyle.itemPrice}>
          {item.price && item.quantity
            ? ((item.price ?? 0) * (item.quantity ?? 1)).toLocaleString()
            : 'Không có giá hoặc số lượng'}đ
        </Text>
      </View>
      <View style={AddProductStyle.quantityContainer}>
        <TouchableOpacity
          onPress={() => updateQuantity(item.cart_id, item.product_id, 'decrease', maxQuantity)}
          style={AddProductStyle.quantityButton}>
          <Text style={AddProductStyle.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={AddProductStyle.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => updateQuantity(item.cart_id, item.product_id, 'increase', maxQuantity)}
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
              quantityMax: product.quantityMax
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

  const toggleSelectProduct = product_id => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.product_id === product_id) {
          const newItem = {...item, selected: !item.selected};
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
  
      return updatedItems;
    });
  };
  

  const updateQuantityInCart = async (cart_id, product_id, quantity, quantityMax) => {
    try {
      if (quantity > quantityMax) {
        return Alert.alert('Lỗi', 'Số lượng nhập về không hợp lệ.');
      }
  
      console.log('cur', quantity);      
      console.log('max', quantityMax);      
  
      const response = await axiosInstance.put(
        `/carts/updateQuantity/${cart_id}/${product_id}`,
        { quantity },
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
  

  const updateQuantity = async (cart_id, product_id, action, maxQuantity) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.product_id === product_id) {
          let currentQuantity = item.quantity;
          let newQuantity =
            action === 'increase'
              ? (currentQuantity == maxQuantity ? currentQuantity : currentQuantity + 1)
              : Math.max(1, currentQuantity - 1);
  
          // Cập nhật lại số lượng và tính lại tổng tiền
          updateQuantityInCart(cart_id, item.product_id, newQuantity, maxQuantity);
  
          const newPrice = item.price * newQuantity;
          return {...item, quantity: newQuantity, totalPrice: newPrice};
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
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Thông báo',
        text2: 'Không có sản phẩm để xóa',
        visibilityTime: 3000,
        autoHide: true,
      });
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
        setModalVisible(false);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Thông báo',
          text2: 'Xóa sản phẩm thành công',
          visibilityTime: 3000,
          autoHide: true,
        });
      } catch (error) {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi xóa sản phẩm.');
        console.log('Lỗi khi xóa sản phẩm', error);
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

  const handlePayment = async () => {
    const selectedCartIds = cartItems
      .filter(item => item.selected)
      .map(item => item.cart_id);

    console.log('Selected Cart IDs:', selectedCartIds);

    if (selectedCartIds.length > 0) {
      await AsyncStorage.setItem(
        'selectedCartIds',
        JSON.stringify(selectedCartIds),
      );
      console.log('Cart IDs saved to AsyncStorage');
      const storedCartIds = await AsyncStorage.getItem('selectedCartIds');
      console.log('Stored Cart IDs from AsyncStorage:', storedCartIds);
      navigation.navigate('NextPayment', {cartIds: selectedCartIds});
    } else {
      Alert.alert('Thông báo', 'Chưa chọn sản phẩm để thanh toán');
    }
  };

  return (
    <View style={AddProductStyle.container}>
      <View style={AddProductStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../src/assets/notifi/backright.png')} />
        </TouchableOpacity>
        <Text style={AddProductStyle.title}>Giỏ hàng</Text>
        <TouchableOpacity
          style={AddProductStyle.iconTrash}
          onPress={confirmDelete}>
          <Image source={require('../../../src/assets/Trash.png')} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Đang tải giỏ hàng...</Text>
        </View>
      ) : cartItems.length === 0 ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: '#666'}}>
            Hiện chưa có sản phẩm!!!
          </Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={({item}) => (
            <CartItem
              item={item}
              toggleSelect={toggleSelectProduct}
              updateQuantity={updateQuantity}
            />
          )}
          keyExtractor={(item, index) => `${item.product_id}-${index}`}
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
              Tổng tiền: {totalAmount.toLocaleString()}đ
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
