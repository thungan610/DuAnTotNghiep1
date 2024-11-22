import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axiosInstance from '../../api/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payos = ({ route }) => {
  const { url, idorder } = route.params;
  console.log('orderId', idorder);

  const [cartIds, setCartIds] = useState([]);

  const getCartIds = async () => {
    try {
      const storedCartIds = await AsyncStorage.getItem('selectedCartIds');
      if (storedCartIds !== null) {
        const parsedCartIds = JSON.parse(storedCartIds);
        setCartIds(parsedCartIds);
      } else {
        console.log('No cart IDs found in AsyncStorage');
        setCartIds([]);
      }
    } catch (error) {
      console.error('Error retrieving cart IDs:', error);
    }
  };
  useEffect(() => {
    getCartIds();
  }, []);

  const navigation = useNavigation();
  const updateCartStatus = async (cartIds, status) => {
    try {
      const response = await axiosInstance.put('/carts/updatesatus', {
        cartIds: cartIds,
        status: status
      });
      console.log('Cập nhật trạng thái giỏ hàng thành công:', response);
      return response;
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái giỏ hàng:', error.message);
      throw new Error('Có lỗi xảy ra khi cập nhật trạng thái giỏ hàng.');
    }
  };
  const updateOrder = async (idorder, status) => {
    try {
      const response = await axiosInstance.post(`/oder/${idorder}/updateOrder`, {
        status: status,
      });
      console.log('Cập nhật trạng thái đơn hàng thành công:', response);
      return response;
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error.message);
      throw new Error('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.');
    }
  };


  const handleNavigationChange = (navState) => {
    const { url } = navState;
    console.log('Current URL:', url);
    if (url.includes('/payment/success')) {
      console.log('Navigation detected success URL');
      Alert.alert('Thành công', 'Bạn đã thanh toán thành công');
      updateCartStatus(cartIds, 0);
      navigation.navigate('BottomNav');
    } else if (url.includes('/payment/cancel')) {
      console.log('Navigation detected cancel URL');
      Alert.alert('Thất bại', 'Đã hủy thanh toán.');
      updateOrder(idorder, 4)
      updateCartStatus(cartIds, 0);
      navigation.navigate('BottomNav');
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onNavigationStateChange={handleNavigationChange}
        onError={() => {
          Alert.alert('Thất bại', 'Lỗi Thanh toán');
        }}
      />
      <Toast />
    </View>
  );
};

export default Payos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
