import { StyleSheet } from "react-native"

const NextPaymentStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
    },
    backright:{
        width: 34,
        height: 35,
        tintColor: "black",
    },
    body:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },
    title:{
        fontSize: 20,
        color: "black",
        fontFamily: "Poppins",
        textAlign:'center',
        marginBottom: 30
    },
    buttonContainer:{
        backgroundColor: "#27AAE1",
        borderRadius: 10,
        width: "100%",
        alignItems:'center',
        justifyContent:'center',

    },
    button:{
        fontSize: 16,
        color: "#fff",
        fontFamily: "Poppins",
        fontWeight: "bold",
        margin: 10
    },

})
export default NextPaymentStyle