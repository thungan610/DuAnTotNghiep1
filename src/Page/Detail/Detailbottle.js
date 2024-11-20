import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import PagerView from 'react-native-pager-view';
import styleDetailbottle from './style';
import { useDispatch, useSelector } from 'react-redux';

const Detailbottle = ({ route, navigation }) => {
    const { categoryId, product } = route.params || {};
    const dispatch = useDispatch()

    const [productDetails, setProductDetails] = useState(product || {});
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(product?.price || 0);
    const [categories, setCategories] = useState([]);
    const [preserves, setPreserves] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const user = useSelector(state => state.user);

    // Lấy thông tin danh mục và bảo quản từ API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await AxiosInstance.get('/categories');
                setCategories(categoryResponse.data.data);

                const preserveResponse = await AxiosInstance.get('/preserves');
                setPreserves(preserveResponse.data.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, []);

    // Cập nhật giá dựa trên số lượng
    useEffect(() => {
        setPrice(quantity * (productDetails.price || 0));
    }, [quantity, productDetails.price]);

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const addToCartHandler = async () => {
        if (!user?.email) {
            Alert.alert(
                'Thông báo',
                'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.',
                [
                    {
                        text: 'Đăng nhập',
                        onPress: () => navigation.navigate('Login'),
                    },
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                ]
            );
            return;
        }

        const productToAdd = {
            id: productDetails.id,
            name: productDetails.name,
            price: productDetails.price,
            quantity,
            images: productDetails.images,
        };

        try {
            const response = await AxiosInstance.post('/carts/addCart_App', {
                userId: user.userData._id,
                products: [productToAdd],
            });

            if (response.data.error) {
                Alert.alert('Lỗi', response.data.error);
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Thành công',
                    text2: 'Đã thêm sản phẩm vào giỏ hàng!',
                    visibilityTime: 2000,
                });
                dispatch(addToCart(productToAdd));
            }
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
            Alert.alert('Lỗi', 'Không thể thêm sản phẩm vào giỏ hàng.');
        }
    };

    const renderImages = () =>
        (productDetails.images || []).map((item, index) => (
            <View key={index}>
                <Image resizeMode="contain" source={{ uri: item }} style={{ width: '100%', height: '100%' }} />
            </View>
        ));

    const renderDots = () =>
        (productDetails.images || []).map((_, index) => (
            <View
                key={index}
                style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: selectedIndex === index ? 'black' : 'gray',
                    margin: 5,
                }}
            />
        ));
    return (
        <View style={styleDetailbottle.container}>
            <View style={styleDetailbottle.head}>
                <TouchableOpacity onPress={() => prop.navigation.navigate('BottomNav')}>
                    <Image source={require('../../assets/notifi/backright.png')} />
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity style={{
                        borderRadius: 20,
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: 'white',
                        marginRight: 6
                    }}
                        onPress={() => prop.navigation.navigate('AddProduct')}>
                        <Image style={styleDetailbottle.iconcart} source={require('../../assets/home/cart.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        borderRadius: 20,
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: 'white',
                        marginRight: 6
                    }}
                        onPress={() => prop.navigation.navigate('NewNotifi')}>
                        <Image style={styleDetailbottle.iconnotifi} source={require('../../assets/home/notifi.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={styleDetailbottle.body}>
                    <View>
                        <PagerView
                            style={styleDetailbottle.pagerView}
                            initialPage={selectedIndex}
                            onPageSelected={e => setSelectedIndex(e.nativeEvent.position)}
                        >
                            {renderImages()}
                        </PagerView>

                        <View style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {renderDots()}
                        </View>
                    </View>

                    <View
                        style={{
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                            backgroundColor: 'white',
                            height: '100%',
                            width: '100%',
                        }}>
                        <View
                            style={{
                                flexDirection: 'column',
                            }} >
                            <View style={styleDetailbottle.bodyText}>
                                <Text style={styleDetailbottle.textBody}>
                                    {productDetails.name || 'Tên sản phẩm'}
                                </Text>
                                <Text style={styleDetailbottle.textkg}>
                                    {productDetails.oum ? `${productDetails.oum}` : 'Khối lượng sản phẩm'}
                                </Text>
                            </View>
                            <View style={styleDetailbottle.butonView}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#EAEAEA',
                                        width: 100,
                                        height: 44,
                                        alignItems: 'center',
                                        borderRadius: 14,
                                        padding: 4,
                                        justifyContent: 'space-between',
                                    }}>
                                    <TouchableOpacity style={{
                                        marginLeft: 6
                                    }} onPress={decreaseQuantity}>
                                        <Text style={styleDetailbottle.textTout}>-</Text>
                                    </TouchableOpacity>

                                    <Text style={styleDetailbottle.toutText}>{quantity}</Text>

                                    <TouchableOpacity style={{
                                        marginRight: 6
                                    }} onPress={increaseQuantity}>
                                        <Text style={styleDetailbottle.textTout}>+</Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 5
                                    }}>
                                    <Image style={styleDetailbottle.dolar} source={require('../../assets/Dollar.png')} />
                                    <Text style={styleDetailbottle.price}>{price.toLocaleString()}.000đ</Text>
                                </View>
                            </View>
                        </View>


                        <Text style={styleDetailbottle.textunderline}>Thông tin sản phẩm</Text>

                        <View style={styleDetailbottle.scroollview}>
                            <View style={styleDetailbottle.viewScroll}>
                                <Text style={styleDetailbottle.scrollText}>
                                    {productDetails.description || 'Mô tả sản phẩm chưa được cung cấp'}
                                </Text>
                            </View>

                            <View style={styleDetailbottle.origin}>
                                <View style={styleDetailbottle.textoriginRow}>
                                    <Text style={styleDetailbottle.textorigin}>Xuất xứ  :</Text>
                                    <Text style={styleDetailbottle.textorigin}>{productDetails.origin || 'Chưa có thông tin'}</Text>
                                </View>
                                <View style={styleDetailbottle.textoriginRow}>
                                    <Text style={styleDetailbottle.textorigin}>Chất sơ  :</Text>
                                    <Text style={styleDetailbottle.textorigin}>{productDetails.fiber || 'Không có dữ liệu'}</Text>
                                </View>
                                <View style={styleDetailbottle.textoriginRow}>
                                    <Text style={styleDetailbottle.textorigin}>Bảo quản  :</Text>
                                    <Text style={styleDetailbottle.textorigin}>{productDetails.preserve || 'Chưa có thông tin'}</Text>
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
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 40
                            }}>
                                <TouchableOpacity style={styleDetailbottle.headerFooter}>
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