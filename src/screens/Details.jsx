import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import prueba from "../../assets/eventoSena.jpg";
import * as Icon from '@expo/vector-icons';

const Details = ({ navigation }) => {
  return (
    <SafeAreaView className='flex-1 items-center bg-[#ffff]'>
      {/* header de image */}
      <View className=' w-screen flex-row items-center justify-center'>
        <TouchableOpacity className='absolute w-[45px] h-[45px] left-4  items-center justify-center rounded-2xl'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onPress={() => navigation.goBack()}>
          <Icon.AntDesign name="arrowleft" size={27} color="white" />
        </TouchableOpacity>
        <Text className='text-2xl font-medium text-black '>Deportes</Text>
      </View>

      <View className=' h-[270px] w-[360px] justify-center items-center top-5'>
        <ImageBackground source={prueba} resizeMode='contain' borderRadius={30} borderBottomRightRadius={30} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View className='absolute w-12 h-11 flex-row items-center justify-evenly right-4 top-4 rounded-2xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Icon.Feather name='heart' size={20} className='text-white' />
            <Text className='text-base text-white'>0</Text>
          </View>
        </ImageBackground>
      </View>


      <View className='p-4 top-6'>
        <Text className='text-3xl  font-extrabold text-black' >Glawing Art Perfomance</Text>
        <Text className='text-base text-justify font-normal text-black top-2'>Como iridium inicio su plan de negocios, inicialmente compraron 15 coches a Rusia,  usa, China donde seguido puso en orbita 72 satélites privados donde operadan como torres de telefonía de 500 millas de altura la cual permitía una comunicación a todo el mundo, siete años después los satélites seguian en orbita</Text>

      </View>
      <View className='absolute flex-1 left-0 right-0 justify-center items-center bottom-5'>
        <TouchableOpacity className=' sm:w-56 sm:h-14 bg-[#6C5CE7]  rounded-2xl items-center justify-center'>
          <Text className='text-white text-lg font-bold'>cancelar asistencia</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Details