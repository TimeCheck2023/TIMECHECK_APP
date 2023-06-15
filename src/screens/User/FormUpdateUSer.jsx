import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import fondoHeader from '../../../assets/image/fondoHeader.png'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Input from '../../components/Input/Input';
import { updateOrgId, updateUserId } from '../../api/api';
import Modals from '../../components/Modals';
import { AuthContext } from '../../context/AuthContext';
import { Dimensions } from 'react-native';


const FormUpdateUSer = ({ route, navigation }) => {

    const { data } = route.params;
    console.log(data);

    const { logout } = useContext(AuthContext)

    const { height, width } = Dimensions.get('window');
    const bottomSheetModalRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const [Open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    //estado para controlar los input
    const [values, setValues] = useState({
        image_url: data.image_url,
        documentType: data.tipo_documento_usuario,
        fullName: data.nombre_completo_usuario,
        emailAddress: data.correo_usuario,
        address: data.direccion_usuario,
        typeofpopulation: data.tipo_poblacion_usuario,
        device: 'movil',
    });

    const handleOnChageText_us = (value, fieldName) => {
        setValues({ ...values, [fieldName]: value })
    }

    const handleSelectImage = async () => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("file", values.image_url);
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
                setValues(prevValues => ({
                    ...prevValues,
                    image_url: resizedImageUrl
                }));
                handleSubmit()
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
            setValues(prevValues => ({
                ...prevValues,
                image_url: base64Img
            }));
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
                setValues(prevValues => ({
                    ...prevValues,
                    image_url: base64Img
                }));
                bottomSheetModalRef.current?.close();
            }
        } else {
            console.log('Permiso de cámara denegado');
        }
    };


    const handleSubmit = async () => {

        await updateUserId(data.nro_documento_usuario, values)
            .then((response) => {
                if (response.data.data.recordset[0].mensaje === 'cambiado') {
                    // Obtén la fecha y hora actual
                    const currentTime = new Date();

                    // Establece la expiración en 24 horas
                    const expirationTime = currentTime.getTime() + 24 * 60 * 60 * 1000;
                    AsyncStorage.setItem('expirationTime', expirationTime.toString());
                    logout();
                }
                console.log(response.data.data);
                setIsLoading(false)
            }).catch((err) => {
                setIsLoading(false)
                console.log(err.response.data.error);
            })
    }


    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };


    return (
        <>
            {Open &&
                <TouchableOpacity className='absolute justify-center  items-center z-40' style={{ height, width, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={() => setOpen(false)}>
                    <View className='sm:w-72 sm:h-32 lg:w-[500px] lg:h-72 justify-center items-center bg-white rounded-xl'>
                        <TouchableOpacity className='sm:w-32 sm:h-12 lg:w-96 lg:h-24 border-b border-gray-400'
                            onPress={() => { setValues({ ...values, documentType: 'Cedula Ciudadana' }), setOpen(false) }}>
                            <Text className=' text-gray-600 font-bold text-sm lg:text-2xl m-auto rounded-lg'>Cedula Ciudadana</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='sm:w-32 sm:h-12 lg:w-96 lg:h-24 border-b border-gray-400'
                            onPress={() => { setValues({ ...values, documentType: 'Tarjeta de identidad' }), setOpen(false) }}>
                            <Text className=' text-gray-600 font-bold m-auto sm:text-sm lg:text-2xl rounded-lg'>Tarjeta de identidad</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            }
            <ScrollView >
                <View style={styles.container}>
                    <View style={{ width: '100%', height: 235, }}>
                        <ImageBackground source={fondoHeader} resizeMode='cover' style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                            <View style={{ top: '5%' }}>
                                <View style={styles.profileImage}>
                                    <Image source={{ uri: values.image_url }} style={styles.image} resizeMode='center' />
                                </View>
                                <TouchableOpacity style={styles.add} onPress={openBottomSheet}>
                                    <Ionicons name='ios-add' size={24} color={'#52575D'} style={{ marginTop: 2, marginLeft: 2 }} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                <View className='flex-1' style={{ paddingHorizontal: 20 }}>
                    <Text className='font-bold sm:text-base lg:text-xl ml-4 sm:mt-3' style={{ color: '#202020' }}>Tipo de documento</Text>
                    <TouchableOpacity activeOpacity={0.7} className={`flex-row items-center p-3 sm:h-[54px] sm:top-1 lg:h-16 lg:mt-3 bg-gray-300 text-gray-700 rounded-lg`}
                        onPress={() => { setOpen(!Open) }}>
                        <Feather name='credit-card' color='#642AB8' className='sm:text-xl lg:text-3xl' />
                        <Text className='font-bold text-lg rounded-lg ml-4' style={{ color: '#202020' }}>{values.documentType ? values.documentType : 'Tipo de documento'}</Text>
                    </TouchableOpacity>

                    <Input label='Nombre completo'
                        value={values.fullName}
                        onChangeText={(value) => handleOnChageText_us(value, 'fullName')}
                        iconName='user' placeholder='Enter fullName'
                    />

                    <Input label='Email'
                        value={values.emailAddress}
                        onChangeText={(value) => handleOnChageText_us(value, 'emailAddress')}
                        iconName='mail' placeholder='Enter Email'
                    />

                    <Input label='Dirección'
                        value={values.address}
                        onChangeText={(value) => handleOnChageText_us(value, 'address')}
                        iconName='map-pin' placeholder='Enter address'
                    />

                    <Input label='Tipo de población'
                        value={values.typeofpopulation}
                        onChangeText={(value) => handleOnChageText_us(value, 'typeofpopulation')}
                        iconName='users' placeholder='Enter typeofpopulation'
                    />
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
    text: {
        color: '#52575D'
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderRadius: 100,
    },
    titleBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginHorizontal: 16
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: 'hidden',
    },
    active: {
        backgroundColor: '#34FFB9',
        position: 'absolute',
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
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
    infoContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 16
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal: 10
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
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
})