import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const baseWidth = 375; 
const baseHeight = 667;

const scaleWidth = (size) => (width / baseWidth) * size;


const scaleHeight = (size) => (height / baseHeight) * size;

const InsertAddressStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textH: {
    fontSize: scaleWidth(24),
    fontWeight: 'bold',
    color: 'black',
    marginLeft: scaleWidth(95),
  },
  iconback: {
    width: scaleWidth(24),
    height: scaleHeight(30),
    marginTop: scaleHeight(2),
  },
  headers: {
    flexDirection: 'row',
    marginLeft: scaleWidth(20),
    marginTop: scaleHeight(20),
    width: '100%',
    alignItems: 'center',
  },
  infoFContainer: {
    padding: scaleWidth(20),
    borderWidth: 1,
    width: scaleWidth(333),
    height: scaleHeight(160),
    borderColor: '#C4C4C4',
    marginTop: scaleHeight(10),
    borderRadius: scaleWidth(10),
  },
  infoFContainer2: {
    padding: scaleWidth(20),
    borderWidth: 1,
    width: scaleWidth(333),
    height: scaleHeight(340),
    borderColor: '#C4C4C4',
    marginTop: scaleHeight(10),
    borderRadius: scaleWidth(10),
  },
  textInfo: {
    color: 'black',
    fontSize: scaleWidth(17),
    borderColor: '#ABABAB',
    borderBottomWidth: 1,
    height: scaleHeight(40),
  },
  textInfoCountry: {
    color: 'black',
    fontSize: scaleWidth(17),
    borderColor: '#ABABAB',
    borderBottomWidth: 1,
    height: scaleHeight(40),
  },
  phone: {
    color: 'black',
    fontSize: scaleWidth(17),
    borderColor: '#ABABAB',
    borderBottomWidth: 1,
    height: scaleHeight(40),
    marginTop: scaleHeight(17),
  },
  titleInfo: {
    color: 'black',
    fontSize: scaleWidth(20),
    marginTop: scaleHeight(10),
    marginLeft: scaleWidth(40),
  },
  footer: {
    marginTop: scaleHeight(30),
    padding: scaleWidth(10),
  },
  button: {
    backgroundColor: "#27AAE1",
    borderRadius: scaleWidth(10),
    padding: scaleHeight(15),
    marginTop: scaleHeight(20),
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: scaleWidth(16),
  },
});

export default InsertAddressStyles;