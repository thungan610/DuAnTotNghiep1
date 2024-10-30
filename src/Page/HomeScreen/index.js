import React, { useState, useRef, useEffect } from "react";
import { View, Image, ScrollView, Dimensions, TouchableOpacity, Text, FlatList } from "react-native";
import HomeStyle from "./style";
import AxiosInstance from "../api/AxiosInstance";

const HomeScreen = (props) => {
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const screenWidth = Dimensions.get('window').width;

    const banners = [
        require('../../../src/assets/banner/baner1.jpg'),
        require('../../../src/assets/banner/baner2.jpg'),
        require('../../../src/assets/banner/baner3.jpg'),
    ];

    const categories = ["Tất cả", "Rau củ", "Trái cây", "Thịt", "Cá", "Gia vị", "Nước ngọt"];

    const apiLinks = [
        '/products/getProducts',
        
    ];

    const fetchProducts = async () => {
        try {
            setRefreshing(true);
            const response = await AxiosInstance().get(apiLinks[selectedCategory]);
            const filteredProducts = response.data.filter(item => item.quantity > 0);
            setProducts(filteredProducts);
            setRefreshing(false);
        } catch (error) {
            console.error('API call error:', error);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);

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

    const renderProductItem = ({ item }) => {
        const imageUri = item.images && item.images.length > 0 ? item.images[0] : null;
        const { navigation } = props;

        return (
            <TouchableOpacity
                onPress={() => {
                    const Detail = {
                        id: item._id,
                        name: item.name,
                        oum: item.oum,
                        origin: item.origin,
                        preserve: item.preserve,
                        uses: item.uses,
                        fiber: item.fiber,
                        description: item.description,
                        price: item.price,
                        images: item.images || [imageUri],
                    };
                    if (selectedCategory === 5 || selectedCategory === 6) {
                        navigation.navigate('Detailbottle', { product: Detail });
                    } else {
                        navigation.navigate('Detail', { product: Detail });
                    }
                }}
            >
                <View style={HomeStyle.productContainer}>
                    <Image
                        style={{ width: 100, height: 80 }}
                        source={{ uri: imageUri }}
                    />
                    <View style={HomeStyle.productDetails}>
                        <Text style={HomeStyle.productTitle}>{item.name || 'Không có tên'}</Text>
                        <Text style={HomeStyle.productWeight}>{item.oum || 'Không có trọng lượng'}</Text>
                        <View style={HomeStyle.priceall}>
                            <Image style={HomeStyle.price} source={require('../../../src/assets/Dollar.png')} />
                            <Text style={HomeStyle.productPrice}>{item.price ? `${item.price}.000 VNĐ` : 'Giá không có'}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <ScrollView style={HomeStyle.container}>
                <View style={HomeStyle.header}>
                    <Image style={HomeStyle.avatar} source={require('../../../src/assets/Logoshop.png')} />
                    <View style={HomeStyle.searchall}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Search')}>
                            <Image style={HomeStyle.search} source={require('../../../src/assets/Search_alt.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Search')}>
                            <Text style={{ color: '#999' }}>Tìm kiếm</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => props.navigation.navigate('BotChat')}>
                        <View style={{ position: 'relative' }}>
                            <Image
                                style={{ tintColor: '#27AAE1', width: 34, height: 34 }}
                                source={require('../../../src/assets/chat.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('TabAddress')}>
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
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={item => item._id.toString()}
                    numColumns={2}
                    scrollEnabled={false}
                />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
