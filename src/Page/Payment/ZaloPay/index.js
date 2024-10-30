import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import ZaloPayStyle from "./style";
// import { useState } from "react";
// import QRCode from 'react-native-qrcode-svg';
// import RNFS from 'react-native-fs';

const ZaloPay = (prop) => {
  // const [orderURL, setOrderURL] = useState('');
  // const [amount, setAmount] = useState(0);

  // const createOrder = async () => {
  //   try {
  //     const response = await fetch('YOUR_API_URL_HERE', { // Link API
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ amount: 50000 }), // Thay đổi số tiền nếu cần
  //     });

  //     const data = await response.json();
  //     setOrderURL(data.orderURL); // Giả định data.orderURL chứa URL mã QR
  //     setAmount(data.amount); // Giả định data.amount chứa số tiền
  //   } catch (error) {
  //     console.error('Error creating order:', error);
  //     Alert.alert('Lỗi', 'Không thể tạo đơn hàng. Vui lòng thử lại.');
  //   }
  // };

  // const downloadImage = async () => {
  //   if (orderURL) {
  //     const destPath = `${RNFS.DocumentDirectoryPath}/MyQR.png`;
  //     try {
  //       await CameraRoll.save(destPath, { type: 'photo' });
  //       Alert.alert('Tải ảnh xuống thành công', 'Ảnh đã được lưu vào thư viện ảnh.');
  //     } catch (error) {
  //       console.error('Error downloading image:', error);
  //       Alert.alert('Tải ảnh xuống thất bại', 'Đã xảy ra lỗi khi tải ảnh.');
  //     }
  //   } else {
  //     Alert.alert('Lỗi', 'Chưa có mã QR để tải xuống.');
  //   }
  // };

  // useEffect(() => {
  //   createOrder(); // Gọi hàm tạo đơn hàng khi component được mount
  // }, []);

  return (
    <View style={ZaloPayStyle.container}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <TouchableOpacity onPress={() => prop.navigation.navigate('PayMethod')}>
          <Image style={ZaloPayStyle.backright} source={require("../../../assets/notifi/backright.png")} />
        </TouchableOpacity>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: 'black'
        }}>Quét mã zalo pay</Text>
        <Text />
      </View>
      <View style={{
        alignItems: 'center'
      }}>
        {/* <View style={ZaloPayStyle.body}>
          {orderURL ? (
            <>
              <QRCode
                value={orderURL}
                size={200} // Kích thước của mã QR
              />
              <Text style={{ fontSize: 18, marginTop: 20 }}>
                Số tiền: {amount} VND
              </Text>
            </>
          ) : (
            <Text>Đang tạo mã QR...</Text>
          )}
        </View> */}
        <TouchableOpacity onPress={downloadImage}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12
          }}>
          <Image source={require('../../../../src/assets/Down.png')} />
          <Text style={{
            fontSize: 16,
            color: 'black'
          }}>Tải ảnh xuống</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => prop.navigation.navigate('Payment')} style={{
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: '#27AAE1',
        borderColor: '#27AAE1',
        justifyContent: 'center',
        marginTop: 160
      }}>
        <Text style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
          padding: 16,
          textAlign: 'center',
        }}>ĐỒNG Ý</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ZaloPay