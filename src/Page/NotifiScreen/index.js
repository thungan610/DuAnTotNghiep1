import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import notifiStyle from './style'
const DataKM = [
    {
        id: 1,
        khuyenmai: "Đang có chương trình khuyến mãi",
        name: "Bắp cải",
        image: require("../../assets/image/image1.png"),
        time: "10/10/2024",
    },
    {
        id: 2,
        khuyenmai: "Đang có chương trình khuyến mãi",
        name: "Chanh",
        image: require("../../assets/image/image2.png"),
        time: "10/10/2024",
    },
    {
        id: 3,
        khuyenmai: "Đang có chương trình khuyến mãi",
        name: "Khoai tây",
        image: require("../../assets/image/image3.png"),
        time: "10/10/2024",
    }
]

const DataSSF = [
    {
        id: 1,
        trangthai: "Đặt hàng thành công",
        name: "Sườn",
        image: require("../../assets/image/image4.png"),
        quantity: "1",
        time: "10/10/2024",
    },
    {
        id: 2,
        trangthai: "Đặt hàng thành công",
        name: "Thịt đùi",
        image: require("../../assets/image/image5.png"),
        quantity: "2",
        time: "10/10/2024",
    },
    
]
const NotifiScreen = () => {
    return (
        <View style={notifiStyle.container}>
            <View style={notifiStyle.header}>
                <Image style={notifiStyle.iconBack} source={require("../../assets/notifi/backright.png")} />
                <Text style={notifiStyle.tieude}>Thông báo</Text>
                <Text />
            </View>
            <ScrollView style={notifiStyle.body}>
                <View style={notifiStyle.body}>
                    <View style={notifiStyle.list}>
                        {DataKM.map((item) => (
                            <View key={item.id} style={notifiStyle.item}>
                                <Image style={notifiStyle.image} source={item.image} />
                                <View style={notifiStyle.ViewTT}>
                                    <Text style={notifiStyle.khuyenmaiName}>{item.khuyenmai}</Text>
                                    <Text style={notifiStyle.name}>{item.name}</Text>
                                    <View style={notifiStyle.ViewTime}>
                                        <Text style={notifiStyle.time}>{item.time}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={notifiStyle.list}>
                        {DataSSF.map((item) => (
                            <View key={item.id} style={notifiStyle.item1}>
                                <Image style={notifiStyle.image} source={item.image} />
                                <View style={notifiStyle.ViewTT}>
                                    <Text style={notifiStyle.name}>{item.trangthai}</Text>
                                    <Text style={notifiStyle.khuyenmaiName}>{item.name}</Text>
                                    <Text style={notifiStyle.khuyenmaiName}>Số lượng: {item.quantity}</Text>
                                    <View style={notifiStyle.ViewTime}>
                                        <Text style={notifiStyle.time}>{item.time}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
export default NotifiScreen