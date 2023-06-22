import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image, ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import imgGame from "../../../assets/image/password.png";
import Input from '../../components/Input/Input';
import { useState, useContext, useEffect, useCallback, } from 'react'
import * as Icon from '@expo/vector-icons';
import { userSchema } from '../../utils/validate';
import { auth, cambioPassword, cambioPasswordOlvidar } from "../../api/api";
import { AuthContext } from '../../context/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { light, sizes, spacing } from '../../constants/theme';

const ChagePassword = ({ navigation, route }) => {

    //hook para capturar los errores y respuestas http
    const [errors, setErrors] = useState(false)
    const [message, setMessage] = useState(false)

    const { id } = route.params
    console.log(id);

    const { userInfo } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false);
    const [contraseñaNueva, setContraseñaNueva] = useState('');
    const [contraseñaNuevaCon, setContraseñaNuevaCon] = useState('');


    //validamos los campos si hay error se lo mandamos al handleError
    const validateForm = async () => {
        if (contraseñaNueva !== contraseñaNuevaCon) {
            return setErrors("las contraseñas deben ser iguales");
        } else {
            const data = {
                password: contraseñaNueva,
                nro_documento_usuario: id
            }
            try {
                setIsLoading(true)
                const result = await cambioPasswordOlvidar(data)
                const message = result.data.message.Mensaje;
                console.log(message.Mensaje);
                setMessage('Contraseña cambiada exitosamente');
                setIsLoading(false)
                setContraseñaNueva('')
                setContraseñaNuevaCon('')
                setTimeout(() => {
                    navigation.navigate('Sign_In')
                }, 1000)
            } catch (error) {
                const errorMessage1 = error.response;
                console.log(errorMessage1);
                setErrors(errorMessage1)
                setIsLoading(false)
            }
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: light.white }}>
            <ScrollView contentContainerStyle={{ paddingTop: hp('2'), paddingHorizontal: wp('5') }}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                        <Icon.AntDesign name='left' style={{ fontSize: wp('7'), color: light.purple }} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Cambio de contraseña</Text>
                </View>


                <View className=''>
                    <Text style={styles.text}>Bienvenido!!</Text>
                    <View style={styles.containerImage}>
                        <Image source={imgGame} resizeMode='cover' style={styles.image} />
                    </View>
                </View>

                <View style={{ marginTop: hp('1.7') }}>
                    {/* input */}
                    <Input label='Nueva contraseña' value={contraseñaNueva} onFocus={() => setErrors('')} onChangeText={(text) => setContraseñaNueva(text)} password iconName='lock' placeholder='Ingresa nueva contraseña' />
                    <Input label='Confirmar contraseña' value={contraseñaNuevaCon} onFocus={() => setErrors('')} onChangeText={(text) => setContraseñaNuevaCon(text)} password iconName='lock' placeholder='confirma tu contraseña' />


                    <View style={{ top: hp('1'), alignItems: 'center' }}>
                        {errors && <Text style={styles.textError}>{errors}</Text>}
                    </View>
                    <View className='items-center' style={{ top: hp('1'), alignItems: 'center' }}>
                        {message && <Text style={styles.texMessage}>{message}</Text>}
                    </View>

                    <TouchableOpacity disabled={isLoading} activeOpacity={0.7}
                        style={[styles.buttomSend, { marginTop: hp('3'), }]}
                        onPress={validateForm}
                    >

                        {isLoading ?
                            <ActivityIndicator size="large" color='#ffff' /> :
                            <Text className='text-xl font-bold text-center text-white'>Cambiar contraseña</Text>
                        }

                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ChagePassword

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