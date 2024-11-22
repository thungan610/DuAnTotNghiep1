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
        marginTop: 20,
        marginLeft: 20
    },
    footer:{
        // flex: 1,
        marginTop: 5
    },
    button:{
        backgroundColor: "#27AAE1",
        borderRadius: 10,
        padding: 15,
        paddingHorizontal:10,
        width: '100%',
    },
    buttonText:{
        
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        fontSize: 16
    },
    cityListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Cho phép các mục tự động xuống dòng nếu không đủ không gian
        marginVertical: 10,
      },
      cityItem: {
        padding: 10,
        margin: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
      },
      cityText: {
        fontSize: 16,
      }

 });
export default AddAdressStyle