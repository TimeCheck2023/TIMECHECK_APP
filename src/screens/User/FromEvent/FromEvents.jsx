import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Dimensions, Alert, Platform, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as Icon from '@expo/vector-icons';
import avatar from '../../../../assets/addImageEvents.png'
import Input from '../../../components/Input/Input';
import { saveEvent, updateUserId } from '../../../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import Camara from '../../../components/Camara';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from "moment";
import { AuthContext } from '../../../context/AuthContext';
// import 'moment/locale/es'; // Importa el idioma español para moment.js



const FromEvents = ({ navigation }) => {

    const { height, width } = Dimensions.get('window');

    const { userInfo } = useContext(AuthContext)

    const [Open, setOpen] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [image, setImage] = useState(null)
    const [error, setError] = useState('')
    const [tipo, setTipo] = useState('')
    const [nameEvent, setNameEvent] = useState('')
    const [nameDescription, setNameDescription] = useState('')
    const [aforo, setAforo] = useState('')
    const [precio, setPrecio] = useState('')
    const [Lugar, setLugar] = useState('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisibleFinal, setDatePickerVisibilityFinal] = useState(false);



    const [dateInicial, setDateInicial] = useState('');
    const [dateFinal, setDateFinal] = useState('');

    const showDatePickerInicial = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };

    const showDatePickerFinal = () => {
        setDatePickerVisibilityFinal(!isDatePickerVisibleFinal);
    };

    const handleConfirmInical = (date) => {
        console.log("A date has been picked: ", date);
        setDateInicial(date)
        // hideDatePicker();
    };
    const handleConfirmFinal = (date) => {
        console.log("A date has been picked: ", date);
        setDateFinal(date)
        // hideDatePicker();
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

    const handleSelectImage = async (e) => {

        if (image === null) {
            setError('La imagen es requerida')
            return
        } else if (nameEvent === '') {
            setError('La nombre es requerida')
            return
        } else if (dateInicial === '') {
            setError('La fecha Inicio es requerida')
            return
        } else if (dateFinal === '') {
            setError('La fecha Final es requerida')
            return
        } else if (Lugar === '') {
            setError('La lugar es requerida')
            return
        } else if (aforo === '') {
            setError('La aforo es requerida')
            return
        }
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "time_check");
        formData.append("cloud_name", "centroconveciones");
        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/centroconveciones/image/upload`,
                {
                    method: "POST",
                    body: formData,
                    headers: { "X-Requested-With": "XMLHttpRequest" },
                }
            );
            const data = await res.json();
            if (data.secure_url) {
                handleSubmit(data.secure_url)
            }
        } catch (error) {
            console.error(error);
        };
    }



    const handleSubmit = async (image) => {

        const data = {
            nombreEvento: nameEvent,
            descripcion: nameDescription,
            imagen: image,
            fecha_inicio: dateInicial,
            fecha_final: dateFinal,
            lugar: Lugar,
            aforo: aforo,
            id_suborganizacion: userInfo.id_suborganizacion,
            id_tipo_evento: 18
        }

        await saveEvent(data)
            .then((response) => {
                console.log("response.data.message");
                console.log(response.data.message);
            }).catch((err) => {
                console.log("err.response");
                console.log(err.response.data);
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

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirmInical}
                onCancel={showDatePickerInicial}
            />

            <DateTimePickerModal
                isVisible={isDatePickerVisibleFinal}
                mode="datetime"
                onConfirm={handleConfirmFinal}
                onCancel={showDatePickerFinal}
            />

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
                    <View className='sm:my-2 lg:my-3'>
                        <Text className='font-bold sm:text-base lg:text-xl sm:top-2 ml-4 ' style={{ fontWeight: '900', color: '#202020' }}>Fecha inicio: </Text>
                        <TouchableOpacity className={`flex-row items-center p-3 sm:h-[50px] sm:top-3 lg:h-16 lg:top-3 bg-gray-300 rounded-lg`} onPress={showDatePickerInicial}>
                            <Text>{dateInicial ? moment(dateInicial).format('DD/MM/YYYY HH:mm:ss') : 'DD/MM/YYYY HH:mm:ss'}</Text>
                        </TouchableOpacity>
                    </View >

                    <View className='sm:my-2 lg:my-3'>
                        <Text className='font-bold sm:text-base lg:text-xl sm:top-2 ml-4 ' style={{ fontWeight: '900', color: '#202020' }}>Fecha final: </Text>
                        <TouchableOpacity className={`flex-row items-center p-3 sm:h-[50px] sm:top-3 lg:h-16 lg:top-3 bg-gray-300 rounded-lg`} onPress={showDatePickerFinal}>
                            <Text>{dateFinal ? moment(dateFinal).format('DD/MM/YYYY HH:mm:ss') : 'DD/MM/YYYY HH:mm:ss'}</Text>
                        </TouchableOpacity>
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
                                    placeholder='Aforo'
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
                                    placeholder='$'
                                />
                            </View>
                        </View>
                    </View >


                    <View className='sm:my-2 lg:my-3'>
                        <Text className='font-bold sm:text-base lg:text-xl sm:top-2 ml-4 ' style={{ fontWeight: '900', color: '#202020' }}>Lugar: </Text>
                        <View className={`flex-row items-center p-3 sm:h-[50px] sm:top-3 lg:h-16 lg:top-3 bg-gray-300 rounded-lg`}>
                            <TextInput
                                className='flex-1 font-bold text-xl pl-2'
                                style={{ color: '#202020' }}
                                cursorColor='#8A2BE2'
                                autoCorrect={false}
                                onChangeText={(text) => setLugar(text)}
                                placeholder='Dirección'
                            />
                        </View>
                    </View >
                    {
                        error &&
                        <Text>{error}</Text>
                    }
                </View>
            </ScrollView>
            <View className={`absolute bottom-0 left-0 right-0 py-4 rounded-xl bg-[#7560EE] shadow-xl`}>
                <TouchableOpacity activeOpacity={0.7} className={``} onPress={handleSelectImage}>
                    <Text className='text-xl font-bold text-center text-white'>Crear Evento</Text>
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