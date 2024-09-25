import React from "react";
import { View, Text, Image, TextInput} from "react-native";
import EditProfileStyle from "./style";
const EditProfile = () => {
    return (
        <View style={EditProfileStyle.container}>
            <View style={EditProfileStyle.Viewtitle}>
                <Image style={EditProfileStyle.arrowleft} source={require("../../../assets/profile/arrowleft.png")} />
                <Text style={EditProfileStyle.title}>Sửa hồ sơ</Text>
                <Text/>
            </View>
            <View style={EditProfileStyle.Viewavatar}>
                <Image source={require("../../../assets/profile/avatar.png")} />
                <Image style={EditProfileStyle.iconCamera} source={require("../../../assets/profile/iconCamera.png")} />    
            </View>
            <View>
                <View style={EditProfileStyle.textInput}>
                    <Text style={EditProfileStyle.text}>Tên</Text>
                    <TextInput style={EditProfileStyle.input}>Bé Phát</TextInput>
                </View>
                <View style={EditProfileStyle.textInput}>
                    <Text style={EditProfileStyle.text}>Tiểu sử</Text>
                    <TextInput style={EditProfileStyle.input}>Thích nấu ăn</TextInput>
                </View>
                <View style={EditProfileStyle.textInput}>
                    <Text style={EditProfileStyle.text}>Giới tính</Text>
                    <TextInput style={EditProfileStyle.input}>Nam</TextInput>
                </View>
                <View style={EditProfileStyle.textInput}>
                    <Text style={EditProfileStyle.text}>Ngáy sinh</Text>
                    <TextInput style={EditProfileStyle.input}>25 / 04 / 2004</TextInput>
                </View>
                <View style={EditProfileStyle.textInput}>
                    <Text style={EditProfileStyle.text}>Số điện thoại</Text>
                    <TextInput style={EditProfileStyle.input}>032949262</TextInput>
                </View>
                <View style={EditProfileStyle.textInput}>
                    <Text style={EditProfileStyle.text}>Email</Text>
                    <TextInput style={EditProfileStyle.input}>mocmocdangyeu@gmail.com</TextInput>
                </View>
            </View>
        </View>
    );
};

export default EditProfile;