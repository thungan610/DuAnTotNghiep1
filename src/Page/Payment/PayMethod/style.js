import { StyleSheet } from "react-native";

const PayMethodStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    container1:{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: 20
    },
    body:{
        width:'100%',
        backgroundColor:'white',
        borderColor: '#ABABAB',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 30
    },
    title:{
        fontSize: 15,
        color: "black",
        fontFamily: "Poppins",
    },
    line:{
        width:'100%',
        height: 1,
        backgroundColor: '#ABABAB',
        marginTop: 10
    },
    ViewCheck:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height: 30,
        marginTop: 10
    },
    ViewSuss:{
       width: '100%',
       position:'absolute',
       bottom: 15,
       left: 0,
       right: 0,
    },
    txtSuss:{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        marginTop: 10
    },
    BtnSuss:{
        backgroundColor: '#27AAE1',
        width: '100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 15,
        padding: 10
    }
})

export default PayMethodStyle