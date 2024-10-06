 import {StyleSheet} from "react-native"
 const ProductCancelStyle = StyleSheet.create({
    container: {
        padding:10,

    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    header1: {
        alignItems: "center",
        marginTop:20,
      },
    boxProduct:{
        borderColor:'#ccc',
        borderWidth: 1,
        flexDirection: 'column',
        padding:10,
        marginTop: 10,
        borderRadius:10,
    },
    boxProduct1:{
        flexDirection: 'row',
    },
    orderInfo: {
        marginLeft: 16,
        flex:1
      },
      orderName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
      },
      orderQuantity: {
        fontSize: 14,
        color: '#555',
        color: 'black'
      },
      orderPrice: {
        fontSize: 14,
        color: '#FF3434',
      },
      orderStatus: {
        fontSize: 14,
        color: '#FF7400',
        alignSelf: 'flex-end', // Căn phải (đi chung vs flex)
      },
      orderCard: {
        flexDirection: 'row',
        padding: 8,
        borderColor: '#BBAFAF',
        borderRadius: 8,
        alignItems: 'center',
      },
      borderimage: {
        borderRadius: 10,
        backgroundColor: '#73D6E9',
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: 60,
        height: 60,
        marginRight: 16,
        borderRadius: 8,
        marginLeft: 14
      },
      input: {
        marginTop: 5,
        backgroundColor: '#EDEAEA',
        height: 100, // Chiều cao của ô nhập
        borderColor: '#ccc',
        
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top', // Đặt văn bản ở đầu ô
    },
    button:{
        borderColor:'#4CAF50',
        borderWidth: 1,
        padding:10,
        width:100,
        borderRadius:10,
    },
    buttonContainer:{
        flexDirection:'row',
        marginTop:10,
        justifyContent:'flex-end'
    },
    textButton:{
        fontSize:18,
        color:'black',
        textAlign:'center',
    },
    button1:{
        marginLeft:10,
        borderColor:'#FF3D00',
        borderWidth: 1,
        padding:10,
        width:100,
        borderRadius:10,
    },
    textButton1:{
        fontSize:18,
        color:'#FF3D00',
        textAlign:'center',
    },
 })
 export default ProductCancelStyle