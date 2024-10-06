import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React, { useMemo, useState } from 'react';
import { RadioGroup } from 'react-native-radio-buttons-group'; 
import LoginStyle from './style';
import ButtonUser from '../../components/multiComponents/ButtonUser';

const Login = (prop) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State để kiểm soát mật khẩu

    const BtnLogin = () => {
        Alert.alert("Đăng nhập thành công");
        prop.navigation.navigate('BottomNav');
    };

    const ClickRegister = () => {
        prop.navigation.navigate('Register');
    };

    const radioButtons = useMemo(() => ([
        {
            id: '1',
            label: 'Nhớ tài khoản',
            value: 'nhotaikhoan',
            color: '#37C5DF',
            selectedColor: '#2CA9C0',
        }
    ]), []);

    const [selectedId, setSelectedId] = useState();

    return (
        <View style={LoginStyle.container}>
            <View style={LoginStyle.headerlogo}>
                <Image style={LoginStyle.logo} source={require("../../../src/assets/logo.png")} />
            </View>
            <View style={LoginStyle.body}>
                <View>
                    <View style={LoginStyle.tieude}>
                        <Text style={LoginStyle.tieudedn}>Đăng nhập</Text>
                        <Text style={LoginStyle.tieudednphu}>, để tiếp tục sử dụng</Text>
                    </View>
                    <View style={LoginStyle.inputall}>
                        <Text style={LoginStyle.tieudeinput}>Địa chỉ email</Text>
                        <View style={LoginStyle.anhinput}>
                            <Image style={LoginStyle.message} source={require("../../../src/assets/Message.png")} />
                            <TextInput placeholder="Nhập email" onChangeText={(text) => setEmail(text)} style={LoginStyle.input} />
                        </View>

                        <Text style={LoginStyle.tieudeinput}>Mật khẩu</Text>
                        
                        <View style={LoginStyle.anhinput}>
                            <Image style={LoginStyle.lockalt} source={require("../../../src/assets/Lock_alt.png")} />
                            <TextInput 
                                placeholder="Nhập mật khẩu" 
                                onChangeText={(text) => setPassword(text)} 
                                style={LoginStyle.input} 
                                secureTextEntry={!isPasswordVisible} // Ẩn hoặc hiện mật khẩu
                            />
                            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                <Image 
                                    style={LoginStyle.eye_closed} 
                                    source={isPasswordVisible 
                                        ? require("../../../src/assets/eye.png") 
                                        : require("../../../src/assets/eye-closed.png") 
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={LoginStyle.nhotk}>
                    <RadioGroup 
                        labelStyle={LoginStyle.radio}
                        containerStyle={{ alignItems: 'flex-start' }}
                        radioButtons={radioButtons}
                        onPress={setSelectedId}
                        selectedId={selectedId} 
                    />
                    <Text style={LoginStyle.forgot}>Quên mật khẩu?</Text>
                </View>

                <View style={LoginStyle.button}>
                    <TouchableOpacity onPress={BtnLogin} style={LoginStyle.dn}>
                        <Text style={LoginStyle.chudn}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>

                <Text style={LoginStyle.or}>Hoặc</Text>

                <View style={LoginStyle.buttonall}>
                    <TouchableOpacity style={LoginStyle.buttonfb}>
                        <Image style={LoginStyle.fb} source={require('../../../src/assets/fb.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={LoginStyle.buttongg}>
                        <Image style={LoginStyle.gg} source={require('../../../src/assets/gg.png')} />
                    </TouchableOpacity>
                </View>

                <View style={LoginStyle.footer}>
                    <Text style={LoginStyle.footerdau}>Bạn chưa có tài khoản?</Text>
                    <Text onPress={ClickRegister} style={LoginStyle.footerduoi}> Đăng ký</Text>
                </View>
            </View>
        </View>
    );
};

export default Login;
