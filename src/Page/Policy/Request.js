import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

const Request = () => {
    const [reason, setReason] = useState('');

    const handleCancel = () => {
        // Handle the cancellation logic here, such as sending the reason to the server.
        console.log('Cancellation reason:', reason);
    };

    return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/chevron-left.png')}
                        style={styles.backIcon} />
                    <Text style={styles.title}>Yêu cầu hủy tài khoản</Text>
                </View>
            <Text style={styles.subtitle}>Hãy cho chúng tôi biết lí do bạn muốn hủy tài khoản?</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Nhập lí do vào đây..."
                value={reason}
                onChangeText={setReason}
                multiline
            />
            <TouchableOpacity style={styles.button} onPress={handleCancel}>
                <Text style={styles.buttonText}>HỦY</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000'
    },
    subtitle: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight:'bold',
        marginBottom:10
    },
    textInput: {
        height: 120,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#f5f5f5',
        textAlignVertical: 'top',
        marginBottom: 20,
        color: '#000000',
    },
    button: {
        backgroundColor: '#FF3B30', // Red color for cancel button
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backIcon: {
        width: 24,
        height: 24,
    },
});

export default Request;
