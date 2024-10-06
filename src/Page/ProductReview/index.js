import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import ProductReviewStyle from './style';

const ProductReview = ({ maxStars = 5 }) => {
    const [rating, setRating] = useState(0);
    const[description, setDescription] = useState('');
    const handleStarPress = (index) => {
      setRating(index + 1);
    };

  return (
    <View >
      <View style={ProductReviewStyle.header}>
      <Image 
        style={ProductReviewStyle.image}
        source={require('../../../src/assets/chevron-left.png')} />
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
<TouchableOpacity style={ProductReviewStyle.boxCamera}>
      <Text style={ProductReviewStyle.textCamera}>Thêm hình ảnh</Text>
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

