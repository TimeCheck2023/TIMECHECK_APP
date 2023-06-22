import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import imgGame from "../../../../assets/organization.png";
import Input from '../../../components/Input/Input';
import { useState, useContext } from 'react'
import * as Icon from '@expo/vector-icons';
import { auth, saveSubOrg, saveSubOrgUpdate } from "../../../api/api";
import { AuthContext } from '../../../context/AuthContext';

const FormSubOrgUpdate = ({navigation, route}) => {

    const { userInfo } = useContext(AuthContext)
    const { item } = route.params
    console.log(item);

    //hook para capturar los errores y respuestas http
    const [errors, setErrors] = useState(false)
    const [message, setMessage] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    //estado para controlar los input
    const [values_us, setValues_us] = useState({
        name_organization: item.nombre_suborganizacion,
        description_organization: item.descripcion_suborganizacion,
    });

    //para capturar los el valor de los input
    const handleOnChageText_us = (value, fieldName) => {
        setValues_us({ ...values_us, [fieldName]: value })
    }

    //validamos los campos si hay error se lo mandamos al handleError
    const validateForm = async () => {
        try {
            if (values_us.name_organization.length === 0) {
                setErrors('El nombre es obligatorio');
                return;
            } else if (values_us.description_organization.length === 0) {
                setErrors('La descripcion es obligatorio');
                return;
            }
            setIsLoading(true)
            await saveSubOrgUpdate(item.id_suborganizacion, values_us)
                .then(async (response) => {
                    const message = response.data;
                    console.log(message);
                    setIsLoading(false)
                    navigation.goBack()
                }).catch((error) => {
                    const errorMessage1 = error.response.data.error;
                    setErrors(errorMessage1)
                    setIsLoading(false)
                });
        } catch (error) {
            setIsLoading(false)
            setErrors(error.errors[0])
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-[#E8EAED]'>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: 30,
                    paddingHorizontal: 20
                }}>
                <View className='flex-row items-center'>
                    <TouchableOpacity className='w-9 h-9 bg-slate-300 items-center justify-center rounded-lg' onPress={() => navigation.goBack()}>
                        <Icon.AntDesign name='left' color='#6C5CE7' className='sm:text-xl lg:text-3xl' />
                    </TouchableOpacity>
                    <Text className='text-3xl left-4 text-black ' style={{ fontWeight: '900' }}>Home</Text>
                </View>



                <View className='w-full items-center'>
                    <Text className='text-xl text-center text-black font-bold mt-10'>Bienvenido al formulario para actualizar una subOrganización!</Text>
                    <View className='w-80 h-48 items-center mt-7 rounded-2xl'>
                        <Image source={imgGame} resizeMode='contain' className='w-full h-full rounded-2xl' />
                    </View>
                </View>

                <View className='flex-1 mt-6'>
                    {/* input */}
                    <Input label='nombre organización' value={values_us.name_organization} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'name_organization')} iconName='mail' placeholder='Nombre Organización' />
                    <Input label='descripción organización' value={values_us.description_organization} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'description_organization')} iconName='lock' placeholder='Descripción organización' />
                    {/* <Input label='password' value={values_us.password} onFocus={() => setErrors('')} onChangeText={(value) => handleOnChageText_us(value, 'password')} password iconName='lock' placeholder='Enter password' /> */}

                    <View className='items-center top-7'>
                        {errors && <Text className={`text-red-800 ml-3  text-xl font-bold`}>{errors}</Text>}
                    </View>

                    <TouchableOpacity disabled={isLoading} activeOpacity={0.7} className={`mt-10 py-4 rounded-xl bg-[#6C5CE7] shadow-xl`} onPress={validateForm}>
                        {isLoading ?
                            <ActivityIndicator size="large" color='#ffff' /> :
                            <Text className='text-xl font-bold text-center text-white'>Registro</Text>
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default FormSubOrgUpdate

// const styles = StyleSheet.create({})