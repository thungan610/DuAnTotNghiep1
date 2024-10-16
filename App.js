import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './router/MainStack';
import Order from './src/Page/Order/Order';
import Policy from './src/Page/Policy/Policy';
import { View } from 'react-native';
const App = () => {
  return (
    <NavigationContainer>
        <MainStack/>
    </NavigationContainer>
    // <View>
    //   <Order/>
    // </View>

  )  
};

export default App;
