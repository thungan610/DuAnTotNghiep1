import { StyleSheet } from "react-native";

const HomeStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'column',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        height: 50,
        width: 50,
    },
    searchall: {
        flexDirection: 'row', // Đặt icon và input theo hàng ngang
        alignItems: 'center', // Căn giữa icon và text theo chiều dọc
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 25,
        paddingHorizontal: 5,
        marginLeft:10,
        backgroundColor: '#EAEAEA',
        height:45,
        width:240
    },
    search: {
        height: 25,
        width: 25,
        marginLeft:7
    },
    input: {
        flex: 1,
        paddingVertical: 13,
    },
    productContainer:{
        borderColor: '#2CA9C0',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent:'space-evenly',
        alignItems:'center',
        height:180,
        marginHorizontal: 6,
        width: 170,
        marginTop: 15,
        marginRight: 15,
    },
    productDetails:{
        justifyContent:'center',
        alignItems:'center'
    },
    productTitle:{
        fontSize: 18,
        fontWeight:'bold'
    },
    productWeight:{
        fontSize: 16
    },
    priceall:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    productPrice:{
        textAlign:"center",
        fontSize: 18,
        fontWeight: 'bold'
    },
    price:{
        marginRight: 5
    },
});
export default HomeStyle