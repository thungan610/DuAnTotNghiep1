import React from 'react'
import { View, Text, TextInput, SafeAreaView } from 'react-native'
import Profile from './src/Page/Profile'
import EditProfile from './src/Page/Profile/EditProfile'
const App = () => {

  return (
    <SafeAreaView>
    <View>
      {/* <Login/> */}
      {/* <Register/> */}
      {/* <Profile/> */}
      <EditProfile/>
    </View>
    </SafeAreaView>
  )
}


export default App;
