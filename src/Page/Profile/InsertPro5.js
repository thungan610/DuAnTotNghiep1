import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import InsertPro5Styles from './InsertPro5Styles';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import axios from 'axios';

const InsertPro5 = (prop) => {
  const BackRight = () => {
    prop.navigation.goBack()
  }

  const data = [
    {
      id: '1', // Thêm id cho mỗi phần tử
      image: require('../../../src/assets/pro5img.png'),
      name: 'Bé Phát',
      bio: 'Thích nấu ăn',
      gen: 'Nam',
      dateBorn: '25/04/2004',
      phone: '024124932492',
      email: 'phatnt@gmail.com',
    },
  ];

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


  const renderPro5 = ({ item }) => (
    <View style={{ backgroundColor: '#fff', height: '100%, width:100% ' }}>
      <View style={InsertPro5Styles.headers}>
        <TouchableOpacity onPress={BackRight}>
          <Image
            style={InsertPro5Styles.iconback}
            source={require('../../../src/assets/back.png')}
          />
        </TouchableOpacity>
        <Text style={InsertPro5Styles.textH}>Sửa hồ sơ</Text>
      </View>
      <View style={InsertPro5Styles.imgPro5Container}>
        <Image
          source={item.image}
          style={InsertPro5Styles.imgPro5}
          alt="logo"
        />
      </View>

      <TouchableOpacity> 
        <Image
          style={InsertPro5Styles.imgphoto}
          source={require('../../../src/assets/photographic.png')}
        />
      </TouchableOpacity>

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
    <View style={{ backgroundColor: '#fff', height: '100%', width: '100% ' }}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderPro5}
      />
    </View>
  );
};

export default InsertPro5;
