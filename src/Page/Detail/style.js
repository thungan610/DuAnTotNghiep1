import { StyleSheet } from "react-native";
const styleDetail = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        flexDirection: 'column',
        padding: 10,
    },
    head: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems:'center',
        position:'relative',
    },
    body: {
        flexDirection:'column',
        width: '100%',
        marginTop:10
    },
    pagerView: {
        width: '100%',
        height: 280,
        // backgroundColor: 'white',
    },
    bodyText: {
        padding:20,
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
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
        // backgroundColor:'#EAEAEA',
    },
    tout: {
        width: 45,
        height: 43,
        // backgroundColor: '#EAEAEA',
        flexDirection: 'row'
    },
    textTout: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'blue',
    },
    iconcart: {
        marginRight:10
    },
    iconnotifi: {

    },
    toutText: {
        fontSize: 22,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',

    },
    // plus: {
    //     width: 46,
    //     height: 42,
    //     backgroundColor: '#EAEAEA',
    //     borderTopLeftRadius: 20,
    //     borderBottomLeftRadius: 20,
    //     justifyContent:'center',
    //     alignItems:'center'
    // },
    // minus: {
    //     width: 46,
    //     height: 42,
    //     backgroundColor: '#EAEAEA',
    //     borderTopRightRadius: 20,
    //     borderBottomRightRadius: 20,
    //     justifyContent:'center',
    //     alignItems:'center'
    // },
    dolar: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        position: 'absolute'
    },
    price: {
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
    },
    scroollview: {
        flex: 1,
        width: '100%',
        height: 200,
        // backgroundColor: '#F5F5F5',

    },
    viewScroll: {
        width: '100%',

        // backgroundColor:'blue'
    },
    scrollText: {
        fontSize: 15,
        color: '#8F8F8F',
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

    textorigin: {
        fontSize: 15,
        marginTop: 10,
        color: 'black'
    },
    textoriginRow: {
        flexDirection: 'row'
    },
    butonfooter: {
        width: '100%',
        height: 100,
        color: 'black'
    },
    headerFooter: {
        width: 300,
        height: 50,
        backgroundColor: '#27AAE1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
    textFooter: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    }
}); export default styleDetail