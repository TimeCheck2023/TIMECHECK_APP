import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library';
import * as Icon from '@expo/vector-icons';



const Camara = ({ image, setImage, setVisibility, visibility }) => {
    const { width, height } = Dimensions.get('window')

    const [hasCamaraPermission, setHasCamaraPermission] = useState(null)
    const [imageButton, setImageButton] = useState(false)
    const [imageSave, setImageSave] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    // const [visibility, setVisibility] = useState(false)
    const cameraRef = useRef()

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCamaraPermission(cameraStatus.status === 'granted');
        })();
    }, [])

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                // console.log(data);
                setImage(data.uri)
                setImageSave(data.uri)
                setImageButton(!imageButton)
            } catch (error) {
                console.log(error);
            }
        }
    }

    const saveImage = async () => {
        if (image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                alert('Picture saved successfully')
                setImageSave(null)
                setVisibility(!visibility)
            } catch (error) {
                console.log(error);
            }
        }
    }

    if (hasCamaraPermission === false) {
        return <Text>No access to camera</Text>
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', width, height, backgroundColor: '#000' }}>
            {!imageSave ?
                <Camera
                    style={{ flex: 1 }}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 30 }}>
                        <TouchableOpacity style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setVisibility(!visibility)}>
                            <Icon.Feather name="arrow-left" size={30} color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#f1f1f1'} />
                        </TouchableOpacity>
                    </View>
                </Camera>
                :
                <Image source={{ uri: imageSave }} style={{ flex: 1 }} />
            }

            <View style={{ height: 80 }}>
                {imageSave ?
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 50 }}>
                        <TouchableOpacity className='items-center justify-center' onPress={() => setImageSave(null)}>
                            <Icon.Fontisto name="spinner-refresh" size={27} color="white" />
                            {/* <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#f1f1f1', marginLeft: 10 }}>Re-take</Text> */}
                        </TouchableOpacity>
                        <TouchableOpacity className='items-center justify-center' onPress={saveImage}>
                            <Icon.AntDesign name="save" size={27} color="white" />
                            {/* <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#f1f1f1', marginLeft: 10 }}>Save</Text> */}
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 50 }}>
                        <TouchableOpacity className=' items-center justify-center' onPress={takePicture}>
                            <Icon.Fontisto name="spinner-refresh" size={32} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity className='sm:w-[80px] sm:h-[80px] sm:bottom-8 rounded-full bg-white items-center justify-center' onPress={takePicture}>
                            <Icon.Entypo name="camera" size={32} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity className=' items-center justify-center' onPress={takePicture}>
                            <Icon.Entypo name="flash" size={32} color="white" />
                        </TouchableOpacity>
                    </View>
                }

            </View>
        </View>
    )
}

export default Camara