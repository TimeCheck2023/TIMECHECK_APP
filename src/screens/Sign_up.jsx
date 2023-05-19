import { View, Text, Dimensions, TouchableOpacity, Image, PixelRatio, ScrollView, ActivityIndicator } from 'react-native'
import Input from '../components/Input';
import { useState } from 'react'
import * as Icon from '@expo/vector-icons';
import { validationSchemaUser, validationSchemaOrg } from '../utils/validate';
import { saveUser, saveOrg } from "../api/api"
import { SafeAreaView } from 'react-native-safe-area-context';


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
  });

  const [values_org, setValues_org] = useState({
    organization_name: '',
    address_organization: '',
    email_organization: '',
    numero_telefono: '',
    organization_password: '',
  })


  //para capturar los el valor de los input
  const handleOnChageText_us = (value, fieldName) => {
    setValues_us({ ...values_us, [fieldName]: value })
  }

  const handleOnChageText_org = (value, fieldName) => {
    console.log(value, fieldName);
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
    })
    setErrors('');
  }

  //validamos los campos si hay error se lo mandamos al handleError y si nos hacemos el post
  const validateDateUser = async () => {
    try {
      await validationSchemaUser.validate(values_us, { abortEarly: false });
      setIsLoading(true)
      await saveUser(values_us)
        .then((response) => {
          const message = response.data.message;
          setMessage(message)
          setValues_us('')
          setIsLoading(false)
        }).catch((error) => {
          const errorMessage1 = error.response.data.error;
          setErrors(errorMessage1)
          setIsLoading(false)
        });
      setTimeout(() => {
        setMessage('')
        setErrors('')
      }, 3500);
    } catch (error) {
      const errorMessage = error.errors[0];
      setErrors(errorMessage)
    };

  }

  const validateDateOrg = async () => {
    try {
      const vali = await validationSchemaOrg.validate(values_org, { abortEarly: false })
      setIsLoading(true)
      await saveOrg(values_org)
        .then((response) => {
          const message = response.data.message;
          setMessage(message)
          setIsLoading(false)
        }).catch((error) => {
          const errorMessage1 = error.response.data.error;
          setErrors(errorMessage1)
          setIsLoading(false)
        });
      setTimeout(() => {
        setMessage('')
        setErrors('')
      }, 3000);
    } catch (error) {
      const errorMessage = error.errors[0];
      console.log(errorMessage);
      setErrors(errorMessage)
      setTimeout(() => {
        setErrors('')
      }, 3000);
    }
  }


  return (
    <SafeAreaView className='flex-1 bg-[#E8EAED]'>

      {/* ventada de escoger tipo de documento */}
      {Open &&
        <TouchableOpacity className='absolute justify-center  items-center z-40' style={{ height, width, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={() => setOpen(false)}>
          <View className='sm:w-72 sm:h-32 lg:w-[500px] lg:h-72 justify-center items-center bg-white rounded-xl'>
            <TouchableOpacity className='sm:w-32 sm:h-12 lg:w-96 lg:h-24 border-b border-gray-400'
              onPress={() => { setValues_us({ ...values_us, documentType: 'Cedula Ciudadana' }), setOpen(false) }}>
              <Text className=' text-gray-600 font-bold text-sm lg:text-2xl m-auto rounded-lg'>Cedula Ciudadana</Text>
            </TouchableOpacity>
            <TouchableOpacity className='sm:w-32 sm:h-12 lg:w-96 lg:h-24 border-b border-gray-400'
              onPress={() => { setValues_us({ ...values_us, documentType: 'Tarjeta de identidad' }), setOpen(false) }}>
              <Text className=' text-gray-600 font-bold m-auto sm:text-sm lg:text-2xl rounded-lg'>Tarjeta de identidad</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      }
      <ScrollView
        contentContainerStyle={{
          paddingTop: 30,
          paddingHorizontal: 20
        }}>
        <View className='flex-row items-center'>
          <TouchableOpacity className='w-9 h-9 bg-slate-300 items-center justify-center rounded-lg' onPress={() => navigation.navigate('Welcome')}>
            <Icon.AntDesign name='left' color='#6C5CE7' className='sm:text-xl lg:text-3xl' />
          </TouchableOpacity>
          <Text className='text-3xl left-4 text-black ' style={{ fontWeight: '900' }}>Register</Text>
        </View>

        <Text className='text-xl text-center text-black font-bold sm:mt-6'>Welcome select your account type</Text>

        <View className='flex-row w-[100%] sm:h-12 justify-between rounded-2xl mt-3'>
          <TouchableOpacity activeOpacity={0.7} className={`sm:w-[40%] sm:p-2 items-center left-6 ${!isOpen && 'bg-[#7560EE]'}  rounded-lg`} onPress={ViewUser}>
            <Text className={`text-xl text-black ${!isOpen && 'text-white'} font-bold`}>usuario</Text>
          </TouchableOpacity >
          <TouchableOpacity activeOpacity={0.7} className={`w-[40%] sm:p-2 items-center right-6 ${isOpen && 'bg-[#7560EE]'} rounded-lg`} onPress={ViewOrg}>
            <Text className={`text-xl text-black ${isOpen && 'text-white'} font-bold`}>organizacion</Text>
          </TouchableOpacity>
        </View>

        <View className='flex-1 sm:mt-4'>
          {!isOpen ?
            <>
              <Text className='font-bold sm:text-base lg:text-xl ml-4' style={{ color: '#202020' }}>Tipo Documento</Text>
              <TouchableOpacity activeOpacity={0.7} className={`flex-row items-center p-3 sm:h-[54px] sm:top-1 lg:h-16 lg:mt-3 bg-gray-300 text-gray-700 rounded-lg`}
                onPress={() => { setOpen(!Open) }}>
                <Icon.Feather name='users' color='#642AB8' className='sm:text-xl lg:text-3xl' />
                <Text className='font-bold text-lg rounded-lg ml-4' style={{ color: '#202020' }}>{values_us.documentType ? values_us.documentType : 'Tipo de documento'}</Text>
              </TouchableOpacity>
              <Input label='document number' value={values_us.documentNumber} keyboardType="decimal-pad" onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'documentNumber')} iconName='phone' placeholder='Enter Number' />
              <Input label='fullName' value={values_us.fullName} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'fullName')} iconName='user' placeholder='Enter Nombre Completo' />
              <Input label='mail' value={values_us.emailAddress} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')} iconName='mail' placeholder='Enter correo' />
              <Input label='password' value={values_us.password} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'password')} password iconName='lock' placeholder='Enter password' />
            </> :
            <View className='bottom-4'>
              <Input label='organization name`s' value={values_org.organization_name} onChangeText={(value) => handleOnChageText_org(value, 'organization_name')} onFocus={() => setErrors('')} iconName='user' placeholder='Jhon Smith' />
              <Input label='adress' value={values_org.address_organization} onChangeText={(value) => handleOnChageText_org(value, 'address_organization')} onFocus={() => setErrors('')} iconName='user' placeholder='Jhon Smith' />
              <Input label='mail' value={values_org.email_organization} onChangeText={(value) => handleOnChageText_org(value, 'email_organization')} onFocus={() => setErrors('')} iconName='mail' placeholder='Jhon Smith' />
              <Input label='numero_telefono' value={values_org.numero_telefono} onChangeText={(value) => handleOnChageText_org(value, 'numero_telefono')} keyboardType='numeric' onFocus={() => setErrors('')} iconName='phone' placeholder='320145++++' />
              <Input label='password' value={values_org.organization_password} onChangeText={(value) => handleOnChageText_org(value, 'organization_password')} onFocus={() => setErrors('')} password iconName='lock' placeholder='Jhon Smith' />
            </View>
          }

          <View className='items-center sm:top-1'>
            {errors && <Text className={`text-red-800 ml-3  text-xl font-bold`}>{errors}</Text>}
          </View>
          <View className='items-center sm:top-1'>
            {message && <Text className={`text-green-800 ml-3 text-xl font-bold`}>{message}</Text>}
          </View>

          {!isOpen ?
            <TouchableOpacity disabled={isLoading} activeOpacity={0.7} className={`sm:mt-6 py-4 rounded-xl bg-[#6C5CE7] shadow-xl`} onPress={validateDateUser}>
              {isLoading ?
                <ActivityIndicator size="large" color='#ffff' /> :
                <Text className='text-xl font-bold text-center text-white'>Registrar</Text>
              }
            </TouchableOpacity>
            :
            <TouchableOpacity disabled={isLoading} activeOpacity={0.7} className={`sm:mt-6 py-4 rounded-xl bg-[#6C5CE7] shadow-xl`} onPress={validateDateOrg}>
              {isLoading ?
                <ActivityIndicator size="large" color='#ffff' /> :
                <Text className='text-xl font-bold text-center text-white'>Registrar</Text>
              }
            </TouchableOpacity>
          }
          <View className='flex-row justify-center sm:mt-3'>
            <Text className='text-xl font-bold'>Already have an account?  </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign_In')}>
              <Text className='text-[#6C5CE7] text-xl font-bold'>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}
export default Sign_Up