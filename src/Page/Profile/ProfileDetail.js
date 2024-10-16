import { View, Text, Image, TouchableOpacity, } from 'react-native';
import {React} from 'react';
import profileStyle from './ProfileDetailstyle';

const ProfileDetail = (prop) => {
  const BtnProductReview = () => {
    prop.navigation.navigate('ProductReview');
  };
  const BtnInsertPro5 = () => {
    prop.navigation.navigate('InsertPro5');
  };
  const BtnTabAddress = () => {
    prop.navigation.navigate('TabAddress');
  };

  const BtnPolicy = () => {
    prop.navigation.navigate('Policy');
  }
  const BtnVoucher = () => {
    prop.navigation.navigate('Voucher');
  }
  const BtnBotChat = () => {
    prop.navigation.navigate('BotChat');
  }
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
        </View>
        <View style={profileStyle.secondbody}>
          <TouchableOpacity onPress={() => prop.navigation.navigate('Order', { selectedTab: 2})} style={profileStyle.load}>
            <Image
              style={profileStyle.loadimg}
              source={require('../../../src/assets/Time.png')}
            />
            <Text style={profileStyle.loadtext}>Lịch sử mua hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={BtnProductReview}>
            <Image
              style={profileStyle.loadimg1}
              source={require('../../../src/assets/star.png')}
            />
            <Text style={profileStyle.loadtext2}>Đánh giá</Text>
          </TouchableOpacity >
          <TouchableOpacity onPress={BtnPolicy}>
            <Image
              style={profileStyle.loadimg}
              source={require('../../../src/assets/Arhive_export.png')}
            />
            <Text style={profileStyle.loadtext3}>Chính sách hoàn trả</Text>
          </TouchableOpacity>
          <TouchableOpacity >
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
          <TouchableOpacity onPress={BtnTabAddress}>
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
            <TouchableOpacity>
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
             <TouchableOpacity onPress={BtnBotChat}>
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
              <TouchableOpacity onPress={BtnVoucher}>
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

            <TouchableOpacity>
            <View style={profileStyle.insideAccount}>
              <Text style={profileStyle.textTab}>Chương trình khuyến mãi</Text>
              <Image
                style={profileStyle.vecto}
                source={require('../../../src/assets/vecto1.png')}
              />
            </View>
            </TouchableOpacity>
            <View style={profileStyle.boder} />


            <TouchableOpacity>
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
