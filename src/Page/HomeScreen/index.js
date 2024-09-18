import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, ScrollView } from "react-native";
import homeStyle from "./style";

const DATA = [
    {
        id: 1,
        name: "Bắp cải trắng",
        price: "19.000",
        image: require("../../assets/home/bapcai.png"),
        quantity: 1
    },
    {
        id: 2,
        name: "Bắp cải trắng",
        price: "19.000",
        image: require("../../assets/home/bapcai.png"),
        quantity: 1
    },
    {
        id: 3,
        name: "Bắp cải trắng",
        price: "19.000",
        image: require("../../assets/home/bapcai.png"),
        quantity: 1
    },
    {
        id: 4,
        name: "Bắp cải trắng",
        price: "19.000",
        image: require("../../assets/home/bapcai.png"),
        quantity: 1
    },
    {
        id: 5,
        name: "Bắp cải trắng",
        price: "19.000",
        image: require("../../assets/home/bapcai.png"),
        quantity: 1
    },
    {
        id: 6,
        name: "Bắp cải trắng",
        price: "19.000",
        image: require("../../assets/home/bapcai.png"),
        quantity: 1
    },
    {
        id: 7,
        name: "Bắp cải trắng",
        price: "19.000",
        image: require("../../assets/home/bapcai.png"),
        quantity: 1
    },
    {
        id: 8,
        name: "Bắp cải trắng",
        price: "19.000",
        image: require("../../assets/home/bapcai.png"),
        quantity: 1
    },
    {
        id: 9,
        name: "Bắp cải trắng",
        price: "19.000",
        image: require("../../assets/home/bapcai.png"),
        quantity: 1
    },
    {
        id: 10,
        name: "Bắp cải trắng",
        price: "19.000",
        image: require("../../assets/home/bapcai.png"),
        quantity: 1
    },
]
const HomeScreen = () => {
    return (
        <View style={homeStyle.container}>
            <View style={homeStyle.header}>
                <View style={homeStyle.itemTop}>
                    <View style={homeStyle.itemTop1}>
                        <Image style={homeStyle.cart} source={require("../../assets/home/cart.png")} />
                        <Image style={homeStyle.notifi} source={require("../../assets/home/notifi.png")} />
                    </View>
                </View>

                <View>
                    <Text style={homeStyle.text}>Chào, <Text style={homeStyle.name}>Bé Phát <Image style={homeStyle.heart} source={require("../../assets/home/cucai.png")} /></Text></Text>
                    <Text style={homeStyle.text1}>Hôm nay bạn muốn mua gì?</Text>
                </View>
                <View style={homeStyle.viewSearch}>
                    <Image style={homeStyle.iconSearch} source={require("../../assets/home/search.png")} />
                    <TextInput
                        style={homeStyle.textInput}
                        placeholder="Nhập tên sản phẩm cần tìm..."
                    />
                </View>
            </View>

            <View style={homeStyle.TabTop}>
                <View style={homeStyle.iconTabTop}>
                    <Image style={homeStyle.heart1} source={require("../../assets/home/frush.png")} />
                    <Image style={homeStyle.heart1} source={require("../../assets/home/vegetable.png")} />
                    <Image style={homeStyle.heart1} source={require("../../assets/home/meet.png")} />
                    <Image style={homeStyle.heart1} source={require("../../assets/home/fish.png")} />
                </View>
            </View>

            <View style={homeStyle.View}>
                <View style={homeStyle.view}>
                    <View style={homeStyle.viewFlashSale}>
                        <Text style={homeStyle.textFlashSale}>FLASH SALE</Text>
                        <Text style={homeStyle.textAll}>Tất cả <Image style={homeStyle.arrow} source={require("../../assets/home/arrowright.png")} /></Text>
                    </View>
                    <FlatList
                        style={homeStyle.viewProduct}
                        data={DATA}
                        horizontal={true}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={homeStyle.product}>
                                <View style={homeStyle.viewImage}>
                                    <Image source={item.image} style={homeStyle.image} />
                                </View>
                                <Text style={homeStyle.nameProduct}>{item.name}</Text>
                                <View style={homeStyle.priceView}>
                                    <Text style={homeStyle.price}>{item.price} đ</Text>
                                    <Text style={homeStyle.price}>{item.quantity}</Text>
                                </View>
                                <View style={homeStyle.viewAdd}>
                                    <View style={homeStyle.viewIcon}>
                                        <Image source={require("../../assets/home/dash.png")} style={homeStyle.icon} />
                                        <Text style={homeStyle.quantity}>{item.quantity}</Text>
                                        <Image source={require("../../assets/home/add.png")} style={homeStyle.icon} />
                                    </View>
                                    <TouchableOpacity style={homeStyle.buttonAdd}>
                                        <Text style={homeStyle.textAdd}>Thêm vào giỏ hàng</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>

            <View style={homeStyle.ViewFlaslit2}>
                <View style={homeStyle.viewFL2}>
                <FlatList
                    style={homeStyle.viewProduct}
                    data={DATA}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={homeStyle.product}>
                            <View style={homeStyle.viewImage}>
                                <Image source={item.image} style={homeStyle.image} />
                            </View>
                            <Text style={homeStyle.nameProduct}>{item.name}</Text>
                            <View style={homeStyle.priceView}>
                                <Text style={homeStyle.price}>{item.price} đ</Text>
                                <Text style={homeStyle.price}>{item.quantity}</Text>
                            </View>
                            <View style={homeStyle.viewAdd}>
                                <View style={homeStyle.viewIcon}>
                                    <Image source={require("../../assets/home/dash.png")} style={homeStyle.icon} />
                                    <Text style={homeStyle.quantity}>{item.quantity}</Text>
                                    <Image source={require("../../assets/home/add.png")} style={homeStyle.icon} />
                                </View>
                                <TouchableOpacity style={homeStyle.buttonAdd}>
                                    <Text style={homeStyle.textAdd}>Thêm vào giỏ hàng</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                </View>
            </View>
        </View>
    );
};
export default HomeScreen

