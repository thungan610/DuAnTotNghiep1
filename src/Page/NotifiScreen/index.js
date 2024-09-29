import React from "react";
import { View, Text, Image, FlatList, Touchable, TouchableOpacity } from "react-native";
import notifiStyle from "./style";
import EditProfileStyle from "../Profile/EditProfile/style";
const DATAKM = [
    {
        id: 1,
        khuyenmai: "Đang có chương trình khuyến mãi!",
        name: "Nước cam fanta",
        image: require("../../assets/Notifi/oi.png"),
        day: "10/10/2022",
    },
    {
        id: 2,
        khuyenmai: "Khuyến mãi mua 1 tặng 1",
        name: "Nước cam fanta",
        image: require("../../assets/Notifi/fruis.png"),
        day: "10/10/2022",
    },
    {
        id: 3,
        khuyenmai: "Đang có chương trình khuyến mãi!",
        name: "Nước cam fanta",
        image: require("../../assets/Notifi/chicken.png"),
        day: "10/10/2022",
    },
]

const DATA = [
    {
        id: 1,
        trangthai: "Đặt hàng thành công",
        name: "Coca không đường",
        image: require("../../assets/Notifi/coca.png"),
        quantity: "3 chai",
        day: "10/10/2022",
    },
    {
        id: 2,
        trangthai: "Đặt hàng thành công",
        name: "Dầu bếp hồng",
        image: require("../../assets/Notifi/oil.png"),
        quantity: "1 chai",
        day: "10/10/2022",
    },

]
const NotifiScreen = () => {
    return (
        <View style={notifiStyle.container}>
            <View style={EditProfileStyle.Viewtitle}>
                <Image style={EditProfileStyle.arrowleft} source={require("../../assets/profile/arrowleft.png")} />
                <Text style={EditProfileStyle.title}>Thông báo</Text>
                <Text />
            </View>

            <View style={notifiStyle.viewItem1}>
                <FlatList
                    data={DATAKM}
                    renderItem={({ item }) => (
                        <View style={notifiStyle.viewItem}>
                            <View style={notifiStyle.ViewImage}>
                                <Image source={item.image} />
                            </View>
                            <View style={notifiStyle.viewText}>
                                <View>
                                    <Text style={notifiStyle.km1}>{item.khuyenmai}</Text>
                                    <Text style={notifiStyle.name}>{item.name}</Text>
                                </View>
                                <View style={notifiStyle.viewDay}>
                                    <Text style={notifiStyle.textDay}>{item.day}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
            <View>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                        <View style={notifiStyle.viewItem2}>
                            <View style={notifiStyle.ViewImage}>
                                <Image source={item.image} />
                            </View>
                            <View style={notifiStyle.viewText}>
                                <View>
                                    <Text style={notifiStyle.name}>{item.trangthai}</Text>
                                    <Text style={notifiStyle.km}>{item.name}</Text>
                                    <Text style={notifiStyle.km}>Số lượng: {item.quantity}</Text>
                                </View>
                                <View style={notifiStyle.viewDay}>
                                    <Text style={notifiStyle.textDay}>{item.day}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};
export default NotifiScreen