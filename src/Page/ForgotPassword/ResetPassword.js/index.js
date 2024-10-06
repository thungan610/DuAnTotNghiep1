import { View, Text , StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import ResetPasswordStyle from './style'

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State để kiểm soát mật khẩu


  return (
    <View style={ResetPasswordStyle.container}>
     <View style={ResetPasswordStyle.headerLogo}>
        <Image
        style={ResetPasswordStyle.logo}
        source={require('../../../../src/assets/logo.png')}
        />
     </View>
     <View style={ResetPasswordStyle.body}>
        <View>
            <View style={ResetPasswordStyle.tieude}>
                <Text style={ResetPasswordStyle.tieudedn}>Đặt lại mật khẩu</Text>
            </View>

            <View style={ResetPasswordStyle.inputall}>
                <Text style={ResetPasswordStyle.tieudeinput}>Nhập mật khẩu</Text>
            <View style={ResetPasswordStyle.anhinput}>
                <Image
                style={ResetPasswordStyle.message}
                source={require('../../../../src/assets/Lock_alt.png')}
                />
                <TextInput 
                                placeholder="Nhập mật khẩu" 
                                onChangeText={(text) => setPassword(text)} 
                                style={ResetPasswordStyle.input} 
                                secureTextEntry={!isPasswordVisible} // Ẩn hoặc hiện mật khẩu
                            />
             <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                <Image 
                                    style={ResetPasswordStyle.eye} 
                                    source={isPasswordVisible 
                                        ? require("../../../../src/assets/eye.png") 
                                        : require("../../../../src/assets/eye-closed.png") 
                                    }
                                />
                            </TouchableOpacity>
            </View>
            <Text style={ResetPasswordStyle.tieudeinput}>Nhập lại mật khẩu</Text>
            <View style={ResetPasswordStyle.anhinput}>
                <Image
                style={ResetPasswordStyle.message}
                source={require('../../../../src/assets/Lock_alt.png')}
                />
                <TextInput 
                                placeholder="Nhập mật khẩu" 
                                onChangeText={(text) => setPassword(text)} 
                                style={ResetPasswordStyle.input} 
                                secureTextEntry={!isPasswordVisible} // Ẩn hoặc hiện mật khẩu
                            />
             <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                <Image 
                                    style={ResetPasswordStyle.eye} 
                                    source={isPasswordVisible 
                                        ? require("../../../../src/assets/eye.png") 
                                        : require("../../../../src/assets/eye-closed.png") 
                                    }
                                />
            </TouchableOpacity>
            </View>

            <TouchableOpacity style={ResetPasswordStyle.dn}>
         <Text style={ResetPasswordStyle.chudn}>TIẾP TỤC</Text>
        </TouchableOpacity>

            </View>
        </View>
     </View>
     </View>
  )
}

export default ResetPassword