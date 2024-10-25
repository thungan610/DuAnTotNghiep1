import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import PagerView from 'react-native-pager-view';
import styleDetailDiscout from './style';

const DetailDiscout = (prop) => {
    const { product } = prop.route.params || {};
    const [productDetails, setProductDetails] = useState(product);
    const [selectedProduct, setselectedProduct] = useState(product);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [images, setImages] = useState(product?.images || []);
    const [unitPrice, setUnitPrice] = useState(product?.price || 0);
    const [price, setPrice] = useState(product?.price || 0);
    const [hasNotification, setHasNotification] = useState(false);

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
    const handleNotificationClick = () => {
        setHasNotification(false); // Ẩn chấm đỏ
        prop.navigation.navigate('NotifiScreen'); // Điều hướng đến màn hình thông báo
    };

    const renderImages = () => {
        return images.map((item, index) => (
            <View key={index}>
                <Image
                    resizeMode='contain'
                    source={{ uri: item }}
                    style={{
                        width: '100%',
                        height: '100%',
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
        <View style={styleDetailDiscout.container}>
            <View style={styleDetailDiscout.head}>
                <TouchableOpacity onPress={() => prop.navigation.navigate('BottomNav', { product: selectedProduct })}>
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
                        onPress={() => prop.navigation.navigate('AddProductsScreen')}>
                        <Image style={styleDetailDiscout.iconcart} source={require('../../assets/home/cart.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        borderRadius: 20,
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: 'white',
                    }}
                        onPress={handleNotificationClick}>
                        <Image style={styleDetailDiscout.iconnotifi} source={require('../../assets/home/notifi.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={styleDetailDiscout.body}>
                    <View>
                        <PagerView
                            style={styleDetailDiscout.pagerView}
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
                            <View style={styleDetailDiscout.bodyText}>
                                <Text style={styleDetailDiscout.textBody}>
                                    {productDetails.name || 'Tên sản phẩm'}
                                </Text>
                                <Text style={styleDetailDiscout.textkg}>
                                    {productDetails.oum ? `${productDetails.oum}` : 'Khối lượng sản phẩm'}
                                </Text>
                            </View>
                            <View style={styleDetailDiscout.butonView}>
                                <View style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#EAEAEA',
                                    width: 100,
                                    height: 44,
                                    alignItems: 'center',
                                    borderRadius: 14,
                                    padding: 4,
                                    paddingHorizontal: 12,
                                    justifyContent: 'space-between',
                                }}>
                                    <TouchableOpacity onPress={decreaseQuantity}>
                                        <Text style={styleDetailDiscout.textTout}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styleDetailDiscout.toutText}>{quantity}</Text>
                                    <TouchableOpacity onPress={increaseQuantity}>
                                        <Text style={styleDetailDiscout.textTout}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        color: 'black',
                                        fontSize: 16,
                                        textDecorationLine: 'line-through',
                                        fontWeight: '200'
                                    }}>{price.toLocaleString()}đ</Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: 5
                                        }}>
                                        <Image style={styleDetailDiscout.dolar} source={require('../../assets/Dollar.png')} />
                                        <Text style={styleDetailDiscout.price}>{price.toLocaleString()}.000đ</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Text style={styleDetailDiscout.textunderline}>Thông tin sản phẩm</Text>
                        <View style={styleDetailDiscout.scroollview}>
                            <View style={styleDetailDiscout.viewScroll}>
                                <Text style={styleDetailDiscout.scrollText}>
                                    {productDetails.description || 'Mô tả sản phẩm chưa được cung cấp'}
                                </Text>
                            </View>
                            <View style={styleDetailDiscout.origin}>
                                <View style={styleDetailDiscout.textoriginRow}>
                                    <Text style={styleDetailDiscout.textorigin}>Xuất xứ:</Text>
                                    <Text style={styleDetailDiscout.textorigin}>{productDetails.origin || 'Chưa có thông tin'}</Text>
                                </View>
                                <View style={styleDetailDiscout.textoriginRow}>
                                    <Text style={styleDetailDiscout.textorigin}>Chất sơ:</Text>
                                    <Text style={styleDetailDiscout.textorigin}>{productDetails.fiber || 'Không có dữ liệu'}</Text>
                                </View>
                                <View style={styleDetailDiscout.textoriginRow}>
                                    <Text style={styleDetailDiscout.textorigin}>Bảo quản:</Text>
                                    <Text style={styleDetailDiscout.textorigin}>{productDetails.preserve || 'Chưa có thông tin'}</Text>
                                </View>
                                <View style={styleDetailDiscout.textoriginRow}>
                                    <Text style={styleDetailDiscout.textorigin}>Công dụng:</Text>
                                    <Text style={styleDetailDiscout.textorigin}>{productDetails.uses || 'Chưa có thông tin'}</Text>
                                </View>

                            </View>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 40
                            }}>
                                <TouchableOpacity style={styleDetailDiscout.headerFooter}>
                                    <Text style={styleDetailDiscout.textFooter}>Thêm vào giỏ hàng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default DetailDiscout;
