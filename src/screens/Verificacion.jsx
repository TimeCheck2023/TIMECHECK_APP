import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import imgGame from "../../assets/verificar.png";
import { Platform } from 'react-native';
import { verificarCodigo } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Length = 4;

const Verificacion = ({ navigation }) => {

    const inputRefs = useRef([])
    const [focusedInput, setFocusedInput] = useState(null);
    const [inputValues, setInputValues] = useState([]);

    const handleSubmit = async () => {
        if (inputValues.length < Length) {
            console.log("Error", "Se necesitan 4 dígitos");
            return
        }
        try {

            const data = inputValues.join("");
            const objeto = new Object({
                "codigo": data
            })
            console.log(objeto);
            const result = await verificarCodigo(objeto)
            await AsyncStorage.removeItem('expirationTime')
            setTimeout(() => {
                navigation.navigate('Sign_In')
            }, 800);
            console.log(result.data);
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
        setFocusedInput(inputId);
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <AntDesign name="left" size={24} color="black" style={styles.iconHeader} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitle}>Verificacion de codigo</Text>
                    </View>
                    <View style={{ width: 20 }} />
                </View>
            </SafeAreaView>
            <View style={styles.content}>
                {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}> */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>¡Bienvenido!</Text>
                    <View style={{ width: 350, height: 220, marginTop: 23 }}>
                        <Image source={imgGame} resizeMode='contain' className='w-full h-full rounded-2xl' />
                    </View>
                    <Text style={styles.subTitle}>
                        Para acceder a todas las funciones de la aplicación, necesitamos verificar tu correo electrónico.
                        Por favor, revisa tu bandeja de entrada y proporciona el código de verificación a continuación:
                    </Text>
                    <View style={styles.otpWrape}>
                        {[...new Array(Length)].map((item, index) => (
                            <View style={[styles.otpButtom, {
                                backgroundColor: '#7969f2'
                            }]}
                                key={index}
                            >
                                <TextInput
                                    key={index}
                                    ref={ref => {
                                        if (ref && !inputRefs.current.includes(ref)) {
                                            inputRefs.current = [...inputRefs.current, ref];
                                        }
                                    }}
                                    style={[styles.textOpt, { color: '#fff' }]}
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
                    <View style={styles.buttomVerificar}>
                        <TouchableOpacity style={styles.buttom} onPress={handleSubmit}>
                            <Text style={styles.textButtom}>Verificar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {/* </KeyboardAvoidingView> */}
            </View>
        </View >
    )
}

export default Verificacion

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    headerTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#141414'
    },
    iconHeader: {
        color: '#141414'
    },
    content: {
        backgroundColor: '#6C5CE7',
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        marginTop: 10,
        paddingTop: 60,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    title: {
        textTransform: 'uppercase',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    subTitle: {
        color: '#a2b2fb',
        textAlign: 'justify',
        paddingVertical: 20,
        paddingHorizontal: 10,
        fontSize: 22,
        fontWeight: '700'
    },
    otpWrape: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'center',
    },
    otpButtom: {
        width: 75,
        height: 75,
        borderRadius: 60,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textOpt: {
        fontSize: 25,
        fontWeight: 'bold',
        flex: 1,
    },
    buttomVerificar: {
        alignItems: 'center',
        marginVertical: 30
    },
    buttom: {
        backgroundColor: '#dad5fc',
        paddingHorizontal: 30,
        paddingVertical: 20,
        width: '100%',
        alignItems: 'center',
        borderRadius: 10
    },
    textButtom: {
        color: '#6C5CE7',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }

})