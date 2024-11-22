import {StyleSheet} from 'react-native';

const TabAddressStyle = StyleSheet.create({
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,

  },
  infoContainer: {
    flex: 1,
    marginLeft: 5,
  },
  name: {
    color: '#000',
    fontSize: 16
  },
  address: {
    fontSize: 14,
    color: '#000',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 45,
  },
  icon: {
    width: 24,
    height: 24,
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
  },
  textH: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 120,
  },
  flatlist: {
    marginTop: 20,
  },
  addAdress: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  textA: {
    color: 'black',
    fontSize: 17,
    marginLeft: 7,
  },
});
export default TabAddressStyle;
