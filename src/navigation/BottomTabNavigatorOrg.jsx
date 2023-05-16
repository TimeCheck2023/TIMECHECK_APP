import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import * as Icon from '@expo/vector-icons';

import React from 'react'
import HomeOrg from '../screens/Org/HomeOrg';

const Tab = createBottomTabNavigator();


const BottomTabNavigatorOrg = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    bottom: 10,
                    right: 16,
                    left: 16,
                    borderRadius: 16
                }
            }}
            initialRouteName='Home'
        >
            <Tab.Screen name='Home' component={HomeOrg}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon.Ionicons
                            name='home'
                            size={24}
                            color={focused ? '#7973ED' : 'gray'}
                        />
                    )
                }}
            />
            <Tab.Screen name='Details' component={HomeOrg} 
                 options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon.Ionicons
                            name='home'
                            size={24}
                            color={focused ? '#7973ED' : 'gray'}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigatorOrg