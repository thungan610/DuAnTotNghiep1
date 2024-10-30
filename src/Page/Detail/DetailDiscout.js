import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Button, ScrollView } from 'react-native';
import PagerView from 'react-native-pager-view';
import styleDiscout from './styleDiscout';
export default DetailDiscout = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const images = [
        'https://bongon.vn/static/team/2019/1217/15765570316121.jpg',
        'https://nguyenhafood.vn/uploads/images/s%C6%B0%E1%BB%9Dn-non.jpg',
        'https://media.loveitopcdn.com/31293/suon-cong-heo-10.png'
    ]
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
        <View style={styleDiscout.container}>
            <View style={styleDiscout.head}>
                <Image source={require('../../assets/notifi/backright.png')} />
                <Image style={styleDiscout.iconcart} source={require('../../assets/home/cart.png')} />
                <Image style={styleDiscout.iconnotifi} source={require('../../assets/home/notifi.png')} />
            </View>
            <PagerView style={styleDiscout.pagerView}
                initialPage={selectedIndex}>
                {renderImages()}
            </PagerView>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {renderDots()}
            </View>
            <View style={styleDiscout.body}>
                <View style={styleDiscout.bodyText}>
                    <Text style={styleDiscout.textBody}>Sườn non</Text>
         
         
         
                    <Text style={styleDiscout.textkg}>1kg</Text>
                </View>
                <View style={styleDiscout.butonView}>
                    <TouchableOpacity style={styleDiscout.minus}>
                        <Text style={styleDiscout.textTout}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleDiscout.tout}>
                        <Text style={styleDiscout.toutText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleDiscout.plus}>
                        <Text style={styleDiscout.textTout}>+</Text>
                    </TouchableOpacity>
                    <Text style={styleDiscout.under}>45.000d</Text>
                    <Image style={styleDiscout.dolar} source={require('../../assets/Dollar.png')} />
                     <Text style={styleDiscout.price}>19.000d</Text>
                    <Text style={styleDiscout.price}>19.000d</Text>
                </View>
                <View style={styleDiscout.underline}>
                    <Text style={styleDiscout.textunderline}>Thông tin sản phẩm</Text>
                </View>
                <ScrollView style={styleDiscout.scroollview}>
                    <View style={styleDiscout.viewScroll}>
                        <Text style={styleDiscout.scrollText}>
                            Sườn non là một loại thực phẩm phổ biến trên toàn thế giới, được sử dụng trong nhiều món ăn khác nhau.
                        </Text>
                        
                    </View>
                    <View style={styleDiscout.origin}> 
                        <View style={styleDiscout.textoriginRow}>
                        <Text style={styleDiscout.textorigin}>Xuất xứ  :</Text>
                        <Text style={styleDiscout.textorigin}>Việt Nam</Text>
                        </View>
                        <View style={styleDiscout.textoriginRow}>
                        <Text style={styleDiscout.textorigin}>Chất sơ  :</Text>
                        <Text style={styleDiscout.textorigin}> Khoảng 2.2 gram trên 100 gram</Text>
                        </View>
                        <View style={styleDiscout.textoriginRow}>
                        <Text style={styleDiscout.textorigin}>Bảo quản  :</Text>
                        <Text style={styleDiscout.textorigin}> Bảo quản lạnh</Text>
                        </View>
                        <View style={styleDiscout.textoriginRow}>
                        <Text style={styleDiscout.textorigin}>Công dụng :</Text>
                        <Text style={styleDiscout.textorigin}>Chế biến món ăn</Text>
                        </View>
                    </View>
                    
                </ScrollView>
                {/* buton */}
                <TouchableOpacity style={styleDiscout.headerFooter}>
                    <Text style={styleDiscout.textFooter}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

