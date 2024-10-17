import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Button, ScrollView } from 'react-native';
import PagerView from 'react-native-pager-view';
import styleDetail from './style';

const Detail = (prop) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const images = [
        'https://product.hstatic.net/1000282430/product/upload_deb91932d62348309be82c41136ba92d_c6ba4735a301452399d6a3541535a19c_master.jpg',
        'https://www.hasfarmgreens.com/wp-content/uploads/2021/07/Bap-Cai-Trang-1-700x700.png',
        'https://www.hasfarmgreens.com/wp-content/uploads/2021/07/Bap-Cai-Trang-1-700x700.png'
    ]
    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };
    const renderImages = () => {
        return images.map((item, index) => {
            return (
                <View key={index + 1}>
                    <Image
                        resizeMode='contain'
                        source={{ uri: item }}
                        style={{ width: '100%', height: 300, }}
                    />
                </View>
            )
        })
    }
    const renderDots = () => {
        return images.map((item, index) => {
            return (
                <View key={index + 1}
                    style={{
                        width: 10, height: 10,
                        borderRadius: 5,
                        backgroundColor: selectedIndex === index ? 'black' : 'gray',
                        margin: 5, top: -50
                    }} />
            )
        })
    }

    return (
        <View style={styleDetail.container}>

            <View style={styleDetail.head}>
                <TouchableOpacity>
                    <Image source={require('../../assets/notifi/backright.png')} />
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity>
                        <Image style={styleDetail.iconcart} source={require('../../assets/home/cart.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styleDetail.iconnotifi} source={require('../../assets/home/notifi.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styleDetail.body}>
                <View>
                    <PagerView style={styleDetail.pagerView}
                        initialPage={selectedIndex}>
                        {renderImages()}
                    </PagerView>
                    <View style={{
                        marginTop: 60,
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

                    }}>
                    <View
                        style={{
                            flexDirection: 'column',
                        }} >
                        <View style={styleDetail.bodyText}>
                            <Text style={styleDetail.textBody}>Bắp cải trắng</Text>
                            <Text style={styleDetail.textkg}>1kg</Text>
                        </View>

                        <View style={styleDetail.butonView}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#EAEAEA',
                                    width: 80,
                                    height: 36,
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    padding: 4,
                                    justifyContent: 'space-between',
                                }}>
                                <TouchableOpacity style={styleDetail.plus} onPress={increaseQuantity}>
                                    <Text style={styleDetail.textTout}>-</Text>
                                </TouchableOpacity>
                                <Text style={styleDetail.toutText}>{quantity}</Text>
                                <TouchableOpacity style={styleDetail.minus} onPress={decreaseQuantity}>
                                    <Text style={styleDetail.textTout}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Text style={styleDetail.price}>19.000d</Text>
                                <Image style={styleDetail.dolar} source={require('../../assets/Dollar.png')} />
                            </View>
                        </View>
                    </View>

                    <Text style={styleDetail.textunderline}>Thông tin sản phẩm</Text>

                    <ScrollView style={styleDetail.scroollview}>
                        <View style={styleDetail.viewScroll}>
                            <Text style={styleDetail.scrollText}>
                                Sườn non là một loại thực phẩm phổ biến trên toàn thế giới, được sử dụng trong nhiều món ăn khác nhau.
                            </Text>

                        </View>

                        <View style={styleDetail.origin}>
                            <View style={styleDetail.textoriginRow}>
                                <Text style={styleDetail.textorigin}>Xuất xứ  :</Text>
                                <Text style={styleDetail.textorigin}>Việt Nam</Text>
                            </View>
                            <View style={styleDetail.textoriginRow}>
                                <Text style={styleDetail.textorigin}>Chất sơ  :</Text>
                                <Text style={styleDetail.textorigin}> Khoảng 2.2 gram trên 100 gram</Text>
                            </View>
                            <View style={styleDetail.textoriginRow}>
                                <Text style={styleDetail.textorigin}>Bảo quản  :</Text>
                                <Text style={styleDetail.textorigin}> Bảo quản lạnh</Text>
                            </View>
                            <View style={styleDetail.textoriginRow}>
                                <Text style={styleDetail.textorigin}>Công dụng :</Text>
                                <Text style={styleDetail.textorigin}>Chế biến món ăn</Text>
                            </View>
                        </View>

                    </ScrollView>
                </View>
                <TouchableOpacity style={styleDetail.headerFooter}>
                    <Text style={styleDetail.textFooter}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>

        </View >
    );
};
export default Detail;
