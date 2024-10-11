import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import profileStyle from './ProfileDetailstyle';
import { useNavigation } from '@react-navigation/native';

const ProfileDetail = () => {
  const navigation = useNavigation(); 
  const BtnProductReview = () => {
    navigation.navigate('ProductReview'); 
  };
  const BtnInsertPro5 = () => {
    navigation.navigate('InsertPro5'); 
  };
  const BtnTabAddress = () => {
    navigation.navigate('TabAddress'); 
  };
  const BtnPayMethod = () => {
    navigation.navigate('PayMethod');
    
  }
  const BtnVoucher = () => {
    navigation.navigate('Voucher');
  }
  return (
    <View style={{
      position:'relative',
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
            <Text style={profileStyle.username}>Bé Phát</Text>
            <TouchableOpacity onPress={BtnInsertPro5}>
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
          <View style={profileStyle.firstbodyRightside}>
            <Text style={profileStyle.history}>Lịch sử mua hàng</Text>
            <Image
              style={profileStyle.vecto2}
              source={require('../../../src/assets/vecto1.png')}
            />
          </View>
        </View>
        <View style={profileStyle.secondbody}>
          <View style={profileStyle.load}>
            <Image
              style={profileStyle.loadimg}
              source={require('../../../src/assets/Load.png')}
            />
            <Text style={profileStyle.loadtext}>Chờ xác nhận</Text>
          </View>
          <View style={profileStyle.load2}>
            <Image
              style={profileStyle.loadimg}
              source={require('../../../src/assets/car.png')}
            />
            <Text style={profileStyle.loadtext2}>Đang giao</Text>
          </View>
          <View style={profileStyle.load3}>
            <Image
              style={profileStyle.loadimg}
              source={require('../../../src/assets/cancel.png')}
            />
            <Text style={profileStyle.loadtext3}>Đã hủy</Text>
          </View>
       <TouchableOpacity onPress={BtnProductReview}>
       <View style={profileStyle.load4}>
            <Image
              style={profileStyle.loadimg}
              source={require('../../../src/assets/star.png')}
            />
           
           <Text style={profileStyle.loadtext4}>Đánh giá</Text>
          
          </View>
       </TouchableOpacity>
        </View>
        <View style={profileStyle.thirdbody}>
          <Text style={profileStyle.account}>Tài khoản</Text>
        <TouchableOpacity onPress={BtnTabAddress}>
        <View>
            <View style={profileStyle.insideAccount}>
              <Text style={profileStyle.textTab}>Địa chỉ</Text>
              <Image
                style={profileStyle.vecto3}
                source={require('../../../src/assets/vecto1.png')}
              />
            </View>

            <View style={profileStyle.boder} />
          </View>
        </TouchableOpacity>
          <View>
            <TouchableOpacity onPress={BtnPayMethod}>
            <View style={profileStyle.insideAccount}>
              <Text style={profileStyle.textTab}>Phương thức thanh toán</Text>
              <Image
                style={profileStyle.vecto7}
                source={require('../../../src/assets/vecto1.png')}
              />
            </View>
            </TouchableOpacity>

            <View style={profileStyle.boder} />
            <Text style={profileStyle.account2}>Hỗ trợ</Text>
            <View>
              <View style={profileStyle.insideAccount}>
                <Text style={profileStyle.textTab}>Trung tâm trợ giúp</Text>
                <Image
                  style={profileStyle.vecto5}
                  source={require('../../../src/assets/vecto1.png')}
                />
              </View>

              <View style={profileStyle.boder} />
            </View>
            <Text style={profileStyle.account2}>Tiện ích</Text>
            <View>
              <TouchableOpacity onPress={BtnVoucher}>
              <View style={profileStyle.insideAccount}>
                <Text style={profileStyle.textTab}>Voucher của bạn</Text>
                <Image
                  style={profileStyle.vecto6}
                  source={require('../../../src/assets/vecto1.png')}
                />
              </View>
              </TouchableOpacity>

              <View style={profileStyle.boder} />
            </View>
          </View>
        </View>
      </View>
      {/* <BottomNav style={{}}/> */}
    </View>
  );
};

export default ProfileDetail;
