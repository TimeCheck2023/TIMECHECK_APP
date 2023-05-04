import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import user from "../../../assets/user.png";
import organizacion from "../../../assets/organizacion.png";
import Input from '../../components/Input';
import { useState } from 'react'
import * as Icon from '@expo/vector-icons';
import Loading from '../../components/Loading';
import * as Animatable from "react-native-animatable";
import { validationSchemaUser, validationSchemaOrg } from '../../utils/validate';
import { saveUser } from "../../api/api"


const Sign_In = ({ navigation }) => {
  const { height, width } = Dimensions.get('window')

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
    fullName: '',
    address: '',
    emailAddress: '',
    password: '',
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
    });
    setErrors('');
  }

  const ViewOrg = () => {
    setIsOpen(true);
    setValues_org({
      fullName: '',
      address: '',
      emailAddress: '',
      password: '',
    });
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
          setIsLoading(false)
        }).catch((error) => {
          const errorMessage1 = error.response.data.error;
          setErrors(errorMessage1)
          setIsLoading(false)
        });
    } catch (error) {
      const errorMessage = error.errors[0];
      setErrors(errorMessage)
    };

  }

  const validateDateOrg = async () => {
    try {
      await validationSchemaOrg.validate(values_org, { abortEarly: false })

    } catch (error) {
      const errorMessage = error.errors[0];
      setErrors(errorMessage)
    }
  }


  return (
    <View className='flex-1'>
      {/* loading al enviar los datos */}
      <Loading visible={isLoading} />

      {/* ventada de escoger tipo de documento */}
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
      {/* style={{ paddingBottom: 44, paddingStart: 16, paddingEnd: 16 }} */}

      {/* header de form purple */}
      <View className='flex-row h-52 pb-16 pl-10 pr-10 rounded-b-2xl' style={{ backgroundColor: '#202020' }}>
        {/* ir al login */}
        <View className='flex-1 flex-row items-center justify-between'>
          <TouchableOpacity activeOpacity={0.7} className={`flex-row items-center ${width > 392.72727272727275 ? 'p-4' : 'p-3'} rounded-tr-2xl rounded-bl-2xl ml-4`} style={{ backgroundColor: '#642AB8' }} onPress={() => navigation.navigate('Sign_up')}>
            <Icon.AntDesign name="arrowleft" size={15} color="white" />
            <Text className='text-white font-bold text-lg left-1'>Login</Text>
          </TouchableOpacity>
          {/* message */}
          <Text className='font-bold text-2xl text-white right-4'>Welcome Register</Text>
        </View>
      </View>

      {/* formlario */}
      <Animatable.View animation='fadeInUpBig' className='bg-white flex-1 pl-[18] pr-[18] -mt-20 ml-5 mr-5 rounded-3xl'>

        {/* seleciona tipo de usuario */}
        <Text className='text-lg font-bold text-center mt-2' style={{color:'#202020'}}>Tipo de Cuenta</Text>
        <View className='flex-row justify-around top-3'>
          <TouchableOpacity activeOpacity={0.7} className={`flex-col items-center ${width > 392.72727272727275 ? 'w-24 h-20' : 'w-20 h-16'} ${!isOpen && 'border-2 border-purple-800 rounded-lg'}`} onPress={ViewUser}>
            <Image source={user} resizeMode='cover' className='w-full h-full rounded' />
            <Text className={`top-2 ${width > 392.72727272727275 ? 'text-sm' : ' text-xs'} font-bold`} style={{color:'#202020'}}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} className={`flex-col items-center ${width > 392.72727272727275 ? 'w-24 h-20' : 'w-20 h-16'} ${isOpen && 'border-2 border-purple-800 rounded-lg'}`} onPress={ViewOrg}>
            <Image source={organizacion} resizeMode='cover' className='w-full h-full rounded' />
            <Text className={`top-2 ${width > 392.72727272727275 ? 'text-sm' : ' text-xs'} font-bold`} style={{color:'#202020'}}>Organization</Text>
          </TouchableOpacity>
        </View>

        {/* View de input */}
        <View className='flex-1 top-12'>
          {!isOpen ?
            <>

              {/* Select tipo de documento */}
              <Text className='font-bold text-base ml-4' style={{color:'#202020'}}>Tipo Documento</Text>
              <TouchableOpacity activeOpacity={0.7} className={`flex-row items-center p-3 ${width > 392.72727272727275 ? 'h-14' : 'h-12'} mt-2 bg-gray-300 text-gray-700 rounded-lg`}
                onPress={() => { setOpen(!Open) }}>
                <Icon.Feather name='users' size={20} color='#642AB8' />
                <Text className='font-bold text-lg rounded-lg ml-4' style={{color:'#202020'}}>{values_us.documentType ? values_us.documentType : 'Tipo de documento'}</Text>
              </TouchableOpacity>

              {/* input */}
              <Input label='document number' value={values_us.documentNumber} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'documentNumber')} iconName='phone' placeholder='Enter Number' />
              <Input label='fullName' value={values_us.fullName} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'fullName')} iconName='user' placeholder='Enter Nombre Completo' />
              <Input label='mail' value={values_us.emailAddress} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')} iconName='mail' placeholder='Enter correo' />
              <Input label='password' value={values_us.password} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'password')} password iconName='lock' placeholder='Enter password' />
            </>
            :
            <>
              <Input label='organization name`s' value={values_org.fullName} onChangeText={(value) => handleOnChageText_org(value, 'fullName')} onFocus={() => setErrors('')} iconName='user' placeholder='Jhon Smith' />
              <Input label='adress' value={values_org.address} onChangeText={(value) => handleOnChageText_org(value, 'address')} onFocus={() => setErrors('')} iconName='user' placeholder='Jhon Smith' />
              <Input label='mail' value={values_org.emailAddress} onChangeText={(value) => handleOnChageText_org(value, 'emailAddress')} onFocus={() => setErrors('')} iconName='mail' placeholder='Jhon Smith' />
              <Input label='password' value={values_org.password} onChangeText={(value) => handleOnChageText_org(value, 'password')} onFocus={() => setErrors('')} password iconName='lock' placeholder='Jhon Smith' />
            </>
          }

          {/* campo para mostrar el error */}
          <View className='items-center mt-4'>
            {errors && <Text className={`text-red-800 ml-3  ${width > 392.72727272727275 ? 'text-xl' : 'text-base'} font-bold`}>{errors}</Text>}
          </View>
          <View className='items-center mt-4'>
            {message && <Text className={`text-green-800 ml-3  ${width > 392.72727272727275 ? 'text-xl' : 'text-base'} font-bold`}>{message}</Text>}
          </View>


          {/* button */}
          {!isOpen ?
            <>
              <TouchableOpacity activeOpacity={0.7} className={`${width > 392.72727272727275 ? 'mt-1 py-4' : 'mt-2 py-3'}  rounded-xl`} style={{ backgroundColor: '#642AB8' }} onPress={validateDateUser}>
                <Text className='text-xl font-bold text-center text-white'>Registrar_user</Text>
              </TouchableOpacity>
            </>
            :
            <>
              <TouchableOpacity activeOpacity={0.7} className={`${width > 392.72727272727275 ? 'mt-6 py-4' : 'mt-2 py-3'}  rounded-xl`} style={{ backgroundColor: '#642AB8' }} onPress={validateDateOrg}>
                <Text className='text-xl font-bold text-center text-white'>Registrar_org</Text>
              </TouchableOpacity>
            </>
          }
        </View>
      </Animatable.View>
    </View>
  )
}
export default Sign_In