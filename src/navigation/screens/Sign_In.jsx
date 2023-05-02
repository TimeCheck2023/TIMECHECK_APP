import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import user from "../../../assets/User.png";
import organizacion from "../../../assets/organizacion.png";
import Input from '../../components/Input';
import React, { useState } from 'react'
import * as Icon from '@expo/vector-icons';
import Loading from '../../components/Loading';
import * as Animatable from "react-native-animatable";
import validate from '../../utils/validate';

const Sign_In = ({ navigation }) => {
  const { height, width } = Dimensions.get('window')

  //hook para capturar los errores
  const [errors, setErrors] = useState(false)

  //hook para abrir una ventana
  const [isOpen, setIsOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //estado para controlar los input
  const [values_us, setValues_us] = useState({
    documentType: 'Tipo de documento',
    documentNumber: '',
    fullName: '',
    emailAddress: '',
    password: '',
  });

  const [values_org, setValues_org] = useState({
    fullNameOrg: '',
    addressOrg: '',
    emailAddressOrg: '',
    passwordOrg: '',
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
      documentType: 'Tipo de documento',
      documentNumber: '',
      fullName: '',
      emailAddress: '',
      password: '',
    });
    setErrors('');
  }
  const ViewOrg = () => {
    setIsOpen(true);
    setValues_org({
      fullNameOrg: '',
      addressOrg: '',
      emailAddressOrg: '',
      passwordOrg: '',
    });
    setErrors('');
  }

  //validamos los campos si hay error se lo mandamos al handleError
  const validateForm = () => {
    let validationResult;
    if (isOpen) {
      validationResult = validate(values_org, 2)
    } else if (!isOpen) {
      validationResult = validate(values_us, 1)
    }
    if (!validationResult.isvalid) {
      return setErrors(validationResult.message)
    }
    submitForm()
  }

  //enviamoos los datos
  const submitForm = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      try {
        console.log(values_us);
      } catch (error) {
        console.log(error);
      }
    }, 3000)
  }

  return (
    <SafeAreaView className='flex-1' style={{ backgroundColor: '#202020' }}>
      <Loading visible={isLoading} />
      {Open &&
        <TouchableOpacity className='absolute justify-center  items-center z-40' style={{ height, width, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={() => setOpen(false)}>
          <View className='w-72 h-32 justify-center items-center bg-white rounded-xl'>
            <TouchableOpacity className='p-4 border-b border-gray-200'
              onPress={() => { setValues_us({ ...values_us, documentType: 'Cedula Ciudadana' }), setOpen(false) }}>
              <Text className=' text-gray-600 font-bold text-sm rounded-lg'>Cedula Ciudadana</Text>
            </TouchableOpacity>
            <TouchableOpacity className='p-4 border-b border-gray-200'
              onPress={() => { setValues_us({ ...values_us, documentType: 'Tarjeta de identidad' }), setOpen(false) }}>
              <Text className=' text-gray-600 font-bold text-sm rounded-lg'>Tarjeta de identidad</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      }
      {/* ir al login */}
      <View className='flex-row justify-start top-2'>
        <TouchableOpacity activeOpacity={0.7} className='flex-row p-4 items-center rounded-tr-2xl rounded-bl-2xl ml-4' style={{ backgroundColor: '#642AB8' }} onPress={() => navigation.navigate('Sign_up')}>
          <Icon.AntDesign name="arrowleft" size={15} color="white" />
          <Text className='text-white font-bold text-base left-1'>Login</Text>
        </TouchableOpacity>
      </View>
      {/* seleciona tipo de usuario */}
      <View className='flex-row justify-around top-10'>
        <TouchableOpacity activeOpacity={0.7} className={`flex-col items-center w-24 h-20 ${!isOpen && 'border-2 border-white rounded-lg'}`} onPress={ViewUser}>
          <Image source={user} resizeMode='contain' className='w-full h-full rounded-lg' />
          <Text className='text-white text-lg font-bold'>User</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} className={`flex-col items-center w-24 h-20 ${isOpen && 'border-2 border-white rounded-lg'}`} onPress={ViewOrg}>
          <Image source={organizacion} resizeMode='contain' className='w-full h-full rounded-lg' />
          <Text className='text-white text-base font-bold'>Organization</Text>
        </TouchableOpacity>
      </View>
      {/* form */}
      <Animatable.View animation='fadeInUpBig' className='flex-1 bg-slate-100 px-8 pt-8 top-20' style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50 }}>
        <ScrollView className='h-full' showsVerticalScrollIndicator={false}>

          {/* select de tipo de usuario */}
          {!isOpen ?
            <>
              {/* Select tipo de documento */}
              <Text className='text-slate-600 font-bold text-base ml-4'>Tipo Documento</Text>
              <TouchableOpacity activeOpacity={0.7} className='flex-row items-center p-3 h-14 mt-2 bg-gray-300 text-gray-700 rounded-lg'
                onPress={() => { setOpen(!Open) }}>
                <Icon.Feather name='users' size={20} color='#642AB8' />
                <Text className='text-gray-600 font-bold text-lg rounded-lg ml-4'>{values_us.documentType}</Text>
              </TouchableOpacity>

              {/* input */}
              <Input label='document number' value={values_us.documentNumber} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'documentNumber')} iconName='phone' placeholder='Enter Number' />
              <Input label='fullName' value={values_us.fullName} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'fullName')} iconName='user' placeholder='Enter Nombre Completo' />
              <Input label='mail' value={values_us.emailAddress} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')} iconName='mail' placeholder='Enter correo' />
              <Input label='password' value={values_us.password} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'password')} password iconName='lock' placeholder='Enter password' />
            </>
            :
            <>
              <Input label='organization name`s' value={values_org.fullNameOrg} onChangeText={(value) => handleOnChageText_org(value, 'fullNameOrg')} iconName='user' placeholder='Jhon Smith' />
              <Input label='adress' value={values_org.addressOrg} onChangeText={(value) => handleOnChageText_org(value, 'addressOrg')} iconName='user' placeholder='Jhon Smith' />
              <Input label='mail' value={values_org.emailAddressOrg} onChangeText={(value) => handleOnChageText_org(value, 'emailAddressOrg')} iconName='mail' placeholder='Jhon Smith' />
              <Input label='password' value={values_org.passwordOrg} onChangeText={(value) => handleOnChageText_org(value, 'passwordOrg')} password iconName='lock' placeholder='Jhon Smith' />
            </>
          }

          {/* campo para mostrar el error */}
          <View className='items-center mt-4'>
            {errors && <Text className='text-red-800 ml-3 text-xl font-bold'>{errors}</Text>}
          </View>

          {/* button */}
          <TouchableOpacity activeOpacity={0.7} className='py-4 mt-6 rounded-xl' style={{ backgroundColor: '#642AB8' }} onPress={validateForm}>
            <Text className='text-xl font-bold text-center text-white'>Registrar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
      <StatusBar style='light' />
    </SafeAreaView>
  )
}
export default Sign_In