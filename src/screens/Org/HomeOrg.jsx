import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { VictoryChart, VictoryBar, VictoryTheme } from 'victory-native'
import {Card} from 'react-native-paper'

const HomeOrg = () => {
  const { logout } = useContext(AuthContext)
  return (
    <View className='flex-1 justify-center items-center bg-slate-100'>
      <Card elevation={5}>
        <Text>Sena</Text>
      </Card>
    </View>
  )
}

export default HomeOrg