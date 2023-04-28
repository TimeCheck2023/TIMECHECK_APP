import { View, Text, Dimensions, StatusBar, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/Input';
import React, { useState } from 'react'
import { dataTipo } from "../../utils/data";
import * as Icon from '@expo/vector-icons';
import Loading from '../../components/Loading';
import * as Animatable from "react-native-animatable";

const Sign_In = () => {
  const { height, width } = Dimensions.get('window')

  //hook para capturar los errores
  const [errors, setErrors] = useState({})

  //hook para abrir una ventana
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //estado para controlar los input
  const [values, setValues] = useState({
    title: 'Usuario',
    fullname: '',
    email: '',
    password: '',
  })
  const { fullname, email, password } = values;

  //para capturar los el valor de los input
  const handleOnChageText = (value, fieldName) => {
    setValues({ ...values, [fieldName]: value })
    console.log(email);
    console.log(value);
    console.log(value === email);
    if (value === email) {
      setErrors('')
    }
  }

  //capturarmos el error y se lo asignamos al hook
  const handleError = (error, input) => {
    setErrors((prevent) => ({ ...prevent, [input]: error }));
  }

  //validamos los campos si hay error se lo mandamos al handleError
  const validate = () => {
    let isValid = true;
    if (!values.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (values.password.length < 5) {
      handleError('Min password length of 5', 'password')
      isValid = false;
    }
    if (!values.fullname) {
      handleError('Please input fullname', 'fullname')
      isValid = false;
    }
    if (!values.email) {
      handleError('Please input email', 'email')
      isValid = false;
    } else if (!values.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email')
      isValid = false;
    }
    if (isValid) {
      submitForm()
    }
  }

  //enviamoos los datos
  const submitForm = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      try {
        console.log(values);
      } catch (error) {
        console.log(error);
      }
    }, 3000)
  }

  return (
    <SafeAreaView className='flex-1 bg-slate-400 '>
      <Loading visible={isLoading} name={values.title} />
      {
        isOpen &&
        <TouchableOpacity className='absolute justify-center  items-center z-40' style={{ height, width, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={() => setIsOpen(false)}>
          <View className='w-72 h-24 flex-row justify-center items-center bg-white rounded-xl'>
            {
              dataTipo.map(({ id, title }) => (
                <TouchableOpacity
                  key={id}
                  onPress={() => { setValues({ ...values, title }), setIsOpen(false) }}
                  className='p-4 border-b border-gray-200'
                >
                  <Text className=' text-gray-600 font-bold text-sm rounded-lg'>{title}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </TouchableOpacity>
      }
      <View className='flex-1' >
      </View >
      <Animatable.View animation='fadeInUpBig' className='flex-[11] bg-slate-200 p-5 rounded-tl-3xl rounded-tr-3xl'>
        <View className='items-center'>
          <Text className='text-4xl text-purple-700 font-bold'>Login Here</Text>
          <Text className='text-2xl font-bold mt-3'>Welcome back you've been missed!</Text>
        </View>
        <View className='mt-5 p-2'>
          <Text className='text-slate-600 font-bold text-sm ml-4'>Tipo Cuenta</Text>
          <TouchableOpacity activeOpacity={0.7} className='flex-row p-4 mt-2 bg-slate-300 text-gray-700 rounded-lg'
            onPress={() => { setIsOpen(!isOpen) }}>
            <Icon.Feather name='users' size={20} />
            <Text className='bg-slate-300 text-gray-600 font-bold text-lg rounded-lg ml-4'>{values.title}</Text>
          </TouchableOpacity>

          {/* //input */}
          <Input label='Full name' error={errors.fullname} onFocus={() => { handleError(null, 'fullname') }} value={fullname} onChangeText={(value) => handleOnChageText(value, 'fullname')} autoCapitalize='none' iconName='user' placeholder='Jhon Smith' />
          <Input label='email' error={errors.email} onFocus={() => { handleError(null, 'email') }} value={email} onChangeText={(value) => handleOnChageText(value, 'email')} autoCapitalize='none' iconName='user' placeholder='Jhon Smith' />
          <Input label='password' iconName='user' placeholder='Jhon Smith' error={errors.password} password onFocus={() => { handleError(null, 'password') }} value={password} onChangeText={(value) => handleOnChageText(value, 'password')} />
        </View>
        <TouchableOpacity activeOpacity={0.7} className='py-3 mt-11 bg-purple-800 rounded-xl' onPress={validate}>
          <Text className='text-xl font-bold text-center text-white'>Registrar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  )
}



// {/* <View className='mt-5 p-2'>
//           <Text className='text-slate-600 font-bold text-sm ml-4'>Tipo Cuenta</Text>
//           <TouchableOpacity activeOpacity={0.7} className='flex-row p-3 mt-2 bg-slate-300 text-gray-700 rounded-lg'
//             onPress={() => { setIsOpen(!isOpen) }}>
//             <Icon.Feather name='users' size={20} />
//             <Text className='bg-slate-300 text-gray-600 font-bold text-sm rounded-lg ml-4'>{values.title}</Text>
//           </TouchableOpacity>

//           {/* //input */}
//           <Input label='Full name' error={errors.fullname} onFocus={() => { handleError(null, 'fullname') }} value={fullname} onChangeText={(value) => handleOnChageText(value, 'fullname')} autoCapitalize='none' iconName='user' placeholder='Jhon Smith' />
//           <Input label='email' error={errors.email} onFocus={() => { handleError(null, 'email') }} value={email} onChangeText={(value) => handleOnChageText(value, 'email')} autoCapitalize='none' iconName='user' placeholder='Jhon Smith' />
//           <Input label='password' iconName='user' placeholder='Jhon Smith' error={errors.password} password onFocus={() => { handleError(null, 'password') }} value={password} onChangeText={(value) => handleOnChageText(value, 'password')} />
//         </View>
//         <TouchableOpacity activeOpacity={0.7} className='py-3 mt-11 bg-purple-800 rounded-xl' onPress={validate}>
//           <Text className='text-xl font-bold text-center text-white'>Registrar</Text>
//         </TouchableOpacity>  */}

export default Sign_In