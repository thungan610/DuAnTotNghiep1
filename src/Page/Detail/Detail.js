import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import PagerView from 'react-native-pager-view';
import AxiosInstance from '../../../src/Page/api/AxiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import styleDetail from './style';
import { addToCart } from '../Action/cartActions';
import Toast from 'react-native-toast-message';

const MAX_QUANTITY = 10;

const Detail = ({ route, navigation }) => {
    const { product } = route.params || {};
    const dispatch = useDispatch();
    const [selectedProduct, setselectedProduct] = useState();
    const [productDetails, setProductDetails] = useState(product || {});
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [initialQuantity] = useState(1);
    const [images, setImages] = useState(product?.images || []);
    const [unitPrice, setUnitPrice] = useState(product?.price || 0);
    const [price, setPrice] = useState(product?.price || 0);
    const [categories, setCategories] = useState([]);
    const [preserves, setPreserves] = useState([]);
    const [fixedPrice, setFixedPrice] = useState(product?.price || 0);
    const [discount, setDiscount] = useState(product?.discount || 0);


    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.items);

    useEffect(() => {
        if (product) {
            setProductDetails(product);
        }
    }, [product]);

    useEffect(() => {
        if (product) {
            setFixedPrice(product.price || 0);
        }
    }, [product]);


    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await AxiosInstance.get(`/products/getProductDetailById_App/${product.id}`);

                if (response?.data) {
                    setProductDetails(response);
                    setUnitPrice(response.data.price || 0);
                    setPrice(response.data.price || 0);
                }
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
                Alert.alert("Thông báo", "Không thể tải thông tin sản phẩm");
            }
        };

        if (product?.id) {
            fetchProductDetails();
        }
    }, [product]);

    useEffect(() => {
        if (product) {
            setProductDetails(product);
            setImages(product.images || []);
            setUnitPrice(product.price || 0);
            setPrice(product.price || 0);
        }
    }, [product]);

    useEffect(() => {
        const priceBeforeDiscount = quantity * productDetails.price;
        const discountAmount = discount;
        const priceAfterDiscount = productDetails.price - discountAmount;
        setPrice(priceAfterDiscount * quantity);
    }, [quantity, productDetails.price]);

    useEffect(() => {
        const getCategoriesAndPreserves = async () => {
            try {
                const categoryResponse = await AxiosInstance.get("/categories");
                setCategories(categoryResponse.data.data);

                const preserveResponse = await AxiosInstance.get("/preserves");
                setPreserves(preserveResponse.data.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        getCategoriesAndPreserves();
    }, []);

    const increaseQuantity = () => {
        if (quantity < MAX_QUANTITY) {
            setQuantity(prevQuantity => prevQuantity + 1);
        } else {
            Alert.alert("Thông báo", `Bạn chỉ có thể mua tối đa ${MAX_QUANTITY} sản phẩm.`);
        }
    };


    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const amount = (productDetails.price - (Number(productDetails.discount) || 0)) || price || 0;




    const addToCartHandler = async () => {
        if (!user?.email) {
        
            
            // Nếu người dùng chưa đăng nhập
            Alert.alert(
                'Thông báo',
                'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.',
                [
                    {
                        text: 'Đăng nhập',
                        onPress: () => {
                            // Điều hướng tới trang đăng nhập
                            navigation.navigate('Login');
                        }
                    },
                    {
                        text: 'Hủy',
                        style: 'cancel'
                    }
                ]
            );
            return;
        }
   
    
        // Nếu người dùng đã đăng nhập, thêm sản phẩm vào giỏ hàng
        const productToAdd = {
            id: productDetails.id,
            name: product.name,
            price: amount,
            quantity,
            category: product.category,
            images: product.images,
            selected: true,
        };
        console.log('productDetails', productToAdd);
    
        try {
            // Gửi request để thêm sản phẩm vào giỏ hàng
            const response = await AxiosInstance.post('/carts/addCart_App', {
                user: user.userData._id,
                products: [productToAdd],
            });
            console.log('response', response.data);
    
            // Kiểm tra xem có lỗi không
            if (response.data.error) {
                Alert.alert('Lỗi', response.data.error);
            } else {
                // Thông báo thành công
                Toast.show({
                    type: 'success',
                    text1: 'Thông báo',
                    text2: 'Thêm sản phẩm thành công!',
                    visibilityTime: 2000,
                    position: 'top'
                });
                console.log('Thêm sản phẩm vào giỏ hàng:', productToAdd);
                dispatch(addToCart(productToAdd));  // Cập nhật trạng thái giỏ hàng
            }
        } catch (error) {
            const errorMessage = error.response?.data?.data || 'Đã có lỗi xảy ra, vui lòng thử lại.';
            Alert.alert('Thông báo', errorMessage);  // Thông báo lỗi
        }
    };
    const renderImages = () => images.map((item, index) => (
        <View key={index}>
            <Image resizeMode='contain' source={{ uri: item }} style={{ width: '100%', height: '100%' }} />
        </View>
    ));

    const renderDots = () => images.map((_, index) => (
        <View key={index} style={{
            width: 10, height: 10, borderRadius: 5, backgroundColor: selectedIndex === index ? 'black' : 'gray', margin: 5,
        }} />
    ));

    return (
        <View style={styleDetail.container}>
            <View style={styleDetail.head}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomNav', { product: selectedProduct })}>
                    <Image source={require('../../assets/notifi/backright.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: 'white', marginRight: 6 }} onPress={() => navigation.navigate('AddProductsScreen')}>
                        <Image style={styleDetail.iconcart} source={require('../../assets/home/cart.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: 'white' }} onPress={() => navigation.navigate('NotifiScreen')}>
                        <Image style={styleDetail.iconnotifi} source={require('../../assets/home/notifi.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={styleDetail.body}>
                    <PagerView style={styleDetail.pagerView} initialPage={selectedIndex} onPageSelected={e => setSelectedIndex(e.nativeEvent.position)}>
                        {renderImages()}
                    </PagerView>
                    <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {renderDots()}
                    </View>
                    <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: 'white', height: '100%', width: '100%' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={styleDetail.bodyText}>
                                <Text style={styleDetail.textBody}>{productDetails.name || 'Tên sản phẩm'}</Text>
                                <Text style={styleDetail.textkg}>{productDetails.oum || 'Khối lượng sản phẩm'}</Text>
                            </View>

                            <View style={styleDetail.butonView}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#EAEAEA',
                                        width: 100, height: 44,
                                        alignItems: 'center',
                                        borderRadius: 14,
                                        padding: 4,
                                        paddingHorizontal: 12,
                                        justifyContent: 'space-between'
                                    }}>
                                    <TouchableOpacity onPress={decreaseQuantity}>
                                        <Text style={styleDetail.textTout}>-</Text>
                                    </TouchableOpacity>

                                    <TextInput
                                        style={[
                                            styleDetail.toutText,
                                            {
                                                textAlign: 'center',
                                                flex: 1,
                                                marginHorizontal: 4,
                                                padding: 0,
                                            },
                                        ]}
                                        value={quantity.toString()}
                                        onChangeText={(text) => {
                                            if (text === '') {
                                                setQuantity('');
                                            } else {
                                                const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10);
                                                if (!isNaN(numericValue)) {
                                                    setQuantity(numericValue);
                                                }
                                            }
                                        }}
                                        keyboardType="numeric"
                                        onBlur={() => {
                                            if (quantity === '' || isNaN(quantity)) {
                                                setQuantity(initialQuantity);
                                            }
                                        }}
                                    />
                                    <TouchableOpacity onPress={increaseQuantity}>
                                        <Text style={styleDetail.textTout}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {discount ? (
                                            <>
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        textDecorationLine: 'line-through',
                                                        marginRight: 10,
                                                    }}>
                                                    {fixedPrice.toLocaleString()}.đ
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        color: 'red',
                                                    }}>
                                                    {amount.toLocaleString()}đ
                                                </Text>
                                            </>
                                        ) : (
                                            <Text style={{ fontSize: 18 }}>
                                                {fixedPrice.toLocaleString()}đ
                                            </Text>
                                        )}
                                    </View>

                                    <View
                                        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                                        <Text style={styleDetail.price}>{price.toLocaleString()}đ</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Text style={styleDetail.textunderline}>Thông tin sản phẩm</Text>
                        <View style={styleDetail.scroollview}>
                            <View style={styleDetail.viewScroll}>
                                <Text style={styleDetail.scrollText}>{productDetails.description || 'Mô tả sản phẩm chưa được cung cấp'}</Text>
                            </View>
                            <View style={styleDetail.origin}>
                                <View style={styleDetail.textoriginRow}>
                                    <Text style={styleDetail.textorigin}>Xuất xứ: </Text>
                                    <Text style={styleDetail.textorigin}>{productDetails.origin || 'Chưa có thông tin'}</Text>
                                </View>
                                <View style={styleDetail.textoriginRow}>
                                    <Text style={styleDetail.textorigin}>Chất sơ: </Text>
                                    <Text style={styleDetail.textorigin}>{productDetails.fiber || 'Không có dữ liệu'}</Text>
                                </View>
                                <View style={styleDetail.textoriginRow}>
                                    <Text style={styleDetail.textorigin}>Bảo quản: </Text>
                                    <Text style={styleDetail.textorigin}>{productDetails.preserve || 'Chưa có thông tin'}</Text>
                                </View>
                                <View style={styleDetail.textoriginRow}>
                                    <Text style={styleDetail.textorigin}>Số lượng tồn kho: </Text>
                                    <Text style={styleDetail.textorigin}>{productDetails.quantity || 'Chưa có thông tin'}</Text>
                                </View>
                                <View>
                                    <Text style={styleDetail.textorigin}>Công dụng: </Text>
                                    <Text style={styleDetail.textorigin}>• {productDetails.description || 'Chưa có thông tin'}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
                                <TouchableOpacity onPress={addToCartHandler} style={styleDetail.headerFooter}>
                                    <Text style={styleDetail.textFooter}>Thêm vào giỏ hàng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Detail;
