import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';

const Policy = () => {
    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={require('../../assets/anhnenpolicy.png')}
            resizeMode='cover'
        >
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/chevron-left.png')}
                        style={styles.backIcon} />
                    <Text style={styles.title}>Chính sách hoàn trả</Text>
                </View>
                <View style={styles.banner}>
                    <Text style={styles.tp}>Thực phẩm tươi sống</Text>
                    <Text style={styles.text}>Chính sách hoàn trả:</Text>
                    <Text style={styles.text}>
                        - Đồ tươi sống chỉ có thể được hoàn trả trong trường hợp sản phẩm bị hỏng hoặc không đảm bảo chất lượng (hỏng, có mùi lạ, mùi sắc không đúng).
                    </Text>
                    <Text style={styles.text}>
                        - Yêu cầu hoàn trả phải được thực hiện trong vòng 24 giờ kể từ khi nhận hàng.
                    </Text>
                    <Text style={styles.text}>Điều kiện hoàn trả:</Text>
                    <Text style={styles.text}>
                        - Sản phẩm phải còn nguyên bao bì hoặc nguyên trạng, chưa qua chế biến.
                    </Text>
                    <Text style={styles.text}>
                        - Cần cung cấp hình ảnh sản phẩm ngay khi yêu cầu hoàn trả.
                    </Text>
                </View>

                <View style={styles.banner}>
                    <Text style={styles.tp}>Trái cây</Text>
                    <Text style={styles.text}>Chính sách hoàn trả:</Text>
                    <Text style={styles.text}>
                        - Trái cây tươi chỉ có thể được hoàn trả trong vòng 24 giờ nếu phát hiện trái cây bị dập, hỏng, hoặc có dấu hiệu không đạt tiêu chuẩn chất lượng.
                    </Text>
                    <Text style={styles.text}>Điều kiện hoàn trả:</Text>
                    <Text style={styles.text}>
                        - Trái cây phải còn nguyên trạng, chưa cắt, chưa ăn thử hoặc chế biến.
                    </Text>
                    <Text style={styles.text}>
                        - Phải cung cấp hình ảnh ngay khi nhận hàng để làm bằng chứng khi yêu cầu hoàn trả.
                    </Text>
                </View>

                <View style={styles.banner}>
                    <Text style={styles.tp}>Đồ uống</Text>
                    <Text style={styles.text}>Chính sách hoàn trả:</Text>
                    <Text style={styles.text}>
                        - Nước ngọt chỉ có thể hoàn trả nếu chai hoặc lon bị hỏng, rò rỉ, hoặc hết hạn sử dụng tại thời điểm nhận hàng.
                    </Text>
                    <Text style={styles.text}>- Yêu cầu hoàn trả trong vòng 48 giờ sau khi nhận hàng.</Text>
                    <Text style={styles.text}>Điều kiện hoàn trả:</Text>
                    <Text style={styles.text}>
                        - Chai, lon nước phải còn nguyên niêm phong, chưa mở nắp hoặc sử dụng.
                    </Text>
                    <Text style={styles.text}>
                        - Sản phẩm không được hoàn trả nếu đã qua sử dụng hoặc mở niêm phong.
                    </Text>
                </View>

                <View style={styles.banner}>
                    <Text style={styles.tp}>Gia vị</Text>
                    <Text style={styles.text}>Chính sách hoàn trả:</Text>
                    <Text style={styles.text}>
                        - Gia vị có thể hoàn trả trong vòng 7 ngày nếu phát hiện lỗi sản xuất, bao bì bị rách, hoặc sản phẩm hết hạn sử dụng tại thời điểm nhận.
                    </Text>
                    <Text style={styles.text}>Điều kiện hoàn trả:</Text>
                    <Text style={styles.text}>
                        - Bao bì gia vị phải còn nguyên niêm phong, chưa mở nắp hoặc sử dụng.
                    </Text>
                    <Text style={styles.text}>
                        - Sản phẩm không được hoàn trả nếu đã bị mở hoặc qua sử dụng.
                    </Text>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000'
    },
    tp: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000'
    },
    text: {
        flex: 1,
        fontSize: 11,
        color: '#000000'
    }
});

export default Policy;
