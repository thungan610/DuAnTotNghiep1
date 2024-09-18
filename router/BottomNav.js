import React from "react";
import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Home from "../src/page/HomeScreen";
import Search from "../src/page/Search";
import Profile from "../src/page/Profile";
import NotifiScreen from "../src/page/NotifiScreen";
const Tab = createBottomTabNavigator()

const BottomNav = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 10
                }
            }}
            >
            <Tab.Screen
            options={{
                tabBarIcon: ({ focused }) => <Image style={styles.iconBefore} source={focused ? require("../src/assets/iconHome.png") : require("../src/assets/iconHome.png")} />
            }}
            name="Home" component={Home} />
            <Tab.Screen
            options={{
                tabBarIcon: ({ focused }) => <Image style={styles.iconBefore} source={focused ? require("../src/assets/iconSearch.png") : require("../src/assets/iconSearch.png")} />
            }}
            name="Search" component={Search} />
            <Tab.Screen
            options={{
                tabBarIcon: ({ focused }) => <Image style={styles.iconBefore} source={focused ? require("../src/assets/iconNotifi.png") : require("../src/assets/iconNotifi.png")} />
            }}
            name="Notifi" component={NotifiScreen} />
            <Tab.Screen
            options={{
                tabBarIcon: ({ focused }) => <Image style={styles.iconBefore} source={focused ? require("../src/assets/iconProfile.png") : require("../src/assets/iconProfile.png")} />
            }}
            name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
  
    iconBefore: {
        width: 25,
        height: 25,
        tintColor: "black",
    }
})

export default BottomNav