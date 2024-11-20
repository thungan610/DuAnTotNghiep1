import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Payos = ({ route }) => {
  const { url } = route.params;

  const navigation = useNavigation();

  const handleNavigationChange = (navState) => {
    const { url } = navState;
    console.log('Current URL:', url);
    if (url.includes('/payment/success')) {
      console.log('Navigation detected success URL');
      Alert.alert('Thành công', 'Bạn đã thanh toán thành công');

      // updateBookingStatus('success');
      navigation.navigate('BottomNav');
    } else if (url.includes('/payment/cancel')) {
      console.log('Navigation detected cancel URL');
      Alert.alert('Thất bại', 'Đã hủy thanh toán.');
      // updateBookingStatus('cancel');
      navigation.navigate('BottomNav');
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onNavigationStateChange={handleNavigationChange}
        onError={() => {
          Alert.alert('Thất bại', 'Lỗi Thanh toán');
        }}
      />
      <Toast />
    </View>
  );
};

export default Payos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
