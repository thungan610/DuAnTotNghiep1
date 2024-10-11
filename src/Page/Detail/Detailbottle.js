import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Button, ScrollView } from 'react-native';
import PagerView from 'react-native-pager-view';
import styleDetailbottle from './styleDetailbottle';
export default Detailbottle = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const images = [
        'https://pastaparadise.com.vn/wp-content/uploads/2021/01/cocazero.jpg',
        'https://cdn.tgdd.vn/Products/Images/2443/190309/bhx/nuoc-ngot-coca-cola-light-lon-330ml-202209111853245462.jpg',
        'https://cdn.tgdd.vn/Products/Images/2443/76452/bhx/nuoc-ngot-coca-cola-zero-320ml-202201131326507695.jpg'
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
        <View style={styleDetailbottle.container}>
            <View style={styleDetailbottle.head}>
                <Image source={require('../../assets/notifi/backright.png')} />
                <Image style={styleDetailbottle.iconcart} source={require('../../assets/home/cart.png')} />
                <Image style={styleDetailbottle.iconnotifi} source={require('../../assets/home/notifi.png')} />
            </View>
            <PagerView style={styleDetailbottle.pagerView}
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
            <View style={styleDetailbottle.body}>
                <View style={styleDetailbottle.bodyText}>
                    <Text style={styleDetailbottle.textBody}>CoCa không đường</Text>
                    <Text style={styleDetailbottle.textkg}>320 ml</Text>
                </View>
                <View style={styleDetailbottle.butonView}>
                    <TouchableOpacity style={styleDetailbottle.minus}>
                        <Text style={styleDetailbottle.textTout}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleDetailbottle.tout}>
                        <Text style={styleDetailbottle.toutText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleDetailbottle.plus}>
                        <Text style={styleDetailbottle.textTout}>+</Text>
                    </TouchableOpacity>
           
                    <Image style={styleDetailbottle.dolar} source={require('../../assets/Dollar.png')} />
                     <Text style={styleDetailbottle.price}>19.000d</Text>
                    <Text style={styleDetailbottle.price}>19.000d</Text>
                </View>
                <View style={styleDetailbottle.underline}>
                    <Text style={styleDetailbottle.textunderline}>Thông tin sản phẩm</Text>
                </View>
                <ScrollView style={styleDetailbottle.scroollview}>
                    <View style={styleDetailbottle.viewScroll}>
                        <Text style={styleDetailbottle.scrollText}>
                            Sườn non là một loại thực phẩm phổ biến trên toàn thế giới, được sử dụng trong nhiều món ăn khác nhau.
                        </Text>
                        
                    </View>
                    <View style={styleDetailbottle.origin}> 
                        <View style={styleDetailbottle.textoriginRow}>
                        <Text style={styleDetailbottle.textorigin}>Xuất xứ  :</Text>
                        <Text style={styleDetailbottle.textorigin}>Việt Nam</Text>
                        </View>
                        <View style={styleDetailbottle.textoriginRow}>
                        <Text style={styleDetailbottle.textorigin}>Chất sơ  :</Text>
                        <Text style={styleDetailbottle.textorigin}> Khoảng 2.2 gram trên 100 ml</Text>
                        </View>
                        <View style={styleDetailbottle.textoriginRow}>
                        <Text style={styleDetailbottle.textorigin}>Bảo quản  :</Text>
                        <Text style={styleDetailbottle.textorigin}> Bảo quản lạnh</Text>
                        </View>
                        <View style={styleDetailbottle.textoriginRow}>
                        <Text style={styleDetailbottle.textorigin}>Công dụng :</Text>
                        <Text style={styleDetailbottle.textorigin}>Giải Khát</Text>
                        </View>
                    </View>
                    
                </ScrollView>
                {/* buton */}
                <View style={styleDetailbottle.botter}>
                    <TouchableOpacity style={styleDetailbottle.botertout}>
                        <Text style={styleDetailbottle.textboter}>1 chai</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleDetailbottle.botertout}>
                        <Text style={styleDetailbottle.textboter}>6 chai</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleDetailbottle.botertout}>
                        <Text style={styleDetailbottle.textboter}>1 thùng</Text>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={styleDetailbottle.headerFooter}>
                    <Text style={styleDetailbottle.textFooter}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

