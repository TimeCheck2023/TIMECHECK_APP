import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard, ScrollView, Platform, TextInput, Animated, ActionSheetIOSStatic, ActivityIndicator } from 'react-native'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { light, sizes, spacing } from '../../../constants/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import { saveEvent, updateEvent } from '../../../api/api';
import { AuthContext } from '../../../context/AuthContext';

const FormEventUpdate = ({ navigation, route }) => {

    const { userInfo } = useContext(AuthContext)
    const { item } = route.params
    // console.log(item);

    const heightAnim = useRef(new Animated.Value(80)).current;
    const heightAnimated = useRef(new Animated.Value(60)).current;


    const [Open, setOpen] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [image, setImage] = useState(item.imagenEvento)
    const [tipo, setTipo] = useState(item.tipoEvento)
    const [tipoNumber, setTipoNumber] = useState(null)
    const [nameEvent, setNameEvent] = useState(item.nombreEvento)
    const [nameDescription, setNameDescription] = useState(item.descripcionEvento)
    const [aforo, setAforo] = useState(item.aforoEvento)
    const [precio, setPrecio] = useState(item.valorTotalEvento === 0 ? 'Gratis' : item.valorTotalEvento)
    const [Lugar, setLugar] = useState(item.lugarEvento)
    const [dateInicial, setDateInicial] = useState(item.fechaInicioEvento);
    const [dateFinal, setDateFinal] = useState(item.fechaFinalEvento);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisibleFinal, setDatePickerVisibilityFinal] = useState(false);


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

    useEffect(() => {
        const tipoEvento = () => {
            if (tipo === 'Religioso') return setTipoNumber(22)
            if (tipo === 'Educativo') return setTipoNumber(21)
            if (tipo === 'Social') return setTipoNumber(18)
            if (tipo === 'Cultural') return setTipoNumber(20)
            if (tipo === 'Musical') return setTipoNumber(23)
            if (tipo === 'Deportivo') return setTipoNumber(19)
            if (tipo === 'Festival') return setTipoNumber(24)
            if (tipo === 'Exposición') return setTipoNumber(25)

        }

        tipoEvento()


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

    const handleSelectImage = async () => {
        setVisibility(true)
        if (image === item.imagenEvento) {
            handleSubmit(image)
            return
        } else {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "time_check");
            formData.append("cloud_name", "centroconveciones");
            try {
                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/centroconveciones/image/upload?w=500&h=300`,
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
            return;
        }

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
            id_tipo_evento: tipoNumber
        }

        await updateEvent(data, item.idEvento)
            .then((response) => {
                setVisibility(false)
                // console.log(response.data.mensaje);
                setMessage(response.data.mensaje)
                setError('')
            }).catch((err) => {
                // console.log(err.response.data)
                setVisibility(false)
                setError(err.response.data)
                setMessage('')
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
                date={new Date(dateInicial)}
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirmInical}
                onCancel={showDatePickerInicial}
            />

            <DateTimePickerModal
                date={new Date(dateFinal)}
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
                        <Text style={styles.headerTitle}>Actualizar evento</Text>
                    </View>
                    <View style={{ width: 20 }} />
                </View>
            </SafeAreaView>
            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 30 }}>
                    <View style={{ width: 280, height: 250, backgroundColor: light.white, overflow: 'hidden', borderRadius: sizes.radius }}>
                        <Image source={!image ? { uri: 'https://i.pinimg.com/564x/9e/be/af/9ebeaf28bd1fc61efd80803194029806.jpg' } : { uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.containerButtom} onPress={() => navigation.navigate('ContainerImage', { image: image })}>
                            <Entypo name="eye" size={26} color={light.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.containerButtom} onPress={openImagePicker}>
                            <AntDesign name="picture" size={26} color={light.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.containerButtom} onPress={openCamera}>
                            <AntDesign name="camerao" size={26} color={light.white} />
                        </TouchableOpacity>
                    </View>
                </View>
                {error && <Text style={[styles.textModal, { color: '#d62828' }]}>{error}</Text>}
                {message && <Text style={[styles.textModal, { color: '#2c6e49' }]}>{message}</Text>}
                <KeyboardAvoidingView style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >

                    <View style={{ marginTop: hp('1'), }}>
                        <Text style={styles.textLabel}>Nombre Completo</Text>
                        <View style={styles.containerTextInput}>
                            <MaterialIcons name="drive-file-rename-outline" size={24} color={light.purple} />
                            <TextInput
                                value={nameEvent}
                                style={styles.textInputs}
                                cursorColor={light.purple}
                                onChangeText={(text) => setNameEvent(text)}
                                placeholder='Ingresa el nombre delevento'
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: hp('1') }}>
                        <Text style={styles.textLabel}>Fecha inicio:</Text>
                        <TouchableOpacity activeOpacity={0.7} style={styles.containerTextInput} onPress={showDatePickerInicial}>
                            <AntDesign name="calendar" size={24} color={light.purple} />
                            <Text style={styles.textInputDate}>{dateInicial ? moment(dateInicial).format('DD/MM/YYYY HH:mm A') : 'DD/MM/YYYY HH:mm:ss'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: hp('1') }}>
                        <Text style={styles.textLabel}>Fecha inicio:</Text>
                        <TouchableOpacity activeOpacity={0.7} style={styles.containerTextInput} onPress={showDatePickerFinal}>
                            <AntDesign name="calendar" size={24} color={light.purple} />
                            <Text style={styles.textInputDate}>{dateFinal ? moment(dateFinal).format('DD/MM/YYYY HH:mm A') : 'DD/MM/YYYY HH:mm:ss'}</Text>
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
                                value={nameDescription}
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
                                    value={aforo.toString()}
                                    cursorColor={light.purple}
                                    keyboardType='numeric'
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
                                    value={precio}
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
                        {visibility ?
                            <ActivityIndicator size="large" color={light.white} />
                            :
                            <Text style={styles.textSend}>Actualizar evento</Text>
                        }
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

export default FormEventUpdate

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
        fontWeight: '600',
        paddingLeft: spacing.s + 4,
    },
    textInputDate: {
        // flex-1 font-bold pl-2
        fontSize: hp('2.4'),
        fontSize: wp('4'),
        flex: 1,
        fontWeight: '600',
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
        position: 'absolute',
        bottom: 0,
        backgroundColor: light.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textModal: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 15
    },
    send: {
        width: '70%',
        backgroundColor: light.purple,
        borderRadius: sizes.radius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSend: {
        fontSize: wp('5'),
        fontWeight: 'bold',
        color: light.white
    }
})