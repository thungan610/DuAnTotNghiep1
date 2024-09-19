import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, } from 'react-native'
import React, { useMemo, useState } from 'react'
import { RadioGroup } from 'react-native-radio-buttons-group'
import RegisterStyle from './style'
const Register = () => {
    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Nhớ tài khoản',
            value: 'nhotaikhoan',
            color: '#37C5DF', // Màu của vòng tròn chưa chọn
            selectedColor: '#2CA9C0', // Màu khi vòng tròn được chọn
        }
    ]), []);

    const [selectedId, setSelectedId] = useState();
    return (
        <View style={RegisterStyle.container}>
            <View style={RegisterStyle.HDLogo}>
                <Image
                    style={RegisterStyle.logo}
                    source={require('../../../src/assets/logo.png')}
                />
            </View>
            <View style={RegisterStyle.body}>
                <View style={RegisterStyle.title}>
                    <Text style={RegisterStyle.text}>Đăng ký</Text>
                    <Text style={RegisterStyle.text1}>, để tiếp tục sử dụng</Text>
                </View>
                <View style={RegisterStyle.inputView}>
                    <Text style={RegisterStyle.tieudeInput}>Họ và tên</Text>
                    <View style={RegisterStyle.anhinput}>
                        <Image style={RegisterStyle.message} source={require("../../../src/assets/Message.png")} />
                        <TextInput placeholder="Nhập email" onChangeText={(text) => setemail(text)} style={RegisterStyle.input} />

                    </View>
                    <Text style={RegisterStyle.tieudeInput}>Địa chỉ email</Text>
                    <View style={RegisterStyle.anhinput}>
                        <Image style={RegisterStyle.lockalt} source={require("../../../src/assets/Lock_alt.png")} />
                        <TextInput placeholder="Nhập email" onChangeText={(text) => setemail(text)} style={RegisterStyle.input} />

                    </View>
                    <Text style={RegisterStyle.tieudeInput}>Địa chỉ email</Text>
                    <View style={RegisterStyle.anhinput}>
                        <Image style={RegisterStyle.lockalt} source={require("../../../src/assets/Lock_alt.png")} />
                        <TextInput placeholder="Số điện thoại" onChangeText={(text) => setemail(text)} style={RegisterStyle.input} />

                    </View>
                    <Text style={RegisterStyle.tieudeInput}>Địa chỉ email</Text>
                    <View style={RegisterStyle.anhinput}>
                        <Image style={RegisterStyle.lockalt} source={require("../../../src/assets/Lock_alt.png")} />
                        <TextInput placeholder="Mật khẩu" onChangeText={(text) => setemail(text)} style={RegisterStyle.input} />

                    </View>
                </View>
                <View style={RegisterStyle.button}>
                    <TouchableOpacity style={RegisterStyle.tout}>
                        <Text style={RegisterStyle.textDk}>
                            Đăng Ký
                        </Text>
                    </TouchableOpacity>
                    <View style={RegisterStyle.radio}>
                    <RadioGroup labelStyle={RegisterStyle.radio}
                        containerStyle={{ alignItems: 'flex-start' }}
                        radioButtons={radioButtons}
                        onPress={setSelectedId}
                        selectedId={selectedId} />
                         <Text style={RegisterStyle.fogotPass} >Quên mật khẩu?</Text>
                    </View>
                </View>
                <Text style={RegisterStyle.hoac}>Hoặc</Text>
                <View style={RegisterStyle.icon}>
                <TouchableOpacity style={RegisterStyle.fb}>
                <Image  source={require('../../../src/assets/fb.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={RegisterStyle.fb}>
                <Image source={require('../../../src/assets/gg.png')} />
                </TouchableOpacity>


            </View>
            <View style={RegisterStyle.footer}>
            <Text style={RegisterStyle.ftText}>Bạn đã có tài khoản?   </Text>
            <Text style={RegisterStyle.end}>Đăng Nhập</Text>
            </View>
            </View>
          
        </View>
    )
}

export default Register

const styles = StyleSheet.create({})