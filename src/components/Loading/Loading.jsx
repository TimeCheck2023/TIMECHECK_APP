import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

const Loading = ({ isLoadings }) => {


    const animations = useRef({
        one: new Animated.Value(0),
        two: new Animated.Value(0),
        three: new Animated.Value(0),
    }).current;

    const onAnimation = (animation, nextAnimation) => {
        Animated.sequence([
            Animated.timing(animation, {
                toValue: -10,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(animation, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start()
        setTimeout(nextAnimation, 200)
    }


    const onSaterAnimation = () => {
        const onThreeAnimation = () => {
            onAnimation(animations.three, () => {
                setTimeout(onSaterAnimation, 800)
            });
        }
        const onTwoAnimation = () => {
            onAnimation(animations.two, onThreeAnimation);
        }
        onAnimation(animations.one, onTwoAnimation);
    }

    useEffect(() => {
        onSaterAnimation();
    }, [isLoadings])

    return (
        <View style={styles.containerLoading}>
            <Animated.View style={[styles.Ball, { transform: [{ translateY: animations.one }] }]} />
            <Animated.View style={[styles.Ball, { transform: [{ translateY: animations.two }] }]} />
            <Animated.View style={[styles.Ball, { transform: [{ translateY: animations.three }] }]} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    containerLoading: {
        height: 40,
        width: '35%',
        paddingHorizontal: 50,
        top: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    Ball: {
        width: 11,
        height: 11,
        backgroundColor: '#7560EE',
        borderRadius: 7,
    }
})