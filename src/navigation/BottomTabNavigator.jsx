import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Dimensions, Image, View, Animated, StyleSheet, Text } from 'react-native';
import { useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import HomeScreens from '../screens/User/Home/HomeScreens';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HomeEvent from '../components/HomeEvents/HomeEvent';
import Profiles from '../screens/User/Profile/Profiles';

const Tab = createBottomTabNavigator();

const { width } = Dimensions.get('window')


const tabs = [
    {
        name: 'Home',
        screen: HomeScreens,
        nameIcons: 'home',
        Icons: AntDesign
    },
    {
        name: 'Profiles',
        screen: Profiles,
        nIcons: 'home',
    },
    {
        name: 'HomeEvents',
        screen: HomeEvent,
        nameIcons: 'event',
        Icons: MaterialIcons
    },
]



const BottomTabNavigator = () => {

    const offset = useRef(new Animated.Value(0)).current;

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

            // initialRouteName='HomeScreens'
            >

                {tabs.map(({ name, screen, nameIcons, nIcons, Icons }, index) => {
                    return (
                        <Tab.Screen name={name} component={screen} key={index}
                            options={{
                                tabBarShowLabel: false,
                                tabBarIcon: ({ focused }) => (
                                    <View >
                                        {nIcons ?
                                            <View style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 50,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: 'white',
                                                elevation: 20,
                                                bottom: 3,
                                                shadowColor: '#6C63FF',
                                                borderColor: focused ? '#7973ED' : 'gray',
                                                borderWidth: 1,
                                            }}>
                                                <Text style={{ color: focused ? '#7973ED' : 'gray', fontSize: 25, fontWeight: 'bold' }}>{userInfo.nombre_completo_usuario.charAt(0).toUpperCase()}</Text>
                                            </View>
                                            :
                                            <Icons
                                                name={nameIcons}
                                                size={30}
                                                color={focused ? '#7973ED' : 'gray'}
                                            />
                                        }
                                    </View>
                                )
                            }}
                            listeners={{
                                focus: () => {
                                    Animated.spring(offset, {
                                        toValue: index * (width / tabs.length),
                                        useNativeDriver: true
                                    }).start()
                                }
                            }}
                        />
                    )
                })}
            </Tab.Navigator>
            <Animated.View style={[styles.indicador, {
                transform: [{
                    translateX: offset
                }]
            }]} />
        </>
    )
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    indicador: {
        position: 'absolute',
        width: 55,
        height: 2,
        bottom: 3,
        left: width / 3 / 2 - 28,
        backgroundColor: '#7973ED',
        zIndex: 100,
    }
})