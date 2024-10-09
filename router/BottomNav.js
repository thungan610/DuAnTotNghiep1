import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../src/Page/HomeScreen'
import Order from '../src/Page/Order/Order'
import Cart from '../src/Page/Cart/Cart'
import NotifiScreen from '../src/Page/NotifiScreen'
import ProfileDetail from '../src/Page/Profile/ProfileDetail' 
import AddProduct from '../src/Page/Cart/AddProduct'

const Tab = createBottomTabNavigator()

const BottomNav = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 5,
                    backgroundColor: '#37C5DF',
                    

                }
            }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Image style={styles.iconHome} source={focused ? require('./icon/SubtractSau.png') : require('./icon/SubtractSau.png')} />,
                    tabBarLabel: ({ focused }) => focused ? <Text style={styles.label}>.</Text> : null
                }}

                name="HomeScreen" component={HomeScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Image style={styles.icon} source={focused ? require('./icon/Desk.png') : require('./icon/Desk.png')} />,
                    tabBarLabel: ({ focused }) => focused ? <Text style={styles.label}>.</Text> : null
                }}
                name="Order" component={Order} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Image style={styles.icon} source={focused ? require('./icon/BasketSau.png') : require('./icon/BasketSau.png')} />,
                    tabBarLabel: ({ focused }) => focused ? <Text style={styles.label}>.</Text> : null
                }}
                name="AddProduct" component={AddProduct} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Image style={styles.icon} source={focused ? require('./icon/Bell.png') : require('./icon/Bell.png')} />,
                    tabBarLabel: ({ focused }) => focused ? <Text style={styles.label}>.</Text> : null
                }}
                name="NotifiScreen" component={NotifiScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Image style={styles.icon} source={focused ? require('./icon/BasketSau.png') : require('./icon/User.png')} />,
                    tabBarLabel: ({ focused }) => focused ? <Text style={styles.label}>.</Text> : null
                }}
                name="Profile" component={ProfileDetail} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 35,
        height: 35
    },
    label: {
        fontSize: 60,
        color: "#fff",
        marginBottom: -15,
        marginTop: -65
    }
})

export default BottomNav