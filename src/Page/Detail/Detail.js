import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import PagerView from 'react-native-pager-view';
import AxiosInstance from '../../../src/Page/api/AxiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import styleDetail from './style';

const Detail = ({ route, navigation }) => {
    const { product } = route.params || {};
   
    const [productDetails, setProductDetails] = useState(product || {});
    const [selectedIndex, setSelectedIndex] = useState();
    // const [selectedQuantity, setselectedQuantity] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [images, setImages] = useState(product?.images || []);
    const [unitPrice, setUnitPrice] = useState(product?.price || 0);
    const [price, setPrice] = useState(product?.price || 0);
    const [categories, setCategories] = useState([]);
    const [preserves, setPreserves] = useState([]);

    // Lấy thông tin người dùng từ Redux
    const user = useSelector(state => state.user);
    console.log(user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (product) {
            setProductDetails(product);
            setImages(product.images || []);
            setUnitPrice(product.price || 0);
            setPrice(product.price || 0);
        }
    }, [product]);

    useEffect(() => {
        setPrice(quantity * unitPrice);
    }, [quantity, unitPrice]);

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

    const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        } else {
            Alert.alert('Thông báo', 'Số lượng sản phẩm tối thiểu là 1');
        }
    };

    const addToCart = async () => {
        if (!user?.email) {
            Alert.alert(
                'Thông báo',
                'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.',
                [
                    {
                        text: 'Đăng nhập',
                        onPress: () => {
                            navigation.navigate('Login'); // Chuyển màn hình nếu người dùng nhấn "Đăng nhập"
                        }
                    },
                    {
                        text: 'Hủy',
                        style: 'cancel'
                    }
                ]
            );
            return; // Dừng hàm nếu người dùng chưa đăng nhập
        }
        console.log(product);
        const productToAdd = {
            id: product.id,
            name: product.name,
            price: unitPrice,
            quantity,
            images: product.images,
        };
        try {
            const response = await AxiosInstance.post('/carts/addCart_App', {
                user: user.userData._id,
                products: [productToAdd]
            });

            Alert.alert("Thông báo", response.data.message || "Thêm sản phẩm thành công!");
            navigation.navigate('AddProduct'); // Điều hướng đến màn hình giỏ hàng
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
            Alert.alert('Thông báo', 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
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
                                <View style={{ flexDirection: 'row', backgroundColor: '#EAEAEA', width: 100, height: 44, alignItems: 'center', borderRadius: 14, padding: 4, paddingHorizontal: 12, justifyContent: 'space-between' }}>
                                    <TouchableOpacity onPress={decreaseQuantity}><Text style={styleDetail.textTout}>-</Text></TouchableOpacity>
                                    <Text style={styleDetail.toutText}>{quantity}</Text>
                                    <TouchableOpacity onPress={increaseQuantity}><Text style={styleDetail.textTout}>+</Text></TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                    <Image style={styleDetail.dolar} source={require('../../assets/Dollar.png')} />
                                    <Text style={styleDetail.price}>{price.toLocaleString()}.000đ</Text>
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
                                    <Text style={styleDetail.textorigin}>Xuất xứ:</Text>
                                    <Text style={styleDetail.textorigin}>{productDetails.origin || 'Chưa có thông tin'}</Text>
                                </View>
                                <View style={styleDetail.textoriginRow}>
                                    <Text style={styleDetail.textorigin}>Chất sơ:</Text>
                                    <Text style={styleDetail.textorigin}>{productDetails.fiber || 'Không có dữ liệu'}</Text>
                                </View>
                                <View style={styleDetail.textoriginRow}>
                                    <Text style={styleDetail.textorigin}>Bảo quản:</Text>
                                    <Text style={styleDetail.textorigin}>{productDetails.preserve || 'Chưa có thông tin'}</Text>
                                </View>
                                <View style={styleDetail.textoriginRow}>
                                    <Text style={styleDetail.textorigin}>Công dụng:</Text>
                                    <Text style={styleDetail.textorigin}>{productDetails.uses || 'Chưa có thông tin'}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
                                <TouchableOpacity onPress={addToCart} style={styleDetail.headerFooter}>
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
