import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Dimensions, Alert, Platform, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Icon from '@expo/vector-icons';
import avatar from '../../../../assets/addImageEvents.png'
import Input from '../../../components/Input';
import { saveEvent, updateUserId } from '../../../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import Camara from '../../../components/Camara';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
// import 'moment/locale/es'; // Importa el idioma español para moment.js



const FromEvents = ({ navigation }) => {

    const { height, width } = Dimensions.get('window');

    const [Open, setOpen] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [image, setImage] = useState(null)
    const [tipo, setTipo] = useState('')
    const [nameEvent, setNameEvent] = useState('')
    const [nameDescription, setNameDescription] = useState('')
    const [aforo, setAforo] = useState('')
    const [precio, setPrecio] = useState('')
    const [Lugar, setLugar] = useState('')

    const [dateInicial, setDateInicial] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false)


    const [hoursInicial, setHoursInicial] = useState(new Date());
    const [showDatePicker2, setShowDatePicker2] = useState(false)


    const [dateFinal, setDateFinal] = useState(new Date());
    const [showDatePicker3, setShowDatePicker3] = useState(false)

    const [hoursFinal, setHoursFinal] = useState(new Date());
    const [showDatePicker4, setShowDatePicker4] = useState(false)


    //estado para controlar los input
    const [values_us, setValues_us] = useState({
        documentType: '',
        fullName: '',
        emailAddress: '',
        address: '',
        typeofpopulation: '',
    });

    const handleOnChageText_us = (value, fieldName) => {
        setValues_us({ ...values_us, [fieldName]: value })
    }


    const handleDateChangeDateInitial = (event, selectedDate) => {
        const currentDate = selectedDate || dateInicial;
        setShowDatePicker(!showDatePicker)
        setDateInicial(currentDate);
    };

    const handleDateChangeDateFinal = (event, selectedDate) => {
        const currentDate = selectedDate || dateFinal;
        setShowDatePicker3(!showDatePicker3)
        setDateFinal(currentDate);
    };


    const handleDateChangeHoursInitial = (event, selectedDate) => {
        const currentDate = selectedDate || hoursInicial;
        setShowDatePicker2(!showDatePicker2);
        setHoursInicial(currentDate);
    };
    const handleDateChangeHoursFinal = (event, selectedDate) => {
        const currentDate = selectedDate || hoursFinal;
        setShowDatePicker4(!showDatePicker4);
        setHoursFinal(currentDate);
    };

    const dataItem = [
        { id: 1, tipo: 'Educativo' },
        { id: 2, tipo: 'Religioso' },
        { id: 3, tipo: 'Social' },
        { id: 4, tipo: 'Cultural' },
        { id: 5, tipo: 'Musical' },
        { id: 6, tipo: 'Deportivo' },
        { id: 7, tipo: 'Festival' },
        { id: 8, tipo: 'Feria' },
        { id: 9, tipo: 'Exposición' },
    ]



    const handleSubmit = async () => {

        const data = {
            nombreEvento: nameEvent,
            descripcion: nameDescription,
            imagen: image,
            fecha_inicio: moment(dateInicial).format('DD/MM/YYYY') + ':' + moment(hoursInicial).format('LT'),
            fecha_final: moment(dateFinal).format('DD/MM/YYYY') + ':' + moment(hoursFinal).format('LT'),
            lugar: Lugar,
            id_organizacion: '',
            id_tipo_evento: ''
        }

        console.log(data);

        await saveEvent(data)
            .then((response) => {
                console.log(response.data.message);
            }).catch((err) => {
                console.log(err.response.data.errors);
            })
    }

    return (
        <SafeAreaView className='flex-1'>
            {/* ventada de escoger tipo de documento */}
            {Open &&
                <TouchableOpacity className='absolute justify-center  items-center z-40' style={{ height, width, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={() => setOpen(false)}>
                    <View className='sm:w-72 sm:h-auto lg:w-[500px] lg:h-72 justify-center items-center bg-white rounded-xl'>
                        {
                            dataItem.map((item) => (
                                <TouchableOpacity className='sm:w-32 sm:h-12 lg:w-96 lg:h-24 border-b border-gray-400'
                                    onPress={() => { setTipo(item.tipo), setOpen(false) }} key={item.id}>
                                    <Text className=' text-gray-600 font-bold text-sm lg:text-2xl m-auto rounded-lg'>{item.tipo}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </TouchableOpacity>
            }

            {showDatePicker && (
                <DateTimePicker
                    value={dateInicial}
                    mode="date"
                    display="default"
                    onChange={handleDateChangeDateInitial}
                />
            )}

            {showDatePicker2 && (
                <DateTimePicker
                    value={hoursInicial}
                    mode="time"
                    display="default"
                    onChange={handleDateChangeHoursInitial}
                />
            )}

            {showDatePicker3 && (
                <DateTimePicker
                    value={dateFinal}
                    mode="date"
                    display="default"
                    onChange={handleDateChangeDateFinal}
                />
            )}

            {showDatePicker4 && (
                <DateTimePicker
                    value={hoursFinal}
                    mode="time"
                    display="default"
                    onChange={handleDateChangeHoursFinal}
                />
            )}

            <ScrollView contentContainerStyle={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>

                <TouchableOpacity onPress={() => setVisibility(!visibility)}>
                    <View className='sm:h-[250px] sm:w-[380px] rounded-2xl'>
                        <Image source={!image ? avatar : { uri: image }} className='w-full h-full rounded-2xl' />
                    </View>
                </TouchableOpacity>


                <View className='flex-1 w-full h-full' style={{ paddingBottom: 70 }}>

                    <View className='sm:my-2 lg:my-3'>
                        <Text className='font-bold sm:text-base lg:text-xl sm:top-2 ml-4 ' style={{ fontWeight: '900', color: '#202020' }}>Nombre del Evento</Text>
                        <View className={`flex-row items-center p-3 sm:h-[50px] sm:top-3 lg:h-16 lg:top-3 bg-gray-300 rounded-lg`}>
                            <TextInput
                                className='flex-1 font-bold text-xl pl-2'
                                style={{ color: '#202020' }}
                                cursorColor='#8A2BE2'
                                autoCorrect={false}
                                onChangeText={(text) => setNameEvent(text)}
                                placeholder='Enter correo'
                            />
                        </View>
                    </View >

                    <View className='sm:my-2 lg:my-3 flex-row justify-between'>
                        <TouchableOpacity className='justify-center items-center' >
                            <Text className='font-bold sm:text-base lg:text-xl sm:top-2 ' style={{ fontWeight: '900', color: '#202020' }}>Fecha Inicial:</Text>
                            <TouchableOpacity className={`flex-row items-center p-3 sm:h-[50px] sm:w-[180px] sm:top-3 lg:h-16 lg:top-3 bg-gray-300 rounded-lg`} onPress={() => setShowDatePicker(!showDatePicker)}>
                                <Text className='text-lg font-bold'>{dateInicial.toLocaleDateString()}</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity className='justify-center items-center' >
                            <Text className='font-bold sm:text-base lg:text-xl sm:top-2 ' style={{ fontWeight: '900', color: '#202020' }}>Hora: </Text>
                            <TouchableOpacity className={`flex-row items-center p-3 sm:h-[50px] sm:w-[180px] sm:top-3 lg:h-16 lg:top-3 bg-gray-300 rounded-lg`} onPress={() => setShowDatePicker2(!showDatePicker2)}>
                                <Text className='text-lg font-bold'>{moment(hoursInicial).format('LT')}</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View >

                    <View className='sm:my-2 lg:my-3 flex-row justify-between'>
                        <View className='justify-center items-center'>
                            <Text className='font-bold sm:text-base lg:text-xl sm:top-2 ' style={{ fontWeight: '900', color: '#202020' }}>Fecha Final: </Text>
                            <TouchableOpacity className={`flex-row items-center p-3 sm:h-[50px] sm:w-[180px] sm:top-3 lg:h-16 lg:top-3 bg-gray-300 rounded-lg`} onPress={() => setShowDatePicker3(!showDatePicker3)}>
                                <Text className='text-lg font-bold'>{dateFinal.toLocaleDateString()}</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='justify-center items-center'>
                            <Text className='font-bold sm:text-base lg:text-xl sm:top-2 ' style={{ fontWeight: '900', color: '#202020' }}>Hora:</Text>
                            <TouchableOpacity className={`flex-row items-center p-3 sm:h-[50px] sm:w-[180px] sm:top-3 lg:h-16 lg:top-3 bg-gray-300 rounded-lg`} onPress={() => setShowDatePicker4(!showDatePicker4)}>
                                <Text className='text-lg font-bold'>{moment(hoursFinal).format('LT')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <Text className='font-bold sm:text-base lg:text-xl ml-4 sm:mt-3' style={{ color: '#202020' }}>Tipo de Evento</Text>
                    <TouchableOpacity activeOpacity={0.7} className={`flex-row items-center p-3 sm:h-[54px] sm:top-1 lg:h-16 lg:mt-3 bg-gray-300 text-gray-700 rounded-lg`}
                        onPress={() => { setOpen(!Open) }}>
                        <Text className='font-bold text-lg rounded-lg ml-4' style={{ color: '#202020' }}>{tipo ? tipo : 'Tipo de Evento'}</Text>
                    </TouchableOpacity>

                    <View className='sm:my-2 lg:my-3'>
                        <Text className='font-bold sm:text-base lg:text-xl sm:top-2 ml-4 ' style={{ fontWeight: '900', color: '#202020' }}>Descripción del evento</Text>
                        <TextInput
                            className={`text-xl items-center sm:top-3 lg:top-3 bg-gray-300 rounded-lg`}
                            placeholder="Escribe una descripción del evento..."
                            multiline
                            numberOfLines={2}
                            onChangeText={(text) => setNameDescription(text)}
                            // value={description}
                            style={{
                                borderColor: 'gray',
                                borderRadius: 5,
                                paddingHorizontal: 10,
                                paddingTop: 5,
                                paddingBottom: 10,
                            }}
                        />
                    </View >

                    <View className='sm:my-2 lg:my-3 flex-row justify-between'>
                        <View className='justify-center items-center' >
                            <Text className='font-bold sm:text-base lg:text-xl sm:top-2 ' style={{ fontWeight: '900', color: '#202020' }}>Aforo:</Text>
                            <View className={`flex-row items-center p-3 sm:h-[50px] sm:w-[180px] sm:top-3 lg:h-16 lg:top-3 bg-gray-300 rounded-lg`} onPress={() => setShowDatePicker(!showDatePicker)}>
                                <TextInput
                                    className='flex-1 font-bold text-xl pl-2'
                                    style={{ color: '#202020' }}
                                    cursorColor='#8A2BE2'
                                    autoCorrect={false}
                                    onChangeText={(text) => setAforo(text)}
                                    placeholder='Enter correo'
                                />
                            </View>
                        </View>
                        <View className='justify-center items-center' >
                            <Text className='font-bold sm:text-base lg:text-xl sm:top-2 ' style={{ fontWeight: '900', color: '#202020' }}>precio: </Text>
                            <View className={`flex-row items-center p-3 sm:h-[50px] sm:w-[180px] sm:top-3 lg:h-16 lg:top-3 bg-gray-300 rounded-lg`} onPress={() => setShowDatePicker(!showDatePicker)}>
                                <TextInput
                                    className='flex-1 font-bold text-xl pl-2'
                                    style={{ color: '#202020' }}
                                    cursorColor='#8A2BE2'
                                    autoCorrect={false}
                                    onChangeText={(text) => setPrecio(text)}
                                    placeholder='Enter correo'
                                />
                            </View>
                        </View>
                    </View >


                    <View className='sm:my-2 lg:my-3'>
                        <Text className='font-bold sm:text-base lg:text-xl sm:top-2 ml-4 ' style={{ fontWeight: '900', color: '#202020' }}>Lugar: </Text>
                        <View className={`flex-row items-center p-3 sm:h-[50px] sm:top-3 lg:h-16 lg:top-3 bg-gray-300 rounded-lg`}>
                            <Icon.Feather
                                name='smartphone'
                                // size={20}
                                color='#6C5CE7'
                                className='mr-2 sm:text-xl lg:text-3xl'
                            />
                            <TextInput
                                className='flex-1 font-bold text-xl pl-2'
                                style={{ color: '#202020' }}
                                cursorColor='#8A2BE2'
                                autoCorrect={false}
                                onChangeText={(text) => setLugar(text)}
                                placeholder='Enter correo'
                            />
                        </View>
                    </View >


                </View>
            </ScrollView>
            <View className={`absolute bottom-0 left-0 right-0 py-4 rounded-xl bg-[#6C5CE7] shadow-xl`}>
                <TouchableOpacity activeOpacity={0.7} className={``} onPress={handleSubmit}>
                    <Text className='text-xl font-bold text-center text-white'>Actualizar</Text>
                </TouchableOpacity>
            </View>
            {
                visibility &&
                <Camara image={image} setImage={setImage} setVisibility={setVisibility} visibility={visibility} />
            }
        </SafeAreaView>
    )
}

export default FromEvents