import React, { useState, useRef, useEffect } from "react";
import { View, Image, ScrollView, Dimensions, TouchableOpacity, Text, FlatList } from "react-native";
import HomeStyle from "./style";
import AxiosInstance from "../api/AxiosInstance";
import AxiosInstanceSP from "../api/AxiosInstanceSP";
const HomeScreen = (props) => {
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const screenWidth = Dimensions.get('window').width;

    const banners = [
        require('../../../src/assets/banner/baner1.jpg'),
        require('../../../src/assets/banner/baner2.jpg'),
        require('../../../src/assets/banner/baner3.jpg'),
    ];

    const fetchCategories = async () => {
        try {
            const response = await AxiosInstance().get("/categories");
            setCategories([{ name: "Tất cả", _id: "all" }, ...response.data]);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            setRefreshing(true);
            const endpoint = selectedCategory === "all" 
                ? "/products/getProducts" 
                : `/products/filter/${selectedCategory}`;
            const response = await AxiosInstanceSP().get(endpoint);
            const filteredProducts = response.data.filter(item => item.quantity > 0);
            setProducts(filteredProducts);
        } catch (error) {
            console.error('API call error:', error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://api-h89c.onrender.com/products/filter/?id');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error.message); // Thêm thông báo lỗi chi tiết
                if (error.response) {
                    // Yêu cầu đã được gửi và server đã phản hồi với mã trạng thái không phải 2xx
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                } else if (error.request) {
                    // Yêu cầu đã được gửi nhưng không có phản hồi
                    console.error("Request data:", error.request);
                } else {
                    // Một cái gì đó đã xảy ra trong khi thiết lập yêu cầu
                    console.error("Error message:", error.message);
                }
            }
        };
    
        fetchProducts();

    }, [selectedCategory]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    

    useEffect(() => {
        if (products.length > 0) {
            if (selectedCategory === 0) {
                setFilteredProducts(products); // Hiển thị tất cả sản phẩm
            } else {
                const filtered = products.filter(product => product.category === categories[selectedCategory]);
                setFilteredProducts(filtered);
            }
        }
    }, [selectedCategory, products]);

    useEffect(() => {
        if (banners.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [banners.length]);

    useEffect(() => {
        if (scrollViewRef.current && currentIndex >= 0 && currentIndex < banners.length) {
            scrollViewRef.current.scrollTo({ x: currentIndex * screenWidth, animated: true });
        }
    }, [currentIndex]);

    const renderProductItem = ({ item }) => {
        const imageUri = item.images && item.images.length > 0 ? item.images[0] : null;

        return (
            <TouchableOpacity
                onPress={() => {
                    const Detail = {
                        id: item._id,
                        name: item.name,
                        oum: item.oum,
                        origin: item.origin,
                        preserve: item.preserve.preserve_name,
                        uses: item.uses,
                        fiber: item.fiber,
                        description: item.description,
                        price: item.price,
                        images: item.images || [imageUri],
                    };
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
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category._id}
                            style={[HomeStyle.categoryButton, selectedCategory === category._id && HomeStyle.selectedCategoryButton]}
                            onPress={() => setSelectedCategory(category._id)}
                        >
                            <Text style={{
                                fontSize: selectedCategory === category._id ? 20 : 18,
                                fontWeight: selectedCategory === category._id ? 'bold' : 'normal',
                                textDecorationLine: selectedCategory === category._id ? 'underline' : 'none',
                                marginHorizontal: 5,
                                marginTop: 7,
                                color: selectedCategory === category._id ? 'black' : '#8B8B8B',
                            }}>
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <FlatList
                    renderItem={renderProductItem}
                    keyExtractor={item => item._id.toString()}
                    numColumns={2}
                    scrollEnabled={false}
                />
            </ScrollView>
        </View>
    );  
    // vghb
};

export default HomeScreen;
                                                                                                  