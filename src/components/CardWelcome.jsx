import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import * as Animatable from "react-native-animatable";

const CardWelcome = ({ item }) => {
    const { width, height } = Dimensions.get('window');
    return (
        <View className='flex-1 justify-center items-center w-screen'>
            <View className='w-screen items-center'>
                <Animatable.Image animation='bounce' source={item.image} className='w-[80%] h-80 mb-3 rounded-2xl' resizeMode='contain' />
            </View>
            <View className='mt-12'>
                <Text className='text-3xl text-center font-semibold	dark:text-white'>{item.title}</Text>
                {/* <Text className='text-3xl text-center font-semibold	dark:text-white'>{item.title2}</Text> */}
                <Text className='mt-3 w-96 text-lg font-medium text-center dark:text-white'>{item.description}</Text>
            </View>
        </View>
    )
}

export default CardWelcome