import { StyleSheet, Text, View, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import fondoHeader from '../../../../assets/image/fondoHeader.png'
import * as Icon from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import avatar from '../../../../assets/Avatar.png'
import { StatusBar } from "expo-status-bar";

import CircleProgress from '../../../components/CircleProgress/CircleProgress';

import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { getUserId } from '../../../api/api';
import { useFocusEffect } from '@react-navigation/native';

const Profiles = ({ navigation }) => {

    const { logout, userInfo } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [pendientes, setPendientes] = useState(0)
    const [confirmado, setConfirmado] = useState(0)
    const [user, setUser] = useState({})

    const getUser = async () => {
        setIsLoading(true)
        await getUserId(userInfo.nro_documento_usuario)
            .then((response) => {
                const data = response.data.message
                setUser(data)
                setPendientes(data.pendientes === undefined ? 0 : data.pendientes)
                setConfirmado(data.confimados === undefined ? 0 : data.confimados)

                setIsLoading(false)
            }).catch((err) => {
                console.log(err);
                setIsLoading(false)
            })
    }

    useFocusEffect(
        React.useCallback(() => {
            getUser();
        }, []),
    );


    return (
        <ScrollView>
            <StatusBar />
            <View style={styles.container}>
                <View style={{ width: '100%', height: 250 }}>
                    <ImageBackground source={fondoHeader} resizeMode='cover' style={{ flex: 1, alignItems: 'center' }}>
                        <View style={styles.headerProfile}>
                            <View style={styles.headerProfileImage}>
                                {/* <Text style={{ color: '#242424', fontSize: 55, fontWeight: 'bold' }}>{userInfo.nombre_completo_usuario.charAt(0).toUpperCase()}</Text> */}
                                <Image source={{ uri: user.image_url }} resizeMode='cover' style={styles.image} />
                            </View>
                            <View style={{ top: '-10%', paddingBottom: 30 }}>
                                <View style={styles.headerContent}>
                                    <View>
                                        <View style={{ width: 180 }}>
                                            <Text style={styles.headerContentTextOne} numberOfLines={1}>{user.nombre_completo_usuario}</Text>
                                        </View>
                                        <Text numberOfLines={1} style={styles.headerContentTextTwo}>{user.correo_usuario}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.headerContainerButtom}
                                        onPress={() => navigation.navigate('FormUpdateUSer', {
                                            data: user
                                        })}>
                                        <View style={styles.headerContentButtom}>
                                            <Icon.Feather name="edit" size={20} color={'white'} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btnClose} onPress={() => logout()}>
                            <Icon.Ionicons name="log-in-outline" size={wp('8')} style={{ color: '#6C63FF' }} />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>



                <View style={styles.contentGraficaOne}>
                    <View>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>Eventos</Text>
                        <Text style={{ fontSize: 25, fontWeight: '700', color: 'gray' }}>Asistidos</Text>
                    </View>
                    <CircleProgress
                        value={pendientes} // Aquí puedes pasar el valor de progreso deseado entre 0 y 1
                        colorText='#1B1B1B'
                        colorProgress='#7560EE'
                    />
                </View>
                <View style={styles.contentGraficaTwo}>
                    <View>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>Eventos no</Text>
                        <Text style={{ fontSize: 25, fontWeight: '700', color: 'white' }}>Asistidos</Text>
                    </View>
                    <CircleProgress
                        value={confirmado} // Aquí puedes pasar el valor de progreso deseado entre 0 y 1
                        colorText='white'
                        colorProgress='#7560EE'
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default Profiles

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 130,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerProfile: {
        position: 'absolute',
        bottom: '-25%',
        right: 0,
        width: '75%',
        height: 200,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        elevation: 8,
        shadowColor: '#7560EE',
        paddingHorizontal: 20
    },
    headerProfileImage: {
        width: 120,
        height: 120,
        borderRadius: 75,
        top: '-20%',
        right: '-10%',
        elevation: 6,
        shadowColor: '#7560EE',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 75,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerContentTextOne: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#242424'
    },
    headerContentTextTwo: {
        fontSize: 22,
        fontWeight: '700',
        color: 'gray',
        width: 180
    },
    headerContainerButtom: {
        width: 60,
        height: 60,
        borderRadius: 15,
        backgroundColor: '#8E7AFF',
        justifyContent: 'center',
        alignItems: 'center',
        top: '-20%',
    },
    headerContentButtom: {
        width: 40,
        height: 40,
        borderRadius: 15,
        backgroundColor: '#7560EE',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 9
    },
    contentGraficaOne: {
        paddingHorizontal: 30,
        width: '90%',
        height: 100,
        backgroundColor: 'white',
        marginTop: 90,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 9,
    },
    contentGraficaTwo: {
        paddingHorizontal: 30,
        width: '90%',
        height: 100,
        backgroundColor: '#7973ED',
        marginTop: 20,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 9,
    },
    btnClose: {
        backgroundColor: 'white',
        width: wp('13'),
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        left: 20,
        top: 40,
        position: 'absolute'
    }
})