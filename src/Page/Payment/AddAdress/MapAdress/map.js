import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, Platform } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import MapView, { Marker } from 'react-native-maps';

const App = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  // const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';  

  // Hàm lấy địa chỉ từ Geocoding API của Google
  // const getAddressFromCoordinates = async (latitude, longitude) => {
  //   try {
  //     const apiLink = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  //     const response = await fetch(apiLink);
  //     const data = await response.json();

  //     if (data.status === 'OK' && data.results.length > 0) {
  //       setAddress(data.results[0].formatted_address);
  //     } else {
  //       setAddress('Không tìm thấy địa chỉ');
  //     }
  //   } catch (error) {
  //     console.error('Lỗi khi gọi API:', error);
  //     setAddress('Lỗi khi lấy địa chỉ');
  //   }
  // };

  // Quyền truy cập vị trí
  // const requestLocationPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Quyền truy cập vị trí',
  //         message: 'Ứng dụng cần quyền truy cập vị trí của bạn.',
  //         buttonNeutral: 'Hỏi sau',
  //         buttonNegative: 'Từ chối',
  //         buttonPositive: 'Đồng ý',
  //       }--
  //     );
  //     return granted === PermissionsAndroid.RESULTS.GRANTED;
  //   }
  //   return true;
  // };

  // Lấy vị trí hiện tại khi ứng dụng khởi chạy
  useEffect(() => {
    const getCurrentLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            getAddressFromCoordinates(latitude, longitude);
          },
          (error) => {
            console.log(error.message);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }
    };

    getCurrentLocation();
  }, []);

  // Xử lý khi người dùng chọn vị trí mới trên bản đồ
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
    getAddressFromCoordinates(latitude, longitude);
  };

  return (
    <View style={{ flex: 1 }}>
      {location && (
        <MapView
          style={{ flex: 1 }}
          region={{
            ...location,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true}
          onPress={handleMapPress} // Thêm sự kiện nhấn
        >
          <Marker coordinate={location} />
        </MapView>
      )}
      <View style={{ padding: 10, backgroundColor: 'white' }}>
        <Text>Địa chỉ hiện tại: {address ? address : 'Đang xác định...'}</Text>
      </View>
    </View>
  );
};

export default App;
