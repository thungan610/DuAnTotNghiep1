import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const ButtonUser = (props) => {
    const { 
        onPress,
        title,
        // style
    } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <LinearGradient
        colors={['#126DA6','#2A95BF', '#73D6E9']} // Màu gradient bắt đầu và kết thúc
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 2 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default ButtonUser;

const styles = StyleSheet.create({
    
    buttonContainer: {
      marginLeft: 20,
      marginRight:20,
      borderRadius: 15 , // Bo góc
      overflow: 'hidden', // Đảm bảo nội dung không vượt ra ngoài bo góc
      borderColor: '#126DA6',
      borderWidth: 1
    },
    button: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 25,
      fontWeight: 'bold',
    },
  });