import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useRef } from 'react'
import BotChatStyle from './style'
import { useNavigation } from '@react-navigation/native';


const BotChat = () => {
    const [messages, setMessages] = useState([{ id: 1, text: "Chào bạn! TheMiniStore có thể giúp gì được cho bạn?", isBot: true }]);
    const [inputText, setInputText] = useState('');
    const scrollViewRef = useRef(null);
    const commonQuestions = [
        "Xin chào!",
        "Phí vận chuyển bao nhiêu?",
        "Giờ hoạt động của cửa hàng?",
        "Khuyến mãi"
    ];
  
    const navigation = useNavigation();
    const BackRight = () => {
      navigation.goBack()
  }
    const sendMessage = () => {
        if (inputText.trim() !== '') {
            const userMessage = inputText;
            setMessages((prevMessages) => [
              ...prevMessages,
              { id: prevMessages.length + 1, text: userMessage, isUser: true },
            ]);
            setInputText('');
        
            // Tự động phản hồi sau 1 giây
            setTimeout(() => autoReply(userMessage), 1000);
            scrollToEnd();
        }
    };
  
    const handleQuestionPress = (question) => {
        setInputText(question);  // Đặt câu hỏi vào TextInput
    };

    const autoReply = (userMessage) => {
        let reply = '';

  // Xử lý các từ khóa từ người dùng để trả lời tự động
  if (userMessage.toLowerCase().includes('xin chào')) {
    reply = 'Chào bạn! The MiniStore rất vui khi được trò chuyện cùng bạn?';
  } else if (userMessage.toLowerCase().includes('giờ hoạt động của cửa hàng')) {
    reply = 'Cửa hàng hoạt động từ 7 giờ sáng đến 21 giờ tối mõi ngày';
  } else if (userMessage.toLowerCase().includes('khuyến mãi')) {
    reply = 'Sau 18h hằng ngày thực phẩm tươi sống sẽ giảm giá 50%, hoặc bạn sẽ nhận được thông báo khuyến mãi từ ứng dụng hoặc tại cửa hàng. Chi tiết vui lòng để lại câu hỏi để cửa hàng hỗ trợ bạn nhé!';
  } else if (userMessage.toLowerCase().includes('phí vận chuyển')) {
    reply = 'Phí vận chuyển sẽ được tính dựa trên hình thức bạn chọn. Bạn có thể kiểm tra trong phần thanh toán.';
  } else {
    reply = 'Xin vui lòng đợi vài phút, cửa hàng sẽ liên lạc lại với bạn ngay!';
  }
        setMessages((prevMessages) => [
            ...prevMessages,
            { id: prevMessages.length + 1, text:reply, isBot: true }
        ]);
        scrollToEnd();
    };

    const scrollToEnd = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    return (
        <KeyboardAvoidingView
           
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={20} // Điều chỉnh giá trị này tùy thuộc vào thanh điều hướng hoặc header
        >
            {/* Header */}
            <View style={BotChatStyle.header}>
                <TouchableOpacity onPress={BackRight}>
                <Image
                    style={BotChatStyle.imgHeader}
                    source={require('../../../src/assets/chevron-left.png')}
                />
                </TouchableOpacity>
                <Text style={BotChatStyle.textHeader}>Trung tâm trợ giúp</Text>
            </View>

            {/* Chat Container */}
            <ScrollView 
              style={BotChatStyle.chatContainer}
              keyboardShouldPersistTaps="handled"
              ref={scrollViewRef}
              contentContainerStyle={{ paddingBottom: 80 }}
            >
                {messages.map((message) => (
                    <View
                        key={message.id}
                        style={[
                            BotChatStyle.messageContainer,
                            message.isBot ? BotChatStyle.botMessage : BotChatStyle.userMessage,
                        ]}
                    >
                        <Text style={BotChatStyle.messageText}>{message.text}</Text>
                    </View>
                ))}

<ScrollView 
              horizontal 
              style={{ marginBottom: 10, paddingHorizontal: 10,}} 
              showsHorizontalScrollIndicator={false}
            >
                {commonQuestions.map((question, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={BotChatStyle.questionButton} 
                      onPress={() => handleQuestionPress(question)}
                    >
                        <Text style={BotChatStyle.questionText}>{question}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            </ScrollView>


            

            {/* Input Container */}
            <View style={BotChatStyle.inputContainerFixed}>
                <TextInput
                    style={BotChatStyle.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Nhập tin nhắn của bạn..."
                    placeholderTextColor="#888"
                />
                <TouchableOpacity style={BotChatStyle.sendButton} onPress={sendMessage}>
                    <Image
                    style={{ width: 40, height: 40 }}
                    source={require('../../assets/send.png')}
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default BotChat;
