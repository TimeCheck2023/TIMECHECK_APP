import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as Icon from '@expo/vector-icons';

const Input = ({ placeholder, label, iconName, password, ...props }) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isOpend, setIsOpend] = useState(false);

  return (
    <>
      <View className='space-y-2'>
        <Text className='text-slate-600 font-bold text-base ml-4'>{label}</Text>
        <View className='flex-row items-center p-3 h-14  bg-gray-300 rounded-2xl'>
          <Icon.Feather
            name={iconName}
            size={20}
            color='#8A2BE2'
            className='mr-2'
          />
          <TextInput
            className='flex-1 text-slate-600 font-bold text-lg pl-2'
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