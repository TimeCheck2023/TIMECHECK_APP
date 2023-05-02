import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import imgGame from "../../../assets/game.png";
import Input from '../../components/Input';
import { useState } from 'react'
import * as Icon from '@expo/vector-icons';
import Loading from '../../components/Loading';
import * as Animatable from "react-native-animatable";
import { userSchema } from '../../utils/validate';

const Sign_up = ({ navigation }) => {
  const { height, width } = Dimensions.get('window')

  //hook para capturar los errores
  const [errors, setErrors] = useState(false)

  //estado para controlar los input
  const [values_us, setValues_us] = useState({
    emailAddress: '',
    password: '',
  });

  //para capturar los el valor de los input
  const handleOnChageText_us = (value, fieldName) => {
    setValues_us({ ...values_us, [fieldName]: value })
  }

  //validamos los campos si hay error se lo mandamos al handleError
  const validateForm = async () => {
    try {
      const validate = await userSchema.validate(values_us, { abortEarly: false })
      console.log(validate);
    } catch (error) {
      setErrors(error.errors[0])
    }
  }

  return (
    <SafeAreaView className='flex-1 ' style={{ backgroundColor: '#202020' }}>
      {/* ir al register */}
      <View className='flex-row justify-start top-2'>
        <TouchableOpacity activeOpacity={0.7} className={`flex-row items-center ${width > 392.72727272727275 ? 'p-4' : 'p-3'} rounded-tr-2xl rounded-bl-2xl ml-4`} style={{ backgroundColor: '#642AB8' }} onPress={() => navigation.navigate('Sign_In')}>
          <Icon.AntDesign name="arrowleft" size={15} color="white" />
          <Text className='text-white font-bold text-base left-1'>Register</Text>
        </TouchableOpacity>
      </View>

      {/* imagen del login */}
      <View className='items-center top-10'>
        <View className={`flex items-center justify-center ${width > 392.72727272727275 ? 'w-24 h-20' : 'w-56 h-36'} border-2 border-white rounded-lg`}>
          <Image source={imgGame} resizeMode='contain' className='w-full h-full rounded-lg' />
        </View>
      </View>

      {/* form */}
      <Animatable.View animation='fadeInUpBig' className='flex-1 bg-slate-100 px-8 pt-8 top-20' style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50 }}>
        <ScrollView className='h-full' showsVerticalScrollIndicator={false}>
          {/* input */}
          <Input label='mail' value={values_us.emailAddress} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')} iconName='mail' placeholder='Enter correo' />
          <Input label='password' value={values_us.password} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'password')} password iconName='lock' placeholder='Enter password' />

          {/* campo para mostrar el error */}
          <View className='items-center mt-4'>
            {errors && <Text className={`text-red-800 ml-3  ${width > 392.72727272727275 ? 'text-xl' : 'text-base'} font-bold`}>{errors}</Text>}
          </View>

          {/* button */}
          <TouchableOpacity activeOpacity={0.7} className={`${width > 392.72727272727275 ? 'mt-6 py-4' : 'mt-2 py-3'}  rounded-xl`} style={{ backgroundColor: '#642AB8' }} onPress={validateForm}>
            <Text className='text-xl font-bold text-center text-white'>Registrar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  )
}

export default Sign_up