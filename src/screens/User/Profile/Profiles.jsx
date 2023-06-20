import { StyleSheet, Text, View, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import fondoHeader from '../../../../assets/image/fondoHeader.png'
import * as Icon from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import avatar from '../../../../assets/Avatar.png'
import { StatusBar } from "expo-status-bar";
import { light, sizes, spacing } from "../../../constants/theme";
import CircleProgress from '../../../components/CircleProgress/CircleProgress';

import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { getUserId } from '../../../api/api';
import { useFocusEffect } from '@react-navigation/native';
import Loading from '../../../components/Loading/Loading';
import MyModal from './MyModal';

const Profiles = ({ navigation }) => {

    const { logout, userInfo, socket } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
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
        <>
            {isLoading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                    <Loading />
                </View>
                :
                <ScrollView >
                    <StatusBar />
                    <View style={styles.container}>
                        <View style={{ width: '100%', height: 200 }}>
                            <ImageBackground source={fondoHeader} resizeMode='cover' style={{ width: '100%', height: '100%', alignItems: 'center' }}>

                                <View style={styles.headerProfile}>
                                    <View style={styles.headerProfileImage}>
                                        <Image source={{ uri: user.image_url }} resizeMode='cover' style={styles.image} />
                                    </View>
                                    <View style={styles.headerContent}>
                                        <Text style={styles.headerContentTextOne} numberOfLines={1}>{user.nombre_completo_usuario}</Text>
                                        <Text numberOfLines={1} style={styles.headerContentTextTwo}>{user.correo_usuario}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.btnClose} onPress={() => navigation.goBack()}>
                                    <Icon.Ionicons name="arrow-back" size={wp('7')} style={{ color: '#6C63FF' }} />
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>


                        <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginTop: '36%' }}>
                            <View style={[styles.contentGraficaOne, { backgroundColor: light.white }]}>
                                <View>
                                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>Eventos</Text>
                                    <Text style={{ fontSize: 25, fontWeight: '700', color: 'gray' }}>Asistidos</Text>
                                </View>
                                <View style={{ marginTop: 20, elevation: 6, shadowColor: light.white }}>
                                    <CircleProgress
                                        value={pendientes} // Aquí puedes pasar el valor de progreso deseado entre 0 y 1
                                        colorText='#1B1B1B'
                                        colorProgress='#7560EE'
                                        colorStoke={light.lightGray}
                                    />
                                </View>
                            </View>

                            <View style={[styles.contentGraficaOne, { backgroundColor: light.purple }]}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 27, fontWeight: 'bold', color: 'white' }}>Eventos no</Text>
                                    <Text style={{ fontSize: 25, fontWeight: '700', color: 'white' }}>Asistidos</Text>
                                </View>
                                <View style={{ marginTop: 20, elevation: 6, shadowColor: light.white }}>
                                    <CircleProgress
                                        value={confirmado} // Aquí puedes pasar el valor de progreso deseado entre 0 y 1
                                        colorText='white'
                                        colorProgress='#7560EE'
                                        colorStoke={light.white}
                                    />
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.contentCard} onPress={() => navigation.navigate('FormUpdateUSer', { data: user })}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.iconCard}>
                                    <Icon.AntDesign name="user" size={wp('8')} style={{ color: light.white }} />
                                </View>
                                <Text style={{ left: 15, fontSize: 20 }}>Editar perfil</Text>
                            </View>
                            <Icon.AntDesign name="right" size={wp('8')} style={{ color: '#6C63FF' }} />
                        </TouchableOpacity>

                        <View style={styles.contentCard}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.iconCard}>
                                    <Icon.Ionicons name="log-in-outline" size={wp('8')} style={{ color: light.white }} />
                                </View>
                                <Text style={{ left: 15, fontSize: 20 }}>Cambiar Contraseña</Text>
                            </View>
                            <Icon.AntDesign name="right" size={wp('8')} style={{ color: '#6C63FF' }} />
                        </View>

                        <TouchableOpacity style={styles.contentCard} onPress={() => setIsModalOpen(!isModalOpen)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.iconCard}>
                                    <Icon.AntDesign name="setting" size={wp('8')} style={{ color: light.white }} />
                                </View>
                                <Text style={{ left: 15, fontSize: 20 }}>Configuraciones</Text>
                            </View>
                            <Icon.AntDesign name="right" size={wp('8')} style={{ color: '#6C63FF' }} />
                        </TouchableOpacity>
                    </View>
                    {/* } */}
                    <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} logout={logout} />
                </ScrollView>
            }
        </>
    )
}

export default Profiles

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingBottom: 130,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerProfile: {
        position: 'absolute',
        bottom: '-70%',
        width: '90%',
        height: 230,
        backgroundColor: 'white',
        borderRadius: sizes.radius,
        elevation: 8,
        shadowColor: '#7560EE',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerProfileImage: {
        width: 120,
        height: 120,
        borderRadius: 75,
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
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContentTextOne: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#242424',
    },
    headerContentTextTwo: {
        fontSize: 22,
        fontWeight: '700',
        color: 'gray',
        // width: 180
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
        width: '43%',
        height: 180,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        elevation: 9,
        marginLeft: 20,
        marginBottom: 20,
    },
    contentCard: {
        width: '90%',
        backgroundColor: 'white',
        height: 90,
        borderRadius: sizes.radius,
        marginTop: 10,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 7,
        shadowColor: light.purple
    },
    iconCard: {
        width: 60,
        height: 60,
        backgroundColor: light.purple,
        borderRadius: sizes.radius,
        justifyContent: 'center',
        alignItems: 'center'
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