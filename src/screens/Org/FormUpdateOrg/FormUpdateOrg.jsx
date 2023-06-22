import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import fondoHeader from '../../../../assets/image/fondoHeader.png'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Input from '../../../components/Input/Input';
import { updateOrgId } from '../../../api/api';
import Modals from '../../../components/Modals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../context/AuthContext';


const FormUpdateOrg = ({ route, navigation }) => {

    const { data } = route.params;
    console.log(data.id_organización);

    const { logout, setUserInfo } = useContext(AuthContext)


    // ref manipular el bottomSheetModals
    const bottomSheetModalRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingImg, setIsLoadingImg] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [image, setImage] = useState(data.image_url)
    const [fullName, setFullName] = useState(data.nombre_organizacion)
    const [email, setEmail] = useState(data.correo_organizacion)
    const [address, setAddress] = useState(data.direccion_organizacion)
    const [numerTelefono, setNumeroTelefono] = useState(data.numero_telefono)
    const [device, setDevice] = useState('movil')
    //hook para capturar los errores y respuestas http
    const [errors, setErrors] = useState(false)
    const [message, setMessage] = useState(false)


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
                setImage(base64Img)
                bottomSheetModalRef.current?.close();
            }
        } else {
            console.log('Permiso de cámara denegado');
        }
    };

    // funcion pra mostar el bottomsheetModals
    const openBottomSheet = () => {
        bottomSheetModalRef.current?.present();
    }

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

    const handleSubmit = async (image) => {
        const newData = {
            organization_name: fullName,
            address_organization: address,
            email_organization: email,
            numero_telefono: numerTelefono,
            device,
            image_url: image
        }
        try {
            const responde = await updateOrgId(data.id_organización, newData)
            if (responde.data.data.recordset[0].mensaje === 'cambiado') {
                // Obtén la fecha y hora actual
                const currentTime = new Date();

                // Establece la expiración en 24 horas
                const expirationTime = currentTime.getTime() + 24 * 60 * 60 * 1000;
                AsyncStorage.setItem('expirationTime', expirationTime.toString());
                logout();
            }
            let Info = await AsyncStorage.getItem('userInfo');
            if (Info) {
                const objeto = JSON.parse(Info);
                objeto.nombre_organizacion = fullName
                objeto.image_url = image
                await AsyncStorage.setItem('userInfo', JSON.stringify(objeto));
                setUserInfo(objeto)
            }
            setIsLoading(false)
            setMessage('Actualizacion correctamente')
            console.log(responde.data.data);
        } catch (error) {
            setIsLoading(false)
            console.log(error.response.data);
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
                                <Image source={{ uri: image }} style={styles.image} resizeMode='center' />
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
                    value={fullName}
                    // editable={false}
                    iconName='user'
                    onChangeText={(text) => setFullName(text)}
                // placeholder='Enter nombre organizacion'
                />
                <Input label='correo organizacion'
                    value={email}
                    // editable={false}
                    iconName='smartphone'
                    onChangeText={(text) => setEmail(text)}
                // placeholder='Enter correo'
                />
                <Input label='direccion organizacion'
                    value={address}
                    // editable={false}
                    iconName='smartphone'
                    onChangeText={(text) => setAddress(text)}
                // placeholder='Enter correo'
                />
                <Input label='numero telefono'
                    value={numerTelefono}
                    // editable={false}
                    iconName='smartphone'
                    onChangeText={(text) => setNumeroTelefono(text)}
                // placeholder='Enter correo'
                />

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
    texMessage: {
        fontSize: hp('2.5'),
        color: '#2c6e49',
        fontWeight: 'bold'
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