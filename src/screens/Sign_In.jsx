import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image, ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import imgGame from "../../assets/Sing_Up.png";
import Input from '../components/Input/Input';
import { useState, useContext, useEffect, useCallback, } from 'react'
import * as Icon from '@expo/vector-icons';
import { userSchema } from '../utils/validate';
import { auth } from "../api/api";
import { AuthContext } from '../context/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { light, sizes, spacing } from '../constants/theme';



const Sign_In = ({ navigation }) => {

  const { login } = useContext(AuthContext)

  //hook para capturar los errores y respuestas http
  const [errors, setErrors] = useState(false)
  const [message, setMessage] = useState(false)

  const [isLoading, setIsLoading] = useState(false);
  const [button, setButton] = useState(false);

  //estado para controlar los input
  const [values_us, setValues_us] = useState({
    emailAddress: '',
    password: '',
  });


  useFocusEffect(
    useCallback(() => {
      checkExpiration();

    }, []),
  );

  const checkExpiration = async () => {
    const expiration = await AsyncStorage.getItem('expirationTime');
    if (expiration) {
      const currentTime = new Date().getTime();
      if (expiration && currentTime > parseInt(expiration)) {
        // La expiración ha pasado, no muestra el botón
        setButton(false)
      } else {
        // La expiración aún está dentro del tiempo límite, muestra el botón
        setButton(true)
      }
    } else {
      setButton(false)
    }
    setErrors('')
    setMessage('')
    setValues_us({
      emailAddress: '',
      password: '',
    })
  }

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
    <SafeAreaView style={{ flex: 1, backgroundColor: light.white }}>
      <ScrollView contentContainerStyle={{ paddingTop: hp('2'), paddingHorizontal: wp('5') }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Welcome')}>
            <Icon.AntDesign name='left' style={{ fontSize: wp('7'), color: light.purple }} />
          </TouchableOpacity>
          <Text style={styles.headerText}>¡Inicia Sesión!</Text>
        </View>


        <View className=''>
          <Text style={styles.text}>Bienvenido!!</Text>
          <View style={styles.containerImage}>
            <Image source={imgGame} resizeMode='cover' style={styles.image} />
          </View>
        </View>

        <View style={{ marginTop: hp('1.7') }}>
          {/* input */}
          <Input label='Email' value={values_us.emailAddress} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')} iconName='mail' placeholder='Enter correo' />
          <Input label='Contraseña' value={values_us.password} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'password')} password iconName='lock' placeholder='Enter password' />


          <View style={{ top: hp('1'), alignItems: 'center' }}>
            {errors && <Text style={styles.textError}>{errors}</Text>}
          </View>
          <View className='items-center' style={{ top: hp('1'), alignItems: 'center' }}>
            {message && <Text style={styles.texMessage}>{message}</Text>}
          </View>

          <View style={{ marginTop: hp('2'), flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: hp('2.4'), fontWeight: 'bold' }}>Olvidaste tu contraseña?  </Text>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={{ fontSize: hp('2.7'), color: light.purple, fontWeight: 'bold' }}>Recuperar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity disabled={isLoading} activeOpacity={0.7}
            style={[styles.buttomSend, { marginTop: hp('3'), }]}
            onPress={validateData}
          >

            {isLoading ?
              <ActivityIndicator size="large" color='#ffff' /> :
              <Text className='text-xl font-bold text-center text-white'>Inicia Sesión</Text>
            }

          </TouchableOpacity>
          {
            button &&
            <TouchableOpacity disabled={isLoading} activeOpacity={0.7}
              style={[styles.buttomSend, { top: hp('1.8') }]}
              onPress={() => navigation.navigate('Verificacion')}
            >
              <Text className='text-xl font-bold text-center text-white'>Verificar Cuenta</Text>
            </TouchableOpacity>
          }

          <View style={{ marginTop: hp('4'), flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: hp('2.7'), fontWeight: 'bold' }}>No tienes una cuenta?  </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign_Up')}>
              <Text style={{ fontSize: hp('2.7'), color: light.purple, fontWeight: 'bold' }}>Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Sign_In

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerButton: {
    width: wp('12'),
    height: hp('6'),
    backgroundColor: light.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes.radius - 5
  },
  headerText: {
    fontSize: wp('6.5'),
    fontWeight: '900',
    color: light.black,
    left: spacing.s * 2
  },
  text: {
    fontSize: hp('2.5'),
    fontSize: wp('6.5'),
    fontWeight: '700',
    marginTop: hp('2'),
    color: light.black,
    textAlign: 'center'
  },
  containerImage: {
    width: wp('90%'),
    height: hp('29%'),
    borderRadius: sizes.radius,
    marginTop: hp('2')
  },
  image: {
    width: wp('90%'),
    height: hp('29%'),
    borderRadius: sizes.radius,
  },
  textError: {
    fontSize: hp('2.5'),
    color: '#d62828',
    fontWeight: 'bold'
  },
  texMessage: {
    fontSize: hp('2.5'),
    color: '#2c6e49',
    fontWeight: 'bold'
  },
  buttomSend: {
    width: wp('90%'),
    height: hp('7%'),
    justifyContent: 'center',
    borderRadius: sizes.radius,
    backgroundColor: light.purple,
    elevation: 9,
    shadowColor: light.purple,
  },
  buttomText: {
    fontSize: hp('2.6'),
    textAlign: 'center',
    color: light.white,
    fontWeight: 'bold',
  },
})