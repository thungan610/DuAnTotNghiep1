import React from 'react'
import { View } from 'react-native'
import BottomNav from './router/BottomNav'
import HomeScreen from './src/Page/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {

  return (
    <View>
      <NavigationContainer>
        <BottomNav/>
      </NavigationContainer>
    </View>
  )
}


export default App;
