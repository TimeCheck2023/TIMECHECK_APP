import { View, Text } from 'react-native'
import React from 'react'
import BottomNavbar from '../../components/BottomNavbar'

const Home = () => {
    return (
        <View className='flex-1 justify-center items-center bg-black'>
            <Text className='text-white'>Home</Text>
            <BottomNavbar />

        </View>
    )
}

export default Home