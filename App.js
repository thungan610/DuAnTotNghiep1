import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Page/HomeScreen';
import Search from './src/Page/Search/Search';
import NewNotifi from './src/Page/NotifiScreen/NewNotifi';
import Wellcome from './src/Page/Wellcome';
import Login from './src/Page/Login';
import Register from './src/Page/Register/Register';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Wellcome">
        <Stack.Screen name='Wellcome' component={Wellcome} options={{ headerShown:false}}/>
        <Stack.Screen name='Login' component={Login} options={{ headerShown:false}}/>
        <Stack.Screen name='Register' component={Register} options={{ headerShown:false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Search' component={Search} options={{headerShown: false}}/>
        <Stack.Screen name="NewNotifi" component={NewNotifi} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
