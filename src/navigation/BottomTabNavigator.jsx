import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import Home from './screens/Home';
import { Image } from 'react-native';
import HomeUser from './screens/HomeUser';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {


    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    left: 16,
                    borderRadius: 16
                }
            }}
        >
            <Tab.Screen name='Home' component={Home}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name='home'
                            size={24}
                            color={focused ? '#7973ED' : 'gray'}
                        />
                    )
                }}

            />
            <Tab.Screen name='HomeUser' component={Home}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name='home'
                            size={24}
                            color={focused ? '#7973ED' : 'gray'}
                        />
                    )
                }}

            />
            <Tab.Screen name='HomeUser1' component={Home}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name='home'
                            size={24}
                            color={focused ? '#7973ED' : 'gray'}
                        />
                    )
                }}

            />
            <Tab.Screen name='HomeUser2' component={Home}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name='home'
                            size={24}
                            color={focused ? '#7973ED' : 'gray'}
                        />
                    )
            }}

            />

            <Tab.Screen name='HomeUser3' component={Home}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
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

export default BottomTabNavigator