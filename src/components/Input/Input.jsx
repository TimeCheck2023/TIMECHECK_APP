import { View, Text, TextInput, StyleSheet, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import * as Icon from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { light, sizes, spacing } from '../../constants/theme';


const Input = ({ placeholder, label, iconName, password, ...props }) => {

  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);
  const animatedBorderWidth = useRef(new Animated.Value(0)).current;
  const animatedBorderColor = useRef(new Animated.Value(0)).current;


  const handleFocus = () => {
    setIsFocused(true);
    Animated.parallel([
      Animated.timing(animatedBorderWidth, {
        toValue: 2,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(animatedBorderColor, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.parallel([
      Animated.timing(animatedBorderWidth, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(animatedBorderColor, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const borderStyle = {
    borderColor: animatedBorderColor.interpolate({
      inputRange: [0, 1],
      outputRange: [light.lightGray, light.purple],
    }),
    borderWidth: animatedBorderWidth,
  };


  return (
    <>
      <View style={styles.container}>
        <Text style={styles.textLabel}>{label}</Text>
        <Animated.View style={[styles.containerTextInput, borderStyle]}>
          <Icon.Feather
            name={iconName}
            color={light.purple}
            style={{ fontSize: hp('2.5') }}
          />
          <TextInput
            style={styles.textInputs}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            cursorColor={light.purple}
            autoCorrect={false}
            secureTextEntry={hidePassword}
            placeholder={placeholder}
          />
          {
            password &&
            <Icon.Feather
              name={hidePassword ? 'eye-off' : 'eye'}
              style={{ fontSize: hp('2.5'), marginRight: spacing.s }}
              color={light.purple}
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
        </Animated.View>
      </View >
    </>
  )
}

export default Input;

const styles = StyleSheet.create({
  container: {
    marginTop: hp('1'),
  },
  textLabel: {
    fontWeight: 'bold',
    color: light.black,
    fontSize: wp('4.5'),
    marginLeft: spacing.m - 6,
  },
  containerTextInput: {
    height: hp('7'),
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: light.lightGray,
    borderRadius: sizes.radius,
    marginTop: 2,
  },
  textInputs: {
    // flex-1 font-bold pl-2
    color: '#202020',
    fontSize: hp('2.4'),
    fontSize: wp('5'),
    flex: 1,
    fontWeight: 'bold',
    paddingLeft: spacing.s + 4,
  }
})