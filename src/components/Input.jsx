import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as Icon from '@expo/vector-icons';

const Input = ({ placeholder, label, error, onFocus, iconName, password , ...props }) => {
    const [hidePassword, setHidePassword] = useState(password);
    return (
        <View className='mt-2'>
            <Text className='text-slate-600 font-bold text-sm ml-4'>{label}</Text>
            <View className='flex flex-row items-center p-4 mt-2  bg-slate-300 text-gray-700 rounded-lg'>
                <Icon.Feather
                    name={iconName}
                    size={20}
                    // color={error ? 'red' : isFocusd ? '#8A2BE2' : '#8A2BE2'}
                    className='mr-2'
                />
                <TextInput
                    className='flex-1 text-slate-600 font-bold text-lg'
                    {...props}
                    autoCorrect={false}
                    secureTextEntry={hidePassword}
                    placeholder={placeholder}
                    onFocus={() => onFocus()}
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
            {
                error &&
                <Text className='text-red-800 mt-1 ml-3 text-base'>{error}</Text>
            }
        </View >
    )
}

export default Input