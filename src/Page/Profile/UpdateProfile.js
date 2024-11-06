import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import UpdateProfileStyle from "./UpdateProfileStyle";
import InsertPro5Styles from "../Profile/InsertPro5Styles";
import axios from "axios";
const UpdateProfile = (props) => {
    const BackRight = () => {
        props.navigation.goBack();
    };

    const [name, setName] = useState('AAAAAAAAA');
    const [bio, setBio] = useState('chưa có');
    const [gender, setGender] = useState('chưa xác định');
    const [birthday, setBirthday] = useState('24/02/2002');
    const [phone, setPhone] = useState("Helllooo");
    const [email, setEmail] = useState("Helllo");

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://192.168.1.3:6677/users/671b544f7e165147f9d6cd6e/updateProfile', {
                name,
                bio,
                gender,
                birthday,
                phone,
                email,
            });
            if (response.status === 200) {
                console.log('Update thành công rồi nha');
            } else {
                console.log("error", 'Update không được á nheng');
            }
            console.log(response.data);
        } catch (error) {
            console.error("Lỗi rồi kìa sửa đi", error);
        }
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
                <Text style={InsertPro5Styles.textH}>Sửa hồ sơ</Text>
                <Text/>
            </View>
            <View style={InsertPro5Styles.imgPro5Container}>
                <Image
                    source={require('../../../src/assets/pro5img.png')}
                    style={InsertPro5Styles.imgPro5}
                    alt="logo"
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
                    <TouchableOpacity style={UpdateProfileStyle.edit}>
                        <TextInput
                            style={UpdateProfileStyle.textPro5}
                            value={name}
                            onChangeText={setName} />
                        <Image
                            style={UpdateProfileStyle.iconedit}
                            source={require('../../../src/assets/edit.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={InsertPro5Styles.name}>
                    <Text style={InsertPro5Styles.textPro5TT}>Tiểu sử</Text>
                    <TouchableOpacity style={UpdateProfileStyle.edit}>
                        <TextInput
                            style={UpdateProfileStyle.textPro5}
                            value={bio}
                            onChangeText={setBio}
                        />
                        <Image
                            style={UpdateProfileStyle.iconedit}
                            source={require('../../../src/assets/edit.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={InsertPro5Styles.name}>
                    <Text style={InsertPro5Styles.textPro5TT}>Giới tính</Text>
                    <TouchableOpacity style={UpdateProfileStyle.edit}>
                        <TextInput
                            style={UpdateProfileStyle.textPro5}
                            value={gender}
                            onChangeText={setGender}
                        />
                        <Image
                            style={UpdateProfileStyle.iconedit}
                            source={require('../../../src/assets/edit.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={InsertPro5Styles.name}>
                    <Text style={InsertPro5Styles.textPro5TT}>Ngày sinh</Text>
                    <TouchableOpacity style={UpdateProfileStyle.edit}>
                        <TextInput
                            style={UpdateProfileStyle.textPro5}
                            value={birthday}
                            onChangeText={setBirthday}
                        />
                        <Image
                            style={UpdateProfileStyle.iconedit}
                            source={require('../../../src/assets/edit.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={InsertPro5Styles.name}>
                    <Text style={InsertPro5Styles.textPro5TT}>Số điện thoại</Text>
                    <Text style={InsertPro5Styles.textPro5}>0974872126</Text>
                </View>
                <View style={InsertPro5Styles.name}>
                    <Text style={InsertPro5Styles.textPro5TT}>Email</Text>
                    <Text style={InsertPro5Styles.textPro5}>ngan123ngan123@gmail.com</Text>
                </View>
            </View>

            <TouchableOpacity onPress={handleSubmit} style={UpdateProfileStyle.btnLogout}>
                <Text style={UpdateProfileStyle.btnLogoutText}>LƯU</Text>
            </TouchableOpacity>
        </View>
    )
}
export default UpdateProfile