import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import imgGame from "../../../assets/Sing_Up.png";
import Input from '../../components/Input/Input';
import { useState, useContext, useEffect, useCallback, useRef, } from 'react'
import * as Icon from '@expo/vector-icons';
import { userSchema } from '../../utils/validate';
import { auth, verificacionEmail } from "../../api/api";
import { AuthContext } from '../../context/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { light, sizes, spacing } from '../../constants/theme';

const Length = 4;

const ForgotPassword = ({ navigation }) => {

    //hook para capturar los errores y respuestas http
    const [errors, setErrors] = useState(false)
    const [message, setMessage] = useState(false)
    const [email, setEmail] = useState('')
    const inputRefs = useRef([])
    const [focusedInput, setFocusedInput] = useState(null);
    const [focusedColor, setFocusedColor] = useState(null);
    const [inputValues, setInputValues] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [id, setId] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    //estado para controlar los input
    const [values_us, setValues_us] = useState({
        emailAddress: '',
        password: '',
    });

    //para capturar los el valor de los input
    const handleOnChageText_us = (value, fieldName) => {
        setValues_us({ ...values_us, [fieldName]: value })
    }

    //validamos los campos si hay error se lo mandamos al handleError
    const validateForm = async () => {
        if (email === '') return console.log("Debes ingresar el correo")
        try {
            setIsLoading(true)
            const result = await verificacionEmail(email)
            const message = result.data;
            setCodigo(message.message.codigo);
            setId(message.message.id);
            setIsLoading(false)
            setIsVisible(true)
            setErrors('')
        } catch (error) {
            const errorMessage1 = error.response.data.error;
            setErrors(errorMessage1)
            setIsLoading(false)
        }
    }

    const handleSubmit = async () => {
        if (inputValues.length < Length) {
            console.log("Error", "Se necesitan 4 dígitos");
            return
        }
        try {

            const data = inputValues.join("");
            if (data === codigo) {
                navigation.navigate('ChangePassword', { id: id })
            } else {
                console.log("no igual");
            }
        } catch (error) {
            const errorMessage1 = error.response.data.error;
            console.log(errorMessage1);
        }
    }

    const handleChange = (text, index) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = text;
        setInputValues(newInputValues);
        if (text.length !== 0) {
            return inputRefs?.current[index + 1]?.focus()
        }

        return inputRefs?.current[index - 1]?.focus()
    }

    const handleBackspace = (event, index) => {
        const { nativeEvent } = event;
        if (nativeEvent.key === "Backspace") {
            handleChange('', index)
        }
    }


    const handleFocus = (inputId) => {
        setFocusedColor(inputId)
        setFocusedInput(inputId);
    };

    const handleBlur = () => {
        setFocusedColor(false)
        setFocusedInput(null);
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: light.white }}>
            <ScrollView contentContainerStyle={{ paddingTop: hp('2'), paddingHorizontal: wp('5') }}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Welcome')}>
                        <Icon.AntDesign name='left' style={{ fontSize: wp('7'), color: light.purple }} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Bienvenido!!</Text>
                </View>


                <View style={{ marginTop: hp('2') }}>
                    {/* <Text style={styles.text}>Bienvenido!!</Text> */}
                    <View style={styles.containerImage}>
                        <Image source={imgGame} resizeMode='cover' style={styles.image} />
                    </View>
                    <Text style={styles.textTwo}>Olvidaste tu contraseña, ¿verdad? No te preocupes, estamos aquí para ayudarte. Por favor, proporciona tu correo electrónico registrado para enviarte instrucciones de recuperación.</Text>
                </View>

                <View style={{ marginTop: hp('1.7') }}>
                    {/* input */}
                    {isVisible ?
                        <View style={styles.otpWrape}>
                            {[...new Array(Length)].map((item, index) => (
                                <View style={[styles.otpButtom, { backgroundColor: light.lightGray },
                                focusedColor === index && { borderWidth: 2, borderColor: light.purple }]}
                                    key={index}
                                >
                                    <TextInput
                                        key={index}
                                        ref={ref => {
                                            if (ref && !inputRefs.current.includes(ref)) {
                                                inputRefs.current = [...inputRefs.current, ref];
                                            }
                                        }}
                                        style={[styles.textOpt, { color: light.black }]}
                                        maxLength={1}
                                        contextMenuHidden
                                        selectTextOnFocus
                                        onFocus={() => handleFocus(index)}
                                        onBlur={handleBlur}
                                        // editable={!disabled}
                                        keyboardType='decimal-pad'
                                        testID={`OTPInput${index}`}
                                        onChangeText={text => handleChange(text, index)}
                                        onKeyPress={event => handleBackspace(event, index)}
                                    />
                                </View>
                            ))}
                        </View>
                        :
                        <Input label='Email' value={email} onFocus={() => setErrors('')} onChangeText={(text) => setEmail(text)} iconName='mail' placeholder='Ingresa tu Email' />
                    }


                    <View style={{ top: hp('1'), alignItems: 'center' }}>
                        {errors && <Text style={styles.textError}>{errors}</Text>}
                    </View>
                    <View className='items-center' style={{ top: hp('1'), alignItems: 'center' }}>
                        {message && <Text style={styles.texMessage}>{message}</Text>}
                    </View>

                    <TouchableOpacity disabled={isLoading} activeOpacity={0.7}
                        style={[styles.buttomSend, { marginTop: hp('3'), }]}
                        onPress={() => { isVisible ? handleSubmit() : validateForm() }}
                    >

                        {isLoading ?
                            <ActivityIndicator size="large" color='#ffff' /> :
                            <Text className='text-xl font-bold text-center text-white'>Login</Text>
                        }

                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgotPassword

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
    textTwo: {
        fontSize: hp('1.7'),
        fontSize: wp('5.5'),
        fontWeight: '500',
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
    otpWrape: {
        flexDirection: 'row',
        marginVertical: hp('1'),
        justifyContent: 'center',
    },
    otpButtom: {
        width: wp('18'),
        height: hp('9'),
        borderRadius: 60,
        marginHorizontal: wp('2'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textOpt: {
        fontSize: wp('5'),
        fontSize: hp('3'),
        fontWeight: 'bold',
        flex: 1,
    },
})