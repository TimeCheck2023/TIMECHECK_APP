import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import * as Animatable from "react-native-animatable";

const CardWelcome = ({ item }) => {
    return (
        <View className='flex-1 justify-center items-center w-screen'>
            <View className='w-screen sm:h-96 items-center'>
                <View className='w-[80%] h-80 lg:w-[620px] lg:h-[620px] sm:mb-3 lg:bottom-16 rounded-full items-center justify-center'>
                    <Animatable.Image animation='bounce' duration={1500} source={item.image} className='w-full h-full rounded-full' resizeMode='contain' />
                </View>
            </View>
            <View className='sm:top-1 lg:bottom-2'>
                <Text className='sm:text-4xl lg:text-5xl text-center font-bold	dark:text-white'>{item.title}</Text>
                {/* <Text className='text-3xl text-center font-semibold	dark:text-white'>{item.title2}</Text> */}
                <Text className='sm:top-3 sm:w-80 lg:w-[700px] sm:text-[17px] lg:text-4xl font-normal text-center dark:text-white'>{item.description}</Text>
            </View>
        </View>
    )
}

export default CardWelcome