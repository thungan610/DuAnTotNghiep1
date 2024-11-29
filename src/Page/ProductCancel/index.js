import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import ProductCancelStyle from './style';
import axiosInstance from '../api/AxiosInstance';

const ProductCancel = (prop) => {
  const { order } = prop.route.params;
  const [description, setDescription] = useState('');

  const idorder = order._id
  console.log('idorder', idorder);


  const BtnCancel = () => {
    prop.navigation.navigate('CancelTrue');
    updateOrder(idorder, 4)
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

  return (
    <View style={ProductCancelStyle.container}>
      <View style={ProductCancelStyle.header1}>
        <Text style={ProductCancelStyle.headerText}>Hủy đơn</Text>
      </View>

      <ScrollView style={ProductCancelStyle.boxProduct}>
        <View style={ProductCancelStyle.orderContainer}>
          {order.products.map((product, index) => (
            <View key={product.id} style={ProductCancelStyle.orderCard}>
              <View style={ProductCancelStyle.borderimage}>
                <Image source={{ uri: product.images[0] }} style={ProductCancelStyle.image} />
              </View>
              <View style={ProductCancelStyle.orderInfo}>
                <Text style={ProductCancelStyle.orderName}>{product.name}</Text>
                <Text style={ProductCancelStyle.orderQuantity}>SL: {product.quantity}</Text>
                <Text style={ProductCancelStyle.orderPrice}>
                  Tổng tiền: {(product.quantity * product.price).toLocaleString('vi-VN')}  đ
                </Text>
                <Text style={ProductCancelStyle.orderStatus}>
                  Trạng thái: {order.status === 1 ? 'Chờ xác nhận' : order.status}
                </Text>

              </View>
            </View>
          ))}
      </View>

      <View>
        <TextInput
          style={ProductCancelStyle.input}
          placeholder="Hãy nhập lý do bạn muốn hủy đơn này nhé!!!"
          multiline={true}
          numberOfLines={5}
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
      </View>

      <View style={ProductCancelStyle.buttonContainer}>
        <TouchableOpacity
          onPress={() => prop.navigation.navigate('Processing1', { order: order })}
          style={ProductCancelStyle.button}>
          <Text style={ProductCancelStyle.textButton}>Quay lại</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={BtnCancel} style={ProductCancelStyle.button1}>
          <Text style={ProductCancelStyle.textButton1}>Hủy đơn</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View >
  );
};

export default ProductCancel;
