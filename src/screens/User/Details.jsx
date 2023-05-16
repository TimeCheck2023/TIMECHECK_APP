import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import sena from "../../../assets/eventoSena.jpg";
import prueba from "../../../assets/eventoSena.jpg";
import * as Icon from '@expo/vector-icons';

const Details = ({ navigation, route }) => {

  const [prueba, setPrueba] = useState(false)

  const { items } = route.params;

  return (
    <SafeAreaView className='flex-1 items-center bg-[#ffff]'>
      {/* tipo de eventos y devolver */}
      <View className=' w-screen flex-row items-center justify-center'>
        <TouchableOpacity className='absolute w-[45px] h-[45px] left-4  items-center justify-center rounded-2xl'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onPress={() => navigation.goBack()}>
          <Icon.AntDesign name="arrowleft" size={27} color="white" />
        </TouchableOpacity>
        <Text className='text-2xl font-medium text-black '>{items.tipoEvento}</Text>
      </View>

      {/* header de image */}
      <View className=' h-[270px] w-[360px] justify-center items-center top-5'>
        <ImageBackground source={{ uri: items.imagenEvento }} resizeMode='contain' borderRadius={30} borderBottomRightRadius={30} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View className='absolute w-12 h-11 flex-row items-center justify-evenly right-4 top-4 rounded-2xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Icon.Feather name='heart' size={20} className='text-white' />
            <Text className='text-base text-white'>0</Text>
          </View>
        </ImageBackground>
      </View>

      <View className='flex-1 p-4 mt-10 w-screen'>
        <Text className='text-3xl  font-extrabold text-black' >{items.nombreEvento}</Text>
        <Text className='text-base text-justify font-normal text-black top-2'>{items.descripcionEvento}</Text>
      </View>
      <View className='absolute flex-1 flex-row gap-2 left-0 right-0 justify-center items-center bottom-5'>
        <TouchableOpacity className='sm:w-14 sm:h-14 items-center justify-center rounded-xl bg-[#6C5CE7]'>
          <Icon.Feather name='share-2' className='text-white' size={18} />
        </TouchableOpacity>
        <TouchableOpacity className=' sm:w-56 sm:h-14 bg-[#6C5CE7]  rounded-2xl items-center justify-center' onPress={() => setPrueba(!prueba)}>
          {
            prueba ?
              <Text className='text-white text-lg font-bold'>cancelar asistencia</Text>
              :
              <Text className='text-white text-lg font-bold'>asistencia</Text>
          }

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Details