import { View, Text, Image, ActivityIndicator, Dimensions } from 'react-native'
import { StatusBar } from "expo-status-bar";
import user from "../../assets/game.png";
import * as Animatable from "react-native-animatable";
import React from 'react'

const Splash = ({ visible }) => {
    const { width, height } = Dimensions.get('window');

    return (
        visible && (
            <View className='absolute flex-col justify-center items-center z-10 bg-white' style={{ height, width }}>
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
                <ActivityIndicator size='large' color='purple' />
            </View>
        )
    )
}

export default Splash