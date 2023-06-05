import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import * as Icon from '@expo/vector-icons'

const { width } = Dimensions.get('window')

const TRANSLATE_X_THRESHOLD = -width * 0.3;

const ListItem = ({ task }) => {

    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(70);
    const marginVertical = useSharedValue(10);
    const opacity = useSharedValue(1);


    const panGesture = useAnimatedGestureHandler({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: () => {
            const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
            // const shouldBeDismissed = translateX.value > TRANSLATE_X_THRESHOLD;
            if (shouldBeDismissed) {
                translateX.value = withTiming(-width)
                itemHeight.value = withTiming(0);
                marginVertical.value = withTiming(0);
                opacity.value = withTiming(0);
            } else {
                translateX.value = withTiming(0);
            }
        },
    })

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));

    const rIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
        return { opacity }
    })

    const rTaskContainerStyle = useAnimatedStyle(() => {
        return {
          height: itemHeight.value,
          marginVertical: marginVertical.value,
          opacity: opacity.value,
        };
      });


    return (
        <Animated.View style={[styles.TaskContainer, rTaskContainerStyle]}>
            <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
                <Icon.FontAwesome5 name={'trash-alt'} size={70 * 0.4} color={'red'} />
            </Animated.View>
            <PanGestureHandler onGestureEvent={panGesture}>
                <Animated.View style={[styles.task, rStyle]}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    )
}

export default ListItem

const styles = StyleSheet.create({
    TaskContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
    },

    task: {
        width: '90%',
        height: 70,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingLeft: 20,
        borderRadius: 10,
        // shadow ios
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowRadius: 10,
        // shadow android
        elevation: 5
    },
    taskTitle: {
        fontSize: 16
    },
    iconContainer: {
        height: 70,
        width: 70,
        position: 'absolute',
        right: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})