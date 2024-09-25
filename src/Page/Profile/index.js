import React from "react";
import { View, Text, Image, TextInput, StyleSheet} from 'react-native'
import ProfileStyle from "./style";
const Profile = () => {
    return (
        <View style={ProfileStyle.container}>
            <View style={ProfileStyle.ImageBag}>
                <Image source={require('../../assets/profile/bag.png')} />
            </View>
            <View style={ProfileStyle.ImageAvatar}>
                <Image source={require('../../assets/profile/avatar.png')} />
                <Text style={ProfileStyle.name}>Bé Phát</Text>
            </View>
            <View style={ProfileStyle.TextView}>
                <Text style={ProfileStyle.Text}>Sửa hồ sơ</Text>
                <Text style={ProfileStyle.Text}>Địa chỉ</Text>
                <Text style={ProfileStyle.Text}>Phương thức thanh toán</Text>
                <Text style={ProfileStyle.Text}>Thông báo</Text>
                <Text style={ProfileStyle.Text}>Đánh giá</Text>
                <Text style={ProfileStyle.Text}>Lịch sử mua hàng</Text>
                <Text style={ProfileStyle.Text}>Đơn hàng</Text>
                <Text style={ProfileStyle.Text}>Trung tâm trợ giúp?</Text>
                <Text style={[ProfileStyle.Text,style.Color]}>Đăng xuất</Text>
            </View>
        </View>
    )
}
export default Profile
const style = StyleSheet.create({
    Color: {
        color: 'red',
    }
})
        