import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, FlatList, RefreshControl, ImageBackground } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import prueba from "../../assets/eventoSena.jpg";
import * as Icon from '@expo/vector-icons';
import React, { useEffect, useState, useContext } from 'react'

import Avatar from '../../assets/Avatar.png'
import { getEvent } from '../api/api';
import BottonModals from '../components/BottonModals';
import { AuthContext } from '../context/AuthContext';

const dataPrueba = [
  { idEvento: 1, name: 'sadsadas', description: 'fsds' },
  { idEvento: 2, name: 'sadsadas', description: 'ds' },
  { idEvento: 3, name: 'sadsadas', description: 'xscsd' },
]


const HomeUser = ({ navigation }) => {

  const { logout } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [select, setSelect] = useState('All')
  const [isModals, setIsModals] = useState(false);
  const [refreshing, setRefreshing] = useState(false)

  const loadEvent = () => {
    getEvent().then((response) => {
      setData(response.data.response);
    }).catch((error) => {
      console.log(error.response);
    })
  }

  useEffect(() => {
    loadEvent();
  }, [])

  const onRefresh = async () => {
    setRefreshing(true);
    loadEvent();
    setRefreshing(false);
  }


  const filtro = select === 'All' ? data : data.filter((item) => item.tipoEvento === select)

  return (
    <View className='flex-1 bg-[#F4F5FC]'>
      <View className='pt-7 pb-16 pl-10 pr-10 bg-[#7560EE] rounded-b-2xl'>

        <View className='flex-row justify-between items-center sm:top-7'>

          <Text className='text-2xl text-white font-bold'>TIMECHECK</Text>

          <TouchableOpacity className='w-10 h-10 items-center justify-center rounded-xl bg-white' onPress={() => logout()}>
            <Icon.Ionicons name='notifications-sharp' className='text-[#7560EE]' size={18} />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => logout()}>
            <Image source={Avatar} className='w-14 h-14 rounded-full' />
          </TouchableOpacity> */}
        </View>

        <View className='flex-row items-center p-3 sm:h-12 sm:top-12 lg:h-16 lg:top-3 bg-gray-100 rounded-2xl'>
          <Icon.FontAwesome name='search' size={16} />
          <TextInput placeholder='Busca un evento...' className='flex-1 font-bold text-xl pl-3' />
        </View>
      </View>

      <View className='rounded-2xl top-3'>
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

      <View className='flex-1'>
        <FlatList
          data={filtro}
          renderItem={({ item }) => <CardEvent items={item} isModals={isModals} setIsModals={setIsModals} navigation={navigation} />}
          keyExtractor={item => item.idEvento}
          refreshControl={
            <RefreshControl
              colors={['#7560EE']}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BottonModals isModals={isModals} setIsModals={setIsModals} />
    </View >
  )
}

const CardEvent = ({ items, navigation, setIsModals, isModals }) => {
  return (
    <View className='p-5 my-1'>
      <TouchableOpacity className='w-96 h-72 z-30' onPress={() => navigation.navigate('Details', {
        items: items
      })}>
        <ImageBackground source={{ uri: items.imagenEvento }} resizeMode='contain' borderRadius={10} className='absolute top-0 bottom-0 left-0 right-0'>
          <View className='absolute items-center justify-center w-16 h-20 right-2 top-3 rounded-2xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <Text className='text-2xl font-bold text-white'>21</Text>
            <Text className='text-xl font-semibold text-white'>Dic</Text>
          </View>
          <View className='absolute p-4 bottom-5 left-2 right-2 rounded-2xl ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <Text className='text-2xl left-2 font-extrabold text-white'>{items.nombreEvento}</Text>
            <Text className='text-xl left-2 font-bold text-white'>{items.tipoEvento}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity >
      <View className=' bg-[#fff9f9] h-[75px] flex-row items-center justify-around p-3 bottom-3 left-0 right-0'>
        <TouchableOpacity className='w-[50%] bg-[#6C63FF] flex-row p-3 justify-center items-center rounded-bl-lg'>
          <Icon.Feather name='heart' size={30} className=' text-white' />
          <Text className='left-2 text-xl text-white'>Me encanta</Text>
        </TouchableOpacity>
        <TouchableOpacity className='w-[50%] flex-row p-3 justify-center items-center rounded-lg' onPress={() => setIsModals(!isModals)}>
          <Icon.Feather name='message-circle' size={30} className=' text-[#6C63FF]' />
          <Text className='left-2 text-xl text-[#6C63FF]'> Comments</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeUser