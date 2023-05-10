import { View, Text, Dimensions, TouchableOpacity, Image, PixelRatio } from 'react-native'
import user from "../../../assets/User.png";
import organizacion from "../../../assets/organizacion.png";
import Input from '../../components/Input';
import { useState } from 'react'
import * as Icon from '@expo/vector-icons';
import Loading from '../../components/Loading';
import * as Animatable from "react-native-animatable";
import { validationSchemaUser, validationSchemaOrg } from '../../utils/validate';
import { saveUser } from "../../api/api"
import Splash from '../../components/Splash';


const Sign_In = ({ navigation }) => {
  const { height, width } = Dimensions.get('window')
  const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(width);

  // console.log(pixelWidth);

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
      setTimeout(() => {
        setMessage('')
      }, 3500);
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
      <Splash visible={isLoading} />

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
      {/* style={{ paddingBottom: 44, paddingStart: 16, paddingEnd: 16 }} */}

      {/* header de form purple */}
      <View className='flex-row h-52 pb-16 pl-10 pr-10 rounded-b-2xl bg-[#6C5CE7]'>
        {/* ir al login */}
        <View className='flex-1 flex-row items-center justify-between'>
          <TouchableOpacity activeOpacity={0.7} className={`sm:p-3 lg:p-4 flex-row items-center rounded-tr-2xl rounded-bl-2xl sm:ml-4 lg:ml-16 bg-[#5A6170]`} onPress={() => navigation.navigate('Sign_up')}>
            <Icon.AntDesign name="arrowleft" size={15} color="white" />
            <Text className='text-white font-bold text-lg left-1'>Login</Text>
          </TouchableOpacity>
          {/* message */}
          <Text className='font-bold sm:text-xl lg:text-3xl text-white sm:right-4 lg:right-10'>Welcome Register</Text>
        </View>
      </View>

      {/* formlario */}
      <Animatable.View animation='fadeInUpBig' className='bg-white sm:h-[688px] pl-[18] pr-[18] -mt-20 ml-5 mr-5 rounded-3xl'>

        {/* seleciona tipo de usuario */}
        <Text className='sm:text-base lg:text-3xl font-bold text-center sm:top-1 lg:top-4' style={{ color: '#202020' }}>Tipo de Cuenta</Text>

        <View className='flex-row justify-around sm:top-3 lg:mt-10'>
          {/* ${width > 392.72727272727275 ? 'w-24 h-20' : 'w-20 h-16'} */}
          <TouchableOpacity activeOpacity={0.7} className={`flex-col items-center sm:w-20 sm:h-16 lg:w-60 lg:h-40  ${!isOpen && 'sm:border-2 lg:border-4 border-purple-800 rounded-lg'}`} onPress={ViewUser}>
            <Image source={user} resizeMode='contain' className='w-full h-full rounded' />
            <Text className={`top-2 sm:text-xs lg:text-2xl font-bold`} style={{ color: '#202020' }}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} className={`flex-col items-center sm:w-20 sm:h-16 lg:w-60 lg:h-40 ${isOpen && 'sm:border-2 smborder-purple-800 rounded-lg'}`} onPress={ViewOrg}>
            <Image source={organizacion} resizeMode='contain' className='w-full h-full rounded' />
            <Text className={`top-2 sm:text-xs lg:text-2xl font-bold`} style={{ color: '#202020' }}>Organization</Text>
          </TouchableOpacity>
        </View>

        {/* View de input */}
        <View className='flex-1 top-12'>
          {!isOpen ?
            <>

              {/* Select tipo de documento */}
              <Text className='font-bold sm:text-base lg:text-xl ml-4' style={{ color: '#202020' }}>Tipo Documento</Text>
              <TouchableOpacity activeOpacity={0.7} className={`flex-row items-center p-3 sm:h-12 sm:top-1 lg:h-16 lg:mt-3 bg-gray-300 text-gray-700 rounded-2xl`}
                onPress={() => { setOpen(!Open) }}>
                <Icon.Feather name='users' color='#642AB8' className='sm:text-xl lg:text-3xl' />
                <Text className='font-bold text-lg rounded-lg ml-4' style={{ color: '#202020' }}>{values_us.documentType ? values_us.documentType : 'Tipo de documento'}</Text>
              </TouchableOpacity>

              {/* input */}
              <Input label='document number' value={values_us.documentNumber} keyboardType="decimal-pad" onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'documentNumber')} iconName='phone' placeholder='Enter Number' />
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
          <View className='items-center top-4'>
            {errors && <Text className={`text-red-800 ml-3  ${width > 392.72727272727275 ? 'text-xl' : 'text-base'} font-bold`}>{errors}</Text>}
          </View>
          <View className='items-center top-4'>
            {message && <Text className={`text-green-800 ml-3  ${width > 392.72727272727275 ? 'text-xl' : 'text-base'} font-bold`}>{message}</Text>}
          </View>


          {/* button */}
          {!isOpen ?
            <View className='items-center'>
              {/* ${width > 392.72727272727275 ? 'mt-1 py-4' : 'mt-2 py-3'} */}
              <TouchableOpacity activeOpacity={0.7} className={`sm:top-16 sm:py-3 sm:w-80 lg:mt-2 lg:py-6 rounded-xl bg-[#6C5CE7]`} onPress={validateDateUser}>
                <Text className='sm:text-xl lg:text-2xl font-bold text-center text-white'>Registrar_user</Text>
              </TouchableOpacity>
            </View>
            :
            <>
              <TouchableOpacity activeOpacity={0.7} className={`sm:mt-2 sm:py-3 lg:mt-2 lg:py-6   rounded-xl bg-[#6C5CE7]`} onPress={validateDateOrg}>
                <Text className='sm:text-xl lg:text-2xl font-bold text-center text-white'>Registrar_org</Text>
              </TouchableOpacity>
            </>
          }
        </View>
      </Animatable.View>
    </View>
  )
}
export default Sign_In