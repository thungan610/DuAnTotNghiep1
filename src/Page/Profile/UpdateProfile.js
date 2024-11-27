import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, Alert, PermissionsAndroid, ActivityIndicator } from "react-native";
import UpdateProfileStyle from "./UpdateProfileStyle";
import InsertPro5Styles from "../Profile/InsertPro5Styles";
import axiosInstance from "../api/AxiosInstance";
import { useSelector } from "react-redux";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const UpdateProfile = (props) => {
    const BackRight = () => {
        props.navigation.goBack();
    };

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false); // To handle profile saving state
    const [isLoading, setIsLoading] = useState(true); // To handle loading state

    const user = useSelector(state => state.user);
    const userid = user?.userData?._id;

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!userid) {
                Alert.alert("Lỗi", "Không tìm thấy ID người dùng. Vui lòng đăng nhập lại.");
                return;
            }
            try {
                const response = await axiosInstance.get(`/users/${userid}/getProfileApp`);
                const data = response.data;
                setName(data.name || '');
                setBio(data.bio || '');
                setGender(data.gender || '');
                setBirthday(data.birthday || '');
                setPhone(data.phone || '');
                setEmail(data.email || '');
                setImageUri(data.avatar || null);
            } catch (error) {
                Alert.alert("Lỗi", "Không thể lấy dữ liệu người dùng.");
            } finally {
                setIsLoading(false);  // Dữ liệu đã được tải
            }
        };

        fetchProfileData();
    }, [userid]);

    const commonOptions = {
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: false,
    };

    const openImagePicker = async () => {
        try {
            const response = await launchImageLibrary(commonOptions);
            await handleImageSelection(response);
        } catch (error) {
            console.error("Image picker error:", error);
        }
    };

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Quyền truy cập camera',
                        message: 'Ứng dụng cần quyền truy cập camera để chụp ảnh.',
                        buttonNeutral: 'Hỏi lại sau',
                        buttonNegative: 'Hủy',
                        buttonPositive: 'OK',
                    }
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    openCamera();
                } else {
                    Alert.alert('Lỗi', 'Bạn cần cấp quyền truy cập camera để sử dụng tính năng này.');
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            openCamera();
        }
    };

    const openCamera = async () => {
        try {
            const response = await launchCamera({ cameraType: 'front', saveToPhotos: true, ...commonOptions });
            if (response.didCancel) {
                Alert.alert('Hủy Camera', 'Bạn đã hủy chọn camera.');
            } else if (response.errorCode) {
                Alert.alert('Lỗi', `Đã xảy ra lỗi khi mở camera: ${response.errorMessage}`);
            } else {
                await handleImageSelection(response);
            }
        } catch (error) {
            console.error("Lỗi khi mở camera:", error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi không mong muốn.');
        }
    };

    const handleImageSelection = async (response) => {
        if (response?.assets?.[0]?.uri) {
            setIsUploading(true);
            const image = response.assets[0];
            try {
                const result = await uploadImageToCloudinary(image);
                if (result) {
                    setImageUri(result.url);
                }
            } catch (error) {
                Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tải lên hình ảnh.');
            } finally {
                setIsUploading(false);
            }
        } else {
            Alert.alert('Hủy chọn ảnh', 'Bạn đã không chọn ảnh nào.');
        }
    };

    const uploadImageToCloudinary = async (image) => {
        const data = new FormData();
        data.append('file', {
            uri: image.uri,
            type: image.type || 'image/jpeg',
            name: `photo.${image.uri.split('.').pop()}`,
        });
        data.append('upload_preset', 'DuAnTotNghiep');
        data.append('api_key', '444668867662291');

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dtoazwcfd/upload', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();
            if (result?.secure_url) {
                return { url: result.secure_url };
            } else {
                throw new Error(result?.error?.message || 'Tải ảnh lên không thành công.');
            }
        } catch (error) {
            console.error("Cloudinary error:", error);
            throw error;
        }
    };

    const handleSubmit = async () => {
        if (!userid) {
            Alert.alert("Lỗi", "Không tìm thấy ID người dùng. Vui lòng đăng nhập lại.");
            return;
        }

        if (isUploading || isSaving) {
            Alert.alert("Thông báo", "Đang tải ảnh lên hoặc lưu thông tin. Vui lòng chờ.");
            return;
        }

        if (!name || !email) {
            Alert.alert("Lỗi", "Tên và email không được để trống.");
            return;
        }

        setIsSaving(true);

        try {
            const response = await axiosInstance.put(`/users/${userid}/updateProfile`, {
                name,
                bio,
                gender,
                birthday,
                phone,
                email,
                avatar: imageUri,
            });

            if (response) {
                Alert.alert("Thành công", "Cập nhật hồ sơ thành công!");
            } else {
                Alert.alert("Lỗi", "Cập nhật hồ sơ thất bại.");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật hồ sơ:", error);
            Alert.alert("Lỗi", "Không thể cập nhật hồ sơ. Vui lòng thử lại.");
        } finally {
            setIsSaving(false);
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

            {/* Hiển thị ActivityIndicator khi đang tải */}
            {isLoading ? (
                <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
            ) : (
                <>
                    <View style={InsertPro5Styles.imgPro5Container}>
                        <TouchableOpacity style={InsertPro5Styles.containerimage} onPress={openImagePicker}>
                            {imageUri ? (
                                <Image
                                    source={{ uri: imageUri }}
                                    style={InsertPro5Styles.imgPro5}
                                />
                            ) : (
                                <Image
                                    source={require('../../../src/assets/pro5img.png')}
                                    style={InsertPro5Styles.imgPro5}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={requestCameraPermission} style={InsertPro5Styles.imgphotoContainer}>
                        <Image
                            style={InsertPro5Styles.imgphoto}
                            source={require('../../../src/assets/photographic.png')}
                        />
                    </TouchableOpacity>

                    <View style={InsertPro5Styles.body}>
                        {/* Các trường nhập liệu */}
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
                </>
            )}
        </View>
    );
};

export default UpdateProfile;
