import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import InsertPro5Styles from './InsertPro5Styles';
import AxiosInstance from '../api/AxiosInstance'; // Import Axios instance của bạn

const InsertPro5 = (prop) => {
  const [data, setData] = useState([]); // Khởi tạo state để lưu trữ dữ liệu

  useEffect(() => {
    // Hàm để lấy dữ liệu từ API
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/profile/getUserProfile'); 
        setData(response.data); // Cập nhật state với dữ liệu nhận được
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData(); 
  }, []);

  const BackRight = () => {
    prop.navigation.goBack();
  };

  const renderPro5 = ({ item }) => (
    <View style={{ backgroundColor: '#fff', height: '100%', width: '100%' }}>
      <View style={InsertPro5Styles.headers}>
        <TouchableOpacity onPress={BackRight}>
          <Image
            style={InsertPro5Styles.iconback}
            source={require('../../../src/assets/back.png')}
          />
        </TouchableOpacity>
        <Text style={InsertPro5Styles.textH}>Hồ sơ</Text>
      </View>
      <View style={InsertPro5Styles.imgPro5Container}>
        <Image
          source={{ uri: item.image }} // Nếu image là URL từ API
          style={InsertPro5Styles.imgPro5}
          accessibilityLabel="Hình ảnh hồ sơ"
        />
      </View>

      <View style={InsertPro5Styles.body}>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Tên</Text>
          <Text style={InsertPro5Styles.textPro5}>{item.name}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Tiểu sử</Text>
          <Text style={InsertPro5Styles.textPro5}>{item.bio}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Giới tính</Text>
          <Text style={InsertPro5Styles.textPro5}>{item.gen}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Ngày sinh</Text>
          <Text style={InsertPro5Styles.textPro5}>{item.dateBorn}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Số điện thoại</Text>
          <Text style={InsertPro5Styles.textPro5}>{item.phone}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Email</Text>
          <Text style={InsertPro5Styles.textPro5}>{item.email}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => prop.navigation.navigate('Login')} style={InsertPro5Styles.btnLogout}>
        <Text style={InsertPro5Styles.btnLogoutText}>ĐĂNG XUẤT</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ backgroundColor: '#fff', height: '100%', width: '100%' }}>
      <FlatList
        data={data} // Sử dụng dữ liệu đã lấy từ API
        keyExtractor={(item) => item.id.toString()} // Đảm bảo id là một chuỗi
        renderItem={renderPro5}
      />
    </View>
  );
};

export default InsertPro5;
