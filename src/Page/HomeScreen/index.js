    import React, { useState, useRef, useEffect } from "react";
    import { View, Image, TextInput, ScrollView, Dimensions, TouchableOpacity, Text, FlatList } from "react-native";
    import HomeStyle from "./style";

    const HomeScreen = () => {
        const [search, setSearch] = useState("");
        const scrollViewRef = useRef(null);
        const [currentIndex, setCurrentIndex] = useState(0);
        const [selectedCategory, setSelectedCategory] = useState(0);
        const screenWidth = Dimensions.get('window').width;

        const banners = [
            require('../../../src/assets/banner/baner1.jpg'),
            require('../../../src/assets/banner/baner2.jpg'),
            require('../../../src/assets/banner/baner3.jpg'),
        ];

        const categories = ["Tất cả", "Rau củ", "Trái cây", "Thịt", "Cá", "Gia vị", "Nước ngọt"];

        const products = [
            {
                id: '1',
                title: 'Bắp cải trắng',
                price: '19.000',
                weight: '1 kg',
                image: require('../../../src/assets/image/image1.png'),
            },
            {
                id: '2',
                title: 'Chanh không hạt',
                price: '9.000',
                weight: '1 kg',
                image: require('../../../src/assets/image/image2.png'),
            },
            {
                id: '3',
                title: 'Khoai tây',
                price: '30.000',
                weight: '1 kg',
                image: require('../../../src/assets/image/image3.png'),
            },
            {
                id: '4',
                title: 'Sườn non',
                price: '45.000',
                weight: '1 kg',
                image: require('../../../src/assets/image/image4.png'),
            },
            {
                id: '5',
                title: 'Thịt đùi',
                price: '30.000',
                weight: '1 kg',
                image: require('../../../src/assets/image/image5.png'),
            },
            {
                id: '6',
                title: 'Rau bó sôi',
                price: '9.000',
                weight: '1 kg',
                image: require('../../../src/assets/image/image6.png'),
            },
        ];

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
                    <Image style={HomeStyle.avatar} source={require('../../../src/assets/avatar.png')} />
                    <View style={HomeStyle.searchall}>
                        <Image style={HomeStyle.search} source={require('../../../src/assets/Search_alt.png')} />
                        <TextInput
                            placeholder="Tìm kiếm"
                            onChangeText={setSearch}
                            style={HomeStyle.input}
                        />
                    </View>
                    <Image style={HomeStyle.bell} source={require('../../../src/assets/Bell.png')} />
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
                                marginTop: 7
                            }}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    contentContainerStyle={HomeStyle.productList}
                    scrollEnabled={false} // Ngăn FlatList cuộn
                />
            </ScrollView>

            <View style={HomeStyle.footer}>
                    <Image style={HomeStyle.iconft} source={require('../../../src/assets/homee.png')} />
                    <Image style={HomeStyle.iconft} source={require('../../../src/assets/Desk_alt.png')} />
                    <Image style={HomeStyle.iconft} source={require('../../../src/assets/Basket_fill.png')} />
                    <Image style={HomeStyle.iconft} source={require('../../../src/assets/Bell.png')} />
                    <Image style={HomeStyle.iconft} source={require('../../../src/assets/User_alt.png')} />
                </View>
        </View>
        );
    };

    export default HomeScreen;