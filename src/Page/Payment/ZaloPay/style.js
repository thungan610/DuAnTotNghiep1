import { StyleSheet } from "react-native";

export const ZaloPayStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        flexDirection:'column',
        padding: 20
    },
    imgQR:{
        width: 300,
        height: 300
    },
    body:{
        width:'100%',
        backgroundColor:'white',
        borderColor: '#ABABAB',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 60,
        alignItems:'center'
    }
});
export default ZaloPayStyle