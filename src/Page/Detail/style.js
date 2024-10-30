import { StyleSheet } from "react-native";
const styleDetail = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        flexDirection: 'column',
        backgroundColor:'#27AAE1'
    },
    head: {
        paddingTop:6,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal:6
    },
    body: {
        flexDirection: 'column',
        width: '100%',
        marginTop: 6
    },
    pagerView: {
        marginTop:20,
        width: '100%',
        height: 220,
    },
    bodyText: {
        padding: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textBody: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
    },
    textkg: {
        fontSize: 18,
        // fontWeight: 'bold',
        color: '#8F8F8F',
    },
    butonView: {
        paddingHorizontal:20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor:'#EAEAEA',
    },
    tout: {
        width: 52,
        height: 43,
        // backgroundColor: '#EAEAEA',
        flexDirection: 'row'
    },
    textTout: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'blue',
    },
    toutText: {
        fontSize: 22,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
    },
    dolar: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor:'#37C5DF'
    },
    price: {
        resizeMode: 'contain',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    underline: {
        width: '100%',
        height: 50,
    },
    textunderline: {
        fontSize: 24,
        marginTop:10,
        paddingHorizontal:20,
        color: 'black',
        textDecorationLine: 'underline',
    },
    scroollview: {
        marginTop:6,
        width: '100%',
    },
    viewScroll: {
        paddingHorizontal:20,
        width: '100%',
    },
    scrollText: {
        fontSize: 16,
        color: '#8F8F8F',
    },
    origin: {
        width: '100%',
        // backgroundColor: 'blue',
        flexDirection: 'column', // Đổi từ 'row' sang 'column' để xếp chồng các phần tử theo chiều dọc
        justifyContent: 'center', 
        paddingHorizontal:20,
    },

    textorigin: {
        fontSize: 16,
        marginTop: 6,
        color: 'black'
    },
    textoriginRow: {
        flexDirection: 'row'
    },
    headerFooter: {
        width: 300,
        height: 50,
        backgroundColor: '#27AAE1',
        borderRadius: 10,
        borderWidth:1,
        borderColor:'#27AAE1',
        justifyContent: 'center',
    },
    textFooter: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center'
    }
}); export default styleDetail