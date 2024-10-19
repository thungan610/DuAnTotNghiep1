import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const Order = (prop) => {
  const [selectedTabs, setSelectedTabs] = useState(0);

  const tabs = ['Chờ xác nhận', 'Đang giao', 'Đã nhận', 'Đã hủy'];

  const orders = {
    'Chờ xác nhận': [
      {
        id: 1,
        name: 'Bắp cải trắng',
        quantity: 1,
        price: 29000,
        status: 'Đang xử lý',
        image: require('../../../src/assets/image/image1.png')
      },
    ],
    'Đang giao': [
      {
        id: 1,
        name: 'Bắp cải trắng',
        quantity: 1,
        price: 25000,
        status: 'Đang vận chuyển',
        image: require('../../../src/assets/image/image1.png'),

      },
      {
        id: 2,
        name: 'Sườn non',
        quantity: 1,
        price: 55000,
        status: 'Đang vận chuyển',
        image: require('../../../src/assets/image/image4.png')
      },
    ],
    'Đã nhận': [
      {
        id: 1,
        name: 'Bắp cải trắng',
        quantity: 1,
        price: 29000,
        status: 'Đã nhận',
        image: require('../../../src/assets/image/image1.png')
      },
      {
        id: 2,
        name: 'Bắp cải trắng',
        quantity: 1,
        price: 29000,
        status: 'Đã nhận',
        image: require('../../../src/assets/image/image1.png')
      },
    ],
    'Đã hủy': [
      {
        id: 1,
        name: 'Bắp cải trắng',
        quantity: 1,
        price: 25000,
        status: 'Đã hủy',
        image: require('../../../src/assets/image/image1.png')
      },
      {
        id: 2,
        name: 'Bắp cải trắng',
        quantity: 1,
        price: 25000,
        status: 'Đã hủy',
        image: require('../../../src/assets/image/image1.png')
      },
    ],
  };
  useEffect(() => {
    const { selectedTab } = prop.route.params || {};
    if (selectedTab !== undefined) {
      setSelectedTabs(selectedTab);
    }
  }, [prop.route.params]);

  const currentOrders = orders[tabs[selectedTabs]] || [];


  const getStatusColor = (status) => {
    switch (status) {
      case 'Đang vận chuyển':
        return '#4CAF50';
      case 'Đã hủy':
        return '#FF3434';
      default:
        return '#FF7400';
    }
  };

  const renderOrderCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        switch (tabs[selectedTabs]) {
          case 'Chờ xác nhận':
            prop.navigation.navigate('Processing1', { order: item });
            break;
          case 'Đang giao':
            prop.navigation.navigate('Delivering', { order: item });
            break;
          case 'Đã nhận':
            prop.navigation.navigate('Done', { order: item });
            break;
          case 'Đã hủy':
            prop.navigation.navigate('Canceled', { order: item });
            break;
          default:
            break;
        }
      }}
    >
      <View style={OrderStyle.orderCard}>
        <View style={{
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <View style={OrderStyle.borderimage}>
            <Image source={item.image} style={OrderStyle.image} />
          </View>
          {item.status === 'Đã nhận' && (
            <Text style={OrderStyle.completedText}>Hoàn thành</Text>
          )}
        </View>
        <View style={OrderStyle.orderInfo}>
          <Text style={OrderStyle.orderName}>{item.name}</Text>
          <Text style={OrderStyle.orderQuantity}>SL: {item.quantity}</Text>
          <Text style={OrderStyle.orderPrice}>Tổng tiền: {item.price.toLocaleString('vi-VN')}đ</Text>

          {tabs[selectedTabs] !== 'Đã nhận' && (
            <Text style={[OrderStyle.orderStatus, { color: getStatusColor(item.status) }]}>{item.status}</Text>
          )}

          {tabs[selectedTabs] === 'Đã nhận' && (

            <View style={OrderStyle.buttonContainer}>
              <TouchableOpacity onPress={() => prop.navigation.navigate('Payment')} style={OrderStyle.buttonnhan}>
                <Text style={OrderStyle.buttonTextnhan}>Mua lại</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => prop.navigation.navigate('ProductReview')} style={OrderStyle.buttonhuy}>
                <Text style={OrderStyle.buttonTexthuy}>Đánh giá</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={OrderStyle.container}>
      <View style={OrderStyle.header}>
        <Text style={OrderStyle.title}>Đơn hàng</Text>
      </View>

      <View style={OrderStyle.tabsContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[OrderStyle.tabsButton, selectedTabs === index && OrderStyle.selectedTabsButton]}
            onPress={() => setSelectedTabs(index)}
          >
            <Text style={{
              fontSize: 16,
              fontWeight: selectedTabs === index ? 'bold' : 'normal',
              textDecorationLine: selectedTabs === index ? 'underline' : 'none',
              marginHorizontal: 8,
              marginTop: 7,
              color: 'black',
              textAlign: 'center',
              marginRight: 12
            }}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={currentOrders}
        renderItem={renderOrderCard}
        keyExtractor={item => item.id.toString()}
        style={OrderStyle.orderContainer}
      />
    </View>
  );
};

const OrderStyle = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
    alignContent: 'center'
  },
  orderCard: {
    marginTop: 14,
    flexDirection: 'row',
    padding: 8,
    borderColor: '#BBAFAF',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  borderimage: {
    borderRadius: 10,
    backgroundColor: '#73D6E9',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 8,
    marginLeft: 14,
  },
  completedText: { // Thêm style cho chữ "Hoàn thành"
    fontSize: 14,
    color: '#1976D2',
    marginTop: 10,
  },
  orderInfo: {
    marginLeft: 16,
    flex: 1
  },
  orderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  orderQuantity: {
    fontSize: 14,
    color: '#555',
    color: 'black'
  },
  orderPrice: {
    fontSize: 14,
    color: '#FF3434',
  },
  orderStatus: {
    fontSize: 14,
    alignSelf: 'flex-end', // Căn phải (đi chung vs flex)
  },
  tabsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttonnhan: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    borderWidth: 1,
    width: 80,
    height: 34,
    borderColor: '#BBAFAF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonhuy: {
    backgroundColor: 'white',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    width: 80,
    height: 34,
    borderColor: '#FF7400',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextnhan: {
    color: 'black',
    fontSize: 16,
  },
  buttonTexthuy: {
    color: '#FF7400',
    fontSize: 16,
  },
});

export default Order;
