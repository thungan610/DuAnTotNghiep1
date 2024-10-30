import {Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../src/Page/HomeScreen'
import Order from '../src/Page/Order/Order'
import ProfileDetail from '../src/Page/Profile/ProfileDetail' 
import AddProduct from '../src/Page/Cart/AddProduct'
import NewNotifi from '../src/Page/NotifiScreen/NewNotifi'

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
                    tabBarIcon: ({ focused }) => <Image style={styles.icon} source={focused ? require('./icon/Home.png') : require('./icon/HomeSau.png')} />,
                    tabBarLabel: ({ focused }) => focused ? <Text style={styles.label}>.</Text> : null
                }}

                name="HomeScreen" component={HomeScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Image style={styles.icon} source={focused ? require('./icon/oderSau.png') : require('./icon/oder.png')} />,
                    tabBarLabel: ({ focused }) => focused ? <Text style={styles.label}>.</Text> : null
                }}
                name="Order" component={Order} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Image style={styles.icon} source={focused ? require('./icon/BasketSau.png') : require('./icon/BatketTruoc.png')} />,
                    tabBarLabel: ({ focused }) => focused ? <Text style={styles.label}>.</Text> : null
                }}
                name="AddProductsScreen" component={AddProduct} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Image style={styles.icon} source={focused ? require('./icon/BellSau.png') : require('./icon/Bell.png')} />,
                    tabBarLabel: ({ focused }) => focused ? <Text style={styles.label}>.</Text> : null
                }}
                name="NotifiScreen" component={NewNotifi} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Image style={styles.icon} source={focused ? require('./icon/UserSau.png') : require('./icon/UserTruoc.png')} />,
                    tabBarLabel: ({ focused }) => focused ? <Text style={styles.label}>.</Text> : null
                }}
                name="Profile" component={ProfileDetail} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 35,
        height: 35,
        tintColor: "#fff",
    },
    label: {
        fontSize: 60,
        color: "#fff",
        marginBottom: -15,
        marginTop: -65
    },
   
})

export default BottomNav