import { View, Text, Image, TouchableOpacity, } from 'react-native';
import {React, useEffect, useState} from 'react';
import profileStyle from './ProfileDetailstyle';
import axios from 'axios';

const ProfileDetail = (prop) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch profile data from the API
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://192.168.1.10:3000/users/671b544f7e165147f9d6cd6e/getProfileApp');
        console.log('Profile data:', response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error('Lấy lỗi rồi sửa đi:', error);
      }
    };
    fetchProfileData();
  }, []);

  const OnViewHoSo = () => {
    prop.navigation.navigate('InsertPro5');
  };
  return (
    <View style={{position:'relative',
      width:'100%', 
      height:'100%',
      backgroundColor:'#fff',
     }}>

      <View style={profileStyle.header}>
        <View style={profileStyle.headercontainer}>
          <TouchableOpacity>
            <Image
              style={profileStyle.pro5logo}
              source={require('../../../src/assets/pro5logo.png')}
            />
          </TouchableOpacity>

          <View style={profileStyle.undercontainer}>
            <Text style={profileStyle.username}>{profileData?.data.name}</Text>
            <TouchableOpacity onPress={OnViewHoSo}>
              <View style={profileStyle.mid}>
                <Text style={profileStyle.pro5small}>Hồ sơ</Text>
                <Image
                  style={profileStyle.vecto}
                  source={require('../../../src/assets/vecto1.png')}
                />
              </View>
            </TouchableOpacity>
          </View> 

        </View>

      </View>
      <View style={profileStyle.body}>
        <View style={profileStyle.firstbody}>
          <Text style={profileStyle.titleB}>Đơn mua</Text>
        </View>
        <View style={profileStyle.secondbody}>
          <TouchableOpacity onPress={() => prop.navigation.navigate('Order', { selectedTab: 2})} style={profileStyle.load}>
            <Image
              style={profileStyle.loadimg}
              source={require('../../../src/assets/Time.png')}
            />
            <Text style={profileStyle.loadtext}>Lịch sử mua hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => prop.navigation.navigate('ProductReview')}>
            <Image
              style={profileStyle.loadimg1}
              source={require('../../../src/assets/star.png')}
            />
            <Text style={profileStyle.loadtext2}>Đánh giá</Text>
          </TouchableOpacity >
          <TouchableOpacity onPress={() => prop.navigation.navigate('Policy')}>
            <Image
              style={profileStyle.loadimg}
              source={require('../../../src/assets/Arhive_export.png')}
            />
            <Text style={profileStyle.loadtext3}>Chính sách hoàn trả</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => prop.navigation.navigate('Preservation')} >
            <View style={profileStyle.load4}>
              <Image
                style={profileStyle.loadimg2}
                source={require('../../../src/assets/Book_open.png')}
              />

              <Text style={profileStyle.loadtext4}>Bảo quản</Text>

            </View>
          </TouchableOpacity>
        </View>
        <View style={profileStyle.thirdbody}>
          <Text style={profileStyle.account}>Tài khoản</Text>
          <TouchableOpacity onPress={() => prop.navigation.navigate('TabAddress')}>
            <View>
              <View style={profileStyle.insideAccount}>
                <Text style={profileStyle.textTab}>Địa chỉ</Text>
                <Image
                  style={profileStyle.vecto}
                  source={require('../../../src/assets/vecto1.png')}
                />
              </View>

              <View style={profileStyle.boder} />
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity onPress={() => prop.navigation.navigate('UserCancel')}>
            <View style={profileStyle.insideAccount}>
              <Text style={profileStyle.textTab}>Yêu cầu hủy tài khoản</Text>
              <Image
                style={profileStyle.vecto}
                source={require('../../../src/assets/vecto1.png')}
              />
            </View>
            </TouchableOpacity>

            <View style={profileStyle.boder} />
            <Text style={profileStyle.account2}>Hỗ trợ</Text>
            <View>
             <TouchableOpacity onPress={() => prop.navigation.navigate('BotChat')}>
             <View style={profileStyle.insideAccount}>
                <Text style={profileStyle.textTab}>Trung tâm trợ giúp</Text>
                <Image
                  style={profileStyle.vecto}
                  source={require('../../../src/assets/vecto1.png')}
                />
              </View>
             </TouchableOpacity>

              <View style={profileStyle.boder} />
            </View>
            <Text style={profileStyle.account2}>Tiện ích</Text>
            <View>
              <TouchableOpacity onPress={() => prop.navigation.navigate('Voucher')}>
              <View style={profileStyle.insideAccount}>
                <Text style={profileStyle.textTab}>Voucher của bạn</Text>
                <Image
                  style={profileStyle.vecto}
                  source={require('../../../src/assets/vecto1.png')}
                />
              </View>
              </TouchableOpacity>
              <View style={profileStyle.boder} />
            </View>

            <TouchableOpacity onPress={()=>prop.navigation.navigate('Promotion')}>
            <View style={profileStyle.insideAccount}>
              <Text style={profileStyle.textTab}>Chương trình khuyến mãi</Text>
              <Image
                style={profileStyle.vecto}
                source={require('../../../src/assets/vecto1.png')}
              />
            </View>
            </TouchableOpacity>
            <View style={profileStyle.boder} />


            <TouchableOpacity onPress={() => prop.navigation.navigate('Information')}>
            <View style={profileStyle.insideAccount}>
              <Text style={profileStyle.textTab}>Thông tin về TheMiniStore</Text>
              <Image
                style={profileStyle.vecto}
                source={require('../../../src/assets/vecto1.png')}
              />
            </View>
            </TouchableOpacity>
            <View style={profileStyle.boder} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileDetail;
