import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import imgGame from "../../../assets/Sing_Up.png";
import Input from '../../components/Input';
import { useState } from 'react'
import * as Icon from '@expo/vector-icons';
import Loading from '../../components/Loading';
import * as Animatable from "react-native-animatable";
import { userSchema } from '../../utils/validate';
import { auth } from "../../api/api";

const Sign_up = ({ navigation }) => {
  const { height, width } = Dimensions.get('window')

  //hook para capturar los errores y respuestas http
  const [errors, setErrors] = useState(false)
  const [message, setMessage] = useState(false)

  const [isLoading, setIsLoading] = useState(false);

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
      await userSchema.validate(values_us, { abortEarly: false })
      setIsLoading(true)
      await auth(values_us)
      .then((response) => {
        const message = response.data.message;
        console.log(message)
        setIsLoading(false)
      }).catch((error) => {
        const errorMessage1 = error.response.data.error;
        setErrors(errorMessage1)
        setIsLoading(false)
      });
    } catch (error) {
      setErrors(error.errors[0])
    }
  }

  return (
    <View className='flex-1'>
      {/* loading al enviar los datos */}
      <Loading visible={isLoading} />

      {/* style={{ paddingBottom: 44, paddingStart: 16, paddingEnd: 16 }} */}

      {/* header de form purple */}
      <View className='flex-row h-52 pb-16 pl-10 pr-10 rounded-b-2xl' style={{ backgroundColor: '#202020' }}>
        {/* ir al login */}
        <View className='flex-1 flex-row items-center justify-between'>
          <TouchableOpacity activeOpacity={0.7} className={`flex-row items-center ${width > 392.72727272727275 ? 'p-4' : 'p-3'} rounded-tr-2xl rounded-bl-2xl ml-4`} style={{ backgroundColor: '#642AB8' }} onPress={() => navigation.navigate('Sign_In')}>
            <Icon.AntDesign name="arrowleft" size={15} color="white" />
            <Text className='text-white font-bold text-lg left-1'>Register</Text>
          </TouchableOpacity>

          {/* message */}
          <Text className='font-bold text-2xl text-white right-4'>Welcome Login</Text>
        </View>
      </View>

      {/* formlario */}
      <Animatable.View animation='fadeInUpBig' className='bg-white flex-1 pl-[18] pr-[18] -mt-20 ml-5 mr-5 rounded-3xl'>

        {/* seleciona tipo de usuario */}
        <View className='bg-black items-center'>
          <TouchableOpacity activeOpacity={0.7} className={`flex-col items-center ${width > 392.72727272727275 ? 'w-24 h-20' : 'w-20 h-16'} bg-purple-800`}>
            <Image source={imgGame} resizeMode='cover' className='w-full h-full rounded' />
          </TouchableOpacity>
        </View>

        {/* View de input */}
        <View className='flex-1 top-12'>

          {/* input */}
          <Input label='mail' value={values_us.emailAddress} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')} iconName='mail' placeholder='Enter correo' />
          <Input label='password' value={values_us.password} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'password')} password iconName='lock' placeholder='Enter password' />

          {/* campo para mostrar el error */}
          <View className='items-center mt-4'>
            {errors && <Text className={`text-red-800 ml-3  ${width > 392.72727272727275 ? 'text-xl' : 'text-base'} font-bold`}>{errors}</Text>}
          </View>
          <View className='items-center mt-4'>
            {message && <Text className={`text-green-800 ml-3  ${width > 392.72727272727275 ? 'text-xl' : 'text-base'} font-bold`}>{message}</Text>}
          </View>

          {/* button */}
          <>
            <TouchableOpacity activeOpacity={0.7} className={`${width > 392.72727272727275 ? 'mt-1 py-4' : 'mt-2 py-3'}  rounded-xl`} style={{ backgroundColor: '#642AB8' }} onPress={validateForm}>
              <Text className='text-xl font-bold text-center text-white'>Registrar_user</Text>
            </TouchableOpacity>
          </>
        </View>
      </Animatable.View>
    </View>
  )
}

export default Sign_up