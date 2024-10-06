import { StyleSheet, Text, View } from 'react-native'
const ResetPasswordStyle = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#27AAE1',
        position:"relative"
      },
    headerLogo:{
        alignItems:'center',
        justifyContent:'center',
        marginTop: 50,
        width:'100%',
        height:'17%'
      },
      logo:{
        height:89,
        width:232
      },
      body:{
        width:'100%',
        height:'83%',
        borderRadius: 20,
        backgroundColor:'white'
      },
      tieude:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding:25 
      },
      tieudedn:{
        fontSize: 26,
        fontWeight:'bold',
        color:'#27AAE1'
      },
      anhinput:{
        flexDirection: 'row', // Đặt icon và input theo hàng ngang
        alignItems: 'center', // Căn giữa icon và text theo chiều dọc
        borderWidth: 1,
        borderColor: '#2CA9C0',
        borderRadius: 7,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
      },
      inputall:{
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 15,
        marginRight:15,
        
      },
      input: {
        width: '85%',
        borderRadius: 7,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        color: 'black',
        shadowColor: "#2CA9C0",
        shadowOffset: {
            width: 0,
            height: 10,
        }},

        tieudeinput:{
            fontSize: 16,
            color:'black',
            marginBottom:10
          },
          dn:{
            borderRadius:15,
            borderColor:'#27AAE1',
            backgroundColor:'#27AAE1',
            borderWidth:1,
            alignItems:'center',
            justifyContent:'center',
            width: '100%',
            height:50
          },
          chudn:{
            fontSize: 20,
            fontWeight:'bold',
            color:'white',
           },
       
});

export default ResetPasswordStyle