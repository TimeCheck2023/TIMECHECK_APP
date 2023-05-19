import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const HomeOrg = ({items}) => {
  const { logout } = useContext(AuthContext)
  return (
    <View className='flex-1 justify-center items-center bg-slate-100'>
      <TouchableOpacity className='w-96 h-72 z-30'>
        <View className='w-80 h-72 z-30 border-solid rounded-md bg-purple-500 opacity-70 bg-opacity-50'>
          <Text className='text-slate-950 text-center text-2xl font-bold'>Sena</Text>
          <Text className='text-slate-950'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga assumenda voluptatum enim, consequuntur nihil autem esse asperiores error distinctio consequatur sit dolor quia suscipit, quo a exercitationem accusantium beatae recusandae!</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default HomeOrg