import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { light, sizes } from '../../constants/theme';
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const ContainerImage = ({ navigation, route }) => {

    const { image } = route.params

    const escaleImg = useSharedValue(1)
    const focusX = useSharedValue(0)
    const focusy = useSharedValue(0)

    const pinchazoDePantalla = Gesture.Pinch()
        .onStart((e) => {
            focusX.value = e.focalX;
            focusy.value = e.focalY;
        })
        .onUpdate((e) => {
            escaleImg.value = e.scale
        }).onEnd(() => {
            escaleImg.value = withTiming(1, { duration: 300 })
        })

    const centoImage = {
        x: sizes.width / 2,
        y: sizes.width / 2,
    }

    const estiloAnimato = useAnimatedStyle(() => ({
        transform: [
            { translateX: focusX.value },
            { translateY: focusy.value },
            { translateX: -centoImage.x },
            { translateY: -centoImage.y },
            { scale: escaleImg.value },
            { translateX: -focusX.value },
            { translateY: -focusy.value },
            { translateX: centoImage.x },
            { translateY: centoImage.y },
        ]
    }))

    return (
        <View style={styles.container}>
            <GestureHandlerRootView>
                <GestureDetector gesture={pinchazoDePantalla}>
                    <Animated.Image style={[styles.img, estiloAnimato]} source={{ uri: image }} />
                </GestureDetector>
            </GestureHandlerRootView>
        </View>
    )
}

export default ContainerImage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: light.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: sizes.width,
        height: sizes.width,
        resizeMode: 'contain'
    }
})