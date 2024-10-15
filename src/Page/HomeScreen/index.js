import React, { useState, useRef, useEffect } from "react";
import { View, Image, ScrollView, Dimensions, TouchableOpacity, Text, FlatList } from "react-native";
import HomeStyle from "./style";


const HomeScreen = (prop) => {
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [search] = useState('');
    const screenWidth = Dimensions.get('window').width;

    const banners = [
        require('../../../src/assets/banner/baner1.jpg'),
        require('../../../src/assets/banner/baner2.jpg'),
        require('../../../src/assets/banner/baner3.jpg'),
    ];

    const categories = ["Tất cả", "Rau củ", "Trái cây", "Thịt", "Cá", "Gia vị", "Nước ngọt"];

    const productsByCategory = {
        "Tất cả": [
            { id: '1', title: 'Bắp cải trắng', price: '19.000', weight: '1 kg', image: require('../../../src/assets/image/image1.png') },
            { id: '2', title: 'Chanh không hạt', price: '9.000', weight: '1 kg', image: require('../../../src/assets/image/image2.png') },
            { id: '3', title: 'Khoai tây', price: '30.000', weight: '1 kg', image: require('../../../src/assets/image/image3.png') },
            { id: '4', title: 'Sườn non', price: '45.000', weight: '1 kg', image: require('../../../src/assets/image/image4.png') },
            { id: '5', title: 'Thịt đùi', price: '30.000', weight: '1 kg', image: require('../../../src/assets/image/image5.png') },
            { id: '6', title: 'Rau bó sôi', price: '9.000', weight: '1 kg', image: require('../../../src/assets/image/image6.png') },
            { id: '7', title: 'Chôm chôm', price: '33.000', weight: '1 kg', image: require('../../../src/assets/image/imagetrai1.png') },
            { id: '8', title: 'Thanh long', price: '22.000', weight: '1 kg', image: require('../../../src/assets/image/imagetrai2.png') },
            { id: '9', title: 'Chân gà', price: '19.000', weight: '1 kg', image: require('../../../src/assets/image/thit1.png') },
            { id: '10', title: 'Sườn cốc lết', price: '37.000', weight: '1 kg', image: require('../../../src/assets/image/thit3.png') },
            { id: '11', title: 'Cá chim', price: '33.000', weight: '1 kg', image: require('../../../src/assets/image/ca1.png') },
            { id: '12', title: 'Cá điêu hồng', price: '32.000', weight: '1 kg', image: require('../../../src/assets/image/ca2.png') },
            { id: '13', title: 'Dầu bếp hồng', price: '34.000', weight: '1L', image: require('../../../src/assets/image/gv1.png') },
            { id: '14', title: 'Dầu mè Tường An', price: '35.000', weight: '100ml', image: require('../../../src/assets/image/gv2.png') },
            { id: '15', title: 'Nước nho fanta', price: '29.000', weight: '1L', image: require('../../../src/assets/image/nuoc1.png') },
            { id: '16', title: 'Nước ngọt 7up', price: '32.000', weight: '1L', image: require('../../../src/assets/image/nuoc2.png') },
        ],
        "Rau củ": [
            { id: '1', title: 'Bắp cải trắng', price: '19.000', weight: '1 kg', image: require('../../../src/assets/image/image1.png') },
            { id: '2', title: 'Rau muống', price: '30.000', weight: '1 kg', image: require('../../../src/assets/image/imagerau3.png') },
            { id: '3', title: 'Rau má', price: '8.000', weight: '1 kg', image: require('../../../src/assets/image/imagerau1.png') },
            { id: '4', title: 'Hành tím', price: '15.000', weight: '1 kg', image: require('../../../src/assets/image/imagerau2.png') },
            { id: '5', title: 'Rau ngót', price: '9.000', weight: '1 kg', image: require('../../../src/assets/image/imagerau4.png') },
            { id: '6', title: 'Rau bó sôi', price: '9.000', weight: '1 kg', image: require('../../../src/assets/image/image6.png') },
        ],
        "Trái cây": [
            { id: '1', title: 'Chôm chôm', price: '33.000', weight: '1 kg', image: require('../../../src/assets/image/imagetrai1.png') },
            { id: '2', title: 'Thanh long', price: '22.000', weight: '1 kg', image: require('../../../src/assets/image/imagetrai2.png') },
            { id: '3', title: 'Chuối sứ', price: '19.000', weight: '1 kg', image: require('../../../src/assets/image/imagetrai3.png') },
            { id: '4', title: 'Ổi nữ hoàng', price: '19.000', weight: '1 kg', image: require('../../../src/assets/image/imagetrai4.png') },
            { id: '5', title: 'Cam sành', price: '10.000', weight: '1 kg', image: require('../../../src/assets/image/imagetrai5.png') },
            { id: '6', title: 'Dưa hấu', price: '15.000', weight: '1 kg', image: require('../../../src/assets/image/imagetrai6.png') },
        ],
        "Thịt": [
            { id: '1', title: 'Chân gà', price: '19.000', weight: '1 kg', image: require('../../../src/assets/image/thit1.png') },
            { id: '2', title: 'Đùi gà', price: '29.000', weight: '1 kg', image: require('../../../src/assets/image/thit2.png') },
            { id: '3', title: 'Sườn cốc lết', price: '37.000', weight: '1 kg', image: require('../../../src/assets/image/thit3.png') },
            { id: '4', title: 'Sườn non', price: '45.000', weight: '1 kg', image: require('../../../src/assets/image/image4.png') },
            { id: '5', title: 'Thịt nạt', price: '30.000', weight: '1 kg', image: require('../../../src/assets/image/image5.png') },
            { id: '6', title: 'Khoanh giò', price: '40.000', weight: '1 kg', image: require('../../../src/assets/image/thit4.png') },
        ],
        "Cá": [
            { id: '1', title: 'Cá chim', price: '33.000', weight: '1 kg', image: require('../../../src/assets/image/ca1.png') },
            { id: '2', title: 'Cá điêu hồng', price: '32.000', weight: '1 kg', image: require('../../../src/assets/image/ca2.png') },
            { id: '3', title: 'Cá nục', price: '36.000', weight: '1 kg', image: require('../../../src/assets/image/ca3.png') },
            { id: '4', title: 'Cá basa', price: '34.000', weight: '1 kg', image: require('../../../src/assets/image/ca4.png') },
            { id: '5', title: 'Lươn', price: '9.000', weight: '1 kg', image: require('../../../src/assets/image/ca5.png') },
            { id: '6', title: 'Đầu cá hồi', price: '9.000', weight: '1 kg', image: require('../../../src/assets/image/ca6.png') },
        ],
        "Gia vị": [
            { id: '1', title: 'Dầu bếp hoàng', price: '34.000', weight: '1L', image: require('../../../src/assets/image/gv1.png') },
            { id: '2', title: 'Dầu mè Tường An', price: '35.000', weight: '100ml', image: require('../../../src/assets/image/gv2.png') },
            { id: '3', title: 'Nước tương ông chà', price: '15.000', weight: '500ml', image: require('../../../src/assets/image/gv3.png') },
            { id: '4', title: 'Muối tôm trần lâm', price: '15.000', weight: '100g', image: require('../../../src/assets/image/gv4.png') },
            { id: '5', title: 'Muối tiêu', price: '12.000', weight: '100g', image: require('../../../src/assets/image/gv5.png') },
            { id: '6', title: 'Muối Iot', price: '8.000', weight: '500g', image: require('../../../src/assets/image/gv6.png') },
        ],
        "Nước ngọt": [
            { id: '1', title: 'Nước nho fanta', price: '29.000', weight: '1L', image: require('../../../src/assets/image/nuoc1.png') },
            { id: '2', title: 'Nước 7up', price: '25.000', weight: '1L', image: require('../../../src/assets/image/nuoc2.png') },
            { id: '3', title: 'Coca không đường', price: '10.000', weight: '320ml', image: require('../../../src/assets/image/nuoc3.png') },
            { id: '4', title: 'Nước cam fanta', price: '25.000', weight: '1L', image: require('../../../src/assets/image/nuoc4.png') },
            { id: '5', title: 'Pepsi lon', price: '12.000', weight: '320ml', image: require('../../../src/assets/image/nuoc5.jpg') },
            { id: '6', title: 'Revie', price: '12.000', weight: '320ml', image: require('../../../src/assets/image/nuoc6.jpg') },
        ],

    };

    const filteredProducts = productsByCategory[categories[selectedCategory]] || [];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: currentIndex * screenWidth, animated: true });
        }
    }, [currentIndex]);

    const renderProductItem = ({ item }) => (
        <View style={HomeStyle.productContainer}>
            <Image source={item.image} style={HomeStyle.productImage} />
            <View style={HomeStyle.productDetails}>
                <Text style={HomeStyle.productTitle}>{item.title}</Text>
                <Text style={HomeStyle.productWeight}>{item.weight}</Text>
                <View style={HomeStyle.priceall}>
                    <Image style={HomeStyle.price} source={require('../../../src/assets/Dollar.png')} />
                    <Text style={HomeStyle.productPrice}>{item.price} VNĐ</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View>
            <ScrollView style={HomeStyle.container}>
                <View style={HomeStyle.header}>
                    <Image style={HomeStyle.avatar} source={require('../../../src/assets/Logoshop.png')} />
                    <View style={HomeStyle.searchall}>
                        <TouchableOpacity onPress={() => prop.navigation.navigate('Search')}>
                            <Image style={HomeStyle.search} source={require('../../../src/assets/Search_alt.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                prop.navigation.navigate('Search');
                            }}>
                            <Text style={{ color: '#999' }}>{search || "Tìm kiếm"}</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => {
                        prop.navigation.navigate('BotChat');
                    }}>
                        <View style={{ position: 'relative' }}>
                            <Image
                                style={{ tintColor: '#27AAE1', width: 34, height: 34 }}
                                source={require('../../assets/chat.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        prop.navigation.navigate('TabAddress');
                    }}>
                        <View style={{ position: 'relative' }}>
                            <Image
                                style={{ tintColor: '#27AAE1', width: 34, height: 34 }}
                                source={require('../../../src/assets/Pin_alt.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={HomeStyle.bannerContainer}>
                    {banners.map((image, index) => (
                        <Image key={index} source={image} style={{ width: screenWidth, height: 130, marginTop: 10 }} />
                    ))}
                </ScrollView>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={HomeStyle.categoryContainer}>
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[HomeStyle.categoryButton, selectedCategory === index && HomeStyle.selectedCategoryButton]}
                            onPress={() => setSelectedCategory(index)}
                        >
                            <Text style={{
                                fontSize: selectedCategory === index ? 20 : 18,
                                fontWeight: selectedCategory === index ? 'bold' : 'normal',
                                textDecorationLine: selectedCategory === index ? 'underline' : 'none',
                                marginHorizontal: 5,
                                marginTop: 7,
                                color: selectedCategory === index ? 'black' : '#8B8B8B',
                            }}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <FlatList
                    data={filteredProducts}
                    renderItem={renderProductItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    scrollEnabled={false}
                />
            </ScrollView >
        </View >
    );
};

export default HomeScreen;
