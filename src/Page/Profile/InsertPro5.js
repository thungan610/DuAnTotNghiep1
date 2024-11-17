import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import InsertPro5Styles from './InsertPro5Styles';
// import axios from 'axios';
import AxiosInstanceSP from '../api/AxiosInstanceSP';
const InsertPro5 = (prop) => {
  const [profileData, setProfileData] = useState(null);

  const BackRight = () => {
    prop.navigation.goBack();
  };

  const updateHoSo = () => {
    prop.navigation.navigate('UpdateProfile');
  };

  useEffect(() => {
    // Fetch profile data from the API
    const fetchProfileData = async () => {
      try {
        const response = await AxiosInstanceSP().get('http://192.168.1.10:3000/users/671b544f7e165147f9d6cd6e/getProfileApp');
        console.log('Profile data:', response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchProfileData();
  }, []);

  if (!profileData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ backgroundColor: '#fff', height: '100%', width: '100%', padding: 20 }}>
      <View style={InsertPro5Styles.headers}>
        <TouchableOpacity onPress={BackRight}>
          <Image
            style={InsertPro5Styles.iconback}
            source={require('../../../src/assets/back.png')}
          />
        </TouchableOpacity>
        <Text style={InsertPro5Styles.textH}>Hồ sơ</Text>
        <TouchableOpacity onPress={updateHoSo}>
          <Image
            style={InsertPro5Styles.iconedit}  // Ensure this style is defined in InsertPro5Styles
            source={require('../../../src/assets/edit.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={InsertPro5Styles.imgPro5Container}>
        <Image
          source={profileData.image ? { uri: profileData.image } : require('../../../src/assets/pro5img.png')}
          style={InsertPro5Styles.imgPro5}
          accessibilityLabel="Hình ảnh hồ sơ"
        />
      </View>

      <TouchableOpacity style={InsertPro5Styles.imgphotoContainer}>
        <Image
          style={InsertPro5Styles.imgphoto}
          source={require('../../../src/assets/photographic.png')}
        />
      </TouchableOpacity>

      <View style={InsertPro5Styles.body}>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Tên</Text>
          <Text style={InsertPro5Styles.textPro5}>{profileData.name}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Tiểu sử</Text>
          <Text style={InsertPro5Styles.textPro5}>{profileData.bio}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Giới tính</Text>
          <Text style={InsertPro5Styles.textPro5}>{profileData.gender}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Ngày sinh</Text>
          <Text style={InsertPro5Styles.textPro5}>{profileData.birthday}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Số điện thoại</Text>
          <Text style={InsertPro5Styles.textPro5}>{profileData.phone}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Email</Text>
          <Text style={InsertPro5Styles.textPro5}>{profileData.email}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => prop.navigation.navigate('Login')} style={InsertPro5Styles.btnLogout}>
        <Text style={InsertPro5Styles.btnLogoutText}>ĐĂNG XUẤT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InsertPro5;
