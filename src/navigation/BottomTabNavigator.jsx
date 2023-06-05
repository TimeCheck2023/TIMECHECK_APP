import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Icon from '@expo/vector-icons';
import { Dimensions, Image, View } from 'react-native';
import AddButton from '../components/AddButton/AddButton';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import HomeScreens from '../screens/User/Home/HomeScreens';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Profile from '../screens/User/Profile/Profile';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    const { userInfo } = useContext(AuthContext)



    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        height: hp('7.2'),
                    },
                    show: true
                }}

                initialRouteName='HomeScreens'
            >


                <Tab.Screen name='HomeScreens' component={HomeScreens}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused }) => (
                            <View >
                                <Icon.Ionicons
                                    name='home'
                                    size={27}
                                    color={focused ? '#7973ED' : 'gray'}
                                />
                            </View>
                        )
                    }}
                />

                {
                    userInfo.rol === 0 &&
                    <Tab.Screen name='Home1' component={HomeScreens}
                        options={{
                            tabBarShowLabel: false,
                            tabBarIcon: ({ focused }) => (
                                <View className='items-center flex-1 h-0'>
                                    <AddButton routes='FromEvents'/>
                                </View>
                            )
                        }}
                    />
                }


                <Tab.Screen name='Profile' component={Profile}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused }) => (
                            <View >
                                <Icon.Ionicons
                                    name='home'
                                    size={27}
                                    color={focused ? '#7973ED' : 'gray'}
                                />
                            </View>
                        ),
                        tabBarVisible: false,
                    }}
                />

                {/* {
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
                } */}
            </Tab.Navigator>
        </>
    )
}

export default BottomTabNavigator