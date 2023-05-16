import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import * as Icon from '@expo/vector-icons';
import avatar from '../../../assets/Avatar.png'
import Input from '../../components/Input';

const FormUpdateUSer = ({ navigation }) => {

    const { height, width } = Dimensions.get('window');

    const [Open, setOpen] = useState(false);

    //estado para controlar los input
    const [values_us, setValues_us] = useState({
        documentType: '',
        documentNumber: '',
        fullName: '',
        emailAddress: '',
        password: '',
    });


    const handleOnChageText_us = () => {

    }


    return (
        <View className='flex-1 bg-white'>
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
            <ScrollView>
                <View className='pt-7 pb-16 pl-10 pr-10 bg-[#7560EE] rounded-b-2xl'>
                    <TouchableOpacity className='absolute w-[45px] h-[45px] left-4 top-10 items-center justify-center rounded-2xl'
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        onPress={() => navigation.goBack()}>
                        <Icon.AntDesign name="arrowleft" size={27} color="white" />
                    </TouchableOpacity>
                    <View className='items-center justify-center top-9'>
                        <View className='sm:w-[130px] sm:h-[130px] rounded-full shadow-purple-400'>
                            <Image source={avatar} className='w-[100%] h-[100%] rounded-full' />
                        </View>
                    </View>
                </View>
                <View className='flex-1 p-4' style={{ paddingHorizontal: 20 }}>
                    <Input label='nro_documento_usuario'
                        value={values_us.emailAddress}
                        onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')}
                        iconName='mail' placeholder='Enter correo'
                    />
                    <Text className='font-bold sm:text-base lg:text-xl ml-4 sm:mt-3' style={{ color: '#202020' }}>Tipo Documento</Text>
                    <TouchableOpacity activeOpacity={0.7} className={`flex-row items-center p-3 sm:h-[54px] sm:top-1 lg:h-16 lg:mt-3 bg-gray-300 text-gray-700 rounded-lg`}
                        onPress={() => { setOpen(!Open) }}>
                        <Icon.Feather name='users' color='#642AB8' className='sm:text-xl lg:text-3xl' />
                        <Text className='font-bold text-lg rounded-lg ml-4' style={{ color: '#202020' }}>{values_us.documentType ? values_us.documentType : 'Tipo de documento'}</Text>
                    </TouchableOpacity>
                    <Input label='nombre_completo_usuario'
                        value={values_us.emailAddress}
                        onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')}
                        iconName='mail' placeholder='Enter correo'
                    />
                    <Input label='direccion_usuario'
                        value={values_us.emailAddress}
                        onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')}
                        iconName='mail' placeholder='Enter correo'
                    />
                    <Input label='tipo_poblacion_usuario'
                        value={values_us.emailAddress}
                        onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')}
                        iconName='mail' placeholder='Enter correo'
                    />
                    <Input label='correo_usuario'
                        value={values_us.emailAddress}
                        onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')}
                        iconName='mail' placeholder='Enter correo'
                    />
                    <TouchableOpacity activeOpacity={0.7} className={`sm:mt-6 py-4 rounded-xl bg-[#6C5CE7] shadow-xl`}>
                        <Text className='text-xl font-bold text-center text-white'>Registrar_user</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default FormUpdateUSer