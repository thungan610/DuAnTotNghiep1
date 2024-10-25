import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import PagerView from 'react-native-pager-view';
import styleDetail from './style';

const Detail = (prop) => {
    const { product } = prop.route.params || {};
    const [productDetails, setProductDetails] = useState(product);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedProduct, setselectedProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [images, setImages] = useState([]);
    const [unitPrice, setUnitPrice] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const fetchProductDescription = async () => {
            try {
                // Kiểm tra xem product.id có tồn tại không
                if (product.id) {
                    const response = await axios.get(`https://api-h89c.onrender.com/carts/addCart_App/${product.id}`);
                    // ...
                } else {
                    console.error('ID sản phẩm không tồn tại');
                }
            } catch (error) {
                console.error('Lỗi khi lấy mô tả sản phẩm từ API:', error.message);
                Alert.alert('Lỗi', `Không thể lấy mô tả sản phẩm: ${error.message}`);
            }
        };

        fetchProductDescription();
    }, [product. id]);

    useEffect(() => {
        if (unitPrice) {
            setPrice(quantity * unitPrice);
        }
    }, [quantity, unitPrice]);

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        } else {
            Alert.alert('Thông báo', 'Số lượng sản phẩm tối thiểu là 1');
        }
    };

    const renderImages = () => {
        return images.map((item, index) => (
            <View key={index}>
                <Image
                    resizeMode='contain'
                    source={{ uri: item }}
                    style={{
                        width: '100%',
                        height: 360,
                    }}
                />
            </View>
        ));
    };

    const renderDots = () => {
        return images.map((_, index) => (
            <View key={index} style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: selectedIndex === index ? 'black' : 'gray',
                margin: 5,
            }} />
        ));
    };

    return (
        <View style={styleDetail.container}>
            <View style={styleDetail.head}>
                <TouchableOpacity onPress={() => prop.navigation.navigate('BottomNav',{ product: selectedProduct })}>
                    <Image source={require('../../assets/notifi/backright.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            borderRadius: 20,
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: 'white',
                            marginRight: 6
                        }}
                        onPress={() => prop.navigation.navigate('AddProductsScreen')}
                    >
                        <Image style={styleDetail.iconcart} source={require('../../assets/home/cart.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={styleDetail.body}>
                    <View>
                        <PagerView
                            style={styleDetail.pagerView}
                            initialPage={selectedIndex}
                            onPageSelected={e => setSelectedIndex(e.nativeEvent.position)}
                        >
                            {renderImages()}
                        </PagerView>
                        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            {renderDots()}
                        </View>
                    </View>
                    <View style={{
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                        backgroundColor: 'white',
                        height: '100%',
                        width: '100%',
                    }}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={styleDetail.bodyText}>
                                <Text style={styleDetail.textBody}>
                                    {productDetails.name || 'Tên sản phẩm'}
                                </Text>
                                <Text style={styleDetail.textkg}>
                                    {productDetails.weight ? `${productDetails.weight}kg` : 'Khối lượng sản phẩm'}
                                </Text>
                            </View>
                            <View style={styleDetail.butonView}>
                                <View style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#EAEAEA',
                                    width: 100,
                                    height: 44,
                                    alignItems: 'center',
                                    borderRadius: 14,
                                    padding: 4,
                                    justifyContent: 'space-between',
                                }}>
                                    <TouchableOpacity onPress={decreaseQuantity}>
                                        <Text style={styleDetail.textTout}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styleDetail.toutText}>{quantity}</Text>
                                    <TouchableOpacity onPress={increaseQuantity}>
                                        <Text style={styleDetail.textTout}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 5
                                }}>
                                    <Image style={styleDetail.dolar} source={require('../../assets/Dollar.png')} />
                                    <Text style={styleDetail.price}>{price.toLocaleString()}đ</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styleDetail.textunderline}>Thông tin sản phẩm</Text>
                        <View style={styleDetail.scroollview}>
                            <View style={styleDetail.viewScroll}>
                                <Text style={styleDetail.scrollText}>
                                    {productDetails.description || 'Mô tả sản phẩm chưa được cung cấp'}
                                </Text>
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
                                    <Text style={styleDetail.textorigin}>{productDetails.storage || 'Chưa có thông tin'}</Text>
                                </View>
                                <View style={styleDetail.textoriginRow}>
                                    <Text style={styleDetail.textorigin}>Công dụng:</Text>
                                    <Text style={styleDetail.textorigin}>{productDetails.usage || 'Chưa có thông tin'}</Text>
                                </View>
                            </View>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 40
                            }}>
                                <TouchableOpacity style={styleDetail.headerFooter}>
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
