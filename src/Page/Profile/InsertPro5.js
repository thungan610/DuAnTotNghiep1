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
  const updateHoSo = () => {
    prop.navigation.navigate('UpdateProfile');
  };
  useEffect(() => {
    // Fetch profile data from the API
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://192.168.1.3:6677/users/671b544f7e165147f9d6cd6e/getProfileApp');
        console.log('Profile data:', response.data);
        
        setProfileData(response.data);
      } catch (error) {
        console.error('Lấy lỗi rồi sửa đi:', error);
      }
    };

    fetchProfileData();
  }, []);

  const renderPro5 = () => (
    <View style={{ backgroundColor: '#fff', height: '100%', width: '100%' , padding: 20}}>
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
          source={{ uri: item.image }}/> // Nếu image là URL từ API
        <Text style={InsertPro5Styles.textH}>Sửa hồ sơ</Text>
        <TouchableOpacity onPress={updateHoSo}>
          <Image
            style={UpdateProfileStyle.iconedit}
            source={require('../../../src/assets/edit.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={InsertPro5Styles.imgPro5Container}>
        <Image
          source={profileData?.image ? { uri: profileData.image } : require('../../../src/assets/pro5img.png')}
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
          <Text style={InsertPro5Styles.textPro5}>{profileData.data.name}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Tiểu sử</Text>
          <Text style={InsertPro5Styles.textPro5}>{profileData.data.bio}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Giới tính</Text>
          <Text style={InsertPro5Styles.textPro5}>{profileData.data.gender}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Ngày sinh</Text>
          <Text style={InsertPro5Styles.textPro5}>{profileData.data.birthday}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Số điện thoại</Text>
          <Text style={InsertPro5Styles.textPro5}>{profileData.data.phone}</Text>
        </View>
        <View style={InsertPro5Styles.name}>
          <Text style={InsertPro5Styles.textPro5TT}>Email</Text>
          <Text style={InsertPro5Styles.textPro5}>{profileData.data.email}</Text>
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














// const chooseImage = () => {
//   const options = {
//     title: 'Chọn ảnh',
//     storageOptions: {
//       skipBackup: true,
//       path: 'images',
//     },
//   };

// Hiển thị menu lựa chọn giữa camera và thư viện ảnh
//   Alert.alert(
//     'Chọn ảnh',
//     'Chọn ảnh từ thư viện hoặc chụp ảnh mới',
//     [
//       {
//         text: 'Thư viện',
//         onPress: () => {
//           launchImageLibrary(options, response => {
//             if (response.assets) {
//               const source = { uri: response.assets[0].uri };
//               console.log(source); // Xử lý ảnh đã chọn từ thư viện
//             }
//           });
//         },
//       },
//       {
//         text: 'Máy ảnh',
//         onPress: () => {
//           launchCamera(options, response => {
//             if (response.assets) {
//               const source = { uri: response.assets[0].uri };
//               console.log(source); // Xử lý ảnh đã chụp từ máy ảnh
//             }
//           });
//         },
//       },
//       {
//         text: 'Hủy',
//         style: 'cancel',
//       },
//     ],
//     { cancelable: true }
//   );
// };

// const handleUploadImage = (source) => {
//   const formData = new FormData();
//   formData.append('image', {
//     uri: source.uri,
//     type: source.type,
//     name: source.fileName || `photo.${source.uri.split('.').pop()}`,
//   });

// Gửi request lên API
//   axios.post('https://example.com/upload', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   })
//   .then(response => {
//     console.log('Upload thành công:', response.data);
//   })
//   .catch(error => {
//     console.error('Lỗi khi upload ảnh:', error);
//   });
// };