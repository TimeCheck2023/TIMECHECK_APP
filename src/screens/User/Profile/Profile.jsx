import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as Icon from '@expo/vector-icons';
import avatar from '../../../../assets/Avatar.png'
import { AuthContext } from '../../../context/AuthContext';
import { getUserId } from '../../../api/api';
import Splash from '../../../components/Splash';
import { useFocusEffect } from '@react-navigation/native';
import ProfileSkeleton from './ProfileSkeleton';

const Profile = ({ navigation }) => {
    const { logout, userInfo } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({})

    const getUser = async () => {
        setIsLoading(true)
        await getUserId(userInfo.nro_documento_usuario)
            .then((response) => {
                setUser(response.data.message)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err);
                setIsLoading(false)
            })
    }

    // useEffect(() => {
    //     getUser();
    // }, [])

    useFocusEffect(
        React.useCallback(() => {
            getUser();
        }, []),
    );

    return (
        <View className='flex-1 bg-white'>
            {
                isLoading ?
                    <ProfileSkeleton />
                    :
                    <ScrollView
                    >
                        <View className='pt-7 pb-16 pl-10 pr-10 bg-[#7560EE] rounded-b-2xl'>
                            <TouchableOpacity className='absolute w-[45px] h-[45px] left-4 top-10 items-center justify-center rounded-2xl'
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                onPress={() => navigation.goBack()}>
                                <Icon.AntDesign name="arrowleft" size={27} color="white" />
                            </TouchableOpacity>
                            <View className='items-center justify-center top-9'>
                                <View className='sm:w-[130px] sm:h-[130px] rounded-full shadow-purple-400'>
                                    <Image source={avatar} className='w-[100%] h-[100%] rounded-full' />
                                </View>
                                <Text className='text-2xl text-white font-bold mt-3'>{user.correo_usuario}</Text>
                                <Text className='text-xl text-white font-medium mt-2'>{user.nro_documento_usuario}</Text>
                            </View>
                        </View>
                        <View className='flex-1 h-full p-4 w-full space-y-4 mt-7'>

                            <View className='flex-row h-16 items-center bg-[#E7E7E7] rounded-xl'>
                                <View className='h-12 w-12 left-2 items-center justify-center bg-[#7560EE] rounded-xl'>
                                    <Icon.Entypo name="emoji-happy" size={25} color="white" />
                                </View>
                                <Text className='text-2xl text-black font-bold left-11'>Eventos asistidos</Text>
                                <Text className='absolute right-8 text-2xl font-medium text-[#7560EE]'>{user.confirmados}</Text>
                            </View>

                            <View className='flex-row h-16 items-center bg-[#E7E7E7] rounded-xl'>
                                <View className='h-12 w-12 left-2 items-center justify-center bg-[#7560EE] rounded-xl'>
                                    <Icon.Entypo name="emoji-sad" size={25} color="white" />
                                </View>
                                <Text className='text-2xl text-black font-bold left-11'>Eventos no asistidos</Text>
                                <Text className='absolute right-8 text-2xl font-medium text-[#7560EE]'>{user.pendientes}</Text>
                            </View>

                            <View className='flex-row h-16 items-center bg-[#E7E7E7] rounded-xl'>
                                <View className='h-12 w-12 left-2 items-center justify-center bg-[#7560EE] rounded-xl'>
                                    <Icon.Entypo name="emoji-neutral" size={25} color="white" />
                                </View>
                                <Text className='text-2xl text-black font-bold left-11'>Eventos pendientes</Text>
                                <Text className='absolute right-8 text-2xl font-medium text-[#7560EE]'>{user.pendientes}</Text>
                            </View>

                            <TouchableOpacity className='flex-row h-16 items-center bg-[#E7E7E7] rounded-xl'
                                onPress={() => navigation.navigate('FormUpdateUSer', {
                                    data: user
                                })}>
                                <View className='h-12 w-12 left-2 items-center justify-center bg-[#7560EE] rounded-xl'>
                                    <Icon.AntDesign name="form" size={25} color="white" />
                                </View>
                                <Text className='text-2xl text-black font-bold left-9'>Edit</Text>
                                <Icon.AntDesign name="right" size={27} className='absolute right-5 text-[#7560EE]' />
                            </TouchableOpacity>
                            <TouchableOpacity className='flex-row h-16 items-center bg-[#E7E7E7] rounded-xl'>
                                <View className='h-12 w-12 left-2 items-center justify-center bg-[#7560EE] rounded-xl'>
                                    <Icon.AntDesign name="unlock" size={25} color="white" />
                                </View>
                                <Text className='text-2xl text-black font-bold left-9'>Password</Text>
                                <Icon.AntDesign name="right" size={27} className='absolute right-5 text-[#7560EE]' />
                            </TouchableOpacity>
                            <TouchableOpacity className='flex-row h-16 items-center bg-[#E7E7E7] rounded-xl' onPress={() => logout()}>
                                <View className='h-12 w-12 left-2 items-center justify-center bg-[#7560EE] rounded-xl'>
                                    <Icon.Entypo name="log-out" size={25} color="white" />
                                </View>
                                <Text className='text-2xl text-black font-bold left-9'>Sing out</Text>
                                <Icon.AntDesign name="right" size={27} className='absolute right-5 text-[#7560EE]' />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
            }
        </View>
    )
}

export default Profile