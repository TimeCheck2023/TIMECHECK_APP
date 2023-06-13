import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dimensions, Image, View, Animated, StyleSheet, Text } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useContext, useRef } from 'react';
import UserMiembro from '../../screens/Org/UserMiembro/UserMiembro';
import HomeEventSuborg from '../../screens/Org/HomeEventSuborg/HomeEventSuborg';

const Tab = createBottomTabNavigator();

const { width } = Dimensions.get('window')


const tabs = [
    {
        name: 'HomeEventSuborg',
        Screen: HomeEventSuborg,
        nameIcons: 'home',
        Icons: AntDesign
    },
    {
        name: 'UserMiembro',
        Screen: UserMiembro,
        nameIcons: 'user',
        Icons: AntDesign
    },
]



const BottomTabNavigator = ({ route }) => {

    const offset = useRef(new Animated.Value(0)).current;
    const { id } = route.params;



    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        height: hp('7.2'),
                    },
                    show: true,
                }}
            >

                {tabs.map(({ name, Screen, nameIcons, nIcons, Icons }, index) => {
                    return (
                        <Tab.Screen name={name} component={Screen} initialParams={{ parametro: id }} key={index}
                            options={{
                                tabBarShowLabel: false,
                                tabBarIcon: ({ focused }) => (
                                    <View >
                                        <Icons
                                            name={nameIcons}
                                            size={30}
                                            color={focused ? '#7973ED' : 'gray'}
                                        />
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
        width: 60,
        height: 2,
        bottom: 3,
        left: width / 6 / 2 + 40,
        backgroundColor: '#7973ED',
        zIndex: 100,
    }
})