import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './router/MainStack';
const App = () => {
  return (
    <NavigationContainer>
        <MainStack />
    </NavigationContainer>
  );
};

export default App;
