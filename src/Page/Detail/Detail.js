import React, { useState } from 'react';
import { StyleSheet, View, Text, Image,TouchableOpacity,Button } from 'react-native';
import PagerView from 'react-native-pager-view';

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
                        backgroundColor: selectedIndex === index ? 'blue' : 'gray',
                        margin: 5, top: -50
                    }} />
            )
        })
    }

    return (
        <View style={styles.container}>

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
                {/* <View style={styles.butonView}>
                    <TouchableOpacity style={styles.tout}>
                    <Text style={styles.textTout}>1</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    next: {
        right: 10,
    },
    previous: {
        left: 10,
    },
    icon: {
        position: 'absolute',
        top: 150,
    },
    container: {
        width: '100%',
        height: '100%',
        // backgroundColor: '#27AAE1'
    },
    pagerView: {
        width: '100%',
        height: 300,
    },
    body: {
        width: '100%',
        height: '50%',
        // backgroundColor: '#37C5DF',
        position: "relative",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    bodyText: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


    },
    textBody: {
        fontSize: 24,
        color: 'back',
        fontWeight: 'bold',
        left: 30,
        top: 10
    },
    textkg: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8F8F8F',
        top: 10,
        left: -30
    },
    butonView:{
        width:'100%',
        height:50,
        flexDirection:'row',
        backgroundColor:'blue',
    },
    tout:{
        width:'100%',
        height:50,
        backgroundColor:'while',
        borderRadius:10,
        flexDirection:'row'
    },
textTout:{
    fontSize:18,
    fontWeight:'bold',
    color:'white',
    top:10,
    left:20
}
});