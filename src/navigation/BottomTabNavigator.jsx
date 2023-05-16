import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Icon from '@expo/vector-icons';
import { Image, View } from 'react-native';
import Home from '../screens/HomeUser';
import AddButton from '../components/AddButton';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
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
            <Tab.Screen name='Home' component={Home}
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
            {/* <Tab.Screen name='HomeUser' component={Home}
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
            /> */}
            <Tab.Screen name='Home1' component={Home}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <View className='items-center flex-1 h-0'>
                            <AddButton />
                        </View>
                    )
                }} Home
            />
            {/* <Tab.Screen name='HomeUser2' component={Home}
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
            /> */}

            <Tab.Screen name='home111' component={Home}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon.Ionicons
                            name='notifications-sharp'
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