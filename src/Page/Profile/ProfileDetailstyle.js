import {StyleSheet} from 'react-native';

const profileStyle = StyleSheet.create({
  header: {
    width: '100%',
    height: 150,
    backgroundColor: '#37C5DF',
    position: 'relative',
  },
  headercontainer: {
    flexDirection: 'row', // Đặt icon và input theo hàng ngang
  },
  iconheader: {
    flexDirection: 'row', // Đặt icon và input theo hàng ngang
    marginLeft: 300,
    marginTop: 20,  
  },
  pro5logo: {
    marginTop: 30,
    marginLeft: 20,
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth:2,
    borderColor:"#1C75BC"
  },
  pro5logo1: {
    width: 30,
    height: 30,
  },
  pro5logo2: {  
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  username: {
    marginTop: 47,
    marginLeft: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  pro5small: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 15,
    color: 'black',
    paddingRight:10
  },
  undercontainer: {
    flexDirection: 'column',
  },
  mid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  vecto: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
  body: {
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
  },
  firstbody: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  firstbodyRightside: {
    flexDirection: 'row',
    marginLeft: 175,
    marginTop: 9,
  },
  titleB: {
    fontSize: 20,
    color: 'black',
  },
  history: {
    color: 'black',
    fontSize: 12,
  },
  vecto2: {
    marginLeft: 5,
    marginTop: 3,
  },
  secondbody: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  load: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  load2: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  load3: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  load4: {
    flexDirection: 'column',
    marginLeft: 10,
  
  },
  loadimg: {
    width: 34,
    height: 34,
    marginLeft: 40,
  },
  loadimg1: {
    width: 34,
    height: 34,
    marginLeft: 19,
  },
  loadimg2: {
    width: 34,
    height: 34,
    marginLeft: 10,
  },
  loadtext: {
    color: 'black',
    fontSize: 13,
  },
  loadtext2: {
    color: 'black',
    fontSize: 13,
    marginLeft: 10,
  },
  loadtext3: {
    color: 'black',
    fontSize: 13,
    marginLeft: 10,
  
  },
  loadtext4: {
    color: 'black',
    fontSize: 13,
  },
  account: {
    fontSize: 20,
    color: 'black',
  },
  account2: {
    fontSize: 20,
    color: 'black',
    paddingTop: 10,

  },
  thirdbody: {
    paddingTop: 20,
  },
  boder: {
    // borderWidth: 1, // Độ dày của đường kẻ
    // borderColor: '#000', // Màu của đường kẻ
    // borderRadius: 10, // Bo tròn các góc
    // padding: 15, // Khoảng cách bên trong thẻ
    // margin: 10, // Khoảng cách bên ngoài thẻ
    // backgroundColor: '#fff', // Màu nền của thẻ
      borderBottomWidth: 1,
      borderBottomColor: '#EAEAEA',
      paddingTop: 10,
  },
  insideAccount:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  vecto3:{
    marginLeft: 310,
    marginTop: 13,
  },
  textTab:{
    fontSize: 16,
    color: 'black',
    marginLeft: 3,
    marginTop: 10,
  },
  vecto5:{
    marginLeft: 230,
    marginTop: 13,
  },
  vecto6:{
    marginLeft: 240,
    marginTop: 13,
  },
  vecto7:{
    marginLeft: 175,
    marginTop: 13,
  },
  vecto:{
  marginTop:10
  },


});
export default profileStyle;
