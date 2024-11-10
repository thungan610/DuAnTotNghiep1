import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,Alert } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import ProductReviewStyle from './style';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios'; 



const ProductReview = ({ maxStars = 5 }) => {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const navigation = useNavigation();
  const [rating, setRating] = useState(5);
  const[description, setDescription] = useState('');

const BackRight = () => {
    navigation.goBack()
}
const handleStarPress = (index) => {
      setRating(index + 1);
    };

const uploadImage = async (image) => {
      const formData = new FormData();
      formData.append('userId', '67261ebad2422d40077dd210');
      formData.append('image', {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: image.fileName || 'image.jpg',
      });
  
      try {
        const response = await axios.post('http://192.168.1.60:6677/images/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
       const newImage = { uri: image.uri, _id: response.data.image._id }; // Gán ID cho ảnh

    // Thêm ảnh mới vào danh sách images
    setImages([...images,newImage]);


        Alert.alert('Thông báo', 'Tải ảnh lên thành công');
      } catch (error) {
        Alert.alert('Thông báo', 'Tải ảnh lên thất bại');
        console.error('Lỗi tải ảnh lên:', error);
      }
    };
const selectImage = () => {
      if (images.length < 3) {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
          if (response.assets && response.assets.length > 0) {
            const selectedImage = response.assets[0];
            setImages([...images, selectedImage]);
            uploadImage(selectedImage);
          }
        });
      } else {
        Alert.alert('Thông báo', 'Bạn chỉ có thể thêm tối đa 3 ảnh');
      }
    };
  
const removeImage = async (imageId, index) => {
      console.log('ImageId đang xóa:', imageId); // Kiểm tra imageId trước khi gửi API
    
      if (!imageId) {
        Alert.alert('Thông báo', 'ID ảnh không hợp lệ');
        return;
      }
    
      try {
        const response = await axios.delete(`http://192.168.1.60:6677/images/${imageId}`);
    
        if (response.status === 200) {
          console.log('Ảnh đã được xóa khỏi server');
          const newImages = images.filter((_, i) => i !== index); // Loại bỏ ảnh khỏi state
          setImages(newImages);
          Alert.alert('Thông báo', 'Ảnh đã được xóa thành công');
        } else {
          Alert.alert('Thông báo', 'Không thể xóa ảnh');
        }
      } catch (error) {
        console.error('Lỗi khi xóa ảnh:', error.response ? error.response.data : error);
        Alert.alert('Thông báo', 'Xóa ảnh thất bại');
      }
    };


//video
const selectVideo = () => {
  if (video) {
    // Nếu đã có video, không cho phép chọn thêm
    Alert.alert('Thông báo', 'Chỉ có thể tải lên 1 video');
    return;
  }

  launchImageLibrary(
    {
      mediaType: 'video', // Chọn video thay vì ảnh
      videoQuality: 'high', // Chất lượng video cao
    },
    (response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedVideo = response.assets[0]; // Video được chọn
        setVideo(selectedVideo); // Lưu video thay vì thêm vào danh sách
        uploadVideo(selectedVideo); // Gọi hàm upload video
      }
    }
  );
};  


const uploadVideo = async (video) => {
  const formData = new FormData();
  formData.append('userId', '67261ebad2422d40077dd210'); // ID người dùng
  formData.append('video', {
    uri: video.uri,
    type: video.type || 'video/mp4', // Đảm bảo type là video/mp4
    name: video.fileName || 'video.mp4',
  });

  try {
    const response = await axios.post('http://192.168.1.60:6677/images/uploadVideo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Kiểm tra mã trạng thái 201 thay vì 200
    if (response.status === 201) {
      console.log('Video đã được tải lên thành công:', response.data); // Log chi tiết dữ liệu phản hồi
      Alert.alert('Thông báo', 'Video đã được tải lên thành công!');
    } else {
      console.error('Lỗi tải video lên:', response);
      Alert.alert('Thông báo', 'Lỗi tải video lên');
    }
  } catch (error) {
    console.error('Lỗi tải video lên:', error.response ? error.response.data : error);
    Alert.alert('Thông báo', 'Lỗi tải video lên');
  }
};

const deleteVideo = async (video) => {
  try {
    const videoId = video._id; // Đảm bảo video._id là ID hợp lệ
    const response = await axios.delete(`http://192.168.1.60:6677/images/video/${videoId}`);
    if (response.status === 200) {
      Alert.alert('Thông báo', 'Video đã được xóa thành công');
    } else {
      Alert.alert('Thông báo', 'Lỗi khi xóa video');
    }
  } catch (error) {
    console.error('Lỗi khi xóa video:', error);
    Alert.alert('Thông báo', 'Không thể xóa video');
  }
};



  return (
    <View >
      <View style={ProductReviewStyle.header}>
      <TouchableOpacity onPress={BackRight}>
      <Image source={require('../../../src/assets/notifi/backright.png')} />
      </TouchableOpacity>
        <Text style={ProductReviewStyle.headerText}>Đánh giá sản phẩm</Text>
      </View>
      <View style={ProductReviewStyle.nameProduct}>
        <Text style={ProductReviewStyle.nameProductText}>Bắp cải trắng</Text>
      </View>
{/* ngôi sao */}
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
<TouchableOpacity onPress={selectImage}  style={ProductReviewStyle.boxCamera}>
  <Text style={ProductReviewStyle.textCamera}>Thêm ảnh</Text>
  <Image
  style={ProductReviewStyle.imgCamera}
  source={require('../../../src/assets/Camera.png')}
  />
</TouchableOpacity>
    
<TouchableOpacity style={ProductReviewStyle.boxCamera} onPress={selectVideo}>
      <Text style={ProductReviewStyle.textCamera}>Thêm video</Text>
      <Image
       style={ProductReviewStyle.imgCamera}
      source={require('../../../src/assets/Video_file.png')}
      />
     </TouchableOpacity>
</View>
<View style={{width:'100%'}}>
<View style={ProductReviewStyle.imageContainer}>
        {images.map((image, index) => (
          <View key={index} style={ProductReviewStyle.imageWrapper}>
            <Image source={{ uri: image.uri }} style={ProductReviewStyle.image} />
            <TouchableOpacity style={ProductReviewStyle.deleteButton} onPress={() => removeImage(image._id, index)}>
              <Image
              source={require('../../../src/assets/Close_round.png')}
              />
            </TouchableOpacity>
          </View>
        ))}
        {video && (
        <View>
          <Image
            style={{ width: 70, height: 70 }}
            source={{ uri: video.uri }}
          />
          <TouchableOpacity style={ProductReviewStyle.deleteButton}  onPress={deleteVideo}>
              <Image
              source={require('../../../src/assets/Close_round.png')}
              />
            </TouchableOpacity>
        </View>
      )}
      </View>
      
</View>

  <View>
  <TextInput
  style={ProductReviewStyle.input}
  placeholder="Hãy thêm nhận xét cho sản phẩm..."
  multiline={true}
  numberOfLines={5}
  onChangeText={text=>setDescription(text)}
  value={description}
  />
  </View>
  <View style={ProductReviewStyle.boxStar}>
    <TouchableOpacity>
      <Text style={ProductReviewStyle.textRed}>Ẩn tên đăng nhập</Text>
    </TouchableOpacity>
    <TouchableOpacity >
      <Text style={ProductReviewStyle.textCamera}>Hiển thị tên đăng nhập</Text>
    </TouchableOpacity>
  </View>
  <TouchableOpacity style={ProductReviewStyle.boxReview}>
    <Text style={ProductReviewStyle.textReview}>Đánh giá</Text>
  </TouchableOpacity>
    </View>

    
    </View>
  );
};

export default ProductReview
