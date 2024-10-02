import { StyleSheet } from "react-native";

const AddAdressStyle = StyleSheet.create({ 

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    backright:{
        width: 34,
        height: 35,
        tintColor: "black",
    },
    title:{
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        fontFamily: "Poppins",
        textAlign:'center',
    },
    body:{
        width:'100%',
        backgroundColor:'white',
        borderColor: '#ABABAB',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
    },
    input:{
        width:'100%',
        borderBottomColor: '#ABABAB',
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        color: 'black',
        fontFamily: 'Poppins',
    },
    txtLH:{
        fontSize: 16,
        color: 'black',
        fontFamily: 'Poppins',
        marginBottom: 10,
        marginTop: 30,
        marginLeft: 20
    },
    footer:{
        flex: 1,
        marginTop: 90
    },
    button:{
        backgroundColor: "#27AAE1",
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        marginBottom: 20
    },
    buttonText:{
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        fontSize: 16
    }
   

 });
export default AddAdressStyle