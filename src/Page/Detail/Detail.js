import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import PagerView from 'react-native-pager-view';
import styleDetail from './style';
const Detail = (prop) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [unitPrice, setUnitPrice] = useState(0);
    const [productDetails, setProductDetails] = useState({});
    const [hasNotification, setHasNotification] = useState(false); 

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('YOUR_NOTIFICATION_API_URL');
                const data = await response.json();
                
                // Nếu có thông báo mới, hiển thị chấm đỏ
                if (data.newNotifications) {
                    setHasNotification(true);
                }
            } catch (error) {
                console.error('Lỗi khi kiểm tra thông báo:', error);
            }
        };

        fetchNotifications();
    }, []);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch('YOUR_API_URL');
                const data = await response.json();

                setProductDetails({
                    name: data.name,
                    weight: data.weight,
                    images: data.images,
                    price: data.price,
                    description: data.description,
                    origin: data.origin,
                    fiber: data.fiber,
                    storage: data.storage,
                    usage: data.usage
                });

                setUnitPrice(data.price);
                setPrice(data.price * quantity);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin sản phẩm từ API:', error);
                Alert.alert('Lỗi', 'Không thể lấy thông tin sản phẩm');
            }
        };

        fetchProductDetails();
    }, [quantity]);


    const images = [
        'https://product.hstatic.net/1000282430/product/upload_deb91932d62348309be82c41136ba92d_c6ba4735a301452399d6a3541535a19c_master.jpg',
        'https://www.hasfarmgreens.com/wp-content/uploads/2021/07/Bap-Cai-Trang-1-700x700.png',
        'https://www.hasfarmgreens.com/wp-content/uploads/2021/07/Bap-Cai-Trang-1-700x700.png'
    ]
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

    const handleAddToCart = async () => {
        const product = {
            name: 'Bắp cải trắng',
            quantity: quantity,
            price: 19000,
            // Bạn có thể thêm các thuộc tính khác nếu cần
        };

        try {
            const response = await fetch('YOUR_API_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            Alert.alert('Thành công', 'Sản phẩm đã được thêm vào giỏ hàng');

            // Điều hướng đến màn hình AddProduct và truyền sản phẩm
            prop.navigation.navigate('AddProduct', { product: data });
        } catch (error) {
            console.error('Lỗi:', error);
            Alert.alert('Lỗi', 'Không thể thêm sản phẩm vào giỏ hàng');
        }
    };


    const renderImages = () => {
        return (productDetails.images || ['DEFAULT_IMAGE_URL']).map((item, index) => {
            return (
                <View key={index + 1}>
                    <Image
                        resizeMode='contain'
                        source={{ uri: item }}
                        style={{
                            width: '100%',
                            height: 400,
                        }}
                    />
                </View>
            )
        })
    }
    const renderDots = () => {
        return (productDetails.images || ['DEFAULT_IMAGE_URL']).map((item, index) => {
            return (
                <View key={index + 1}
                    style={{
                        width: 10, height: 10,
                        borderRadius: 5,
                        backgroundColor: selectedIndex === index ? 'black' : 'gray',
                        margin: 5,
                    }} />
            )
        })
    }

    return (
        <View style={styleDetail.container}>

            <View style={styleDetail.head}>
                <TouchableOpacity onPress={() => prop.navigation.navigate('BottomNav')}>
                    <Image source={require('../../assets/notifi/backright.png')} />
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity onPress={() => prop.navigation.navigate('AddProductsScreen')}>
                        <Image style={styleDetail.iconcart} source={require('../../assets/home/cart.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNotificationClick}>
                        <Image style={styleDetail.iconnotifi} source={require('../../assets/home/notifi.png')} />
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
                            backgroundColor: '#37C5DF',
                            height: '100%',
                            width: '100%',
                        }}>
                        <View
                            style={{
                                flexDirection: 'column',
                            }} >
                            <View style={styleDetail.bodyText}>
                                <Text style={styleDetail.textBody}>
                                    {productDetails.name || 'Tên sản phẩm'}
                                </Text>
                                <Text style={styleDetail.textkg}>
                                    {productDetails.weight ? `${productDetails.weight}kg` : 'Khối lượng sản phẩm'}
                                </Text>
                            </View>

                            <View style={styleDetail.butonView}>
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
                                        <Text style={styleDetail.textTout}>-</Text>
                                    </TouchableOpacity>

                                    <Text style={styleDetail.toutText}>{quantity}</Text>

                                    <TouchableOpacity style={{
                                        marginRight: 6
                                    }} onPress={increaseQuantity}>
                                        <Text style={styleDetail.textTout}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
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
                                    <Text style={styleDetail.textorigin}>Xuất xứ  :</Text>
                                    <Text style={styleDetail.textorigin}>{productDetails.origin || 'Chưa có thông tin'}</Text>
                                </View>
                                <View style={styleDetail.textoriginRow}>
                                    <Text style={styleDetail.textorigin}>Chất sơ  :</Text>
                                    <Text style={styleDetail.textorigin}>{productDetails.fiber || 'Không có dữ liệu'}</Text>
                                </View>
                                <View style={styleDetail.textoriginRow}>
                                    <Text style={styleDetail.textorigin}>Bảo quản  :</Text>
                                    <Text style={styleDetail.textorigin}>{productDetails.storage || 'Chưa có thông tin'}</Text>
                                </View>
                                <View style={styleDetail.textoriginRow}>
                                    <Text style={styleDetail.textorigin}>Công dụng :</Text>
                                    <Text style={styleDetail.textorigin}>{productDetails.usage || 'Chưa có thông tin'}</Text>
                                </View>
                            </View>

                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 40
                            }}>
                                <TouchableOpacity onPress={handleAddToCart} style={styleDetail.headerFooter}>
                                    <Text style={styleDetail.textFooter}>Thêm vào giỏ hàng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View >
    );
};
export default Detail;
