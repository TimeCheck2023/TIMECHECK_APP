import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';


import avatar from '../../../../assets/Avatar.png'


const ProfileOrgs = () => {

    // ref manipular el bottomSheetModals
    const bottomSheetModalRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

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
            setSelectedImage(base64Img);
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
                setSelectedImage(base64Img);
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


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicador={false}>
                <View style={styles.titleBar}>
                    <Ionicons name='ios-arrow-back' size={24} color={'#52575D'} />
                    <View />
                </View>
                <View style={{ alignSelf: 'center' }}>
                    <View style={styles.profileImage}>
                        <Image source={{ uri: selectedImage ? selectedImage : 'https://res.cloudinary.com/centroconveciones/image/upload/v1686668335/meamjbp3t0unhclqrpbh.jpg' }} style={styles.image} resizeMode='center' />
                    </View>
                    <TouchableOpacity style={styles.add} onPress={openBottomSheet}>
                        <Ionicons name='ios-add' size={24} color={'#DFD8C8'} style={{ marginTop: 2, marginLeft: 2 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: '200', fontSize: 36 }]}>Julian</Text>
                    <Text style={[styles.text, { color: '#AEB5BC', fontSize: 14 }]}>Administradora</Text>
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
            </ScrollView>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                // index={0}
                snapPoints={['40%']}
            >
                <View style={styles.panel}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.panelTitle}>Upload Photo</Text>
                        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
                    </View>
                    <TouchableOpacity style={styles.panelButton}
                        onPress={openCamera}
                    >
                        <Text style={styles.panelButtonTitle}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.panelButton}
                        onPress={openImagePicker}
                    >
                        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.panelButton}
                        onPress={openImagePicker}
                    >
                        <Text style={styles.panelButtonTitle}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetModal>

        </SafeAreaView>
    )
}

export default ProfileOrgs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
        width: 140,
        height: 140,
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
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
})