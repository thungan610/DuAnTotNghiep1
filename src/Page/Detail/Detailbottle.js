import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import PagerView from 'react-native-pager-view';
import styleDetailbottle from './style';

const Detailbottle = (prop, route) => {
    const { categoryId } = route.params;
    const { product } = prop.route.params || {};
    console.log('producccct', product);
    
    const [productDetails, setProductDetails] = useState(product);

    console.log('productDetails', productDetails);
    
    const [selectedProduct, setselectedProduct] = useState(product);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [images, setImages] = useState(product?.images || []);
    const [unitPrice, setUnitPrice] = useState(product?.price || 0);
    const [price, setPrice] = useState(product?.price || 0);
    const [hasNotification, setHasNotification] = useState(false);


    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await AxiosInstanceSP().get(`/products/filter/${categoryId}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductsByCategory();
    }, [categoryId]);

    useEffect(() => {
        if (product) {
            setProductDetails(product);
            setImages(product.images || []);
            setUnitPrice(product.price || 0);
            setPrice(product.price || 0);
        }
    }, [product]);

    useEffect(() => {
        console.log('Category ID:', categoryId);
    }, [categoryId]);

    useEffect(() => {
        setPrice(quantity * unitPrice);
    }, [quantity, unitPrice]);

    const updateQuantity = (value) => {
        setQuantity((prevQuantity) => prevQuantity + value);
        setPrice((prevQuantity) => (prevQuantity + value) * unitPrice);
    };
    

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        setPrice((quantity + 1) * unitPrice);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
            setPrice((quantity - 1) * unitPrice);
        } else {
            Alert.alert('Thông báo', ' Số lượng sản phẩm tối thiểu là 1 ')
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
                                <View style={styleDetailbottle.textoriginRow}>
                                    <Text style={styleDetailbottle.textorigin}>Công dụng :</Text>
                                    <Text style={styleDetailbottle.textorigin}>{productDetails.description || 'Chưa có thông tin'}</Text>
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