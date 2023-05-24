import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Icon from '@expo/vector-icons';
import { Dimensions, Image, View } from 'react-native';
import Home from '../screens/User/Home/HomeUser';
import AddButton from '../components/AddButton';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Notification from '../screens/User/Notification/Notification';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    const { userInfo } = useContext(AuthContext)


    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: 'white',
                        position: 'absolute',
                        bottom: 7,
                        marginHorizontal: 20,
                        // Max Height...
                        height: 60,
                        borderRadius: 10,
                        // Shadow...
                        shadowColor: '#000',
                        shadowOpacity: 0.06,
                        shadowOffset: {
                            width: 10,
                            height: 10
                        },
                        paddingHorizontal: 20,
                    },
                }}
                initialRouteName='Home'
            >
                <Tab.Screen name='Home' component={Home}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused }) => (
                            <Icon.Ionicons
                                name='home'
                                size={27}
                                color={focused ? '#7973ED' : 'gray'}
                            />
                        )
                    }}
                />
                {
                    userInfo.rol === 0 &&
                    <Tab.Screen name='Home1' component={Home}
                        options={{
                            tabBarShowLabel: false,
                            tabBarIcon: ({ focused }) => (
                                <View className='items-center flex-1 h-0'>
                                    <AddButton />
                                </View>
                            )
                        }}
                    />
                }
                {
                    userInfo.rol === 0 &&
                    <Tab.Screen name='Notification' component={Notification}
                        options={{
                            tabBarBadge: 5, // Cantidad a mostrar en el distintivo
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
                }
            </Tab.Navigator>
        </>
    )
}

export default BottomTabNavigator