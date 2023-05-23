import { View, Text, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

const ProfileSkeleton = () => {
    const opacity = useRef(new Animated.Value(0.3));

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity.current, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 500
                }),
                Animated.timing(opacity.current, {
                    toValue: 0.,
                    useNativeDriver: true,
                    duration: 800
                })
            ])
        ).start();
    }, [opacity]);

    return (
        <View className='flex-1'>
            <View className='relative pt-7 pb-16 pl-10 pr-10 bg-neutral-200 rounded-b-2xl'>
                <Animated.View className='absolute w-[45px] h-[45px] left-4 top-10 items-center justify-center rounded-2xl'
                    style={{ opacity: opacity.current, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                />
                <View className='items-center justify-center top-9'>
                    <Animated.View className='sm:w-[130px] sm:h-[130px] rounded-full shadow-purple-400' style={{ opacity: opacity.current, backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
                </View>
            </View>
            <View className='flex-1 h-full p-4 w-full space-y-4 mt-7'>
                <Animated.View className='flex-row h-16 items-center bg-[#E7E7E7] rounded-xl' style={{ opacity: opacity.current, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}/>
                <Animated.View className='flex-row h-16 items-center bg-[#E7E7E7] rounded-xl' style={{ opacity: opacity.current, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}/>
                <Animated.View className='flex-row h-16 items-center bg-[#E7E7E7] rounded-xl' style={{ opacity: opacity.current, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}/>
                <Animated.View className='flex-row h-16 items-center bg-[#E7E7E7] rounded-xl' style={{ opacity: opacity.current, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}/>
                <Animated.View className='flex-row h-16 items-center bg-[#E7E7E7] rounded-xl' style={{ opacity: opacity.current, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}/>
                <Animated.View className='flex-row h-16 items-center bg-[#E7E7E7] rounded-xl' style={{ opacity: opacity.current, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}/>
            </View>
        </View>
    )
}

export default ProfileSkeleton