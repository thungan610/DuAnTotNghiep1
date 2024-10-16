import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,Alert } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import ProductReviewStyle from './style';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';



const ProductReview = ({ maxStars = 5 }) => {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);


  const navigation = useNavigation();
  const BackRight = () => {
    navigation.goBack()
}
    const [rating, setRating] = useState(5);
    const[description, setDescription] = useState('');

    const handleStarPress = (index) => {
      setRating(index + 1);
    };
    const selectImage = () => {
      if (images.length < 3) {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
          if (response.assets && response.assets.length > 0) {
            setImages([...images, response.assets[0]]);
          }
        });
      } else {
        Alert.alert('Thông báo','Bạn chỉ có thể thêm tối đa 3 ảnh!');
      }
    };
  
    const removeImage = (index) => {
      const newImages = images.filter((_, i) => i !== index); // Xóa ảnh tại vị trí chỉ định
      setImages(newImages);
    };

  return (
    <View >
      <View style={ProductReviewStyle.header}>
      <TouchableOpacity onPress={BackRight}>
      <Image 
        style={ProductReviewStyle.image}
        source={require('../../../src/assets/chevron-left.png')} />
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
    
<TouchableOpacity style={ProductReviewStyle.boxCamera}>
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
            <TouchableOpacity style={ProductReviewStyle.deleteButton} onPress={() => removeImage(index)}>
              <Image
              source={require('../../../src/assets/Close_round.png')}
              />
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
