import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

const NewNotifi = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Uncomment and replace 'YOUR_API_URL' with your API endpoint when you are ready to fetch notifications.
    // useEffect(() => {
    //     const fetchNotifications = async () => {
    //         try {
    //             const response = await fetch('YOUR_API_URL'); // Replace with your API endpoint
    //             const data = await response.json();
    //             setNotifications(data); // Assuming the API returns an array of notifications
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
                <TouchableOpacity onPress={() => navigation.goBack()} style={NewnotifiStyle.backButton}>
                    <Image
                        style={NewnotifiStyle.iconBack}
                        source={require('../../assets/notifi/backright.png')}
                    />
                </TouchableOpacity>
                <Text style={NewnotifiStyle.tieude}>Thông báo</Text>
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
                            scrollEnabled={false}
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 0,
        padding: 10,
    },
    iconBack: {
        width: 34,
        height: 35,
        tintColor: 'black',
    },
    tieude: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
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
