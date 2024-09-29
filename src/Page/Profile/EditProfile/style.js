import { StyleSheet } from "react-native"

const EditProfile = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: 20
    },
    Viewtitle:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },
    title:{
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    arrowleft:{
        color: 'black',
    },
    textInput:{
        flexDirection: 'row', // Đặt icon và input theo này ngang
        alignItems: 'center', // Căn giữa icon và text theo chiều dọc
        borderBottomWidth: 1,
        borderColor: '#ABABAB',
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    text:{
        fontFamily: 'Poppins',
        fontSize: 15,
        color: 'black'
    },
    input:{
        fontFamily: 'Poppins',
        color: 'black',
        fontSize: 15
    },
    Viewavatar:{
        width: "100%",
        alignItems: "center",
        marginVertical: 20
    },
    iconCamera:{
        position: 'absolute',
        bottom: "0%",
        right: "46%"
    }
})
export default EditProfile