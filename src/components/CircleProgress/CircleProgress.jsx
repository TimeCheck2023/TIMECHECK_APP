import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { Svg, Circle, Text as SVGText } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);


const CircleProgress = ({ data }) => {


    const radius = 40; // radius: Define el radio del círculo de progreso.
    const strokeWidth = 8; //strokeWidth: Define el ancho del trazo del círculo.
    const progress = data; // progress: Define el progreso del círculo en un valor de 0 a 100.

    const circumference = 2 * Math.PI * 70; // circumference: Calcula la longitud de la circunferencia utilizando la fórmula 2 * π * radio.
    const progressValue = (circumference * progress) / 100; // progressValue: Calcula la longitud del arco de progreso en función del progreso y la circunferencia total.

    const animatedValue = useRef(new Animated.Value(0)).current;

    const animatedStroke = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, progressValue],
    });

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: progress,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [data]);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={40 * 2} height={40 * 2}>
                <Circle
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth / 2}
                    fill="none"
                    stroke="#E0E0E0"
                    strokeWidth={strokeWidth}
                />
                <AnimatedCircle
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth / 2}
                    fill="none"
                    stroke="#FF5722"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={animatedStroke}
                />
                <SVGText
                    // style={{ position: 'absolute' }}
                    x={30}
                    y={45}
                    fill="#000"
                    textAnchor="middle"
                    fontSize={20}
                fontWeight="bold"
                alignmentBaseline="middle"
                >
                    {progress}%
                </SVGText>
            </Svg>
            <Text>Comments</Text>
        </View>

    );
}

export default CircleProgress

const styles = StyleSheet.create({})