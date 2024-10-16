import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const Information = () => {
    return (
        <ScrollView style={styles.container}>
                          <View style={styles.header}>
                    <Image
                        source={require('../../assets/chevron-left.png')}
                        style={styles.backIcon} />
                    <Text style={styles.title}>Thông tin về TheMiniStore</Text>
                </View>

            <View style={styles.content}>
                <Text style={styles.description}>
                    Ministore là một ứng dụng bán hàng thực phẩm thông minh, tập trung vào việc cung cấp các sản phẩm tươi sống, thực phẩm đông lạnh và đồ đóng hộp, đáp ứng nhu cầu đa dạng của người tiêu dùng. Đây là nền tảng tiện lợi giúp người dùng dễ dàng truy cập và đặt mua từ rau củ quả, thịt cá, cho đến các món chế biến sẵn và gia vị thiết yếu.{'\n'}
                    Ứng dụng cung cấp một loạt chức năng quan trọng như quản lý hàng tồn kho, xử lý đơn hàng và hỗ trợ khách hàng, cùng với hệ thống thanh toán linh hoạt. Người dùng không chỉ mua sắm nhanh chóng mà còn được gợi ý sản phẩm phù hợp dựa trên thói quen mua sắm trước đây. Các chương trình khuyến mãi và ưu đãi đặc biệt cũng là một điểm nhấn, giúp khách hàng tiết kiệm chi phí và có trải nghiệm mua sắm tốt nhất.{'\n'}
                    Với những tiện ích vượt trội, Ministore không chỉ mang đến sự tiện lợi mà còn đóng góp vào việc nâng cao chất lượng cuộc sống của người tiêu dùng hiện đại.
                    Nếu bạn có góp ý gì về ứng dụng hãy nhắn qua quần trung tâm trợ giúp. Chúng tôi sẵn sàng lắng nghe ý kiến của bạn.
                    Cảm ơn bạn đã quan tâm đến thông tin về Ministore!!!!
                </Text>
                <Image
                    source={require('../../assets/anhnenthongtin.png')}
                    style={styles.image}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000'
    },
    content: {
        alignItems: 'center',
    },
    description: {
        fontSize: 14,
        color: '#000000',
        textAlign: 'justify',
        marginBottom: 20,
        lineHeight: 22,
    },
    image: {
        width: 334,
        height: 346,
        resizeMode: 'contain',
    },
    backIcon: {
        width: 24,
        height: 24,
    },
});

export default Information
