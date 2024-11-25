import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import axiosInstance from '../api/AxiosInstance';
import Toast from 'react-native-toast-message';

const Order = (prop) => {
  const [orders, setOrders] = useState([]);
  const [selectedTabs, setSelectedTabs] = useState(0);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);

  const userid = user?.userData?._id || 'default_id';

  const tabs = ['Chờ xác nhận', 'Đang giao', 'Đã nhận', 'Đã hủy'];

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/oder/getorderbyuserid/${userid}`);
        

        const allOrders = response;

        const filteredOrders = allOrders.filter(order => {
          switch (tabs[selectedTabs]) {
            case 'Chờ xác nhận':
              return order.status === 1;
            case 'Đang giao':
              return order.status === 2;
            case 'Đã nhận':
              return order.status === 3;
            case 'Đã hủy':
              return order.status === 4;
            default:
              return true;
          }
        }).map(order => ({
          ...order,
          products: order.cart?.flatMap(cartItem => cartItem.products) || []
        }));

        setOrders(filteredOrders);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [selectedTabs]);

  useEffect(() => {
    const { selectedTab } = prop.route.params || {};
    if (selectedTab !== undefined) {
      setSelectedTabs(selectedTab);
    }
  }, [prop.route.params]);

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

  const addToCartHandler = async (order) => {
    const productsToAdd = Array.isArray(order.products) ? order.products.map(product => ({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      images: product.images,
      selected: true,
    })) : [];
    try {
      const response = await axiosInstance.post('/carts/addCart_App', {
        user: userid,
        products: productsToAdd,
      });

      if (response.data.error) {
        Toast.show({
          type: 'error',
          text1: 'Thông báo',
          text2: 'Có lỗi xảy ra khi thêm sản phẩm!',
          visibilityTime: 2000,
          position: 'top'
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Thông báo',
          text2: 'Thêm sản phẩm thành công!',
          visibilityTime: 2000,
          position: 'top'
        });
        prop.navigation.navigate('AddProduct');

        productsToAdd.forEach(product => dispatch(addToCart(product)));
      }
    } catch (error) {
    
    }
  };

  const renderOrderCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        const product = item.products[0];
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
            {item.products.length > 0 && item.products[0].images?.length > 0 ? (
              <Image source={{ uri: item.products[0].images[0] }} style={OrderStyle.image} />
            ) : (
              <View style={[OrderStyle.image, { backgroundColor: '#cccccc' }]} />
            )}
          </View>
          {item.status === 'Đã nhận' && (
            <Text style={OrderStyle.completedText}>Hoàn thành</Text>
          )}
        </View>
        <View style={OrderStyle.orderInfo}>
          <Text style={OrderStyle.orderName}>{item.products.length > 0 ? item.products[0].name : 'Không có sản phẩm'}</Text>
          <Text style={OrderStyle.orderQuantity}>SL: {item.products.length > 0 ? item.products[0].quantity : 0}</Text>
          <Text style={OrderStyle.orderPrice}>Tổng tiền: {Math.round(item.totalOrder).toLocaleString('vi-VN')}.000 đ</Text>
  
          {tabs[selectedTabs] !== 'Đã nhận' && (
            <Text style={[OrderStyle.orderStatus, { color: getStatusColor(item.status) }]}>{item.status}</Text>
          )}
  
          {tabs[selectedTabs] === 'Đã nhận' && (
            <View style={OrderStyle.buttonContainer}>
              <TouchableOpacity onPress={() => addToCartHandler(item)} style={OrderStyle.buttonnhan}>
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

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderCard}
          keyExtractor={item => (item._id ? item._id.toString() : Math.random().toString())}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />

      )}

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
  completedText: {
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