import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import UpdateProfileStyle from "./UpdateProfileStyle";
import InsertPro5Styles from "../Profile/InsertPro5Styles";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateProfile = (props) => {
    const BackRight = () => {
        props.navigation.goBack();
    };

    // State lưu trữ dữ liệu
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');




    const user = useSelector(state => state.user);
    const userid = user?.userData?._id;

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!userid) {
                Alert.alert("Lỗi", "Không tìm thấy ID người dùng. Vui lòng đăng nhập lại.");
                return;
            }
            try {
                const response = await axios.get(`http://192.168.1.10:3000/users/${userid}/getProfileApp`);
                const data = response.data.data;
                setName(data.name || '');
                setBio(data.bio || '');
                setGender(data.gender || '');
                setBirthday(data.birthday || '');
                setPhone(data.phone || '');
                setEmail(data.email || '');
            } catch (error) {
                Alert.alert("Lỗi", "Không thể lấy dữ liệu người dùng.");
            }
        };

        fetchProfileData();
    }, [userid]);



    const handleSubmit = async () => {
        if (!userid) {
            Alert.alert("Lỗi", "Không tìm thấy ID người dùng. Vui lòng đăng nhập lại.");
            return;
        }
        try {
            const response = await axios.put(`http://192.168.1.10:3000/users/${userid}/updateProfile`, {
                name,
                bio,
                gender,
                birthday,
                phone,
                email,
            });
            if (response.status === 200) {
                Alert.alert("Thành công", "Cập nhật hồ sơ thành công!");
                props.navigation.navigate('ProfileDetail');
            } else {
                Alert.alert("Lỗi", "Cập nhật hồ sơ thất bại.");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật hồ sơ:", error);
            Alert.alert("Lỗi", "Không thể cập nhật hồ sơ. Vui lòng thử lại.");
        }
    };

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
                <Text />
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
                    <TextInput
                        style={UpdateProfileStyle.textPro5}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={InsertPro5Styles.name}>
                    <Text style={InsertPro5Styles.textPro5TT}>Tiểu sử</Text>
                    <TextInput
                        style={UpdateProfileStyle.textPro5}
                        value={bio}
                        onChangeText={setBio}
                    />
                </View>
                <View style={InsertPro5Styles.name}>
                    <Text style={InsertPro5Styles.textPro5TT}>Giới tính</Text>
                    <TextInput
                        style={UpdateProfileStyle.textPro5}
                        value={gender}
                        onChangeText={setGender}
                    />
                </View>

                <View style={InsertPro5Styles.name}>
                    <Text style={InsertPro5Styles.textPro5TT}>Ngày sinh</Text>
                    <TextInput
                        style={UpdateProfileStyle.textPro5}
                        value={birthday}
                        onChangeText={setBirthday}
                    />
                </View> 
                <View style={InsertPro5Styles.name}>
                    <Text style={InsertPro5Styles.textPro5TT}>Số điện thoại</Text>
                    <TextInput
                        style={UpdateProfileStyle.textPro5}
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>

                <View style={InsertPro5Styles.name}>
                    <Text style={InsertPro5Styles.textPro5TT}>Email</Text>
                    <TextInput
                        style={UpdateProfileStyle.textPro5}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
            </View>

            <TouchableOpacity onPress={handleSubmit} style={UpdateProfileStyle.btnLogout}>
                <Text style={UpdateProfileStyle.btnLogoutText}>LƯU</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UpdateProfile;
