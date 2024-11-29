import React, { useState, useCallback } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import notifiStyle from './style';
import { useSelector } from 'react-redux';
import AxiosInstance from "../api/AxiosInstance";
import { useFocusEffect } from "@react-navigation/native";

const NotifiScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector(state => state.user);

    const userId = user?.userData?._id || 'default_id';

    useFocusEffect(
        useCallback(() => {
            const getNotifi = async () => {
                try {
                    if (!userId) {
                       
                        setLoading(false);
                        return;
                    }
                    const response = await AxiosInstance.get(`/notifications/${userId}`);
                    console.log('API Response:', response.data);
                    if (response.data) {
                        setData(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching notifications:", error);
                    setError("Không thể tải thông báo.");
                } finally {
                    setLoading(false);
                }
            };
            getNotifi();
        }, [userId]) 
    );

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

            <ScrollView style={notifiStyle.body}>
                {loading ? (
                    <Text style={{ fontSize: 18, color: '#666', textAlign: 'center', marginTop: 320 }}>
                        Đang tải...
                    </Text>
                ) : error ? (
                    <Text style={{ fontSize: 18, color: '#666', textAlign: 'center', marginTop: 320 }}>
                        {error}
                    </Text>
                ) : data.length > 0 ? (
                    data.map((item) => (
                        <View key={item._id} style={notifiStyle.item}>
                            <Text style={notifiStyle.title}>{item?.title}</Text>
                            <Text style={notifiStyle.message}>{item?.message}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={{ fontSize: 18, color: '#666', textAlign: 'center', marginTop: 320 }}>
                        Không có thông báo mới!!!
                    </Text>
                )}
            </ScrollView>
        </View>
    );
};

export default NotifiScreen;
