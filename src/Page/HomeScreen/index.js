import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import AxiosInstanceSP from "../api/AxiosInstanceSP";
import HomeStyle from './style';
import { useSelector } from 'react-redux';

const HomeScreen = (props) => {
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");


    const [refreshing, setRefreshing] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const user = useSelector(state => state.user);

    const userid = user?.userData?._id || 'default_id';


    const banners = [
        require('../../../src/assets/banner/baner1.jpg'),
        require('../../../src/assets/banner/baner2.jpg'),
        require('../../../src/assets/banner/baner3.jpg'),
    ];

    const fetchCategories = async () => {
        try {
            const response = await AxiosInstanceSP().get("/categories");
            setCategories([{ name: "Tất cả", _id: "all" }, ...response.data]);
        } catch (error) {
            console.error('Lỗi khi lấy danh mục:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            setRefreshing(true);
            const endpoint = selectedCategory === "all"
                ? "/products/getProducts"
                : `/products/filter/${selectedCategory}`;
            const response = await AxiosInstanceSP().get(endpoint);

            if (response && response.data) {
                const filteredProducts = response.data.filter(item => item.quantity > 0);
                setProducts(filteredProducts);
            } else {
                console.warn("Dữ liệu API không đúng định dạng:", response.data);
                setProducts([]);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

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
        const imageUri = item.images && item.images.length > 0 ? item.images[0] : 'default_image_uri';


        return (
            <TouchableOpacity
                onPress={() => {
                    const Detail = {
                        id: item._id,
                        name: item.name,
                        oum: item.oum,
                        origin: item.origin,
                        preserve: item.preserve?.preserve_name,
                        uses: userid,
                        fiber: item.fiber,
                        description: item.description,
                        price: item.price,
                        images: item.images || [imageUri],
                        category: item.category?.category_id || 'unknown',
                        categoryName: item.category?.category_name || 'unknown',
                    };

                    if (item.category?.category_id === "6606b733ccf861171c336d91") {
                        props.navigation.navigate('Detailbottle', { product: Detail });
                    } else {
                        props.navigation.navigate('Detail', { product: Detail });
                    }

                }}
            >
                <View style={HomeStyle.productContainer}>
                    <Image style={{ width: 100, height: 80 }} source={{ uri: imageUri }} />
                    <View style={HomeStyle.productDetails}>
                        <Text style={HomeStyle.productTitle}>{item.name || 'Không có tên'}</Text>
                        <Text style={HomeStyle.productWeight}>{item.oum || 'Không có trọng lượng'}</Text>
                        <View style={HomeStyle.priceall}>
                            <Text style={HomeStyle.productPrice}>{item.price ? `${item.price}.000 VNĐ` : 'Giá không có'}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <ScrollView style={HomeStyle.container}
                showsVerticalScrollIndicator={false}  >

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

                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={item => item._id.toString()}
                    numColumns={2}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                />
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
