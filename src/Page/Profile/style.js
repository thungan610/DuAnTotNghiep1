import { StyleSheet, Text } from "react-native";

const profileStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: 20
    },
    ImageBag: {
        width: '100%',
       alignItems: 'flex-end',
    },
    ImageAvatar: {
        width: "100%",
        alignItems: "center",
    },
    name:{
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20
    },
    TextView: {
        padding: 20,
    },
    Text: {   
        width: '100%',
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingVertical: 10,
        color: 'black',
        fontFamily: 'Poppins',
        fontSize: 15
    }
});
export default profileStyle