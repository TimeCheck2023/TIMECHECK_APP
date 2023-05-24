import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import * as Animatable from "react-native-animatable";


const CardWelcome = ({ item }) => {
    return (
        <View className='flex-1 justify-center items-center w-screen sm:bottom-5'>
            <View className='w-screen sm:h-96 items-center'>
                <View className='sm:w-96 sm:h-80 lg:w-[620px] lg:h-[620px] sm:bottom-3 rounded-3xl lg:bottom-16 items-center justify-center'>
                    <Animatable.Image animation='bounce' duration={1500} source={item.image} className='w-full h-full rounded-3xl' resizeMode='contain' />
                </View>
            </View>
            <View className='sm:top-1 lg:bottom-1'>
                <Text className='sm:text-4xl lg:text-5xl text-center font-bold	dark:text-white'>{item.title}</Text>
                {/* <Text className='text-3xl text-center font-semibold	dark:text-white'>{item.title2}</Text> */}
                <Text className='sm:top-7 sm:w-[400px] lg:w-[700px] sm:text-[23px] lg:text-xl font-normal text-center dark:text-white'>{item.description}</Text>
            </View>
        </View>
    )
}


export default CardWelcome