import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import fondoHeader from '../../../../assets/image/fondoHeader.png'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Input from '../../../components/Input/Input';
import { updateOrgId } from '../../../api/api';
import Modals from '../../../components/Modals';


const FormUpdateOrg = ({ route, navigation }) => {

    const { data } = route.params;


    // ref manipular el bottomSheetModals
    const bottomSheetModalRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingImg, setIsLoadingImg] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [values, setValues] = useState({
        organization_name: data.nombre_organizacion,
        address_organization: data.direccion_organizacion,
        email_organization: data.correo_organizacion,
        numero_telefono: data.numero_telefono,
        device: "movil",
        image_url: data.image_url
    });

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

    // funcion pra mostar el bottomsheetModals
    const openBottomSheet = () => {
        bottomSheetModalRef.current?.present();
    };

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

    const handleSubmit = async () => {
        // setIsLoadingImg(true)
        try {
            const responde = await updateOrgId(data.id_organización, values)
            if (responde.data.data.recordset[0].mensaje === 'cambiado') {
                // Obtén la fecha y hora actual
                const currentTime = new Date();

                // Establece la expiración en 24 horas
                const expirationTime = currentTime.getTime() + 24 * 60 * 60 * 1000;
                AsyncStorage.setItem('expirationTime', expirationTime.toString());
                logout();
            }
            setIsLoading(false)
            console.log(responde.data.data);
        } catch (error) {
            setIsLoading(false)
            console.log(error.response.data.error);
        }
    }

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };


    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={{ width: '100%', height: 270, }}>
                    <ImageBackground source={fondoHeader} resizeMode='cover' style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ top: '10%' }}>
                            <View style={styles.profileImage}>
                                <Image source={{ uri: values.image_url }} style={styles.image} resizeMode='center' />
                            </View>
                            <TouchableOpacity style={styles.add} onPress={openBottomSheet}>
                                <Ionicons name='ios-add' size={24} color={'#DFD8C8'} style={{ marginTop: 2, marginLeft: 2 }} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{
                            backgroundColor: 'white',
                            width: wp('13'),
                            aspectRatio: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 20,
                            left: 20,
                            top: 40,
                            position: 'absolute'
                        }}>
                            <Ionicons name='ios-arrow-back' size={24} color={'#52575D'} />
                            <View />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                {/* <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal showsVerticalScrollIndicador={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={{ uri: 'https://res.cloudinary.com/centroconveciones/image/upload/v1686668335/meamjbp3t0unhclqrpbh.jpg' }} style={styles.image} resizeMode='cover' />
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={{ uri: 'https://res.cloudinary.com/centroconveciones/image/upload/v1686668335/meamjbp3t0unhclqrpbh.jpg' }} style={styles.image} resizeMode='cover' />
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={{ uri: 'https://res.cloudinary.com/centroconveciones/image/upload/v1686668335/meamjbp3t0unhclqrpbh.jpg' }} style={styles.image} resizeMode='cover' />
                        </View>
                    </ScrollView>
                </View> */}
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
                <Input label='nombre organizacion'
                    value={values.organization_name}
                    // editable={false}
                    iconName='user'
                    onChangeText={(value) => handleOnChageText_us(value, 'organization_name')}
                // placeholder='Enter nombre organizacion'
                />
                <Input label='correo organizacion'
                    value={values.email_organization}
                    // editable={false}
                    iconName='smartphone'
                    onChangeText={(value) => handleOnChageText_us(value, 'email_organization')}
                // placeholder='Enter correo'
                />
                <Input label='direccion organizacion'
                    value={values.address_organization}
                    // editable={false}
                    iconName='smartphone'
                    onChangeText={(value) => handleOnChageText_us(value, 'address_organization')}
                // placeholder='Enter correo'
                />
                <Input label='numero telefono'
                    value={values.numero_telefono}
                    // editable={false}
                    iconName='smartphone'
                    onChangeText={(value) => handleOnChageText_us(value, 'numero_telefono')}
                // placeholder='Enter correo'
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
    )
}

export default FormUpdateOrg

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
        width: 170,
        height: 170,
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
        backgroundColor: '#41444B',
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