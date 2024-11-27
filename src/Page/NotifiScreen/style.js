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
    item: {
        flexDirection: 'column',
        borderColor: '#37C5DF',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal:12,
        paddingVertical:12,
        marginTop: 10
    },
    // image: {
    //     width: 50,
    //     height: 50,
    //     borderRadius: 10,
    //     margin: 10
    // },
    title: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold"
    },
    message: {
        fontSize: 14,
        color: "#666",
    },
    body: {
        width: '100%',
        height: '100%',
    }
});
export default notifiStyle