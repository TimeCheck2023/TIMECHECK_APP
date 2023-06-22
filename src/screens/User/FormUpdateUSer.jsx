import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import fondoHeader from '../../../assets/image/fondoHeader.png'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Input from '../../components/Input/Input';
import { updateOrgId, updateUserId } from '../../api/api';
import Modals from '../../components/Modals';
import { AuthContext } from '../../context/AuthContext';
import { Dimensions } from 'react-native';
import { light, sizes, spacing } from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FormUpdateUSer = ({ route, navigation }) => {
    const insets = useSafeAreaInsets();

    const { data } = route.params;

    console.log(data);

    const { logout, setUserInfo } = useContext(AuthContext)

    const { height, width } = Dimensions.get('window');
    const bottomSheetModalRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const [Open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [image, setImage] = useState(data.image_url)
    const [tipoDocumento, setTipoDocumento] = useState(data.tipo_documento_usuario)
    const [fullName, setFullName] = useState(data.nombre_completo_usuario)
    const [email, setEmail] = useState(data.correo_usuario)
    const [address, setAddress] = useState(data.direccion_usuario)
    const [tipoPoblacion, setTipoPoblacion] = useState(data.tipo_poblacion_usuario)
    const [device, setDevice] = useState('movil')
    //hook para capturar los errores y respuestas http
    const [errors, setErrors] = useState(false)
    const [message, setMessage] = useState(false)

    //estado para controlar los input
    // const [values, setValues] = useState({
    //     image_url: data.image_url,
    //     documentType: data.tipo_documento_usuario,
    //     fullName: data.nombre_completo_usuario,
    //     emailAddress: data.correo_usuario,
    //     address: data.direccion_usuario,
    //     typeofpopulation: data.tipo_poblacion_usuario,
    //     device: 'movil',
    // });

    // const handleOnChageText_us = (value, fieldName) => {
    //     setValues({ ...values, [fieldName]: value })
    // }

    const handleSelectImage = async () => {
        setIsLoading(true)
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
                const resizedImageUrl = `${data.secure_url.replace(
                    "/upload/",
                    "/upload/w_500,h_300/"
                )}`;
                handleSubmit(resizedImageUrl)
            }
        } catch (error) {
            console.error(error);
        };
    }

    // funcion pra mostar el bottomsheetModals
    const openBottomSheet = () => {
        bottomSheetModalRef.current?.present();
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
            setImage(base64Img);
            // setSelectedImage(base64Img);
            bottomSheetModalRef.current?.close();
            // setImageSave(result.assets[0].uri)
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
                setImage(base64Img);
                bottomSheetModalRef.current?.close();
            }
        } else {
            console.log('Permiso de cámara denegado');
        }
    };


    const handleSubmit = async (image) => {

        const dataUpdate = {
            image_url: image,
            documentType: tipoDocumento,
            fullName: fullName,
            emailAddress: email,
            address: address,
            typeofpopulation: tipoPoblacion,
            device: device,
        }
        try {
            const response = await updateUserId(data.nro_documento_usuario, dataUpdate)
            if (response.data.data.recordset[0].mensaje === 'cambiado') {
                // Obtén la fecha y hora actual
                const currentTime = new Date();

                // Establece la expiración en 24 horas
                const expirationTime = currentTime.getTime() + 24 * 60 * 60 * 1000;
                await AsyncStorage.setItem('expirationTime', expirationTime.toString());
                logout();
            }
            let Info = await AsyncStorage.getItem('userInfo');
            if (Info) {
                const objeto = JSON.parse(Info);
                objeto.nombre_completo_usuario = fullName
                objeto.image_url = image
                await AsyncStorage.setItem('userInfo', JSON.stringify(objeto));
                setUserInfo(objeto)
            }
            setMessage('Se actualizo correctamente')
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(err.response.data.error);
        }
    }


    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };


    return (
        <>
            {/* ventada de escoger tipo de documento */}
            {Open &&
                <TouchableOpacity style={styles.modalSelect} onPress={() => setOpen(false)}>
                    <View style={styles.modals}>
                        <TouchableOpacity style={styles.buttonSelect} onPress={() => {
                            setTipoDocumento('Cedula Ciudadana'),
                                setOpen(false)
                        }}>
                            <Text style={{ fontSize: wp('5%'), color: light.gray, fontWeight: 'bold' }}>Cedula Ciudadana</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSelect}
                            onPress={() => { setTipoDocumento('Tarjeta de identidad'), setOpen(false) }}>
                            <Text style={{ fontSize: wp('5%'), color: light.gray, fontWeight: 'bold' }}>Tarjeta de identidad</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            }
            <ScrollView >

                <View style={styles.container}>
                    <View style={{ width: '100%', height: hp('33%'), }}>
                        <ImageBackground source={fondoHeader} resizeMode='cover' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: insets.top }}>

                            <View style={[styles.header]}>
                                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                                    <AntDesign name="left" size={24} style={styles.iconHeader} />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <View style={styles.profileImage}>
                                    <Image source={{ uri: image }} style={styles.image} resizeMode='center' />
                                </View>
                                <TouchableOpacity style={styles.add} onPress={openBottomSheet}>
                                    <Ionicons name='ios-add' size={24} color={'#52575D'} style={{ marginTop: 2, marginLeft: 2 }} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                <View style={{ marginTop: hp('1'), paddingHorizontal: 20 }}>

                    <Text style={styles.textLabel}>Tipo Documento</Text>
                    <TouchableOpacity activeOpacity={0.7} style={styles.selectType}
                        onPress={() => { setOpen(!Open) }}>
                        <Feather name='users' size={20} style={{ color: light.purple }} />
                        <Text style={styles.textSelect}>{tipoDocumento ? tipoDocumento : 'Tipo de documento'}</Text>
                    </TouchableOpacity>
                    <Input label='Nombre completo' placeholder='Ingresa el nombre completa' value={fullName} iconName='user' onChangeText={(text) => setFullName(text)} />
                    <Input label='Email' placeholder='Ingresa el email' value={email} iconName='mail' onChangeText={(text) => setEmail(text)} />
                    <Input label='Dirección' placeholder='Ingresa el tu direccion' value={address} iconName='map-pin' onChangeText={(text) => setAddress(text)} />
                    <Input label='Tipo de población' placeholder='Ingresa el tipode poblacion' value={tipoPoblacion} iconName='users' onChangeText={(text) => setTipoPoblacion(text)} />

                    <View className='items-center' style={{ top: hp('1'), alignItems: 'center' }}>
                        {message && <Text style={styles.texMessage}>{message}</Text>}
                    </View>

                    <TouchableOpacity activeOpacity={0.7} className={`sm:mt-6 py-4 rounded-xl bg-[#6C5CE7] shadow-xl`} onPress={handleSelectImage}>
                        {isLoading ?
                            <ActivityIndicator size="large" color='#ffff' /> :
                            <Text className='text-xl font-bold text-center text-white'>Actualizar</Text>
                        }
                    </TouchableOpacity>
                </View>


                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    // index={0}
                    snapPoints={['40%']}
                >
                    <View style={styles.panel}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.panelTitle}>Subir foto</Text>
                            <Text style={styles.panelSubtitle}>Elige tu foto de perfil</Text>
                        </View>
                        <TouchableOpacity style={styles.panelButton}
                            onPress={openCamera}
                        >
                            <Text style={styles.panelButtonTitle}>Haz una foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.panelButton}
                            onPress={openImagePicker}
                        >
                            <Text style={styles.panelButtonTitle}>Elegir foto</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetModal>

                <Modals visible={modalVisible} onClose={closeModal} />

            </ScrollView>
        </>
    )
}

export default FormUpdateUSer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingBottom: 130,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        paddingHorizontal: 20,
        width: '100%',
        position: 'absolute',
        right: 0,
        top: hp('4.5')
    },
    headerButton: {
        width: wp('12'),
        height: hp('6'),
        backgroundColor: light.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: sizes.radius - 5
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
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: light.white
    },
    iconHeader: {
        color: light.purple
    },
    text: {
        color: '#52575D'
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderRadius: 100,
    },
    modalSelect: {
        height: sizes.height,
        width: sizes.width,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1
    },
    modals: {
        width: wp('75%'),
        height: hp('22'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: light.white,
        borderRadius: sizes.radius
    },
    buttonSelect: {
        // bottom-0 justify-center items-center border-b border-gray-400
        width: wp('50%'),
        height: hp('7'),
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: light.lightGray,
        borderBottomWidth: 2
    },
    profileImage: {
        width: 180,
        height: 180,
        borderRadius: 100,
        overflow: 'hidden',
    },
    add: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        right: 0,
        // padding: 4,
        height: 50,
        width: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.4,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#6C5CE7',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    textLabel: {
        color: light.black,
        fontSize: wp('4.5'),
        fontWeight: 'bold',
        marginLeft: spacing.m - 6,
    },
    selectType: {
        height: hp('7'),
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginTop: 2,
        backgroundColor: light.lightGray,
        borderRadius: sizes.radius,
    },
    textSelect: {
        color: light.black,
        fontSize: hp('2.4'),
        fontSize: wp('5'),
        fontWeight: 'bold',
        paddingLeft: spacing.s + 4,
    },
})