import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import notifiStyle from './style';
import { useSelector } from 'react-redux';
import axiosInstance from "../api/AxiosInstance";

const NotifiScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    console.log('data', data);
    const userId = useSelector(state => state.user.id);

    useEffect(() => {
        const getNotifi = async () => {
            try {
                if (!userId) {
                    console.log("User ID is not available");
                    return;
                }
                const response = await axiosInstance.get(`/notifications/${userId}`);
                console.log('API Response:', response.data);
                if (response.data) {
                    setData(response.data);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        getNotifi();
    }, [userId]);






    // const fetchData = async () => {
    //     try {
    //         const response = await axiosInstance.get(`/notifications/${userId}`);
    //         console.log('response', response);
    //         return response ;
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         return [];
    //     }
    // };

    return (
        <View style={notifiStyle.container}>
            <View style={notifiStyle.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={notifiStyle.iconBack}
                >
                    <Image source={require("../../assets/notifi/backright.png")} />
                </TouchableOpacity>
                <Text style={notifiStyle.tieude}>Thông báo</Text>
            </View>

            <ScrollView
                style={notifiStyle.body}>
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <View key={item._id} style={notifiStyle.item}>
                            <Text style={notifiStyle.title}>{item?.title}</Text>
                            <Text style={notifiStyle.message}>{item?.message}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={{
                        fontSize: 18,
                        color:'#666',
                        textAlign:'center',
                        marginTop:320
                    }}>Không có thông báo mới!!!</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default NotifiScreen;
