import { StyleSheet } from "react-native"
const UserCancelStyle = StyleSheet.create({
    header:{
        flexDirection:'row',
        padding:10,
    },
    txtHeader:{
        fontSize:24,
        fontWeight:'bold',
        color:'black',
        marginLeft:20,
    },
    imgHeader:{
        width:30,
        height:30,
        marginTop:5,
    },
    txtHeader2:{
        fontSize:14,
        color:'black',
       textAlign:'center',
        fontWeight:'bold',
    },
    input: {
        marginTop: 15,
        backgroundColor: '#EDEAEA',
        height: 150,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top', 

    },
    container:{
        padding:20,
    },
    btn:{
        backgroundColor:'#FF3434',
        padding:15,
        alignItems:'center',
        borderRadius:10,
        marginTop:20,
    },
    txtBtn:{
        fontSize:18,
        color:'white'
    }
})
export default UserCancelStyle