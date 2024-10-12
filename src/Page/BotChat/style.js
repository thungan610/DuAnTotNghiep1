import { StyleSheet } from "react-native";
const BotChatStyle = StyleSheet.create({
    container:{
        padding:20,
        position:'relative',
        backgroundColor:'white',
        height:'100%',
    },
    header:{
        flexDirection:'row',
        marginHorizontal:20,
        marginVertical:20
    },
    textHeader:{
        color:'black',
        fontWeight:'bold',
        fontSize:24,
        marginLeft:50,
    },
    imgHeader:{
        width:30,
        height:30,
        marginTop:5,
    },
    chatContainer: {
        paddingLeft:20,
        marginVertical: 10,
        height: '88%',
        paddingRight:20,
      },
      messageContainer: {
        maxWidth: '70%',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: 'row',
      },
      botMessage: {
        backgroundColor: '#ccc',
        alignSelf: 'flex-start',
      },
      userMessage: {
        backgroundColor: '#27AAE1',
        alignSelf: 'flex-end',
      },
      messageText: {
        fontSize: 16,
        color: 'black',
      },
      botIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
        tintColor: '#555',
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#fff',
      },
      input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 15,
        backgroundColor: '#f9f9f9',
        marginRight: 10,
      },
      sendButton: {
        backgroundColor: '#27AAE1',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
      },
      sendButtonText: {
        color: '#fff',
        fontSize: 16,
      },
      inputContainerFixed: {  // Đặt tên mới cho phần input
        flexDirection: 'row',
        position: 'absolute',  // Cố định vị trí
        bottom: 0,  // Luôn nằm dưới cùng
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#f9f9f9',
    },
    sendButton: {
        
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    questionButton: {
        backgroundColor:'#ccc',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 10,
    },
    questionText: {
        color: '#333',
        fontSize: 14,
    },

});
export default BotChatStyle