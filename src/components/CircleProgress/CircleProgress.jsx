import React, { useRef, useEffect } from 'react';
import { Text } from 'react-native';
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import { Svg, Circle, Text as SvgText } from 'react-native-svg';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);


const CircleProgress = ({ value, label, colorText, colorProgress }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const circleRef = useRef();

    const radius = 30; // Radio del círculo
    const strokeWidth = 5; // Grosor del trazo

    const circumference = 2 * Math.PI * radius; // Circunferencia del círculo

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: value,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [value]);

    const animatedStrokeDashoffset = animatedValue.interpolate({
        inputRange: [0, value + 20],
        outputRange: [circumference, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <Svg width={radius * 2 + strokeWidth * 2} height={radius * 2 + strokeWidth * 2}>
                <Circle
                    ref={circleRef}
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                    r={radius}
                    fill="transparent"
                    stroke="#E5E5E5"
                    strokeWidth={7}
                />
                <AnimatedCircle
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                    r={radius}
                    fill="transparent"
                    stroke={colorProgress}
                    strokeWidth={7}
                    strokeDasharray={circumference}
                    strokeDashoffset={animatedStrokeDashoffset}
                />
                <SvgText
                    x={radius + strokeWidth}
                    y={radius + strokeWidth + 6}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight="bold"
                    fill={colorText} s
                >
                    {`${Math.round(value)}%`}
                </SvgText>
            </Svg>
            {
                label &&
                <Text style={{
                    fontSize: 20,
                    fontWeight: "600",
                    paddingVertical: 5
                }}>{label}</Text>
            }
        </View>
    );
}


export default CircleProgress

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});