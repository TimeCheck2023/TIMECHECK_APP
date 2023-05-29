import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import * as Icon from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Input = ({ placeholder, label, iconName, password, ...props }) => {
  const { height, width } = Dimensions.get('window')

  const [hidePassword, setHidePassword] = useState(password);

  return (
    <>
      <View style={{ marginTop: hp('1.5'), bottom: hp('2') }}>
        <Text className='font-bold sm:top-2 ml-4 ' style={{ fontWeight: '900', color: '#202020', fontSize: wp('4') }}>{label}</Text>
        <View className={`flex-row items-center p-3 sm:top-3 lg:top-3 bg-gray-300 rounded-lg`} style={{ height: hp('7') }}>
          <Icon.Feather
            name={iconName}
            // size={20}
            color='#6C5CE7'
            className='mr-2'
            style={{ fontSize: hp('2.5') }}
          />
          <TextInput
            className='flex-1 font-bold pl-2'
            style={{ color: '#202020', fontSize: hp('2.4'), fontSize: wp('5') }}
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
              style={{ fontSize: hp('2.5') }}
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