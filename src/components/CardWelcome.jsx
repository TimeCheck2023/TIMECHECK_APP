import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import * as Animatable from "react-native-animatable";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const CardWelcome = ({ item }) => {
    return (
        <View className='flex-1 items-center w-screen' style={{top: hp('10%')}}>
            {/* <View className='w-screen sm:h-96  bg-slate-500' style={{width: wp('100%')}}> */}
                <View className='rounded-3xl items-center justify-center' style={{width: wp('90%'), height: hp('40%')}}>
                    <Animatable.Image animation='bounce' duration={1500} source={item.image} className='w-full h-full rounded-3xl' resizeMode='contain' />
                </View>
            {/* </View> */}
            <View className=''>
                <Text className='text-center font-bold	dark:text-white' style={{fontSize: hp('3.5%'), marginTop: hp('5%')}}>{item.title}</Text>
                {/* <Text className='text-3xl text-center font-semibold	dark:text-white'>{item.title2}</Text> */}
                <Text className='text-justify dark:text-white' style={{ width: wp('92%') ,fontSize: hp('2.3%'), marginTop: hp('1%') }}>{item.description}</Text>
            </View>
        </View>
    )
}


export default CardWelcome