import { StyleSheet, View } from "react-native";

const notifiStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: 20
    },
    viewItem: {
        width: '100%',
        borderColor: '#37C5DF',
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 15,
        flexDirection: 'row',
        marginBottom: 10
    },
    viewDay: {
        width: '100%',
        alignItems: 'flex-end',
    },
    textDay: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: 'black',
    },
    km: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: 'black',
    },
    name: {
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    ViewImage: {
       paddingHorizontal: 20,
    },
    viewText:{
        width: '75%',
    },
    viewItem2: {
        width: '100%',
        height: 95,
        borderColor: '#14C840',
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 15,
        flexDirection: 'row',
        marginBottom: 10
    },
    km1: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: 'black',
        marginBottom: 10
    },
});
export default notifiStyle