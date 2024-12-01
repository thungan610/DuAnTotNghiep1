import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import notifiStyle from './style';
import { useSelector, useDispatch } from 'react-redux';
import PushNotification from "react-native-push-notification";
import { addNotification, removeNotification } from '../Reducers/notificationSlice'; // Import removeNotification

const NotifiScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notification.notifications);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const sendLocalNotification = () => {
        const newNotification = {
            id: Date.now().toString(),
            title: "Thông báo mới",
            message: "Bạn đã đặt hàng thành công",
        };

        PushNotification.localNotification({
            channelId: "channelId",
            title: newNotification.title,
            message: newNotification.message,
        });

        dispatch(addNotification(newNotification));
    };

    const handleRemoveNotification = (id) => {
        dispatch(removeNotification(id));  
    };

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
                ) : notifications.length > 0 ? (
                    notifications.map((item) => (
                        <View key={item.id} style={{ borderWidth: 1, borderRadius: 1, borderColor: '#37C5DF', marginTop: 20, paddingHorizontal:2 }}>
                            <TouchableOpacity
                                onPress={() => handleRemoveNotification(item.id)}>
                                <Image style={{position:'absolute', right:0, top: 0}} 
                                 source={require('../../assets/close.png')}/>
                            </TouchableOpacity>

                            <Text style={{ fontWeight: "bold", fontSize: 18, color: 'black', marginLeft:8, marginTop:10 }}>{item.title}</Text>
                            <Text style={{ fontSize: 16, marginBottom:10, marginLeft:8 }}>{item.message}</Text>

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
