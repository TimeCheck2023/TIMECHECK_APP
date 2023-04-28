import { View, Text, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = ({ visible, name }) => {
    const { width, height } = Dimensions.get('window');
    return (
        visible &&
        (<View className='absolute justify-center items-center z-10' style={{ height, width, backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View className='w-72 h-24 flex-row justify-center items-center bg-white rounded-xl'>
                    <ActivityIndicator size='large' color='purple' />
                    <Text className='text-lg font-bold ml-2'>Registrando como {name}</Text>
            </View>
        </View>)
    )
}

export default Loading