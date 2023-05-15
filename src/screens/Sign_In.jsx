import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import imgGame from "../../assets/Sing_Up.png";
import Input from '../components/Input';
import { useState, useContext } from 'react'
import * as Icon from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Loading from '../components/Loading';
import * as Animatable from "react-native-animatable";
import { userSchema } from '../utils/validate';
import { auth } from "../api/api";
import { AuthContext } from '../context/AuthContext';
import Splash from '../components/Splash';

const Sign_In = ({ navigation }) => {
  const { height, width } = Dimensions.get('window')

  const { login } = useContext(AuthContext)

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
        .then(async (response) => {
          const message = response.data.message;
          login(message);
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
    <SafeAreaView className='flex-1 bg-[#E8EAED]'>
      {/* loading al enviar los datos */}
      <Splash visible={isLoading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 30,
          paddingHorizontal: 20
        }}>
        <View className='flex-row items-center'>
          <TouchableOpacity className='w-9 h-9 bg-slate-300 items-center justify-center rounded-lg' onPress={() => navigation.navigate('Welcome')}>
            <Icon.AntDesign name='left' color='#6C5CE7' className='sm:text-xl lg:text-3xl' />
          </TouchableOpacity>
          <Text className='text-3xl left-4 text-black ' style={{ fontWeight: '900' }}>Log in</Text>
        </View>



        <View className='w-full items-center'>
          <Text className='text-xl text-center text-black font-bold mt-10'>Welcome select your account type</Text>
          <View className='w-80 h-48 items-center mt-7 rounded-2xl'>
            <Image source={imgGame} resizeMode='cover' className='w-full h-full rounded-2xl' />
          </View>
        </View>

        <View className='flex-1 mt-6'>
          {/* input */}
          <Input label='mail' value={values_us.emailAddress} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')} iconName='mail' placeholder='Enter correo' />
          <Input label='password' value={values_us.password} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'password')} password iconName='lock' placeholder='Enter password' />


          <View className='items-center top-7'>
            {errors && <Text className={`text-red-800 ml-3  text-xl font-bold`}>{errors}</Text>}
          </View>
          <View className='items-center top-7'>
            {message && <Text className={`text-green-800 ml-3 text-xl font-bold`}>{message}</Text>}
          </View>

          <TouchableOpacity activeOpacity={0.7} className={`mt-10 py-4 rounded-xl bg-[#6C5CE7] shadow-xl`} onPress={validateForm}>
            <Text className='text-xl font-bold text-center text-white'>Registrar_user</Text>
          </TouchableOpacity>

          <View className='flex-row justify-center mt-4'>
            <Text className='text-xl font-bold'>Already have an account?  </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign_Up')}>
              <Text className='text-[#6C5CE7] text-xl font-bold'>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Sign_In