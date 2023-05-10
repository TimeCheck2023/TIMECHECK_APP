import { View, Text, Image, ActivityIndicator, Dimensions } from 'react-native'
import { StatusBar } from "expo-status-bar";
import user from "../../assets/game.png";
import * as Animatable from "react-native-animatable";
import React from 'react'

const Splash = ({ visible }) => {
    const { width, height } = Dimensions.get('window');

    return (
        visible && (
            <View className='absolute flex-col left-0 right-0 bottom-0 top-0 justify-center items-center z-10 bg-[#6C5CE7]'>
                <StatusBar translucent backgroundColor='rgba(0,0,0,0.2)' />
                <Animatable.Image animation='pulse'
                    easing='ease-out'
                    iterationCount='infinite'
                    style={{
                        width: 200,
                        height: 200,
                        margin: 100
                    }}
                    source={user} />
                <ActivityIndicator  color='white' />
            </View>
        )
    )
}

export default Splash