import { View, Text, TouchableOpacity } from 'react-native'
import * as Icon from '@expo/vector-icons';
import React from 'react'

const Notification = () => {
    return (
        <View className='flex-1 bg-[#E8EAED]'>
            <View style={{ paddingTop: 80, paddingHorizontal: 20 }}>
                <Text className='text-2xl font-bold'>Notification</Text>
                <View style={{ marginTop: 30 }}>
                    <View className='bg-white rounded-2xl flex-row items-center justify-between' style={{ padding: 20, marginBottom: 20 }}>
                        <View className='flex-row items-center flex-wrap'>
                            <View className='bg-[#55BCF6] rounded-xl' style={{ width: 40, height: 40, opacity: 0.4, marginRight: 15 }}>

                            </View>
                            <Text className='text-xl font-bold'>Danielaldana212@gmail.com</Text>
                        </View>
                        <View className='flex-row  space-x-4 absolute right-5'>
                          <TouchableOpacity className='sm:w-[40px] sm:h-[40px] bg-slate-300 items-center justify-center rounded-lg'>
                            <Icon.Feather name='check-circle' size={23} color='#7560EE'/>
                          </TouchableOpacity>
                          <TouchableOpacity className='sm:w-[40px] sm:h-[40px] bg-slate-300 items-center justify-center rounded-lg'>
                            <Icon.Feather name='trash-2' size={23} color='#7560EE'/>
                          </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Notification