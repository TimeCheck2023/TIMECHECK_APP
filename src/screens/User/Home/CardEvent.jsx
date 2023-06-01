import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import * as Icon from '@expo/vector-icons';
import React, { useEffect, useState, useContext, useRef } from 'react'
import moment from 'moment';



const CardEvent = ({ items, navigation, setIsModals, openBottomSheet, handleEventPress }) => {

  return (
    <View className='p-5 my-1' style={{ flex: 1 }}>
      <TouchableOpacity className='w-96 h-72 z-30' onPress={() => navigation.navigate('Details', {
        items: items
      })}>
        <ImageBackground source={{ uri: items.imagenEvento }} resizeMode='cover' borderRadius={10} className='absolute top-0 bottom-0 left-0 right-0'>
          <View className='absolute items-center justify-center w-16 h-20 right-2 top-3 rounded-2xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <Text className='text-2xl font-bold text-white'>{moment(items.fechaInicioEvento).format('DD')}</Text>
            <Text className='text-xl font-semibold text-white'>{moment(items.fechaInicioEvento).format('MMM')}</Text>
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
        <TouchableOpacity className='w-[50%] flex-row p-3 justify-center items-center rounded-lg' onPress={() => { openBottomSheet(items.idEvento) }}>
          <Icon.Feather name='message-circle' size={30} className=' text-[#6C63FF]' />
          <Text className='left-2 text-xl text-[#6C63FF]'> Comments</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CardEvent

const styles = StyleSheet.create({
  card: {
    height: 220,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13
  }
})