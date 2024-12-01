import { StyleSheet, View } from "react-native";  

const PaymentStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    Padding:{
        padding: 6
    },
    paddingHorizontal:{
        paddingHorizontal: 4
    },
    paddingBottom:{
        paddingBottom: 10
    },
    body:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        backgroundColor:'white',
        alignItems:'center',
    },
    imgmap:{
        width: 40,
        height:40
    },
    txtDC:{
        fontSize:16,
        color:'black',
        fontFamily:'Poppins'
    },
    txtLH:{
        fontSize:14,
        color:'black',
        fontFamily:'Poppins',
    },
    imagexpand:{
        width: 24,
        height:24,
        tintColor: "black",
    },
    ViewTranfer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    txtPrice:{
        fontSize:16,
        color:'black',
        fontFamily:'Poppins',
        fontWeight:'bold'
    },
    ViewPrice:{
        flexDirection:'row',
    },
    BtnTranfer:{
        backgroundColor: "#73D6E9",
        borderColor: "#1877F2",
        borderWidth: 1,
        padding: 15,
    },
    Line:{
        width:'100%',
        height:1,
        backgroundColor:'#ABABAB',
    },
    img:{
        width: 60,
        height:60,
        margin: 10
    },
    Viewimg:{
        backgroundColor: "#37C5DF",
        borderRadius: 10,
        marginBottom:6
    },
    ViewBodyContainer:{
        width:'100%',
        backgroundColor:'white',
    },
    ViewBody:{
        height: 52,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        paddingHorizontal: 20
    },
    ViewBodynote:{
        height: 80,
        flexDirection:'row',
        justifyContent:'space-between',
        width:'86%',
        paddingHorizontal: 10
    },
    btnThem:{
        flexDirection:'row',
    },
    Height:{
        height:20
    },
    txtDC1:{
        fontSize:14,
        color:'#8F8F8F',
        fontFamily:'Poppins'
    },
    maginButtom:{
        marginTop: 10
    },
    ViewFooter:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        paddingHorizontal: 20,
        marginTop: 22
    },
    txtDC2:{
        fontSize:20,
        color:'#000000',
        fontFamily:'Poppins'
    },
    btnSubmit:{
        backgroundColor: "#27AAE1",
        padding: 15,
        borderRadius: 10,
        width: '80%'
    },
    txtBtn:{
        color:'white',
        textAlign:'center',
        fontFamily:'Poppins',
        fontWeight:'bold',
        fontSize:18,
    }
})
export default PaymentStyle