import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

const NewNotifi = (prop) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchNotifications = async () => {
    //         try {
    //             const response = await fetch('YOUR_API_URL'); // Thay thế YOUR_API_URL bằng API của bạn
    //             const data = await response.json();
    //             setNotifications(data); // Giả sử API trả về mảng thông báo
    //         } catch (error) {
    //             console.error('Error fetching notifications:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchNotifications();
    // }, []);

    const renderItem = ({ item }) => (
        <View style={NewnotifiStyle.notificationItem}>
            <Text style={NewnotifiStyle.notificationText}>{item.message}</Text>
        </View>
    );

    return (
        <View style={NewnotifiStyle.container}>
            <View style={NewnotifiStyle.header}>
                <Text style={NewnotifiStyle.tieude}>Thông báo</Text>
                <Text />
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={NewnotifiStyle.body}>
                    {notifications.length === 0 ? (
                        <Text style={NewnotifiStyle.chu}>Hiện chưa có thông báo!!!!</Text>
                    ) : (
                        <FlatList
                            data={notifications}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            scrollEnabled={false} // Để `FlatList` không cuộn riêng, sử dụng `ScrollView`
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default NewNotifi;

const NewnotifiStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBack: {
        width: 34,
        height: 35,
        tintColor: "black",
    },
    tieude: {
        fontSize: 24,
        color: "black",
        fontWeight: "bold",
        fontFamily: "Poppins"
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    chu: {
        color: '#8B8B8B',
        fontSize: 20,
    },
    notificationItem: {
        backgroundColor: '#F0F0F0',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        width: '100%',
    },
    notificationText: {
        fontSize: 16,
        color: 'black',
    },
});
