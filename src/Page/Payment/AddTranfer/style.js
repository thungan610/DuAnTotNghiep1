import { StyleSheet, View } from "react-native";

export const AddTranferStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    BtnPT:{
        backgroundColor: '#73D6E9',
        width: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        padding: 10,
        borderColor: '#8B8B8B',
        borderWidth: 1,
    },
    ViewVC:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    txtVC:{
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    txtNote:{
        fontSize: 14,
        color: '#000000',
        fontFamily: 'Poppins',
        marginTop: 10
    },
    body:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 10
    },

})
export default AddTranferStyle