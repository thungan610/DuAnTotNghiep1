import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import axiosInstance from '../api/AxiosInstance';
import ProductReviewStyle from './style';

const ProductReview = ({ maxStars = 5 }) => {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [isUsernameHidden, setIsUsernameHidden] = useState(false);
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { order } = route.params;

  const toggleUsernameVisibility = () => {
    setIsUsernameHidden(!isUsernameHidden);
  };

  const BackRight = () => {
    navigation.goBack();
  };

  const handleStarPress = (index) => {
    setRating(index + 1);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const selectImage = () => {
    if (images.length < 3) {
      launchImageLibrary({ mediaType: 'photo' }, async (response) => {
        if (response.assets && response.assets.length > 0) {
          const newImage = response.assets[0];
          try {
            // Upload ảnh ngay khi người dùng chọn
            const uploadedImage = await uploadImageToCloudinary(newImage);
            setImages([...images, uploadedImage]); // Lưu URL đã upload vào state
          } catch (error) {
            Alert.alert('Lỗi', 'Không thể tải ảnh lên Cloudinary');
          }
        }
      });
    } else {
      Alert.alert('Thông báo', 'Bạn chỉ có thể thêm tối đa 3 ảnh!');
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
        return { uri: result.secure_url }; // Trả về URL ảnh đã upload
      } else {
        throw new Error(result?.error?.message || 'Tải ảnh lên không thành công.');
      }
    } catch (error) {
      console.error('Cloudinary error:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post('/comment/addComment', {
        userId: order?.address?.userId,
        productId: order?.products[0]?._id,
        rating: rating,
        comment: description,
        images: images.map(image => image.uri),
        videos: video ? [video] : [],
      });

      console.log('response', response);
      Alert.alert('Thành công', 'Đánh giá đã được gửi!');
      navigation.goBack();
    } catch (error) {
      console.error('error', error);
      Alert.alert('Lỗi', 'Không thể gửi đánh giá. Vui lòng thử lại sau.');
    }
  };

  return (
    <View>
      <View style={ProductReviewStyle.header}>
        <TouchableOpacity onPress={BackRight}>
          <Image source={require('../../../src/assets/notifi/backright.png')} />
        </TouchableOpacity>
        <Text style={ProductReviewStyle.headerText}>Đánh giá sản phẩm</Text>
      </View>
      <View style={ProductReviewStyle.nameProduct}>
        <Text style={ProductReviewStyle.nameProductText}>{order?.products[0]?.name}</Text>
      </View>
      <View style={ProductReviewStyle.boxStarContainer}>
        <View style={ProductReviewStyle.boxStar}>
          <Text style={ProductReviewStyle.textStar}>Chất lượng</Text>
          <View style={ProductReviewStyle.theStar}>
            {Array(maxStars)
              .fill(0)
              .map((_, index) => (
                <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
                  <Text style={index < rating ? ProductReviewStyle.selectedStar : ProductReviewStyle.star}>★</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        <View style={ProductReviewStyle.boxStar}>
          <TouchableOpacity onPress={selectImage} style={ProductReviewStyle.boxCamera}>
            <Text style={ProductReviewStyle.textCamera}>Thêm ảnh</Text>
            <Image style={ProductReviewStyle.imgCamera} source={require('../../../src/assets/Camera.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={ProductReviewStyle.boxCamera}>
            <Text style={ProductReviewStyle.textCamera}>Thêm video</Text>
            <Image style={ProductReviewStyle.imgCamera} source={require('../../../src/assets/Video_file.png')} />
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%' }}>
          <View style={ProductReviewStyle.imageContainer}>
            {images.map((image, index) => (
              <View key={index} style={ProductReviewStyle.imageWrapper}>
                <Image source={{ uri: image.uri }} style={ProductReviewStyle.image} />
                <TouchableOpacity style={ProductReviewStyle.deleteButton} onPress={() => removeImage(index)}>
                  <Image source={require('../../../src/assets/Close_round.png')} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        <View>
          <TextInput
            style={ProductReviewStyle.input}
            placeholder="Hãy thêm nhận xét cho sản phẩm..."
            multiline={true}
            numberOfLines={5}
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={toggleUsernameVisibility}>
            <Text style={ProductReviewStyle.textRed}>
              {isUsernameHidden ? 'Hiển thị tên' : 'Ẩn tên đăng nhập'}
            </Text>
          </TouchableOpacity>
          <View>
            {isUsernameHidden ? (
              <Text style={{ color: 'gray', fontStyle: 'italic' }}>Tên đăng nhập đã được ẩn</Text>
            ) : (
              <Text style={{ color: 'black', fontWeight: 'bold' }}>{order?.address?.user?.name || 'Tên đăng nhập'}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity style={ProductReviewStyle.boxReview} onPress={handleSubmit}>
          <Text style={ProductReviewStyle.textReview}>Đánh giá</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductReview;
