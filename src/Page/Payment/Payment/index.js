import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import PaymentStyle from "./style";
import AddAdressStyle from "../AddAdress/style";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import axiosInstance from "../../api/AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Payment = ({ route, navigation }) => {
    const { addressId } = route.params || {};
    const [cartIds, setCartIds] = useState([]);
    console.log('cartIds', cartIds);

    const user = useSelector(state => state.user);
    const userId = user?.userData?._id || 'default_id';
    console.log('userId', userId);

    const [data, setData] = useState([]);
    const [address, setAddress] = useState(null);
    const [cartData, setCartData] = useState([]);
    console.log('cartData', cartData);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    console.log('selectedVoucher', selectedVoucher);

    const [selectedMethod, setSelectedMethod] = useState(null);

    const getAddress = async (userId) => {
        try {
            const response = await axiosInstance.get(`/users/getAddress/${userId}`);
            console.log('response', response);
            if (response && response.data) {
                setData(response.data);
            }
        } catch (error) {

        }
    };

    const fetchAddressById = async (addressId) => {
        try {
            const response = await axiosInstance.get(`/users/getAddressById/${addressId}`);
            const normalizedCity = response?.data?.city?.trim().toLowerCase(); // Chuẩn hóa tên thành phố
    
            if (normalizedCity === "hồ chí minh") {
                setAddress(response.data); // Cập nhật địa chỉ nếu hợp lệ
            } else {
                Alert.alert("Thông báo", "Địa chỉ nhận hàng phải nằm trong Hồ Chí Minh");
                setAddress(null); // Xóa địa chỉ nếu không hợp lệ
            }
        } catch (err) {
            console.error('Lỗi khi lấy thông tin địa chỉ:', err);
            Alert.alert("Lỗi", "Không thể lấy thông tin địa chỉ.");
        }
    };
    
    useFocusEffect(
        React.useCallback(() => {
            if (userId) {
                getAddress(userId);
            }
        }, [userId])
    );

    useEffect(() => {
        if (addressId) {
            fetchAddressById(addressId);
        } else {
            if (data.length > 0) {
                console.log('Setting default address:', data[0]);
                setAddress(data[0]);
            } else {
                setAddress(null);
            }
        }
    }, [addressId, data]);
    
    useEffect(() => {
        if (route.params?.selectedMethod) {
            const method = route.params.selectedMethod;
            setSelectedMethod(method);
        }
    }, [route.params]);

    const getCartIds = async () => {
        try {
            const storedCartIds = await AsyncStorage.getItem('selectedCartIds');
            if (storedCartIds !== null) {
                const parsedCartIds = JSON.parse(storedCartIds);
                setCartIds(parsedCartIds);
            } else {
                setCartIds([]);
            }
        } catch (error) {
            console.error('Error retrieving cart IDs:', error);
        }
    };

    useEffect(() => {
        getCartIds();
    }, []);

    const getCartsByIds = async (cartIds) => {
        try {
            const response = await axiosInstance.get('/carts/getCartById', {
                params: {
                    cartIds: cartIds.join(',')
                }
            });
            setCartData(response);
        } catch (error) {
            console.error('Lỗi khi lấy giỏ hàng:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        if (cartIds && cartIds.length > 0) {
            getCartsByIds(cartIds);
        }
    }, [cartIds]);

    const BackRight = () => {
        // navigation.goBack(); 
        navigation.navigate('BottomNav');
    };


    const HandMethod = () => {
        navigation.navigate('PayMethod');
    };



    const HandTransfer = () => {
        navigation.navigate('AddTranfer', {
            onSelectTransfer: (transfer) => setSelectedTransfer(transfer),
        });
    };

    const deleteItemsFromCart = async (cartIds) => {
        try {
            if (!cartIds || cartIds.length === 0) {
                console.error('Invalid cart_ids:', cartIds);
                return;
            }
            console.log('cart_ids:', cartIds);
            const deletePromises = cartIds.map((id) =>
                axiosInstance.delete(`/carts/deleteCart/${id}`)
            );
            await Promise.all(deletePromises);
            console.log('Deleted all cart items successfully');
        } catch (error) {
            console.error('Error deleting cart items:', error.response?.data || error.message);
        }
    };


    const HandPaySuccess = async () => {
        // Check if the selected method is chosen
        if (!selectedMethod) {
            Alert.alert("Thông báo", "Bạn chưa chọn phương thức thanh toán");
            return;
        }
    
       
        try {
            
            const idorder = await createOrder();
            console.log('idorder', idorder);
    
            
            if (selectedMethod === 'cash') {
              
                navigation.navigate('OrderSuccess');
                deleteItemsFromCart(cartIds);
                navigation.navigate('PaySussesScreen');
            } else if (selectedMethod === 'payos') {
              
                await createPayment(idorder);
            }
        } catch (error) {
            console.error('Lỗi khi thanh toán:', error.message);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
        }
    };
    
    const BtnTabAddress = () => {
        navigation.navigate('TabAddress');
    };

    const [selectedTransfer, setSelectedTransfer] = useState({
        label: "Tiết Kiệm",
        status: 1,
        price: "8000",
        note: "Đảm bảo nhận hàng trong 60 phút kể từ khi nhận đơn",
    });

    useEffect(() => {
        if (route.params?.selectedTransfer) {
            setSelectedTransfer(route.params.selectedTransfer);
        }
    }, [route.params]);

    useEffect(() => {
        if (route.params?.selectedVoucher) {
            setSelectedVoucher(route.params.selectedVoucher);
        }
    }, [route.params]);

    const totalPrice = cartData.reduce((total, cart) => {
        return total + cart.products.reduce((cartTotal, product) => {
            return cartTotal + product.price * product.quantity;
        }, 0);
    }, 0);

    const HandVoucher = () => {
        navigation.navigate('Voucher', { totalPrice });
    };
    console.log('totalPrice', totalPrice);


    const totalPayment = (() => {
        // Ensure totalPrice is correctly defined and accessible.
        const transferCost = parseFloat(selectedTransfer.price) || 0;
        let discount = 0;

        if (selectedVoucher) {
            const voucherPrice = selectedVoucher.discountAmount || 0;
            const voucherPercent = selectedVoucher.discountPercent || 0;

            // Apply percentage discount if available
            if (voucherPercent > 0) {
                // Apply percentage discount to totalPrice + transferCost
                discount = ((totalPrice + transferCost) * voucherPercent) / 100;
            } else {
                // Apply fixed amount discount
                discount = voucherPrice;
            }
        }

        // Calculate the total payment
        const total = (totalPrice + transferCost) - discount;

        // Round to 2 decimal places to avoid floating point precision issues
        return Math.round(total * 100) / 100;
    })();

    console.log('totalPayment', totalPayment);


    const createOrder = async () => {
        try {
            const orderData = {
                cart: cartIds,
                userId,
                ship: selectedTransfer ? selectedTransfer.status : 1,
                sale: selectedVoucher ? [selectedVoucher] : [],
                totalOrder: totalPayment,
                method: selectedMethod,
            };
            console.log('orderData', orderData);

            const response = await axiosInstance.post('/oder/addOrder', orderData)
            console.log('response...................................', response);
            if (response && response.data) {
                const idorder = response.data._id;
                console.log('Order ID:', idorder);
                return idorder;
            } else {
                Alert.alert("Lỗi", "Không thể tạo đơn hàng. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error('Error creating order:', error.message);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
        }
    };

    // const createnotifications = async (orderId, userId) => {
    //     try {
    //         const notifidata = {
    //             userId,
    //             orderId,
    //             title: 'Đơn hàng mới đã được tạo',
    //             promotionMessage: 'Bạn đã đặt hàng thành công với mã đơn hàng ' + orderId, 
    //             type: 'order',
    //             status: 0,
    //         };


    //         console.log('orderData', notifidata);

    //         const response = await axiosInstance.post('/notifications/add_notification', notifidata);
    //         console.log('response', response);

    //         if (response && response.data) {
    //             const notifi = response.data._id;
    //             console.log('check:', notifi);
    //             return notifi;
    //         } else {
    //             Alert.alert("Lỗi", "Không thể tạo thông báo. Vui lòng thử lại.");
    //         }
    //     } catch (error) {
    //         console.error('Error creating notification:', error.message);
    //         Alert.alert("Lỗi", "Có lỗi xảy ra khi tạo thông báo. Vui lòng thử lại.");
    //     }
    // };


    const createPayment = async (idorder) => {
        const orderId = Math.floor(100000 + Math.random() * 900000);
        const paymentData = {
            amount: totalPayment,
            orderId,
            description: 'Thanh toán đơn hàng',
            user: userId,
        };

        try {
            const response = await axiosInstance.post('/payment/create-payment-link', paymentData);
            console.log('Full response:', response);

            if (response) {
                navigation.navigate('Payos', { url: response.paymentLink, idorder });
            } else {
                Alert.alert("Lỗi", "Không thể tạo thanh toán.");
            }
        } catch (error) {
            console.error('Error creating payment:', error.message);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại.");
        }
    };

    return (
        <ScrollView style={PaymentStyle.container}>
            <View style={[AddAdressStyle.header, PaymentStyle.Padding]}>
                <TouchableOpacity style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                }} onPress={BackRight}>
                    <Image source={require("../../../assets/notifi/backright.png")} />
                </TouchableOpacity>
                <Text style={AddAdressStyle.title}>Thanh toán</Text>
            </View>

            <TouchableOpacity onPress={BtnTabAddress} style={[PaymentStyle.body, PaymentStyle.paddingHorizontal, PaymentStyle.paddingBottom]}>
                <Image style={PaymentStyle.imgmap} source={require("../../../assets/notifi/map.png")} />
                <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                    <View>
                        <Text style={PaymentStyle.txtDC}>Địa chỉ nhận hàng</Text>
                        {address ? (
                            <View>
                                <Text style={PaymentStyle.txtLH}>{address?.user?.name}, <Text style={PaymentStyle.txtLH}>{address?.user?.phone}</Text></Text>
                                <Text style={PaymentStyle.txtLH}>
                                    {address?.alley} {address?.houseNumber}, {address?.quarter}, {address?.district}, {address?.city}, {address?.country}
                                </Text>
                                <Text style={{ color: 'red', marginVertical: 10 }}>
                                    Lưu ý: Chỉ hỗ trợ giao hàng trong khu vực Hồ Chí Minh.
                                </Text>

                            </View>
                        ) : data.length > 0 ? (
                            <View>
                                <Text style={PaymentStyle.txtLH}>{data[0]?.user?.name}, <Text style={PaymentStyle.txtLH}>{data[0]?.user?.phone}</Text></Text>
                                <Text style={PaymentStyle.txtLH}>
                                    {data[0]?.alley} {data[0]?.houseNumber}, {data[0]?.quarter}, {data[0]?.district}, {data[0]?.city}, {data[0]?.country}
                                </Text>
                            </View>
                        ) : (
                            <Text style={PaymentStyle.txtLH}>Không có địa chỉ</Text>
                        )}
                    </View>
                </View>
                <Image source={require("../../../assets/notifi/expand_right.png")} />
            </TouchableOpacity>

            <Text style={PaymentStyle.Line} />
            {cartData.map((cart, index) => (
                <View key={cart._id} style={[PaymentStyle.bodysp, PaymentStyle.Padding]}>
                    {cart.products.map((product, productIndex) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: 'white', alignItems: 'center' }} key={productIndex}>
                            <View
                                style={{
                                    flexDirection: 'row'
                                }}>
                                <View style={PaymentStyle.Viewimg}>
                                    <Image style={PaymentStyle.img} source={{ uri: product.images[0] }} />
                                </View>
                                <View
                                    style={{
                                        marginLeft: 20
                                    }}>
                                    <Text style={PaymentStyle.txtDC}>{product.name}</Text>
                                    <Text style={PaymentStyle.txtLH}>{product.category.category_name}</Text>
                                    <View style={PaymentStyle.ViewPrice}>
                                        <Text style={PaymentStyle.txtPrice}>{(product.price * product.quantity).toLocaleString()} đ</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={PaymentStyle.txtLH}>SL: {product.quantity}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            ))}
            <TouchableOpacity onPress={HandTransfer} style={PaymentStyle.BtnTranfer}>
                <Text style={PaymentStyle.txtDC}>Phương thức vận chuyển (Nhấp để chọn)</Text>
                {selectedTransfer ? (
                    <View style={PaymentStyle.ViewTranfer}>
                        <Text style={PaymentStyle.txtPrice}>{selectedTransfer.label}</Text>
                        <Text style={PaymentStyle.txtPrice}>  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedTransfer.price)}</Text>
                    </View>
                ) : (
                    <Text style={PaymentStyle.txtLH}>Chưa chọn phương thức vận chuyển</Text>
                )}
                <Text style={PaymentStyle.txtLH}>{selectedTransfer.note}</Text>
            </TouchableOpacity>
            <View style={PaymentStyle.ViewBodyContainer}>
                <Text style={PaymentStyle.Line} />
                <View style={PaymentStyle.ViewBody}>
                    <Text style={PaymentStyle.txtDC}>Phương thức thanh toán:</Text>
                    <TouchableOpacity onPress={HandMethod} style={PaymentStyle.btnThem}>
                        <Text style={PaymentStyle.txtDC}>
                            {selectedMethod ? (selectedMethod === 'payos' ? 'Payos' : 'Khi nhận hàng') : 'Chưa chọn'}
                        </Text>
                        <Image source={require("../../../assets/notifi/expand_right.png")} />
                    </TouchableOpacity>
                </View>

                <Text style={PaymentStyle.Line} />
                <View style={PaymentStyle.ViewBody}>
                    <Text style={PaymentStyle.txtDC}>Chọn khuyến mãi:</Text>
                    <TouchableOpacity onPress={HandVoucher} style={PaymentStyle.btnThem}>
                        {selectedVoucher ? (
                            <View style={PaymentStyle.ViewTranfer}>
                                {selectedVoucher.discountPercent ? (
                                    <Text style={PaymentStyle.txtPrice}>
                                        {selectedVoucher.discountPercent}%
                                    </Text>
                                ) : (
                                    <Text style={PaymentStyle.txtPrice}>
                                        -{selectedVoucher.discountAmount.toLocaleString()} đ
                                    </Text>
                                )}
                            </View>
                        ) : (
                            <Text style={PaymentStyle.txtLH}>Chưa chọn khuyến mãi</Text>
                        )}
                        <Image source={require("../../../assets/notifi/expand_right.png")} />
                    </TouchableOpacity>
                </View>

                <Text style={PaymentStyle.Line} />
                <View style={PaymentStyle.ViewBodynote}>
                    <Text style={PaymentStyle.txtDC}>Ghi chú:</Text>
                    <TextInput style={{
                        width: '100%',
                        height: 72,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 5,
                        marginLeft: 5,
                        padding: 4,
                        textAlignVertical: 'top'
                    }}
                        placeholder="Để lại ghi chú"
                        multiline
                        numberOfLines={4} />
                </View>
                <Text style={PaymentStyle.Line} />
                <View>
                    <Text style={[PaymentStyle.txtDC, PaymentStyle.paddingHorizontal]}>Chi tiết thanh toán</Text>

                    <View style={[PaymentStyle.ViewBody, PaymentStyle.Height]}>
                        <Text style={PaymentStyle.txtDC1}>Tổng tiền sản phẩm:</Text>
                        <Text style={PaymentStyle.txtPrice1}>{totalPrice.toLocaleString()}đ</Text>
                    </View>
                    <View style={[PaymentStyle.ViewBody, PaymentStyle.Height]}>
                        <Text style={PaymentStyle.txtDC1}>Tiền vận chuyển:</Text>
                        <Text style={PaymentStyle.txtPrice1}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedTransfer.price)}</Text>
                    </View>
                    <View style={[PaymentStyle.ViewBody, PaymentStyle.Height]}>
                        <Text style={PaymentStyle.txtDC1}>Khuyến mãi:</Text>
                        <Text style={PaymentStyle.txtPrice1}>
                            {selectedVoucher && selectedVoucher.discountAmount !== undefined ? (
                                selectedVoucher.discountPercent ? (
                                    `-${selectedVoucher.discountPercent}%`
                                ) : (
                                    `-${parseFloat(selectedVoucher.discountAmount).toLocaleString()}đ`
                                )
                            ) : (

                                '0đ'
                            )}
                        </Text>

                    </View>
                    <View style={[PaymentStyle.ViewBody, PaymentStyle.Height]}>
                        <Text style={PaymentStyle.txtDC}>Tổng thanh toán:</Text>
                        <Text style={PaymentStyle.txtDC}>{totalPayment.toLocaleString()}đ</Text>
                    </View>
                </View>
                <Text style={[PaymentStyle.Line, PaymentStyle.maginButtom]} />
                <View style={PaymentStyle.ViewFooter}>
                    <TouchableOpacity onPress={HandPaySuccess} style={PaymentStyle.btnSubmit}>
                        <Text style={PaymentStyle.txtBtn}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Payment;