import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    next: {
        right: 10,
    },
    previous: {
        left: 10,
    },
    icon: {
        position: 'absolute',
        top: 150,
    },
    container: {
        width: '100%',
        height: '100%',
        // backgroundColor: '#27AAE1'
    },
    pagerView: {
        width: '100%',
        height: 300,
    },
    body: {
        width: '100%',
        height: '50%',
        // backgroundColor: '#37C5DF',
        position: "relative",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        top:-29
    },
    bodyText: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


    },
    textBody: {
        fontSize: 24,
        color: 'back',
        fontWeight: 'bold',
        left: 30,
        top: 10
    },
    textkg: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8F8F8F',
        top: 10,
        left: -30
    },
    butonView: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        marginLeft: 39,
        top: 20
        // backgroundColor:'blue',
    },
    tout: {
        width: 45,
        height: 43,
        backgroundColor: '#EAEAEA',

        flexDirection: 'row'
    },
    textTout: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'blue',
        top: 5,
        left: 20
    },
    head: {
        width: '100%',
        height: 30,
        // backgroundColor:'blue',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    iconcart: {
        left: 100,
        top: 5
    },
    iconnotifi: {
        top: 6,
        left: -30
    },
    toutText: {
        fontSize: 22,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        top: 5,
        left: 10,
        color: 'black',

    },
    plus: {
        width: 45,
        height: 43,
        backgroundColor: '#EAEAEA',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'row'
    },
    minus: {
        width: 45,
        height: 43,
        backgroundColor: '#EAEAEA',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        flexDirection: 'row'
    },
    dolar: {
        top: 7,
        left: 240,
        width: 20,
        height: 20,
        resizeMode: 'contain',
        position: 'absolute'
    },
    price: {
        top: 3,
        left: 260,
        width: 120,
        height: 20,
        resizeMode: 'contain',
        position: 'absolute',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 19
    },
    underline: {
        width: '100%',
        height: 50,

    },
    textunderline: {
        fontSize: 24,
        color: 'black',
        textDecorationLine: 'underline',
        top: 20,
        left: 15
    },
    scroollview: {
        flex: 1,
        width: '100%',
        height: 200,
        // backgroundColor: '#F5F5F5',
        top:10
    },
    viewScroll: {
        width: '100%',

        // backgroundColor:'blue'
    },
    scrollText: {
        fontSize: 15,
        color: '#8F8F8F',
        top: 10,
        left: 15,
        right: 20
    },
    origin: {
        width: '100%',
        height: 200, // Điều chỉnh chiều cao phù hợp
        // backgroundColor: 'blue',
        marginTop: 10,
        flexDirection: 'column', // Đổi từ 'row' sang 'column' để xếp chồng các phần tử theo chiều dọc
        justifyContent: 'flex-start', // Căn phần tử theo chiều dọc
        padding: 10 // Thêm khoảng cách giữa các phần tử
    },
   
    textorigin:{
        fontSize:15,
        left:15,
        marginTop:10,
        color:'black'
    },
    textoriginRow:{
        flexDirection:'row'
    },
    butonfooter:{
        width:'100%',
        height:100,
        color:'black'
    },
headerFooter:{
    width:300,
    height:50,
    backgroundColor:'#27AAE1',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    top:50
},
textFooter:{
    fontSize:15,
    fontWeight:'bold',
    color:'white'
}
});export default styles