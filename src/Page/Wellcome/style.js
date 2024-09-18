import {StyleSheet } from "react-native";

const WelcomeStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        position: 'relative',
        justifyContent: "center",
        alignItems: 'center'

    },
    goctren: {
        position:"absolute",
        top:0,
        left: 0
    },
    anhgiua: {
        height: 410,
        width: 395,
        // marginTop: 150
    },
    gocduoi:{
        position:"absolute",
        right: 0,
        bottom: 0
    }
})
export default WelcomeStyle;