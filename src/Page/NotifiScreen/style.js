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
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBack: {
        position:'absolute',
        left: 0,
        top: 0
    },
    tieude: {
        fontSize: 24,
        color: "black",
        fontWeight: "bold",
        fontFamily: "Poppins"
    },
    noNotification: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noNotificationText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
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
        paddingTop:20,
        width: '100%',
    }
});
export default notifiStyle