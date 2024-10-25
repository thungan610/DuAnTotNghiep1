import React, { useState, useRef, useEffect } from "react";
import { View, Image, ScrollView, Dimensions, TouchableOpacity, Text, FlatList } from "react-native";
import HomeStyle from "./style";
import axios from "axios";

const HomeScreen = (prop) => {
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [search] = useState('');
    const screenWidth = Dimensions.get('window').width;

    const banners = [
        require('../../../src/assets/banner/baner1.jpg'),
        require('../../../src/assets/banner/baner2.jpg'),
        require('../../../src/assets/banner/baner3.jpg'),
    ];

    const categories = ["Tất cả", "Rau củ", "Trái cây", "Thịt", "Cá", "Gia vị", "Nước ngọt"];

    const apiLinks = [
        'https://api-h89c.onrender.com/products/getProducts',         
        'https://api-h89c.onrender.com/products/getVegetables',  
        'https://api-h89c.onrender.com/products/getFruits',      
        'https://api-h89c.onrender.com/products/getMeat',        
        'https://api-h89c.onrender.com/products/getFish',       
        'https://api-h89c.onrender.com/products/getSpices',      
        'https://api-h89c.onrender.com/products/getDrinks'       
    ];
    const fetchProducts = async () => {
        try {
            const response = await axios.get(apiLinks[selectedCategory]);
            console.log('Response status:', response.status);
            setProducts(response.data);
            console.log('Dữ liệu đã được lưu vào state:', products);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory])

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
        return (
            <TouchableOpacity
                onPress={() => {
                    if (selectedCategory === 5 || selectedCategory === 6) {
                        prop.navigation.navigate('Detailbottle', { products: item });
                    } else {
                        prop.navigation.navigate('Detail', { products: item });
                    }
                }}
            >
                <View style={HomeStyle.productContainer}>
                    <Image source={{ uri: item.images?.[0] || 'default_image_url' }} style={HomeStyle.productImage} />
                    <View style={HomeStyle.productDetails}>
                        <Text style={HomeStyle.productTitle}>{item.name || 'Không có tên'}</Text>
                        <Text style={HomeStyle.productWeight}>{item.oum || 'Không có trọng lượng'}</Text>
                        <View style={HomeStyle.priceall}>
                            <Image style={HomeStyle.price} source={require('../../../src/assets/Dollar.png')} />
                            <Text style={HomeStyle.productPrice}>{item.price ? `${item.price} VNĐ` : 'Giá không có'}</Text>
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
                        <TouchableOpacity onPress={() => prop.navigation.navigate('Search')}>
                            <Image style={HomeStyle.search} source={require('../../../src/assets/Search_alt.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => prop.navigation.navigate('Search')}>
                            <Text style={{ color: '#999' }}>{search || "Tìm kiếm"}</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => prop.navigation.navigate('BotChat')}>
                        <View style={{ position: 'relative' }}>
                            <Image
                                style={{ tintColor: '#27AAE1', width: 34, height: 34 }}
                                source={require('../../../src/assets/Chat.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => prop.navigation.navigate('TabAddress')}>
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
                    data={products.data} // Truyền đúng dữ liệu từ API
                    renderItem={renderProductItem}
                    keyExtractor={item => item._id.toString()} // Sử dụng _id từ API làm key
                    numColumns={2}
                    scrollEnabled={false}
                />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
