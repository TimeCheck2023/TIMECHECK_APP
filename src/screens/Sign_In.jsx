import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import imgGame from "../../assets/Sing_Up.png";
import Input from '../components/Input';
import { useState, useContext } from 'react'
import * as Icon from '@expo/vector-icons';
import { userSchema } from '../utils/validate';
import { auth } from "../api/api";
import { AuthContext } from '../context/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const Sign_In = ({ navigation }) => {

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

  const validateData = async () => {
    try {
      await userSchema.validate(values_us, { abortEarly: false })
      validateForm();
    } catch (error) {
      setIsLoading(false)
      setErrors(error.errors[0])
    }
  }

  //validamos los campos si hay error se lo mandamos al handleError
  const validateForm = async () => {
    try {
      setIsLoading(true)
      const result = await auth(values_us)
      const message = result.data;
      login(message);
      setIsLoading(false)
    } catch (error) {
      const errorMessage1 = error.response.data.error;
      setErrors(errorMessage1)
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-[#E8EAED]'>
      <ScrollView
        contentContainerStyle={{
          paddingTop: hp('2'),
          paddingHorizontal: wp('5')
        }}>
        <View className='flex-row items-center'>
          <TouchableOpacity className='bg-slate-300 items-center justify-center rounded-lg' style={{ width: wp('12'), height: hp('6') }} onPress={() => navigation.navigate('Welcome')}>
            <Icon.AntDesign name='left' color='#6C5CE7' style={{ fontSize: wp('7') }} />
          </TouchableOpacity>
          <Text className='left-4 text-black ' style={{ fontSize: wp('6.5'), fontWeight: '900' }}>Log In</Text>
        </View>



        <View className='w-full items-center'>
          <Text className='text-center text-black' style={{ fontSize: wp('6.5'), fontWeight: '900', marginTop: hp('3.5') }}>Welcome to our login</Text>
          <View className='w-80 h-48 items-center mt-7 rounded-2xl' style={{ width: wp('90%'), height: hp('29%') }}>
            <Image source={imgGame} resizeMode='cover' className='w-full h-full rounded-2xl' />
          </View>
        </View>

        <View className='flex-1' style={{ marginTop: hp('1') }}>
          {/* input */}
          <Input label='mail' value={values_us.emailAddress} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')} iconName='mail' placeholder='Enter correo' />
          <Input label='password' value={values_us.password} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'password')} password iconName='lock' placeholder='Enter password' />


          <View className='items-center ' style={{ top: hp('1') }}>
            {errors && <Text className={`text-red-800 text-xl font-bold`} style={{ fontSize: hp('3') }}>{errors}</Text>}
          </View>
          <View className='items-center' style={{ top: hp('1') }}>
            {message && <Text className={`text-green-800 ml-3 text-xl font-bold`}>{message}</Text>}
          </View>

          <TouchableOpacity disabled={isLoading} activeOpacity={0.7}
            className={`rounded-xl bg-[#6C5CE7] shadow-xl justify-center`}
            style={{ width: wp('90%'), height: hp('7%'), top: hp('3.4') }}
            onPress={validateData}
          >

            {isLoading ?
              <ActivityIndicator size="large" color='#ffff' /> :
              <Text className='text-xl font-bold text-center text-white'>Login</Text>
            }

          </TouchableOpacity>

          <View className='flex-row justify-center' style={{ marginTop: hp('5') }}>
            <Text className='font-bold' style={{ fontSize: hp('2.7') }}>Already have an account?  </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign_Up')}>
              <Text className='text-[#6C5CE7] font-bold' style={{ fontSize: hp('2.7') }}>Sing Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Sign_In