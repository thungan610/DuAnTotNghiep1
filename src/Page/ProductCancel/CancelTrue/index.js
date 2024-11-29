import { View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import { useNavigation } from '@react-navigation/native'; 

const CancelTrue = () => {
  const navigation = useNavigation(); 

  useEffect(() => {
    const timer = setTimeout(() => {
        navigation.navigate('BottomNav');
    }, 2000); 

    return () => clearTimeout(timer);
}, [navigation]);

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundColor: 'white',
    }}>
      <Image
        source={require('../../../../src/assets/huythanhcong.png')}
      />
      <Text style={{
        fontSize: 24,
        marginTop: 20,
        fontWeight: 'bold',
        color: 'black'
      }}>Hủy đơn thành công</Text>
    </View>
  );
};

export default CancelTrue;
