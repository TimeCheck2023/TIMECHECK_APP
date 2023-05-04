import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import * as Icon from '@expo/vector-icons';

const Input = ({ placeholder, label, iconName, password, ...props }) => {
  const { height, width } = Dimensions.get('window')

  const [hidePassword, setHidePassword] = useState(password);

  return (
    <>
      <View className='space-y-2'>
        <Text className='font-bold text-lg ml-4 top-2' style={{color:'#202020'}}>{label}</Text>
        <View className={`flex-row items-center p-3 ${width > 392.72727272727275 ? 'h-14' : 'h-12'}  bg-gray-300 rounded-2xl`}>
          <Icon.Feather
            name={iconName}
            size={20}
            color='#8A2BE2'
            className='mr-2'
          />
          <TextInput
            className='flex-1 font-bold text-xl pl-2'
            style={{color:'#202020'}}
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
              color='#8A2BE2'
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
        </View>
      </View >
    </>
  )
}

export default Input