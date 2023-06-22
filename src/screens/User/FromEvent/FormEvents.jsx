import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, TextInput, Animated, Keyboard } from 'react-native'
import React, { useContext, useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { light, sizes, spacing } from '../../../constants/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import { saveEvent } from '../../../api/api';
import { AuthContext } from '../../../context/AuthContext';


const FormEvents = ({ navigation }) => {

    const { userInfo } = useContext(AuthContext)


    const [Open, setOpen] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [image, setImage] = useState(null)
    const [error, setError] = useState('')
    const [tipo, setTipo] = useState('')
    const [tipoNumber, setTipoNumber] = useState(null)
    const [nameEvent, setNameEvent] = useState('')
    const [nameDescription, setNameDescription] = useState('')
    const [aforo, setAforo] = useState('')
    const [precio, setPrecio] = useState('')
    const [Lugar, setLugar] = useState('hola')

    const heightAnim = useRef(new Animated.Value(80)).current;
    const heightAnimated = useRef(new Animated.Value(60)).current;

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisibleFinal, setDatePickerVisibilityFinal] = useState(false);


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                Animated.timing(heightAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
                Animated.timing(heightAnimated, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                Animated.timing(heightAnim, {
                    toValue: 80,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
                Animated.timing(heightAnimated, {
                    toValue: 60,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [])


    const dataItem = [
        { id: 21, tipo: 'Educativo' },
        { id: 22, tipo: 'Religioso' },
        { id: 18, tipo: 'Social' },
        { id: 20, tipo: 'Cultural' },
        { id: 23, tipo: 'Musical' },
        { id: 19, tipo: 'Deportivo' },
        { id: 24, tipo: 'Festival' },
        { id: 25, tipo: 'Exposición' },
    ]


    const [dateInicial, setDateInicial] = useState('');
    const [dateFinal, setDateFinal] = useState('');

    const showDatePickerInicial = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };

    const showDatePickerFinal = () => {
        setDatePickerVisibilityFinal(!isDatePickerVisibleFinal);
    };

    const handleConfirmInical = (date) => {
        setDateInicial(date)
    };
    const handleConfirmFinal = (date) => {
        setDateFinal(date)
    };

    const openImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64: true,
        })

        if (!result.canceled) {
            let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`
            setImage(base64Img)
        }
    };

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchCameraAsync({
                base64: true,
            });
            if (!result.canceled) {
                let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`
                setImage(base64Img)
            }
        } else {
            console.log('Permiso de cámara denegado');
        }
    };

    const handleSelectImage = async (e) => {

        if (tipo === 'Religioso') setTipoNumber(22)
        if (tipo === 'Educativo') setTipoNumber(21)
        if (tipo === 'Social') setTipoNumber(18)
        if (tipo === 'Cultural') setTipoNumber(20)
        if (tipo === 'Musical') setTipoNumber(23)
        if (tipo === 'Deportivo') setTipoNumber(19)
        if (tipo === 'Festival') setTipoNumber(24)
        if (tipo === 'Exposición') setTipoNumber(25)

        if (image === null) return setError('La imagen es requerida')
        if (nameEvent === '') return setError('El nombre es requerido')
        if (dateInicial === '') return setError('La fecha Inicial es requerida')
        if (dateFinal === '') return setError('La fecha Final es requerida')
        if (Lugar === '') return setError('El lugar es requerido')
        if (aforo === '') return setError('El aforo es requerido')

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
            id_tipo_evento: tipoNumber
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
        <View style={styles.container}>

            {/* ventada de escoger tipo de documento */}
            {Open &&
                <TouchableOpacity style={styles.modalSelect} onPress={() => setOpen(false)}>
                    <View style={styles.modal}>
                        {
                            dataItem.map((item) => (
                                <TouchableOpacity style={{ width: 128, height: 48, borderBottomWidth: 1, borderColor: light.gray, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { setTipo(item.tipo), setOpen(false), setTipoNumber(item.id) }} key={item.id}>
                                    <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: hp('2.4'), fontSize: wp('5'), }}>{item.tipo}</Text>
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


            <SafeAreaView>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                        <AntDesign name="left" size={24} style={styles.iconHeader} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitle}>Verificación de Codigo</Text>
                    </View>
                    <View style={{ width: 20 }} />
                </View>
            </SafeAreaView>
            <ScrollView>
                {
                    error &&
                    <Text>{error}</Text>
                }
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 30 }}>
                    <View style={{ width: 280, height: 250, backgroundColor: light.white, overflow: 'hidden', borderRadius: sizes.radius }}>
                        <Image source={!image ? { uri: 'https://i.pinimg.com/564x/9e/be/af/9ebeaf28bd1fc61efd80803194029806.jpg' } : { uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.containerButtom}>
                            <Entypo name="eye" size={24} color={light.lightGray} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.containerButtom} onPress={openImagePicker}>
                            <AntDesign name="picture" size={24} color={light.lightGray} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.containerButtom} onPress={openCamera}>
                            <AntDesign name="camerao" size={24} color={light.lightGray} />
                        </TouchableOpacity>
                    </View>
                </View>
                <KeyboardAvoidingView style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >

                    <View style={{ marginTop: hp('1'), }}>
                        <Text style={styles.textLabel}>Nombre Completo</Text>
                        <View style={styles.containerTextInput}>
                            <MaterialIcons name="drive-file-rename-outline" size={24} color={light.purple} />
                            <TextInput
                                style={styles.textInputs}
                                cursorColor={light.purple}
                                onChangeText={(text) => setNameEvent(text)}
                                placeholder='Ingresa el nombre del evento'
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: hp('1') }}>
                        <Text style={styles.textLabel}>Fecha inicio:</Text>
                        <TouchableOpacity activeOpacity={0.7} style={styles.containerTextInput} onPress={showDatePickerInicial}>
                            <AntDesign name="calendar" size={24} color={light.purple} />
                            <Text style={styles.textInputDate}>{dateInicial ? moment(dateInicial).format('DD/MM/YYYY HH:mm:ss') : 'DD/MM/YYYY HH:mm:ss'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: hp('1') }}>
                        <Text style={styles.textLabel}>Fecha inicio:</Text>
                        <TouchableOpacity activeOpacity={0.7} style={styles.containerTextInput} onPress={showDatePickerFinal}>
                            <AntDesign name="calendar" size={24} color={light.purple} />
                            <Text style={styles.textInputDate}>{dateFinal ? moment(dateFinal).format('DD/MM/YYYY HH:mm:ss') : 'DD/MM/YYYY HH:mm:ss'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: hp('1'), }}>
                        <Text style={styles.textLabel}>tipo de evento</Text>
                        <TouchableOpacity activeOpacity={0.7} style={styles.containerTextInput} onPress={() => { setOpen(!Open) }}>
                            <AntDesign name="bars" size={24} color={light.purple} />
                            <Text style={styles.textInputDate}>{tipo ? tipo : 'Tipo de Evento'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: hp('1'), }}>
                        <Text style={styles.textLabel}>Descripcion</Text>
                        <View style={[styles.containerTextInput, { height: 'auto' }]}>
                            <AntDesign name="message1" size={24} color={light.purple} />
                            <TextInput
                                multiline
                                numberOfLines={2}
                                style={styles.textInputs}
                                cursorColor={light.purple}
                                onChangeText={(text) => setNameDescription(text)}
                                placeholder="Escribe una descripción del evento..."
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1') }}>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.textLabel}>Aforo:</Text>
                            <View style={styles.containerTextInput}>
                                <AntDesign name="user" size={24} color={light.purple} />
                                <TextInput
                                    style={styles.textInputs}
                                    cursorColor={light.purple}
                                    onChangeText={(text) => setAforo(text)}
                                    placeholder='Aforo'
                                />
                            </View>
                        </View>

                        <View style={{ flex: 1, paddingHorizontal: 10 }}>
                            <Text style={styles.textLabel}>Precio:</Text>
                            <View style={styles.containerTextInput}>
                                <MaterialIcons name="attach-money" size={24} color={light.purple} />
                                <TextInput
                                    style={styles.textInputs}
                                    cursorColor={light.purple}
                                    onChangeText={(text) => setPrecio(text)}
                                    placeholder='Precio'
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: hp('1'), }}>
                        <Text style={styles.textLabel}>Lugar</Text>
                        <View style={styles.containerTextInput}>
                            <Ionicons name="location-outline" size={24} color={light.purple} />
                            <TextInput
                                style={styles.textInputs}
                                cursorColor={light.purple}
                                onChangeText={(text) => setLugar(text)}
                                placeholder='Dirección'
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <Animated.View style={[styles.containerSend, { height: heightAnim }]}>
                <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={handleSelectImage}>
                    <Animated.View style={[styles.send, { height: heightAnimated }]} >
                        <Text style={styles.textSend}>Crear evento</Text>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

export default FormEvents

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15
    },
    headerButton: {
        width: wp('12'),
        height: hp('6'),
        backgroundColor: light.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: sizes.radius - 5
    },
    headerTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#141414'
    },
    iconHeader: {
        color: light.purple
    },
    containerButtom: {
        backgroundColor: '#6C63FF',
        width: 60,
        aspectRatio: 1,
        borderRadius: 20,
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLabel: {
        fontWeight: 'bold',
        color: light.black,
        fontSize: wp('4.5'),
        marginLeft: spacing.m - 6,
    },
    containerTextInput: {
        height: hp('7'),
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: light.lightGray,
        borderRadius: sizes.radius,
        marginTop: 2,
    },
    textInputs: {
        // flex-1 font-bold pl-2
        color: '#202020',
        fontSize: hp('2.4'),
        fontSize: wp('5'),
        flex: 1,
        fontWeight: 'bold',
        paddingLeft: spacing.s + 4,
    },
    textInputDate: {
        // flex-1 font-bold pl-2
        fontSize: hp('2.4'),
        fontSize: wp('4'),
        flex: 1,
        fontWeight: 'bold',
        paddingLeft: spacing.s + 4,
    },
    modalSelect: {
        // className='absolute justify-center  items-center z-40'
        width: sizes.width,
        height: sizes.height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    modal: {
        width: wp('90%'),
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: light.white,
        borderRadius: sizes.radius,
        paddingVertical: 20
    },
    containerSend: {
        width: '100%',
        height: 80,
        position: 'absolute',
        bottom: 0,
        backgroundColor: light.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    send: {
        width: '70%',
        height: 60,
        backgroundColor: light.purple,
        borderRadius: sizes.radius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSend: {
        fontSize: 30,
        fontWeight: 'bold',
        color: light.white
    }
})