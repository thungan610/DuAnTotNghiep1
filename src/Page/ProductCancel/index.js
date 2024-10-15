import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import ProductCancelStyle from './style';

const ProductCancel = (prop) => {
  const [description, setDescription] = useState('');
  const orders = [
    {
      id: 1,
      name: 'Bắp cải trắng',
      quantity: 1,
      price: 29000,
      status: 'Đang xử lý',
      image: require('../../../src/assets/image/image1.png'),
    },
  ];

  const BtnCancel = () => {
    prop.navigation.navigate('CancelTrue');
  };

  return (
    <View style={ProductCancelStyle.container}>
      <View style={ProductCancelStyle.header1}>
        <Text style={ProductCancelStyle.headerText}>Hủy đơn</Text>
      </View>

      <View style={ProductCancelStyle.boxProduct}>
        <View>
          <ScrollView style={ProductCancelStyle.orderContainer}>
            {orders.map((order) => (
              <View key={order.id} style={ProductCancelStyle.orderCard}>
                <View style={ProductCancelStyle.borderimage}>
                  <Image source={order.image} style={ProductCancelStyle.image} />
                </View>
                <View style={ProductCancelStyle.orderInfo}>
                  <Text style={ProductCancelStyle.orderName}>{order.name}</Text>
                  <Text style={ProductCancelStyle.orderQuantity}>SL: {order.quantity}</Text>
                  <Text style={ProductCancelStyle.orderPrice}>Tổng tiền: {order.price.toLocaleString('vi-VN')}đ</Text>
                  <Text style={ProductCancelStyle.orderStatus}>{order.status}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
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
          <TouchableOpacity onPress={() => prop.navigation.navigate('Processing1')} style={ProductCancelStyle.button}>
            <Text style={ProductCancelStyle.textButton}>Quay lại</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={BtnCancel} style={ProductCancelStyle.button1}>
            <Text style={ProductCancelStyle.textButton1}>Hủy đơn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductCancel;
