import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const HomeOrg = () => {
  const { logout } = useContext(AuthContext)
  return (
    <View className='flex-1 justify-center items-center bg-slate-500'>
      <Text>HomeOrg</Text>
    </View>
  )
}

export default HomeOrg