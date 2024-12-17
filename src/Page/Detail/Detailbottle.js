import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../Action/cartActions';
import Toast from 'react-native-toast-message';
import styleDetailbottle from './styleDetailbottle';
import axiosInstance from '../../../src/Page/api/AxiosInstance';


const Detailbottle = ({ route, navigation }) => {
    const { product } = route.params || {};

    console.log('product', product);

    const dispatch = useDispatch();
    const [selectedProduct, setselectedProduct] = useState();
    const [productDetails, setProductDetails] = useState(product || {});

    console.log('productDetails', productDetails.id);

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
    console.log('user', user);
    
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
                const response = await axiosInstance.get(`/products/getProductDetailById_App/${product.id}`);
                if (response?.data) {
                    setProductDetails(response.data);
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

    // useEffect(() => {
    //     setPrice(quantity * productDetails.price);
    // }, [quantity, productDetails.price]);
 useEffect(() => {
        const priceBeforeDiscount = quantity * productDetails.price;
        const discountAmount = discount;
        const priceAfterDiscount = productDetails.price - discountAmount;
        setPrice(priceAfterDiscount * quantity);
    }, [quantity, productDetails.price]);
    useEffect(() => {
        const getCategoriesAndPreserves = async () => {
            try {
                const categoryResponse = await axiosInstance.get("/categories");
                setCategories(categoryResponse.data.data);

                const preserveResponse = await axiosInstance.get("/preserves");
                setPreserves(preserveResponse.data.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        getCategoriesAndPreserves();
    }, []);


    const increaseQuantity = () => {
        if (quantity < productDetails.quantity) { // Giới hạn theo tồn kho
            setQuantity(prevQuantity => prevQuantity + 1);
        } else {
            Alert.alert("Thông báo", `Bạn chỉ có thể mua tối đa ${productDetails.quantity} sản phẩm còn trong kho.`);
        }
    };
    
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
    

    const addToCartHandler = async () => {
        if (!user?.email) {
            Alert.alert(
                'Thông báo',
                'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.',
                [
                    {
                        text: 'Đăng nhập',
                        onPress: () => {
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
    
        const productToAdd = {
            id: productDetails.id,
            name: product.name,
            price: unitPrice,
            quantity,
            category: product.category,
            images: product.images,
            selected: true,
        };
        console.log('productToAdd', productToAdd);
    
        try {
            const response = await axiosInstance.post('/carts/addCart_App', {
                user: user.userData._id, 
                products: [productToAdd],
            });
            
            // Kiểm tra phản hồi từ máy chủ
            if (response.data.error) {
                Alert.alert('Lỗi', response.data.error);
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Thông báo',
                    text2: 'Thêm sản phẩm thành công!',
                    visibilityTime: 2000,
                    position: 'top'
                });
    
                dispatch(addToCart(productToAdd)); // Cập nhật giỏ hàng trong Redux
            }
        } catch (error) {
            const errorMessage = error.response?.data?.data || 'Đã có lỗi xảy ra, vui lòng thử lại.';
            Alert.alert('Thông báo', errorMessage);
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
    const updateQuantity = (newQuantity) => {
        setQuantity(newQuantity);
    };

    return (
        <View style={styleDetailbottle.container}>
            <View style={styleDetailbottle.head}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomNav', { product: selectedProduct })}>
                    <Image source={require('../../assets/notifi/backright.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: 'white', marginRight: 6 }} onPress={() => navigation.navigate('AddProductsScreen')}>
                        <Image style={styleDetailbottle.iconcart} source={require('../../assets/home/cart.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: 'white' }} onPress={() => navigation.navigate('NotifiScreen')}>
                        <Image style={styleDetailbottle.iconnotifi} source={require('../../assets/home/notifi.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={styleDetailbottle.body}>
                    <PagerView style={styleDetailbottle.pagerView} initialPage={selectedIndex} onPageSelected={e => setSelectedIndex(e.nativeEvent.position)}>
                        {renderImages()}
                    </PagerView>
                    <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {renderDots()}
                    </View>
                    <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: 'white', height: '100%', width: '100%' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={styleDetailbottle.bodyText}>
                                <Text style={styleDetailbottle.textBody}>{productDetails.name || 'Tên sản phẩm'}</Text>
                                <Text style={styleDetailbottle.textkg}>{productDetails.oum || 'Khối lượng sản phẩm'}</Text>
                            </View>
                            <View style={styleDetailbottle.butonView}>
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
                                        <Text style={styleDetailbottle.textTout}>-</Text>
                                    </TouchableOpacity>

                                    <TextInput
                                        style={[
                                            styleDetailbottle.toutText,
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
                                        <Text style={styleDetailbottle.textTout}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        textDecorationLine: 'line-through',
                                                       left:50,
                                                       top:-20
                                                    }}>
                                                    {fixedPrice.toLocaleString()}.đ
                                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <View>
                                        <Text
                                            style={{
                                                fontSize:18,
                                                color:'red'
                                            }}>
                                                {fixedPrice.toLocaleString()}.đ</Text>
                                    </View>
                                    <View 
                                    style={{ flexDirection: 'row', alignItems: 'center', marginBottom:14 }}>
                                        <Text style={styleDetailbottle.price}>{price.toLocaleString()}.đ</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Text style={styleDetailbottle.textunderline}>Thông tin sản phẩm</Text>
                        <View style={styleDetailbottle.scroollview}>
                            <View style={styleDetailbottle.viewScroll}>
                                <Text style={styleDetailbottle.scrollText}>{productDetails.description || 'Mô tả sản phẩm chưa được cung cấp'}</Text>
                            </View>
                            <View style={styleDetailbottle.origin}>
                                <View style={styleDetailbottle.textoriginRow}>
                                    <Text style={styleDetailbottle.textorigin}>Xuất xứ: </Text>
                                    <Text style={styleDetailbottle.textorigin}>{productDetails.origin || 'Chưa có thông tin'}</Text>
                                </View>
                                <View style={styleDetailbottle.textoriginRow}>
                                    <Text style={styleDetailbottle.textorigin}>Nhà cung cấp: </Text>
                                    <Text style={styleDetailbottle.textorigin}>{productDetails.supplier || 'Chưa có thông tin'}</Text>
                                </View>
                                <View style={styleDetailbottle.textoriginRow}>
                                    <Text style={styleDetailbottle.textorigin}>Chất sơ: </Text>
                                    <Text style={styleDetailbottle.textorigin}>{productDetails.fiber || 'Không có dữ liệu'}</Text>
                                </View>
                                <View style={styleDetailbottle.textoriginRow}>
                                    <Text style={styleDetailbottle.textorigin}>Bảo quản: </Text>
                                    <Text style={styleDetailbottle.textorigin}>{productDetails.preserve || 'Chưa có thông tin'}</Text>
                                </View>
                                 <View style={styleDetailbottle.textoriginRow}>
                                    <Text style={styleDetailbottle.textorigin}>Số lượng tồn kho: </Text>
                                    <Text style={styleDetailbottle.textorigin}>{productDetails.quantity || 'Chưa có thông tin'}</Text>
                                </View>
                                <View>
                                    <Text style={styleDetailbottle.textorigin}>Công dụng: </Text>
                                    <Text style={styleDetailbottle.textorigin}>• {productDetails.description || 'Chưa có thông tin'}</Text>

                                </View>
                            </View>
                            <View style={styleDetailbottle.botter}>
                                <TouchableOpacity onPress={() => updateQuantity(1)} style={styleDetailbottle.botertout}>
                                    <Text style={styleDetailbottle.textboter}>1 chai</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => updateQuantity(6)} style={styleDetailbottle.botertout}>
                                    <Text style={styleDetailbottle.textboter}>6 chai</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => updateQuantity(24)} style={styleDetailbottle.botertout}>
                                    <Text style={styleDetailbottle.textboter}>1 thùng</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}>
                                <TouchableOpacity onPress={addToCartHandler} style={styleDetailbottle.headerFooter}>
                                    <Text style={styleDetailbottle.textFooter}>Thêm vào giỏ hàng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Detailbottle;
