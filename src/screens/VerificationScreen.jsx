import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import * as Icon from '@expo/vector-icons';
import imgGame from "../../assets/verificar.png";
import { SafeAreaView } from 'react-native-safe-area-context';


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput } from 'react-native';
import { verificarCodigo } from '../api/api';


const VerificationScreen = ({ navigation }) => {
    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '' });

    const handle = async () => {
        try {
            const array = Object.values(otp);
            const valoresAgrupados = array.join('');
            const objeto = new Object({
                "codigo": valoresAgrupados
            })
            const result = await verificarCodigo(objeto)
            console.log(result.data);
        } catch (error) {
            const errorMessage1 = error.response.data.error;
            console.log(errorMessage1);
        }
    }
    return (
        <SafeAreaView className='flex-1'>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: hp('2'),
                    paddingHorizontal: wp('5')
                }}>
                <View className='flex-row items-center'>
                    <TouchableOpacity className='bg-slate-300 items-center justify-center rounded-lg' style={{ width: wp('12'), height: hp('6') }} onPress={() => navigation.navigate('Welcome')}>
                        <Icon.AntDesign name='left' color='#6C5CE7' style={{ fontSize: wp('7') }} />
                    </TouchableOpacity>
                    <Text className='left-4 text-black ' style={{ fontSize: wp('6.5'), fontWeight: '600' }}>Verificar cuenta</Text>
                </View>



                <View className='w-full items-center'>
                    <Text className='text-center text-black' style={{ fontSize: wp('6.5'), fontWeight: '900', marginTop: hp('3.5') }}>Welcome to our login</Text>
                    <View className='w-80 h-48 items-center mt-7 rounded-2xl' style={{ width: wp('90%'), height: hp('29%') }}>
                        <Image source={imgGame} resizeMode='contain' className='w-full h-full rounded-2xl' />
                    </View>
                </View>

                <View className='flex-1' style={{ marginTop: hp('1') }}>
                    <View
                        style={{
                            marginHorizontal: 20,
                            marginBottom: 20,
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>

                        <View className='' style={{ borderRadius: 5, borderWidth: 0.5, }}>
                            <TextInput
                                style={{ paddingHorizontal: 18, paddingVertical: 10, fontSize: 25, }}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={firstInput}
                                onChangeText={text => {
                                    setOtp({ ...otp, 1: text });
                                    text && secondInput.current.focus();
                                }}
                            />
                        </View>
                        <View className='' style={{ borderRadius: 5, borderWidth: 0.5, }}>
                            <TextInput
                                style={{ paddingHorizontal: 18, paddingVertical: 10, fontSize: 25, }}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={secondInput}
                                onChangeText={text => {
                                    setOtp({ ...otp, 2: text });
                                    text ? thirdInput.current.focus() : firstInput.current.focus();
                                }}
                            />
                        </View>
                        <View className='' style={{ borderRadius: 5, borderWidth: 0.5, }}>
                            <TextInput
                                style={{ paddingHorizontal: 18, paddingVertical: 10, fontSize: 25, }}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={thirdInput}
                                onChangeText={text => {
                                    setOtp({ ...otp, 3: text });
                                    text ? fourthInput.current.focus() : secondInput.current.focus();
                                }}
                            />
                        </View>
                        <View className='' style={{ borderRadius: 5, borderWidth: 0.5, }}>
                            <TextInput
                                style={{ paddingHorizontal: 18, paddingVertical: 10, fontSize: 25, }}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={fourthInput}
                                onChangeText={text => {
                                    setOtp({ ...otp, 4: text });
                                    !text && thirdInput.current.focus();
                                }}
                            />
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} className={`rounded-xl bg-[#6C5CE7] shadow-xl justify-center`} style={{ width: wp('90%'), height: hp('7%'), top: hp('3.4') }} onPress={handle}>
                        {/* {isLoading ?
                            <ActivityIndicator size="large" color='#ffff' /> : */}
                        <Text className='text-xl font-bold text-center text-white'>Verificar</Text>
                        {/* } */}
                    </TouchableOpacity>

                    <View className='flex-row justify-center' style={{ marginTop: hp('5') }}>
                        <Text className='font-bold' style={{ fontSize: hp('2.7') }}>Already have an account?  </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Sign_Up')}>
                            <Text className='text-[#6C5CE7] font-bold' style={{ fontSize: hp('2.7') }}>Sing Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default VerificationScreen