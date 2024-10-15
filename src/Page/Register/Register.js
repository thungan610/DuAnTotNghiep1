import RegisterStyle from './style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const Register = (prop) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [rememberAccount, setRememberAccount] = useState(false);

    const NextLogin = () => {
        prop.navigation.navigate('Login')
    }

    useEffect(() => {
        const loadAccount = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('savedEmail');
                const savedPhone = await AsyncStorage.getItem('savedPhone');
                const savedName = await AsyncStorage.getItem('saveName');
                const savedPassword = await AsyncStorage.getItem('savePassword');

                if (savedEmail !== null) {
                    setEmail(savedEmail);  // Gán email đã lưu
                }
                if (savedPhone !== null) {
                    setPhone(savedPhone);
                }
                if (savedName !== null) {
                    setPhone(savedName);
                }
                if (savedPassword !== null) {
                    setPhone(savedPassword);
                }
            } catch (error) {
                console.error("Không thể tải tài khoản đã lưu", error);
            }
        };
        loadAccount();
    }, []);

    const BtnRegister = async () => {
        try {
            // Gọi API đăng ký
            const response = await axios.post('http://192.168.1.61:6677/users/register', {
                email: email,
                password: password,
                name: fullName,
                phone: phone
            });

            if (response.data) {
                Alert.alert("Thông báo", "Đăng kí thành công!");

                if (rememberAccount) {
                    await AsyncStorage.setItem('savedEmail', email);
                    await AsyncStorage.setItem('savedPhone', phone);
                    await AsyncStorage.setItem('savedName', fullName);
                    await AsyncStorage.setItem('savedPassword', password);
                } else {
                    await AsyncStorage.removeItem('savedEmail');
                    await AsyncStorage.removeItem('savedPhone');
                    await AsyncStorage.setItem('savedName');
                    await AsyncStorage.setItem('savedPassword');
                }

                setTimeout(() => {
                    prop.navigation.navigate('SMS');
                }, 1000);
            }
        } catch (error) {
            Alert.alert("Thông báo", error.response ? error.response.data.message : "Đăng ký thất bại!");
        }


    // };

    const handleRememberAccount = () => {
        setRememberAccount(!rememberAccount); // Đảo ngược trạng thái nhớ tài khoản
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={RegisterStyle.container}
        >
            <ScrollView>
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
                            <Image style={{ tintColor: "#2CA9C0", height: 24, width: 24 }} source={require("../../../src/assets/User_alt.png")} />
                            <TextInput
                                placeholder="Họ và tên"
                                onChangeText={(text) => setFullName(text)} // Cập nhật đúng biến
                                style={RegisterStyle.input}
                                value={fullName}
                            />
                        </View>

                        <Text style={RegisterStyle.tieudeInput}>Địa chỉ email</Text>
                        <View style={RegisterStyle.anhinput}>
                            <Image style={RegisterStyle.lockalt} source={require("../../../src/assets/Message.png")} />
                            <TextInput
                                placeholder="Nhập email"
                                onChangeText={(text) => setEmail(text)}
                                style={RegisterStyle.input}
                                value={email}
                            />
                        </View>

                        <Text style={RegisterStyle.tieudeInput}>Số điện thoại</Text>
                        <View style={RegisterStyle.anhinput}>
                            <Image style={{ tintColor: '#2CA9C0', width: 24, height: 24 }} source={require("../../../src/assets/Phone_fill.png")} />
                            <TextInput
                                placeholder="Số điện thoại"
                                onChangeText={(text) => setPhone(text)} // Cập nhật đúng biến
                                style={RegisterStyle.input}
                                value={phone}
                            />
                        </View>

                        <Text style={RegisterStyle.tieudeInput}>Mật khẩu</Text>
                        <View style={RegisterStyle.anhinput}>
                            <Image style={RegisterStyle.lockalt} source={require("../../../src/assets/Lock_alt.png")} />
                            <TextInput
                                placeholder="Nhập mật khẩu"
                                onChangeText={(text) => setPassword(text)}
                                style={RegisterStyle.input}
                                secureTextEntry={!isPasswordVisible}
                                keyboardType="default"
                                returnKeyType="done"
                            />
                            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                <Image
                                    style={RegisterStyle.eye_closed}
                                    source={isPasswordVisible
                                        ? require("../../../src/assets/eye.png")
                                        : require("../../../src/assets/eye-closed.png")
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={RegisterStyle.button}>
                        <TouchableOpacity onPress={BtnRegister} style={RegisterStyle.tout}>
                            <Text style={RegisterStyle.textDk}>
                                Đăng Ký
                            </Text>
                        </TouchableOpacity>
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            marginTop:20
                        }}>
                            <TouchableOpacity onPress={handleRememberAccount} style={{
                                width: 20,
                                height: 20,
                                borderWidth: 1,
                                borderColor: '#2CA9C0',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10,
                            }}>
                                {rememberAccount && <Image source={require("../../../src/assets/check.png")} />}
                            </TouchableOpacity>
                            <Text style={RegisterStyle.checkboxLabel}>Nhớ tài khoản</Text>
                        </View>
                    </View>

                    <Text style={RegisterStyle.hoac}>Hoặc</Text>
                    <View style={RegisterStyle.icon}>
                        <TouchableOpacity style={RegisterStyle.fb}>
                            <Image source={require('../../../src/assets/fb.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={RegisterStyle.fb}>
                            <Image source={require('../../../src/assets/gg.png')} />
                        </TouchableOpacity>
                    </View>


                    <View style={RegisterStyle.footer}>
                        <Text style={RegisterStyle.ftText}>Bạn đã có tài khoản?</Text>
                        <Text onPress={NextLogin} style={RegisterStyle.end}> Đăng Nhập</Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
export default Register;
