import { View, Animated, Easing, ScrollView } from 'react-native';
import React, { useEffect, useRef } from 'react'
import * as Icon from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



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
        <View>
            <View className='relative pt-7 pb-16 pl-10 pr-10 bg-neutral-200 rounded-b-2xl'>
                <View className='flex-row justify-between items-center sm:top-7'>

                    <Animated.View className='sm:h-8 sm:w-36 rounded-2xl overflow-hidden' style={{ width: wp('50%'), height: hp('4'), opacity: opacity.current, backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />

                    <Animated.View className='rounded-full' style={{ width: wp('14%'), height: hp('8'), opacity: opacity.current, backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
                </View>

                <Animated.View className='flex-row items-center m-auto sm:top-12 lg:h-16 lg:top-3 rounded-2xl' style={{ width: wp('80'), height: hp('6'), opacity: opacity.current, backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ height: hp('8'), justifyContent: 'center' }}>
                <View className='p-4'>
                    <Animated.View className={`px-10 py-4 rounded-2xl`} style={{ width: wp('20'), height: hp('5'), backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />
                </View>
                <View className='p-4'>
                    <Animated.View className={`px-10 py-4 rounded-2xl`} style={{ width: wp('20'), height: hp('5'), backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />
                </View>
                <View className='p-4'>
                    <Animated.View className={`px-10 py-4 rounded-2xl`} style={{ width: wp('20'), height: hp('5'), backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />
                </View>
                <View className='p-4'>
                    <Animated.View className={`px-10 py-4 rounded-2xl`} style={{ width: wp('20'), height: hp('5'), backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />
                </View>
                <View className='p-4'>
                    <Animated.View className={`px-10 py-4 rounded-2xl`} style={{ width: wp('20'), height: hp('5'), backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />
                </View>
            </ScrollView>
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                <View className='justify-center items-center' style={{ top: hp('2') }}>
                    <View className='w-96 h-72 z-30 bg-neutral-200 rounded-2xl' style={{ width: wp('85'), height: hp('34') }}>
                        <Animated.View className='absolute items-center justify-center w-16 h-20 right-2 top-3 rounded-2xl' style={{ width: wp('20'), height: hp('11'), backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />

                        <Animated.View className='absolute bottom-5 left-6 right-5 rounded-2xl ' style={{ width: wp('75'), height: hp('7'), backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: opacity.current }} />
                    </View >


                    <Animated.View className='flex-1 flex-row justify-center rounded-b-2xl' style={{ width: wp('75'), height: hp('8'), opacity: opacity.current }}>
                        <View className='w-[50%] bg-neutral-300  justify-center items-center rounded-bl-lg' style={{ height: hp('8') }}>
                            <Icon.Feather name='heart' style={{ color: 'rgba(0, 0, 0, 0.2)', fontSize: wp('6') }} />
                        </View>
                        <View className='w-[50%] bg-neutral-300 justify-center items-center rounded-br-lg' >
                            <Icon.Feather name='message-circle' style={{ color: 'rgba(0, 0, 0, 0.2)', fontSize: wp('6') }} />
                        </View>
                    </Animated.View>
                </View>


                {/* <View className='p-5 my-1'>
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
                    </View> */}
            </ScrollView>
        </View>
    );
};

export default HomeSkeleton