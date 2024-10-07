import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Wellcome from "../src/Page/Wellcome";
import Login from "../src/Page/Login";
import BottomNav from "./BottomNav";
import ResetPassword from "../src/Page/ForgotPassword/ResetPassword.js";
import Register from "../src/Page/Register/Register";
import HomeScreen from "../src/Page/HomeScreen/index.js";
import NewNotifi from "../src/Page/NotifiScreen/NewNotifi.js";
import NewCart from "../src/Page/Cart/NewCart.js";
import ForgotPassword from "../src/Page/ForgotPassword/index.js";
const Stack = createNativeStackNavigator()
const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Wellcome"
        >
            <Stack.Screen name="Wellcome" component={Wellcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ResetPass" component={ResetPassword} />
            <Stack.Screen name="Forgot" component={ForgotPassword} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="NewNotifi" component={NewNotifi} />
            <Stack.Screen name="NewCart" component={NewCart} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="BottomNav" component={BottomNav} />
        </Stack.Navigator>
    );
};
export default MainStack