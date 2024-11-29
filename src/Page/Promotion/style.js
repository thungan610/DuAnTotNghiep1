import { StyleSheet } from "react-native";
const PromotionStyle = StyleSheet.create({
    container:{
        padding:20,
        width:'100%',
    },
    header:{
       flexDirection:'row'
    },
    txtHeader:{
        fontSize:24,
        fontWeight:'bold',
        color:'#FF7400',
        marginLeft:20,
    },
    imHeader:{
        marginTop:7,
    },
    image:{
        width:'100%',
        marginTop:10,
        height:160,
    },
    image1:{
        width:180,
        marginTop:10,
        height:160,
        borderRadius:10,
    },
    promotionBox:{
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:10,
    }

})
export default PromotionStyle