import React from "react";
import { View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Home from "../src/Page/HomeScreen";
import Order from "../src/Page/Order/Order";
import Cart from "../src/Page/Cart/Cart";
import Profile from "../src/Page/Profile";
import NotifiScreen from "../src/Page/NotifiScreen";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
    return (
        
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 10,
                    backgroundColor:"#37C5DF"
                }
            }}
        >
            {[
                { name: "Home", component: Home, icon: require("../src/assets/iconHome.png") },
                { name: "Order", component: Order, icon: require("../src/assets/Desk_alt.png") },
                { name: "Cart", component: Cart, icon: require("../src/assets/Basket_fill.png") },
                { name: "NotifiScreen", component: NotifiScreen, icon: require("../src/assets/Bell.png") },
                { name: "Profile", component: Profile, icon: require("../src/assets/User_alt.png") }
            ].map(({ name, component, icon }) => (
                <Tab.Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.iconContainer}>
                                <Image
                                    style={styles.iconBefore}
                                    source={icon}
                                />
                                {focused && <View style={styles.dot} />}
                            </View>
                        ),
                        tabBarLabel: () => null,  // Không hiển thị chữ
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center', // Căn giữa các biểu tượng và dấu chấm
        justifyContent:'center',
    },
    iconBefore: {
        width: 32,
        height: 32,
        tintColor: "white",
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3, // Tạo hình tròn
        backgroundColor: "white", // Màu sắc của dấu chấm
        marginTop: 2, // Khoảng cách giữa biểu tượng và dấu chấm
    },
});

export default BottomNav;
