import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AddButtonOrg = () => {
    const [icons_1] = useState(new Animated.Value(0))
    const [icons_2] = useState(new Animated.Value(0))
    const [icons_3] = useState(new Animated.Value(0))

    const navigation = useNavigation();

    const [pop, setPop] = useState(false)

    const popIn = () => {
        setPop(true)
        Animated.timing(icons_1, {
            toValue: 95,
            duration: 500,
            useNativeDriver: false
        }).start()
        Animated.timing(icons_2, {
            toValue: 60,
            duration: 500,
            useNativeDriver: false
        }).start()
        Animated.timing(icons_3, {
            toValue: 60,
            duration: 500,
            useNativeDriver: false
        }).start()
    }
    const popOut = () => {
        setPop(false)
        Animated.timing(icons_1, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start()
        Animated.timing(icons_2, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start()
        Animated.timing(icons_3, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start()
    }

    return (
        <View className='relative items-center h-12 w-16 '>
            <Animated.View className='absolute bg-[#7560EE] w-16 h-16 rounded-full items-center justify-center' style={{ bottom: icons_1 }}>
                <TouchableOpacity onPress={() => navigation.navigate('FormSubOrg')}>
                    <Ionicons
                        name='add-sharp'
                        size={35}
                        color='white'
                    />
                </TouchableOpacity>
            </Animated.View>
            {/* <Animated.View className='absolute bg-[#7560EE] w-16 h-16 rounded-full  items-center justify-center' style={{ left: icons_2, bottom: icons_2 }}>
                <TouchableOpacity >
                    <Ionicons
                        name='alarm'
                        size={35}
                        color='white'
                    />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View className='absolute bg-[#7560EE] w-16 h-16 rounded-full items-center justify-center' style={{ right: icons_3, bottom: icons_3 }}>
                <TouchableOpacity >
                    <Ionicons
                        name='archive'
                        size={35}
                        color='white'
                    />
                </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity className='absolute bg-[#7560EE] w-16 h-16 rounded-full bottom-0 items-center justify-center'
                onPress={() => {
                    pop === false ? popIn() : popOut();
                }}
            >
                <Ionicons
                    name='filter'
                    size={35}
                    color='white'
                />
            </TouchableOpacity> */}
        </View>
    )
}

export default AddButtonOrg