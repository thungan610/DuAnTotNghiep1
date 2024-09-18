import { StyleSheet } from "react-native";

const homeStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: "100%",
        backgroundColor: "#73D6E9",
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        padding: 20,
    },
    itemTop: {
        width: "100%",
        alignItems: "flex-end",
        paddingHorizontal: 20,
    },
    itemTop1: {
        flexDirection: "row",
    },
    cart: {
        width: 24,
        height: 24,
        marginHorizontal: 10
    },
    notifi: {
        width: 24,
        height: 24,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
    },
    name: {
        color: "#000000",
    },
    text1: {
        fontSize: 13,
        color: "#000000",
    },
    viewSearch: {
        marginTop: 20,
        height: 36,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    iconSearch: {
        width: 20,
        height: 20,
    },
    textInput: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 10,
        fontSize: 10,
        color: "#000000",
    },
    TabTop: {
        width: "100%",
        alignItems: "center",
    },
    iconTabTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        alignItems: "center",
        marginTop: 20
    },
    viewImage: {
        width: "100%",
        alignItems: "center",
    },
    viewProduct: {
        paddingHorizontal: 10,
        width: "100%",
    },
    product: {
        borderColor: "#73D6E9",
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 15,
        width: 150,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
        marginVertical: 10
    },
    nameProduct: {
        fontSize: 14,
        color: "#000000",
        marginTop: 10,
    },
    priceView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    price: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "bold",
        paddingHorizontal: 5,
    },
    viewAdd: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    viewIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonAdd: {
        backgroundColor: "#fff",
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderRadius: 5,
        borderColor: "#1877F2",
        borderWidth: 1,
    },
    textAdd: {
        fontSize: 10,
        color: "#1877F2",
    },
    view:{
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#99FFFF",
        borderRadius: 10,
    },
    viewFlashSale:{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "95%",
        marginTop: 5,
    },
    textFlashSale:{
        fontSize: 20,
        color: "#FF3D00",
        fontWeight: "900",
    },
    textAll:{
        fontSize: 12,
        color: "#FF3D00",
    },
    arrow:{
        width: 20,
        height: 20,
    },
    View:{
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    ViewFlaslit2:{
        width: "100%",
        alignItems: "center",
    },
    viewFL2:{
        width: "95%",
        alignItems: "center",
    },
    quantity:{
        fontSize: 12,
        color: "#000000",
        paddingHorizontal: 2,
        fontWeight: "bold",
    },
});
export default homeStyle