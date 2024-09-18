import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Wellcome from "../src/page/Wellcome";
import Login from "../src/page/Login";
import SignUp from "../src/page/SignUp";
import BottomNav from "./BottomNav";
const Stack = createNativeStackNavigator()
const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="BottomNav"
        >
            <Stack.Screen name="Wellcome" component={Wellcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="BottomNav" component={BottomNav} />
        </Stack.Navigator>
    );
};
export default MainStack