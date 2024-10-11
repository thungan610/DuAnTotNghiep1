import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import InsertPro5Styles from './InsertPro5Styles';
import { useNavigation } from '@react-navigation/native';

const InsertPro5 = () => {
  const navigation = useNavigation();
  const BackRight = () => {
    navigation.goBack()
}
const BtnLogin = () => {
  navigation.navigate('Login')
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

  const renderPro5 = ({item}) => (
    <View style={{backgroundColor: '#fff', height:'100%, width:100% '}}>
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

      <TouchableOpacity onPress={BtnLogin} style={InsertPro5Styles.btnLogout}>
        <Text style={InsertPro5Styles.btnLogoutText}>ĐĂNG XUẤT</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{backgroundColor: '#fff', height:'100%', width:'100% '}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id} // Đảm bảo rằng keyExtractor sử dụng 'id'
        renderItem={renderPro5}
      />
    </View>
  );
};

export default InsertPro5;
