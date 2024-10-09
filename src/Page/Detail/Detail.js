import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Button, ScrollView } from 'react-native';
import PagerView from 'react-native-pager-view';
import styles from './style';
export default Detail = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const images = [
        'https://product.hstatic.net/1000282430/product/upload_deb91932d62348309be82c41136ba92d_c6ba4735a301452399d6a3541535a19c_master.jpg',
        'https://www.hasfarmgreens.com/wp-content/uploads/2021/07/Bap-Cai-Trang-1-700x700.png',
        'https://www.hasfarmgreens.com/wp-content/uploads/2021/07/Bap-Cai-Trang-1-700x700.png'
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
        <View style={styles.container}>
            <View style={styles.head}>
                <Image source={require('../../assets/notifi/backright.png')} />
                <Image style={styles.iconcart} source={require('../../assets/home/cart.png')} />
                <Image style={styles.iconnotifi} source={require('../../assets/home/notifi.png')} />
            </View>
            <PagerView style={styles.pagerView}
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
            <View style={styles.body}>
                <View style={styles.bodyText}>
                    <Text style={styles.textBody}>Bắp cải trắng</Text>
                    <Text style={styles.textkg}>1kg</Text>
                </View>
                <View style={styles.butonView}>
                    <TouchableOpacity style={styles.minus}>
                        <Text style={styles.textTout}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tout}>
                        <Text style={styles.toutText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.plus}>
                        <Text style={styles.textTout}>+</Text>
                    </TouchableOpacity>

                    <Image style={styles.dolar} source={require('../../assets/Dollar.png')} />
                    <Text style={styles.price}>19.000d</Text>
                </View>
                <View style={styles.underline}>
                    <Text style={styles.textunderline}>Thông tin sản phẩm</Text>
                </View>
                <ScrollView style={styles.scroollview}>
                    <View style={styles.viewScroll}>
                        <Text style={styles.scrollText}>
                            Sườn non là một loại thực phẩm phổ biến trên toàn thế giới, được sử dụng trong nhiều món ăn khác nhau.
                        </Text>
                        
                    </View>
                    <View style={styles.origin}> 
                        <View style={styles.textoriginRow}>
                        <Text style={styles.textorigin}>Xuất xứ  :</Text>
                        <Text style={styles.textorigin}>Việt Nam</Text>
                        </View>
                        <View style={styles.textoriginRow}>
                        <Text style={styles.textorigin}>Chất sơ  :</Text>
                        <Text style={styles.textorigin}> Khoảng 2.2 gram trên 100 gram</Text>
                        </View>
                        <View style={styles.textoriginRow}>
                        <Text style={styles.textorigin}>Bảo quản  :</Text>
                        <Text style={styles.textorigin}> Bảo quản lạnh</Text>
                        </View>
                        <View style={styles.textoriginRow}>
                        <Text style={styles.textorigin}>Công dụng :</Text>
                        <Text style={styles.textorigin}>Chế biến món ăn</Text>
                        </View>
                    </View>
                    
                </ScrollView>
                {/* buton */}
                <TouchableOpacity style={styles.headerFooter}>
                    <Text style={styles.textFooter}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

