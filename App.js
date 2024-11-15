import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/Page/store';
import MainStack from './router/MainStack';
import Toast from 'react-native-toast-message';

const App = () => {
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
