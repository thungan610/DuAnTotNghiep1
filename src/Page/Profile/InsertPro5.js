import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useCallback,useEffect, useState } from 'react';
import InsertPro5Styles from './InsertPro5Styles';
// import axios from 'axios';
import AxiosInstance from '../api/AxiosInstance';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
const InsertPro5 = (prop) => {
  const [profileData, setProfileData] = useState(null);
  const user = useSelector(state => state.user);
  const userid = user?.userData?._id || 'default_id';

  console.log('user', user);


  const BackRight = () => {
    prop.navigation.goBack();
  };

  const updateHoSo = () => {
    prop.navigation.navigate('UpdateProfile');
  };

  useFocusEffect(
    useCallback(() => {
      const fetchProfileData = async () => {
        if (!userid) {
          return;
        }
        try {
          const response = await AxiosInstance.get(`/users/${userid}/getProfileApp`);
          console.log('Profile data:', response.data);
          setProfileData(response.data);
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu:', error);
        }
      };

      fetchProfileData();
    }, [userid])
  );


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
            style={InsertPro5Styles.iconedit}
            source={require('../../../src/assets/edit.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={InsertPro5Styles.imgPro5Container}>
        <Image
          source={profileData.avatar ? { uri: profileData.avatar } : require('../../../src/assets/pro5img.png')}
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
