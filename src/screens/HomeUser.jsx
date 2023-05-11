import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import prueba from "../../assets/prueba.jpg";
import * as Icon from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'

import Avatar from '../../assets/Avatar.png'
import { getEvent } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeUser = ({ navigation }) => {

  const [data, setData] = useState([])
  const [select, setSelect] = useState('All')

  useEffect(() => {
    getEvent().then((response) => {
      setData(response.data.response);
    }).catch((error) => {
      console.log(error.response);
    })
  }, [])

  const navegar = async() => {
    await AsyncStorage.removeItem('token')
  }

  const filtro = select === 'All' ? data : data.filter((item) => item.tipoEvento === select)

  return (
    <View className='flex-1 bg-[#F4F5FC]'>
      <View className='pt-7 pb-16 pl-10 pr-10 bg-[#7560EE] rounded-b-2xl'>
        <View className='flex-row justify-between items-center sm:top-7'>
          <Text className='text-2xl text-white font-bold'>TIMECHECK</Text>
          <TouchableOpacity onPress={navegar}>
            <Image source={Avatar} className='w-14 h-14 rounded-full' />
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center p-3 sm:h-11 sm:top-12 lg:h-16 lg:top-3 bg-gray-300 rounded-2xl'>
          <Icon.FontAwesome name='search' size={16} />
          <TextInput placeholder='Busca un evento...' className='flex-1 font-bold text-xl pl-3' />
        </View>
      </View>
      <View className=' rounded-2xl top-1'>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => setSelect('All')} className='p-2'>
            <Text className={`px-4 py-3 rounded-2xl text-black ${select === 'All' ? 'bg-slate-500 text-white' : 'bg-[#7560EE] text-white'}`}>All</Text>
          </TouchableOpacity>
          {
            data.map((dat, index) => (
              <TouchableOpacity onPress={() => setSelect(dat.tipoEvento)} key={index} className='p-2'>
                <Text className={`px-4 py-3 rounded-2xl text-black ${select === dat.tipoEvento ? 'bg-slate-400 text-white' : 'bg-[#7560EE] text-white'}`}>{dat.tipoEvento}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>

      <FlatList
        data={filtro}
        renderItem={({ item }) => <CardEvent items={item} />}
        keyExtractor={item => item.idEvento}
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      />

    </View >
  )
}

const CardEvent = ({ items }) => {
  return (
    <View className='w-96 h-96 p-5 my-5'>
      <ImageBackground source={prueba} resizeMode='contain' borderRadius={10} className='absolute top-0 bottom-0 left-0 right-0'>
        <View className='absolute items-center justify-center w-16 h-20 left-2 top-3 rounded-2xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <Text className='text-2xl font-bold text-white'>21</Text>
          <Text className='text-xl font-semibold text-white'>Dic</Text>
        </View>

        <View className='absolute p-5 bottom-5 left-2 right-2 rounded-2xl ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <Text className='text-3xl left-2 font-extrabold text-white'>Glawing Art Perfomance</Text>
          <Text className='text-2xl left-2 font-bold text-white'>Deportes</Text>
        </View>

        <View className='absolute flex-row justify-between w-12 h-12 items-center top-3 right-2 rounded-2xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <Icon.Feather name='heart' size={30} className='p-2 text-white' />
          {/* <Icon.Feather name='message-circle' size={30} className='p-2 text-[#6C63FF]' /> */}
        </View>
      </ImageBackground>
    </View>
  )
}

export default HomeUser