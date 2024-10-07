import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './router/MainStack.js';
import { View } from 'react-native';
import ForgotPassword from './src/Page/ForgotPassword/index.js';


const App = () => {
  return (
    // <NavigationContainer>
    //   <MainStack />
    // </NavigationContainer>
    <View>
      <ForgotPassword/>
    </View>
  )  
};

export default App;
