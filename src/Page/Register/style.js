import { StyleSheet } from "react-native";

const RegisterStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#37C5DF',
    },
    HDLogo: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
        height: 100
    },
    logo: {
        height: 89,
        width: 232
    },
    body: {
        width: '100%',
        height:665 ,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#37C5DF'
    },
    text1: {
        fontSize: 18,
        color: 'black',
    },
    tieudeInput: {
        fontSize: 16,
        color: 'black',
        marginBottom: 10
    },
    inputView: {

        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15
    },
    viewInput: {
        width: '99%',
        height: 42,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#2CA9C0',
        borderRadius: 7,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        color: '#2CA9C0',
        shadowColor: "#2CA9C0",
    },
    anhinput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2CA9C0',
        borderRadius: 7,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    message: {
        width: 24,
        height: 24,
        marginRight: 3,
    },
    input: {
        flex: 1,
        paddingVertical: 11,
        color: '#2CA9C0',
    },
    button:{
        marginLeft:15,
        marginRight: 15,
        
      },
      tout:{
        borderRadius:10,
        borderColor:'#37C5DF',
        backgroundColor:'#37C5DF',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        width: '100%',
        height:50
      },
      textDk:{
        fontSize:20,
        fontWeight:'bold',
        color:'white'
      },
      radio:{
        flexDirection:'row',
       
      },
      fogotPass:{
        fontSize: 14,
        color:'#2CA9C0',
        marginLeft: 110,
        marginTop:9,
     
      },
      hoac:{
     textAlign:'center',
     fontSize:14,
     color:'black'
    
      },
      icon:{
        flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    
      },
      fb:{
        borderColor: "black",
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 50,
    marginRight: 5,
    marginTop: 8,
    
    flexDirection:'row',
    padding: 8,
    backgroundColor:'white'
      },
      footer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:7
      },
      ftText:{
        color:'#2CA9C0',
        fontSize:15
      },
      end:{
        color:'#8B8B8B',
        fontSize:15
      }
});
export default RegisterStyle