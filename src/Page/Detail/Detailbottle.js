import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import PagerView from 'react-native-pager-view';
import styleDetailbottle from './styleDetailbottle';

const Detailbottle = (prop) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [unitPrice, setUnitPrice] = useState(0);
    const [productDetails, setProductDetails] = useState({});
    const [hasNotification, setHasNotification] = useState(false);

    useEffect(() => {
        setPrice(quantity * unitPrice);
    }, [quantity, unitPrice]);


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
        'https://pastaparadise.com.vn/wp-content/uploads/2021/01/cocazero.jpg',
        'https://cdn.tgdd.vn/Products/Images/2443/190309/bhx/nuoc-ngot-coca-cola-light-lon-330ml-202209111853245462.jpg',
        'https://cdn.tgdd.vn/Products/Images/2443/76452/bhx/nuoc-ngot-coca-cola-zero-320ml-202201131326507695.jpg'
    ]

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
                                    {productDetails.weight ? `${productDetails.weight}kg` : 'Khối lượng sản phẩm'}
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
                                    <Text style={styleDetailbottle.price}>{price.toLocaleString()}đ</Text>
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
                                    <Text style={styleDetailbottle.textorigin}>{productDetails.storage || 'Chưa có thông tin'}</Text>
                                </View>
                                <View style={styleDetailbottle.textoriginRow}>
                                    <Text style={styleDetailbottle.textorigin}>Công dụng :</Text>
                                    <Text style={styleDetailbottle.textorigin}>{productDetails.usage || 'Chưa có thông tin'}</Text>
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
                                <TouchableOpacity onPress={handleAddToCart} style={styleDetailbottle.headerFooter}>
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