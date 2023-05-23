import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library';
import * as Icon from '@expo/vector-icons';



const Camara = ({ }) => {
    const { width, height } = Dimensions.get('window')

    const [hasCamaraPermission, setHasCamaraPermission] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const [visibility, setVisibility] = useState(false)
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
                console.log(data);
                setImage(data.uri)
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
                setImage(null)
            } catch (error) {
                console.log(error);
            }
        }
    }

    if (hasCamaraPermission === false) {
        return <Text>No access to camera</Text>
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', width, height, backgroundColor: '#000', paddingBottom: 30 }}>
            {!image ?
                <Camera
                    style={{ flex: 1 }}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 30 }}>
                        <TouchableOpacity style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => { setType(type === CameraType.back ? CameraType.front : CameraType.back) }}>
                            <Icon.Entypo name="camera" size={27} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => { setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off) }}>
                            <Icon.Entypo name="camera" size={27} color={flash === Camera.Constants.FlashMode.off ? 'gray': '#f1f1f1'} />
                        </TouchableOpacity>
                    </View>
                </Camera>
                :
                <Image source={{ uri: image }} style={{ flex: 1 }} />
            }
            <View >
                {image ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 50 }}>
                        <TouchableOpacity style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setImage(null)}>
                            <Icon.Entypo name="camera" size={27} color="white" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#f1f1f1', marginLeft: 10 }}>Re-take</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={saveImage}>
                            <Icon.Entypo name="camera" size={27} color="white" />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#f1f1f1', marginLeft: 10 }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={takePicture}>
                        <Icon.Entypo name="camera" size={27} color="white" />
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#f1f1f1', marginLeft: 10 }}>Take a Picture</Text>
                    </TouchableOpacity>
                }

            </View>
        </View>
    )
}

export default Camara