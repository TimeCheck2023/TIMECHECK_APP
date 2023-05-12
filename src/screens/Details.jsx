import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import prueba from "../../assets/prueba.jpg";
import * as Icon from '@expo/vector-icons';

const Details = ({ navigation }) => {
  return (
    <View className='flex-1 bg-[#ffff]'>
      {/* header de image */}
      <View className='h-[350px] w-screen justify-center items-center'>
        <ImageBackground source={prueba} resizeMode='contain' borderBottomLeftRadius={30} borderBottomRightRadius={30} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View className='absolute flex-row justify-between left-0 right-0 top-12 pl-6 pr-6'>
            <TouchableOpacity className='w-12 h-12 items-center justify-center rounded-2xl'
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              onPress={() => navigation.goBack()}>
              <Icon.AntDesign name="arrowleft" size={27} color="white" />
            </TouchableOpacity>
            <View className='w-12 h-12 items-center justify-center rounded-2xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <Icon.Feather name='heart' size={27} className='p-2 text-white' />
            </View>
          </View>
        </ImageBackground>
      </View>
      <View className='absolute flex-row bg-[#DADFEA] justify-between bottom-0 h-[77px] left-0 right-0'>
        <TouchableOpacity className='w-[50%] bg-[#6C5CE7] rounded-tr-2xl items-center justify-center'>
          <Text className='text-white text-2xl font-bold'>Devolver</Text>
        </TouchableOpacity>
        <TouchableOpacity className='w-[50%] items-center justify-center'>
          <Text className='text-black text-2xl font-bold'>Devolver</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Details