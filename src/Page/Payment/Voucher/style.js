import { StyleSheet, View } from "react-native";
const VoucherStyle = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding:20,    },
    ViewAdd:{
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    
    },
    input:{
        width: '75%',
        backgroundColor: '#EAEAEA',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        paddingLeft: 20,
        height: 40,
        fontSize: 12,
        fontFamily: 'Poppins',
    },
    button:{
        width: '23%',
        backgroundColor: '#37C5DF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 40,
    },
    buttonText:{
        color: "#33363F",
        fontSize: 12,
        fontFamily: 'Poppins',
    },
    bodyMain:{
        marginTop:10,
        width: '100%',
        backgroundColor: 'white',
    },
    body:{
        
        width: '100%',
        backgroundColor: '#FFDEC2',
        borderRadius: 10,
        padding: 10,
        borderColor: '#8F8F8F',
        borderWidth: 1,
    },
    title:{
        color: 'black',
        fontSize: 15,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
    },
    Dieukien:{
        color: 'black',
        fontSize: 14,
        fontFamily: 'Poppins',
    },
    time:{
        color: '#8F8F8F',
        fontSize: 14,
        fontFamily: 'Poppins',
    },
    ViewSuss:{
        marginTop: 380,
        alignItems: 'center',
        justifyContent: 'flex-end',

     },
   
})
export default VoucherStyle