import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
      <View style={InsertPro5Styles.headers}>
        <TouchableOpacity onPress={BackRight}>
          <Image
            style={InsertPro5Styles.iconback}
            source={require('../../../src/assets/back.png')}
          />
        </TouchableOpacity>

          style={InsertPro5Styles.imgPro5}
          accessibilityLabel="Hình ảnh hồ sơ"
        />
      </View>

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