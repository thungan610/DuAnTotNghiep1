import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/Page/store';
import MainStack from './router/MainStack';
import Toast from 'react-native-toast-message';
import PushNotification from 'react-native-push-notification';

const App = () => {
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: "chennelId",
        channelName: "Bạn có thông báo mới", 
        channelDescription: "A default channel for notifications", 
        importance: 4, 
        vibrate: true, 
      },
      (created) => console.log(`Kênh thông báo đã ${created ? 'được tạo' : 'tồn tại'}`) 
    );
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack />
        <Toast/>
      </NavigationContainer>
    </Provider>
  )
};

export default App; 
