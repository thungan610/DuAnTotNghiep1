import { StyleSheet } from "react-native";

const LoginStyle = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    backgroundColor:'#37C5DF',
    position:"relative"
  },
  headerlogo:{
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
    color:'#37C5DF'
  },
  tieudednphu:{
    fontSize: 18,
    color:'black',
  },
  tieudeinput:{
    fontSize: 16,
    color:'black',
    marginBottom:10
  },
  inputall:{
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15,
    marginRight:15
    // flexDirection: 'column',
  },
  input: {
    width: '90%',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#2CA9C0',
    borderRadius: 7,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: '#2CA9C0',
    shadowColor: "#2CA9C0",
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 50,
    shadowRadius: 40,
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
  message: {
    width: 24,
    height: 24,
    marginRight: 3, // Khoảng cách giữa icon và input
  },
  input: {
    flex: 1, 
    paddingVertical: 13,
    color: '#2CA9C0',
  },
  forgot:{
    fontSize: 14,
    color:'#2CA9C0',
    marginLeft: 135,
    marginTop:9
  },
  button:{
    marginLeft:15,
    marginRight: 15,
    marginTop: 70
  },
  dn:{
    borderRadius:10,
    borderColor:'#37C5DF',
    backgroundColor:'#37C5DF',
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
  or:{
    color:'black',
    fontSize:13,
    fontWeight:'bold',
    textAlign:"center",
    marginTop:8
  },
  buttonall:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  buttongg: {
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 50,
    marginLeft: 5,
    marginTop: 8,
    flexDirection:'row',
    padding: 8,
    backgroundColor:'white'
},
buttonfb: {
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
  footerduoi:{
    color:'#2CA9C0',
    fontSize:15
  },
  footerdau:{
    color:'#8B8B8B',
    fontSize:15
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  containereye: {
    marginLeft: 10,
  },
});
export default LoginStyle