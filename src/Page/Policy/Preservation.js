import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, Touchable, TouchableOpacity } from 'react-native';

const Preservation = (prop) => {
    const BackRight = () => {
        prop.navigation.goBack()
    }
    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={require('../../assets/anhnenpolicy.png')}
            resizeMode='cover'
        >
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                   <TouchableOpacity onPress={BackRight}>
                   <Image
                        source={require('../../assets/chevron-left.png')}
                        style={styles.backIcon} />
                   </TouchableOpacity>
                    <Text style={styles.title}>Cách bảo quản</Text>
                </View>
                <View style={styles.banner}>
                    <Text style={styles.tp}>Bảo quản rau củ</Text>
                    <Text style={styles.text}>
                        -Rau lá xanh: Các loại rau như cải, rau muống, rau xà lách nên được rửa sạch, làm ráo nước, sau đó bọc vào giấy hoặc túi zip và đặt trong ngăn mát tủ lạnh.
                    </Text>
                    <Text style={styles.text}>
                        -Rau củ cứng (cà rốt, khoai tây, củ cải, hành tây): Nên để ở nơi thoáng mát, khô ráo, tránh ánh sáng trực tiếp. Những loại này không nên bỏ tủ lạnh vì có thể làm chúng bị ẩm mốc.
                    </Text>
                    <Text style={styles.text}>
                        -Cà chua: Nên để ở ngoài nhiệt độ phòng. Không nên bảo quản cà chua trong tủ lạnh vì sẽ làm chúng mất vị.
                    </Text>
                </View>



                <View style={styles.banner}>
                    <Text style={styles.tp}>Bảo quản trái cây</Text>
                    <Text style={styles.text}>
                        -Trái cây chưa chín: Nên để ở ngoài nhiệt độ phòng cho chín tự nhiên (như chuối, xoài, bơ). Sau khi chín, có thể bỏ vào ngăn mát để giữ tươi lâu hơn.
                    </Text>
                    <Text style={styles.text}>
                        -Trái cây chín: Đặt vào ngăn mát tủ lạnh để giữ được độ tươi ngon. Nên để từng loại trái cây trong túi lưới hoặc hộp kín để tránh ảnh hưởng mùi.
                    </Text>
                    <Text style={styles.text}>
                        -Các loại trái cây mềm (dâu tây, việt quất, mâm xôi): Bảo quản trong ngăn mát và nên sử dụng nhanh vì chúng dễ hỏng.
                    </Text>
                </View>



                <View style={styles.banner}>
                    <Text style={styles.tp}>Bảo quản thịt cá</Text>
                    <Text style={styles.text}>
                        -Thịt tươi: Nếu dùng trong 1-2 ngày, nên để trong ngăn mát, bọc kín để tránh nhiễm mùi sang thực phẩm khác. Nếu không dùng ngay, có thể cấp đông và bảo quản trong túi hút chân không hoặc túi zip.
                    </Text>
                    <Text style={styles.text}>
                        -Cá tươi: Cá nên được làm sạch, để ráo nước và cấp đông ngay sau khi mua về. Để bảo quản lâu dài, hãy bọc kỹ cá và tránh để tiếp xúc với không khí quá lâu trong tủ đông.
                    </Text>
                    <Text style={styles.text}>
                        -Thịt đã chế biến: Các loại thịt đã chế biến như xúc xích, thịt nguội nên được để trong ngăn mát, trong các hộp kín và sử dụng trong vài ngày.
                    </Text>
                </View>



                <View style={styles.banner}>
                    <Text style={styles.tp}>Bảo quản thịt cá</Text>
                    <Text style={styles.text}>
                        Gia vị khô: Các loại gia vị như tiêu, muối, bột ngọt, bột nghệ, bột tỏi,... nên được bảo quản ở nơi khô ráo, tránh ẩm và ánh sáng. Để trong hộp kín hoặc lọ để ngăn ngừa ẩm mốc.
                    </Text>
                </View>


                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                    **Việc bảo quản đúng cách sẽ giúp thực phẩm giữ được độ tươi ngon, hương vị và đặc biệt là đảm bảo an toàn cho sức khỏe người tiêu dùng.
                    </Text>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom:30,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#4CAF50',
    },
    container: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    title: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000'
    },
    tp: {
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000000'
    },
    text: {
        flex: 1,
        fontSize: 15,
        color: '#000000'
    }
});

export default Preservation;
