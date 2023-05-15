import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import * as Icon from '@expo/vector-icons';

const Input = ({ placeholder, label, iconName, password, ...props }) => {
  const { height, width } = Dimensions.get('window')

  const [hidePassword, setHidePassword] = useState(password);

  return (
    <>
      <View className='sm:my-2 lg:my-3'>
        <Text className='font-bold sm:text-base lg:text-xl sm:top-2 ml-4 ' style={{ fontWeight: '900', color: '#202020' }}>{label}</Text>
        <View className={`flex-row items-center p-3 sm:h-[54px] sm:top-3 lg:h-16 lg:top-3 bg-gray-300 rounded-lg`}>
          <Icon.Feather
            name={iconName}
            // size={20}
            color='#6C5CE7'
            className='mr-2 sm:text-xl lg:text-3xl'
          />
          <TextInput
            className='flex-1 font-bold text-xl pl-2'
            style={{ color: '#202020' }}
            {...props}
            cursorColor='#8A2BE2'
            autoCorrect={false}
            secureTextEntry={hidePassword}
            placeholder={placeholder}
          />
          {
            password &&
            <Icon.Feather
              name={hidePassword ? 'eye-off' : 'eye'}
              size={18}
              color='#6C5CE7'
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
        </View>
      </View >
    </>
  )
}

export default Input