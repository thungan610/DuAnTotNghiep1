import { StyleSheet } from "react-native";

const notifiStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconBack: {
        width: 34,
        height: 35,
        tintColor: "black",
    },
    tieude: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        fontFamily: "Poppins"
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#37C5DF',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    item1: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#14C840',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 10,
        margin: 10
    },
    name: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold",
        fontFamily: "Poppins"
    },
    time: {
        alignItems: 'flex-end',
        fontSize: 15,
        color: "black",
        fontFamily: "Poppins"
    },
    ViewTime: {
        width: "100%",
        alignItems: 'flex-end',
    },
    ViewTT: {
        width: "77%"
    },
    khuyenmaiName: {
        fontSize: 15,
        color: "black",
        fontFamily: "Poppins"
    },
    body: {
        width: '100%',
        marginTop: 10,
    }
});
export default notifiStyle