import {StyleSheet} from 'react-native';

const InsertAddressStyles = StyleSheet.create({
  textH: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 95,
  },
  iconback: {
    width: 24,
    height: 30,
    marginTop: 2,
  },
  headers: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  infoFContainer: {
    padding: 20,
    borderWidth: 1,
    width: 333,
    height: 160,
    borderColor: '#C4C4C4',
    marginLeft: 30,
    marginTop: 10,
    borderRadius: 10,
  },
  infoFContainer2: {
    padding: 20,
    borderWidth: 1,
    width: 333,
    height: 270,
    borderColor: '#C4C4C4',
    marginLeft: 30,
    marginTop: 10,
    borderRadius: 10,
  },
  textInfo:{
    color: 'black',
    fontSize: 17,
    borderColor: '#ABABAB',
    borderBottomWidth: 1,
    height: 40,
  },
  textInfoCountry:{
    color: 'black',
    fontSize: 17,
    borderColor: '#ABABAB',
    borderBottomWidth: 1,
    height: 40,
  },
 
  phone:{
    color: 'black',
    fontSize: 17,
    borderColor: '#ABABAB',
    borderBottomWidth: 1,
    height: 40,
    marginTop: 17,
  },
  titleInfo:{
    color: 'black',
    fontSize: 20,
    marginTop:10,
    marginLeft: 40,
  },
  footer:{
    // flex: 1,
    marginTop: 100,
    padding:10,
},
button:{
  backgroundColor: "#27AAE1",
  borderRadius: 10,
  padding: 15,
  marginTop: 20,
  width: '100%',

},
buttonText:{    
  color: 'white',
  textAlign: 'center',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  fontSize: 16
},

});
export default InsertAddressStyles;
