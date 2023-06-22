import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, StyleSheet, Animated } from 'react-native'
import Input from '../components/Input/Input';
import { useEffect, useState } from 'react'
import * as Icon from '@expo/vector-icons';
import { validationSchemaUser, validationSchemaOrg } from '../utils/validate';
import { saveUser, saveOrg } from "../api/api"
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { light, sizes, spacing } from '../constants/theme';


const Sign_Up = ({ navigation }) => {

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
    image_url: 'https://res.cloudinary.com/centroconveciones/image/upload/v1686668335/meamjbp3t0unhclqrpbh.jpg'
  });

  const [values_org, setValues_org] = useState({
    organization_name: '',
    address_organization: '',
    email_organization: '',
    numero_telefono: '',
    organization_password: '',
    device: 'movil',
    image_url: 'https://res.cloudinary.com/centroconveciones/image/upload/v1686668335/meamjbp3t0unhclqrpbh.jpg'
  })

  //para capturar los el valor de los input
  const handleOnChageText_us = (value, fieldName) => {
    setErrors(false)
    setValues_us({ ...values_us, [fieldName]: value })
  }

  const handleOnChageText_org = (value, fieldName) => {
    setErrors(false)
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
      image_url: 'https://res.cloudinary.com/centroconveciones/image/upload/v1686668335/meamjbp3t0unhclqrpbh.jpg'
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
      image_url: 'https://res.cloudinary.com/centroconveciones/image/upload/v1686668335/meamjbp3t0unhclqrpbh.jpg'
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
    <SafeAreaView style={{ flex: 1, backgroundColor: light.white }}>

      {/* ventada de escoger tipo de documento */}
      {Open &&
        <TouchableOpacity style={styles.modalSelect} onPress={() => setOpen(false)}>
          <View style={styles.modals}>
            <TouchableOpacity style={styles.buttonSelect} onPress={() => {
                setValues_us({ ...values_us, documentType: 'Cédula de Ciudadanía' }),
                  setOpen(false)
              }}>
              <Text style={{ fontSize: wp('5%'), color: light.gray, fontWeight: 'bold' }}>Cédula de Ciudadanía</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSelect}
              onPress={() => { setValues_us({ ...values_us, documentType: 'Tarjeta de identidad' }), setOpen(false) }}>
              <Text style={{ fontSize: wp('5%'), color: light.gray, fontWeight: 'bold' }}>Tarjeta de Identidad</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      }
      <ScrollView contentContainerStyle={{ paddingTop: hp('1'), paddingHorizontal: wp('5') }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Welcome')}>
            <Icon.AntDesign name='left' style={{ fontSize: wp('7'), color: light.purple }} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Registrar</Text>
        </View>

        <Text style={styles.text}>Bienvenido, selecciona tu tipo de cuenta</Text>

        <View style={styles.selectButtom}>
          <TouchableOpacity activeOpacity={0.7} style={[styles.buttomOne, !isOpen && { backgroundColor: light.purple }]} onPress={ViewUser}>
            <Text style={[styles.textOne, !isOpen && { color: light.white }]}>Usuario</Text>
          </TouchableOpacity >
          <TouchableOpacity activeOpacity={0.7} style={[styles.buttomTwo, isOpen && { backgroundColor: light.purple }]} onPress={ViewOrg}>
            <Text style={[styles.textOne, isOpen && { color: light.white }]}>Organización</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: hp('1') }}>
          {!isOpen ?
            <>
              <Text style={styles.textLabel}>Tipo de Documento</Text>
              <TouchableOpacity activeOpacity={0.7} style={styles.selectType}
                onPress={() => { setOpen(!Open) }}>
                <Icon.Feather name='users' size={20} style={{ color: light.purple }} />
                <Text style={styles.textSelect}>{values_us.documentType ? values_us.documentType : 'Tipo de documento'}</Text>
              </TouchableOpacity>
              <Input label='numero de documento' value={values_us.documentNumber} keyboardType="phone-pad" onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'documentNumber')} iconName='phone' placeholder='Enter Number' />
              <Input label='nombre completo' value={values_us.fullName} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'fullName')} iconName='user' placeholder='Enter Nombre Completo' />
              <Input label='email' value={values_us.emailAddress} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')} iconName='mail' placeholder='Enter correo' />
              <Input label='contraseña' value={values_us.password} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'password')} password iconName='lock' placeholder='Enter password' />
            </> :
            <View style={{ bottom: hp('1') }}>
              <Input label='nombre de organizacion' value={values_org.organization_name} onChangeText={(value) => handleOnChageText_org(value, 'organization_name')} onFocus={() => setErrors('')} iconName='user' placeholder='Jhon Smith' />
              <Input label='Direccion' value={values_org.address_organization} onChangeText={(value) => handleOnChageText_org(value, 'address_organization')} onFocus={() => setErrors('')} iconName='user' placeholder='Jhon Smith' />
              <Input label='email' value={values_org.email_organization} onChangeText={(value) => handleOnChageText_org(value, 'email_organization')} onFocus={() => setErrors('')} iconName='mail' placeholder='Jhon Smith' />
              <Input label='Numero telefono' value={values_org.numero_telefono} onChangeText={(value) => handleOnChageText_org(value, 'numero_telefono')} keyboardType='numeric' onFocus={() => setErrors('')} iconName='phone' placeholder='320145++++' />
              <Input label='Contraseña' value={values_org.organization_password} onChangeText={(value) => handleOnChageText_org(value, 'organization_password')} onFocus={() => setErrors('')} password iconName='lock' placeholder='Jhon Smith' />
            </View>
          }

          <View style={{ top: hp('1'), alignItems: 'center' }}>
            {errors && <Text style={styles.textError}>{errors}</Text>}
          </View>
          <View className='items-center' style={{ top: hp('1'), alignItems: 'center' }}>
            {message && <Text style={styles.texMessage}>{message}</Text>}
          </View>

          <TouchableOpacity disabled={isLoading} activeOpacity={0.8} style={[styles.buttomSend, isOpen ? { marginTop: hp('1'), } : { marginTop: hp('2'), }]} onPress={() => { !isOpen ? validateData(1) : validateData(2) }}>
            {isLoading ?
              <ActivityIndicator size="large" color='#ffff' /> :
              <Text style={styles.buttomText}>Registrar</Text>
            }
          </TouchableOpacity>

          <View style={{ marginTop: hp('1'), flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: hp('2.7'), fontWeight: 'bold' }}>Ya tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign_In')}>
              <Text style={{ fontSize: hp('2.7'), color: light.purple, fontWeight: 'bold' }}>¡Inicia Sesión!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}
export default Sign_Up

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
    fontSize: hp('2.3'),
    fontWeight: '700',
    marginTop: hp('2'),
    color: light.black,
    textAlign: 'center'
  },
  selectButtom: {
    flex: 1,
    height: hp('7.5'),
    marginTop: hp('1'),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: sizes.radius
  },
  buttomOne: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: hp('6.7'),
    borderTopLeftRadius: sizes.radius,
    borderBottomLeftRadius: sizes.radius,
    borderColor: light.purple,
    borderWidth: 1,
  },
  textOne: {
    fontSize: sizes.h3 + 3,
    fontWeight: 'bold',

  },
  buttomTwo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: hp('6.7'),
    borderTopRightRadius: sizes.radius,
    borderBottomRightRadius: sizes.radius,
    borderColor: light.purple,
    borderWidth: 1,
  },
  textLabel: {
    color: light.black,
    fontSize: wp('4.5'),
    fontWeight: 'bold',
    marginLeft: spacing.m - 6,
  },
  selectType: {
    height: hp('7'),
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginTop: 2,
    backgroundColor: light.lightGray,
    borderRadius: sizes.radius,
  },
  textSelect: {
    color: light.gray,
    fontSize: hp('2.4'),
    fontSize: wp('5'),
    fontWeight: 'bold',
    paddingLeft: spacing.s + 4,
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
  modalSelect: {
    height: sizes.height,
    width: sizes.width,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1
  },
  modals: {
    width: wp('75%'),
    height: hp('22'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: light.white,
    borderRadius: sizes.radius
  },
  buttonSelect: {
    // bottom-0 justify-center items-center border-b border-gray-400
    width: wp('50%'), 
    height: hp('7'),
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: light.lightGray,
    borderBottomWidth: 2
  }


})