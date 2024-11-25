import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');

const HomeStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'column',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        height: 50,
        width: 50,
    },
    searchall: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: width * 0.06,
        paddingHorizontal: width * 0.02,
        marginLeft: width * 0.025,
        backgroundColor: '#EAEAEA',
        height: height * 0.06,
        width: width * 0.61,
    },
    search: {
        height: 25,
        width: 25,
        marginLeft: 7
    },
    input: {
        flex: 1,
        paddingVertical: 13,
    },
    productContainer: {
        borderColor: '#2CA9C0',
        borderRadius: width * 0.02,
        borderWidth: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: height * 0.22,
        marginHorizontal: width * 0.015,
        width: width * 0.44,
        marginTop: height * 0.02,
        marginRight: width * 0.03,
    },

    productDetails: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
  
    },
    productWeight: {
        fontSize: 16
    },
    priceall: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    productPrice: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 'bold'
    },
});
export default HomeStyle