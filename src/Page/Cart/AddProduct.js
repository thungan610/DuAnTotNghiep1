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
          source={item.selected ? require('../../../src/assets/check.png') : require('../../../src/assets/uncheck.png')}
          style={AddProductStyle.checkbox}
        />
      </TouchableOpacity>
      <View style={AddProductStyle.borderImage}>
        <Image source={{uri: imageUri}} style={AddProductStyle.image} />
      </View>
      <View style={AddProductStyle.itemDetails}>
        <Text style={AddProductStyle.itemName}>{item.name || 'Không có tên'}</Text>
        <Text style={AddProductStyle.itemCategory}>{item.category_name || 'Không có danh mục'}</Text>
        <Text style={{fontSize: 14}}>{fixedPrice.toLocaleString()}đ</Text>
        <Text style={AddProductStyle.itemPrice}>
          {(item.price && item.quantity)
            ? ((item.price ?? 0) * (item.quantity ?? 1)).toLocaleString()
            : 'Không có giá hoặc số lượng'}đ
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

const ConfirmationModal = ({visible, onConfirm, onCancel}) => (
  <Modal transparent={true} animationType="slide" visible={visible}>
    <View style={AddProductStyle.modalContainer}>
      <View style={AddProductStyle.modalContent}>
        <Image source={require('../../../src/assets/error.png')} style={{height: 40, width: 40}} />
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

const AddProduct = ({route, navigation}) => {
  const {data} = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.user);
  const userId = user?.userData?._id;

  useFocusEffect(
    useCallback(() => {
      const fetchAndProcessCart = async () => {
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

          const selectedCount = productsData.filter(item => item.selected).length;
          setSelectedCount(selectedCount);

          const total = productsData
            .filter(item => item.selected)
            .reduce((sum, item) => sum + item.price * item.quantity, 0);
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
    }, [userId])
  );

  const toggleSelectProduct = cart_id => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.cart_id === cart_id) {
          return {...item, selected: !item.selected};
        }
        return item;
      });

      const newTotal = updatedItems
        .filter(item => item.selected)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalAmount(newTotal);

      const newSelectedCount = updatedItems.filter(item => item.selected).length;
      setSelectedCount(newSelectedCount);

      return updatedItems;
    });
  };

  const updateQuantity = (cart_id, action) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.cart_id === cart_id) {
          const currentQuantity = item.quantity ?? 1;
          const newQuantity =
            action === 'increase'
              ? currentQuantity + 1
              : Math.max(1, currentQuantity - 1);
          return {...item, quantity: newQuantity};
        }
        return item;
      });

      const newTotal = updatedItems
        .filter(item => item.selected)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalAmount(newTotal);

      return updatedItems;
    });
  };

  const handlePayment = async () => {
    const selectedCartIds = cartItems.filter(item => item.selected).map(item => item.cart_id);
    if (selectedCartIds.length > 0) {
      await AsyncStorage.setItem('selectedCartIds', JSON.stringify(selectedCartIds));
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
        <TouchableOpacity style={AddProductStyle.iconTrash} onPress={() => setModalVisible(true)}>
          <Image source={require('../../../src/assets/Trash.png')} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Đang tải giỏ hàng...</Text>
        </View>
      ) : cartItems.length === 0 ? (
        <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18, color: '#666'}}>Hiện chưa có sản phẩm!!!</Text>
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
          keyExtractor={(item, index) => `${item.cart_id}-${index}`}
        />
      )}

      {totalAmount > 0 && (
        <View style={{borderColor: '#27AAE1', borderWidth: 1, borderRadius: 8, padding: 10}}>
          <View style={AddProductStyle.total}>
            <Text style={AddProductStyle.totalPrice}>
              Tổng tiền: {totalAmount.toLocaleString()}đ
            </Text>
          </View>
          <TouchableOpacity onPress={handlePayment} style={PayMethodStyle.BtnSuss}>
            <Text style={PayMethodStyle.txtSuss}>THANH TOÁN</Text>
          </TouchableOpacity>
        </View>
      )}

      <ConfirmationModal
        visible={modalVisible}
        onConfirm={() => {
          setCartItems([]);
          setTotalAmount(0);
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
};

export default AddProduct;
