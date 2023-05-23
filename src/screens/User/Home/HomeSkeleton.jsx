import { View, Animated, Easing, ScrollView } from 'react-native';
import React, { useEffect, useRef } from 'react'
import * as Icon from '@expo/vector-icons';


const HomeSkeleton = () => {
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
                <View className='flex-row justify-between items-center sm:top-7'>

                    <Animated.View className='sm:h-8 sm:w-36 rounded-2xl overflow-hidden' style={{ opacity: opacity.current, backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />

                    <Animated.View className='w-14 h-14 rounded-full' style={{ opacity: opacity.current, backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
                </View>

                <Animated.View className='flex-row items-center p-3 sm:h-10 sm:top-12 lg:h-16 lg:top-3 rounded-2xl' style={{ opacity: opacity.current, backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className='p-5'>
                    <Animated.View className={`px-10 py-4 rounded-2xl`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }}/>
                </View>
                <View className='p-5'>
                    <Animated.View className={`px-10 py-4 rounded-2xl`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }}/>
                </View>
                <View className='p-5'>
                    <Animated.View className={`px-10 py-4 rounded-2xl`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }}/>
                </View>
                <View className='p-5'>
                    <Animated.View className={`px-10 py-4 rounded-2xl`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }}/>
                </View>
                <View className='p-5'>
                    <Animated.View className={`px-10 py-4 rounded-2xl`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }}/>
                </View>
            </ScrollView>
            <ScrollView>
                <View className='p-5 my-1'>
                    <View className='w-96 h-72 z-30 bg-neutral-200 rounded-2xl'>
                        <Animated.View className='absolute items-center justify-center w-16 h-20 right-2 top-3 rounded-2xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />

                        <Animated.View className='absolute h-12 bottom-5 left-2 right-2 rounded-2xl ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />
                    </View >


                    <Animated.View className='h-[75px] flex-row items-center justify-around p-3 bottom-3 left-0 right-0' style={{ opacity: opacity.current }}>
                        <View className='w-[50%] bg-neutral-300  flex-row p-3 justify-center items-center rounded-bl-lg' >
                            <Icon.Feather name='heart' size={30} style={{ color: 'rgba(0, 0, 0, 0.2)' }} />
                        </View>
                        <View className='w-[50%] bg-neutral-300 flex-row p-3 justify-center items-center rounded-lg' >
                            <Icon.Feather name='message-circle' size={30} style={{ color: 'rgba(0, 0, 0, 0.2)' }} />
                        </View>
                    </Animated.View>
                </View>
                <View className='p-5 my-1'>
                    <View className='w-96 h-72 z-30 bg-neutral-200 rounded-2xl'>
                        <Animated.View className='absolute items-center justify-center w-16 h-20 right-2 top-3 rounded-2xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />

                        <Animated.View className='absolute h-12 bottom-5 left-2 right-2 rounded-2xl ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />
                    </View >


                    <Animated.View className='h-[75px] flex-row items-center justify-around p-3 bottom-3 left-0 right-0' style={{ opacity: opacity.current }}>
                        <View className='w-[50%] bg-neutral-300  flex-row p-3 justify-center items-center rounded-bl-lg' >
                            <Icon.Feather name='heart' size={30} style={{ color: 'rgba(0, 0, 0, 0.2)' }} />
                        </View>
                        <View className='w-[50%] bg-neutral-300 flex-row p-3 justify-center items-center rounded-lg' >
                            <Icon.Feather name='message-circle' size={30} style={{ color: 'rgba(0, 0, 0, 0.2)' }} />
                        </View>
                    </Animated.View>
                </View>
                <View className='p-5 my-1'>
                    <View className='w-96 h-72 z-30 bg-neutral-200 rounded-2xl'>
                        <Animated.View className='absolute items-center justify-center w-16 h-20 right-2 top-3 rounded-2xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />

                        <Animated.View className='absolute h-12 bottom-5 left-2 right-2 rounded-2xl ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />
                    </View >
                    <Animated.View className='h-[75px] flex-row items-center justify-around p-3 bottom-3 left-0 right-0' style={{ opacity: opacity.current }}>
                        <View className='w-[50%] bg-neutral-300  flex-row p-3 justify-center items-center rounded-bl-lg' >
                            <Icon.Feather name='heart' size={30} style={{ color: 'rgba(0, 0, 0, 0.2)' }} />
                        </View>
                        <View className='w-[50%] bg-neutral-300 flex-row p-3 justify-center items-center rounded-lg' >
                            <Icon.Feather name='message-circle' size={30} style={{ color: 'rgba(0, 0, 0, 0.2)' }} />
                        </View>
                    </Animated.View>
                </View>
                <View className='p-5 my-1'>
                    <View className='w-96 h-72 z-30 bg-neutral-200 rounded-2xl'>
                        <Animated.View className='absolute items-center justify-center w-16 h-20 right-2 top-3 rounded-2xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />

                        <Animated.View className='absolute h-12 bottom-5 left-2 right-2 rounded-2xl ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />
                    </View >


                    <Animated.View className='h-[75px] flex-row items-center justify-around p-3 bottom-3 left-0 right-0' style={{ opacity: opacity.current }}>
                        <View className='w-[50%] bg-neutral-300  flex-row p-3 justify-center items-center rounded-bl-lg' >
                            <Icon.Feather name='heart' size={30} style={{ color: 'rgba(0, 0, 0, 0.2)' }} />
                        </View>
                        <View className='w-[50%] bg-neutral-300 flex-row p-3 justify-center items-center rounded-lg' >
                            <Icon.Feather name='message-circle' size={30} style={{ color: 'rgba(0, 0, 0, 0.2)' }} />
                        </View>
                    </Animated.View>
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeSkeleton