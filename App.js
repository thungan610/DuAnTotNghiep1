import React from 'react'
import { View, Text, TextInput } from 'react-native'
import Welcome from './src/Page/Wellcome'
import Login from './src/Page/Login'
import Register from './src/Page/Register/Register'
const App = () => {

  return (
    <View>
      {/* <Login/> */}
      <Register/>
    </View>
  )
}


export default App;
