import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as Animatable from "react-native-animatable";
import * as Icon from '@expo/vector-icons';
import React, { useState } from 'react'

const tabIcons = [
    { ico1: "home", ico2: "home-outline", routeName: 'Feeds' },
    { ico1: 'home', ico2: 'like2', routeName: '' },
    { ico1: "home", ico2: "plus", routeName: '' },
    { ico1: "home", ico2: 'chatbox-ellipses-outline', routeName: '' },
    { ico1: 'home', ico2: 'user-o', routeName: 'Profile' },
]

const BottomNavbar = () => {
    const [focused, setFocused] = useState('home');

    return (
        <View className='absolute left-0 right-0 h-16 bottom-3'>
            <View className='bg-purple-600 flex-1 flex-row items-center justify-around rounded-2xl' style={{
                // borderTopRightRadius: 16,
                // borderTopLeftRadius: 16,
                // marginHorizontal: 7,
            }}>
                <TouchableOpacity >
                    <Icon.AntDesign name='home' size={18} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Icon.AntDesign name='home' size={18} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.plusIconStyle}>
                    <Icon.AntDesign name='home' size={18} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Icon.AntDesign name='home' size={18} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Icon.AntDesign name='home' size={18} />
                </TouchableOpacity>

                {/* {tabIcons.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[index === 2 && styles.plusIconStyle]}
                    >
                        <Icon.AntDesign name={item.ico1} size={index === 2 && 34} />
                    </TouchableOpacity>
                ))} */}
            </View>
        </View>
    )
}

export default BottomNavbar

const styles = StyleSheet.create({
    plusIconStyle: {
        bottom: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.6,
        elevation: 8,
        borderWidth: 4,
        borderColor: 'black',
    },
})