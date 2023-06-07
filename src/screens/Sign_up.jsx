import { View, Text, Dimensions, TouchableOpacity, Image, PixelRatio, ScrollView, ActivityIndicator } from 'react-native'
import Input from '../components/Input/Input';
import { useEffect, useState } from 'react'
import * as Icon from '@expo/vector-icons';
import { validationSchemaUser, validationSchemaOrg } from '../utils/validate';
import { saveUser, saveOrg } from "../api/api"
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment/moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Sign_Up = ({ navigation }) => {
  const { height, width } = Dimensions.get('window');

  //hook para capturar los errores y respuestas http
  const [errors, setErrors] = useState(false)
  const [message, setMessage] = useState(false)

  //hook para abrir una ventana
  const [isOpen, setIsOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //estado para controlar los input
  const [values_us, setValues_us] = useState({
    documentType: '',
    documentNumber: '',
    fullName: '',
    emailAddress: '',
    password: '',
    device: 'movil',
  });

  const [values_org, setValues_org] = useState({
    organization_name: '',
    address_organization: '',
    email_organization: '',
    numero_telefono: '',
    organization_password: '',
    device: 'movil',
  })

  //para capturar los el valor de los input
  const handleOnChageText_us = (value, fieldName) => {
    setValues_us({ ...values_us, [fieldName]: value })
  }

  const handleOnChageText_org = (value, fieldName) => {
    setValues_org({ ...values_org, [fieldName]: value })
  }

  // funciones que controlar el mostrar el form de user o org
  const ViewUser = () => {
    setIsOpen(false);
    setValues_us({
      documentType: '',
      documentNumber: '',
      fullName: '',
      emailAddress: '',
      password: '',
      device: 'movil',
    })
    setErrors('');
  }

  const ViewOrg = () => {
    setIsOpen(true);
    setValues_org({
      organization_name: '',
      address_organization: '',
      email_organization: '',
      numero_telefono: '',
      organization_password: '',
      device: 'movil',
    })
    setErrors('');
  }

  const validateData = async (num) => {
    // Obtén la fecha y hora actual
    const currentTime = new Date();

    // Establece la expiración en 24 horas
    const expirationTime = currentTime.getTime() + 24 * 60 * 60 * 1000;
    AsyncStorage.setItem('expirationTime', expirationTime.toString());
    try {
      if (num === 1) {
        await validationSchemaUser.validate(values_us, { abortEarly: false });
        validateDateUser()
      } else if (num === 2) {
        await validationSchemaOrg.validate(values_org, { abortEarly: false })
        validateDateOrg()
      }
    } catch (error) {
      const errorMessage = error.errors[0];
      setErrors(errorMessage)
    }

  }

  //validamos los campos si hay error se lo mandamos al handleError y si nos hacemos el post
  const validateDateUser = async () => {
    try {
      setIsLoading(true)
      const result = await saveUser(values_us)
      const message = result.data.message;
      setMessage(message)
      setValues_us('')
      setIsLoading(false)
      await AsyncStorage.setItem('lastClick', new Date().toISOString());
      setTimeout(() => {
        navigation.navigate('Sign_In')
      }, 1000);
    } catch (error) {
      const errorMessage1 = error.response.data.error;
      setErrors(errorMessage1)
      setIsLoading(false)
    };

  }

  const validateDateOrg = async () => {
    try {
      setIsLoading(true)
      const result = await saveOrg(values_org)
      const message = result.data.message;
      setMessage(message)
      setIsLoading(false)
      setTimeout(() => {
        navigation.navigate('Sign_In')
      }, 900);
    } catch (error) {
      const errorMessage1 = error.response.data.error;
      setErrors(errorMessage1)
      setIsLoading(false)
    }
  }


  return (
    <SafeAreaView className='flex-1 bg-[#E8EAED]'>

      {/* ventada de escoger tipo de documento */}
      {Open &&
        <TouchableOpacity className='absolute justify-center  items-center z-40' style={{ height, width, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={() => setOpen(false)}>
          <View className='sm:w-72 sm:h-32 lg:w-[500px] lg:h-72 justify-center items-center bg-white rounded-xl' style={{ width: wp('75%'), height: hp('20') }}>
            <TouchableOpacity className=' bottom-0 justify-center items-center border-b border-gray-400'
              style={{ width: wp('50%'), height: hp('6') }} onPress={() => {
                setValues_us({ ...values_us, documentType: 'Cedula Ciudadana' }),
                  setOpen(false)
              }}>
              <Text className=' text-gray-600 font-bold rounded-lg' style={{ fontSize: wp('4%') }}>Cedula Ciudadana</Text>
            </TouchableOpacity>
            <TouchableOpacity className='bottom-0 justify-center items-center border-b border-gray-400'
              style={{ width: wp('50%'), height: hp('6') }}
              onPress={() => { setValues_us({ ...values_us, documentType: 'Tarjeta de identidad' }), setOpen(false) }}>
              <Text className=' text-gray-600 font-bold rounded-lg' style={{ fontSize: wp('4%') }}>Tarjeta de identidad</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      }
      <ScrollView
        contentContainerStyle={{
          paddingTop: hp('2'),
          paddingHorizontal: wp('5')
        }}>
        <View className='flex-row items-center'>
          <TouchableOpacity className='bg-slate-300 items-center justify-center rounded-lg' style={{ width: wp('10'), height: hp('6') }} onPress={() => navigation.navigate('Welcome')}>
            <Icon.AntDesign name='left' color='#6C5CE7' style={{ fontSize: wp('7') }} />
          </TouchableOpacity>
          <Text className='left-4 text-black ' style={{ fontSize: wp('6.5'), fontWeight: '900' }}>Sing Up</Text>
        </View>

        <Text className='text-center text-black' style={{ fontSize: hp('2.5'), fontWeight: '900', top: hp('2') }}>Welcome select your account type</Text>

        <View className='flex-row justify-between items-center rounded-2xl' style={{ width: wp('95%'), height: hp('7.5'), marginTop: hp('2.5') }}>
          <TouchableOpacity activeOpacity={0.7} className={`items-center justify-center left-6 ${!isOpen && 'bg-[#7560EE]'}  rounded-lg`} style={{ width: wp('40%'), height: hp('6.5') }} onPress={ViewUser}>
            <Text className={`text-xl text-black ${!isOpen && 'text-white'} font-bold`}>usuario</Text>
          </TouchableOpacity >
          <TouchableOpacity activeOpacity={0.7} className={`items-center justify-center right-6 ${isOpen && 'bg-[#7560EE]'} rounded-lg`} style={{ width: wp('40%'), height: hp('6.5') }} onPress={ViewOrg}>
            <Text className={`text-xl text-black ${isOpen && 'text-white'} font-bold`}>organizacion</Text>
          </TouchableOpacity>
        </View>

        <View className='flex-1' style={{ marginTop: hp('1.7') }}>
          {!isOpen ?
            <>
              <Text className='font-bold ml-4' style={{ color: '#202020', fontSize: wp('4') }}>Tipo Documento</Text>
              <TouchableOpacity activeOpacity={0.7} className={`flex-row items-center p-3 sm:top-1 lg:h-16 lg:mt-3 bg-gray-300 text-gray-700 rounded-lg`}
                style={{ height: hp('7') }}
                onPress={() => { setOpen(!Open) }}>
                <Icon.Feather name='users' color='#642AB8' className='sm:text-xl lg:text-3xl' />
                <Text className='font-bold text-lg rounded-lg ml-4' style={{ color: '#202020', fontSize: hp('2.4') }}>{values_us.documentType ? values_us.documentType : 'Tipo de documento'}</Text>
              </TouchableOpacity>
              <Input label='document number' value={values_us.documentNumber} keyboardType="phone-pad" onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'documentNumber')} iconName='phone' placeholder='Enter Number' />
              <Input label='fullName' value={values_us.fullName} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'fullName')} iconName='user' placeholder='Enter Nombre Completo' />
              <Input label='mail' value={values_us.emailAddress} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')} iconName='mail' placeholder='Enter correo' />
              <Input label='password' value={values_us.password} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'password')} password iconName='lock' placeholder='Enter password' />
            </> :
            <View style={{ bottom: hp('2') }}>
              <Input label='organization name`s' value={values_org.organization_name} onChangeText={(value) => handleOnChageText_org(value, 'organization_name')} onFocus={() => setErrors('')} iconName='user' placeholder='Jhon Smith' />
              <Input label='adress' value={values_org.address_organization} onChangeText={(value) => handleOnChageText_org(value, 'address_organization')} onFocus={() => setErrors('')} iconName='user' placeholder='Jhon Smith' />
              <Input label='mail' value={values_org.email_organization} onChangeText={(value) => handleOnChageText_org(value, 'email_organization')} onFocus={() => setErrors('')} iconName='mail' placeholder='Jhon Smith' />
              <Input label='numero_telefono' value={values_org.numero_telefono} onChangeText={(value) => handleOnChageText_org(value, 'numero_telefono')} keyboardType='numeric' onFocus={() => setErrors('')} iconName='phone' placeholder='320145++++' />
              <Input label='password' value={values_org.organization_password} onChangeText={(value) => handleOnChageText_org(value, 'organization_password')} onFocus={() => setErrors('')} password iconName='lock' placeholder='Jhon Smith' />
            </View>
          }

          <View className='items-center ' style={{ top: hp('1') }}>
            {errors && <Text className={`text-red-800 text-xl font-bold`} style={{ fontSize: hp('2.5') }}>{errors}</Text>}
          </View>
          <View className='items-center' style={{ top: hp('1') }}>
            {message && <Text className={`text-green-800 ml-3 font-bold`} style={{ fontSize: hp('2.5') }}>{message}</Text>}
          </View>

          {!isOpen ?
            <TouchableOpacity disabled={isLoading} activeOpacity={0.7} style={{ width: wp('90%'), height: hp('7%'), top: hp('2') }} className={`rounded-xl bg-[#6C5CE7] shadow-xl justify-center`} onPress={() => validateData(1)}>
              {isLoading ?
                <ActivityIndicator size="large" color='#ffff' /> :
                <Text className='text-xl font-bold text-center text-white'>Registrar</Text>
              }
            </TouchableOpacity>
            :
            <TouchableOpacity disabled={isLoading} activeOpacity={0.7} style={{ width: wp('90%'), height: hp('7%'), top: hp('2') }} className={`rounded-xl bg-[#6C5CE7] shadow-xl justify-center`} onPress={() => validateData(2)}>
              {isLoading ?
                <ActivityIndicator size="large" color='#ffff' /> :
                <Text className='text-xl font-bold text-center text-white'>Registrar</Text>
              }
            </TouchableOpacity>
          }
          <View className='flex-row justify-center' style={{ marginTop: hp('3') }}>
            <Text className='font-bold' style={{ fontSize: hp('2.7') }}>Already have an account?  </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign_In')}>
              <Text className='text-[#6C5CE7] font-bold' style={{ fontSize: hp('2.7') }}>Sing In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}
export default Sign_Up