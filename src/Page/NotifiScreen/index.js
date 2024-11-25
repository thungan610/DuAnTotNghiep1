import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import notifiStyle from './style';
import axios from "axios";

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
];

const NotifiScreen = ({ navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const result = await fetchData();
            setData(result);
        };
        getData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://your-api-endpoint.com/notifications');
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    return (
        <View style={notifiStyle.container}>
            <View style={notifiStyle.header}>
                {/* Updated Go Back Button */}
                <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    style={notifiStyle.iconBack}
                >
                    <Image source={require("../../assets/notifi/backright.png")} />
                </TouchableOpacity>
                <Text style={notifiStyle.tieude}>Thông báo</Text>
            </View>

            <ScrollView style={notifiStyle.body}>
                {data.length === 0 ? (
                    <View style={notifiStyle.noNotification}>
                        <Text style={notifiStyle.noNotificationText}>Không có thông báo mới</Text>
                    </View>
                ) : (
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
                )}
            </ScrollView>
        </View>
    );
};

export default NotifiScreen;
