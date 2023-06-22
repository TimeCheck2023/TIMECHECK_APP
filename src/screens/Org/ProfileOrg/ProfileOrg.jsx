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
import { getOrg } from '../../../api/api';
import { useFocusEffect } from '@react-navigation/native';
import { light, sizes } from '../../../constants/theme';
import Loading from '../../../components/Loading/Loading';


const ProfileOrg = ({ navigation }) => {
    const { logout, userInfo, socket } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [cantidad, setCantidad] = useState(0)
    const [cantida, setCantida] = useState(0)
    const [user, setUser] = useState({})

    const getUser = async () => {
        setIsLoading(true)
        await getOrg(userInfo.id_organización)
            .then((response) => {
                setUser(response.data.message)
                console.log(response.data.message)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err);
                setIsLoading(false)
            })
    }

    useFocusEffect(
        React.useCallback(() => {
            getUser();


            socket.on('CountEvent', data => {
                setCantidad(data.cantidad_eventos);
            })
            socket.on('CountSubOrg', data => {
                setCantida(data.cantidad_suborganizaciones);
            })


            socket.emit('getCountEvent', userInfo.id_organización)
            socket.emit('getCountSubOrg', userInfo.id_organización)

        }, []),
    );
    return (
        <>
            {isLoading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                    <Loading />
                </View>
                :
                <ScrollView>
                    <StatusBar />
                    <View style={styles.container}>
                        <View style={{ width: '100%', height: 200 }}>
                            <ImageBackground source={fondoHeader} resizeMode='cover' style={{ width: '100%', height: '100%', alignItems: 'center' }}>

                                <View style={styles.headerProfile}>
                                    <View style={styles.headerProfileImage}>
                                        <Image source={{ uri: user.image_url }} resizeMode='cover' style={styles.image} />
                                    </View>
                                    <View style={styles.headerContent}>
                                        <Text style={styles.headerContentTextOne} numberOfLines={1}>{user.nombre_organizacion}</Text>
                                        <Text numberOfLines={1} style={styles.headerContentTextTwo}>{user.correo_organizacion}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.btnClose} onPress={() => navigation.goBack()}>
                                    <Icon.Ionicons name="arrow-back" size={wp('7')} style={{ color: '#6C63FF' }} />
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>


                        <View style={styles.contentGraficaOne}>
                            <View>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>Eventos</Text>
                                {/* <Text style={{ fontSize: 25, fontWeight: '700', color: 'gray' }}>Asistidos</Text> */}
                            </View>
                            <CircleProgress
                                value={cantidad} // Aquí puedes pasar el valor de progreso deseado entre 0 y 1
                                colorText='#1B1B1B'
                                colorProgress='#7560EE'
                                colorStoke={light.lightGray}
                            />
                        </View>
                        <View style={styles.contentGraficaTwo}>
                            <View>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>SubOrganizaciones</Text>
                                {/* <Text style={{ fontSize: 25, fontWeight: '700', color: 'white' }}>Asistidos</Text> */}
                            </View>
                            <CircleProgress
                                value={cantida} // Aquí puedes pasar el valor de progreso deseado entre 0 y 1
                                colorText='white'
                                colorProgress='#7560EE'
                                colorStoke={light.white}
                            />
                        </View>

                        <TouchableOpacity style={styles.contentCard} onPress={() => navigation.navigate('FormUpdateOrg', { data: user })}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.iconCard}>
                                    <Icon.AntDesign name="user" size={wp('8')} style={{ color: light.white }} />
                                </View>
                                <Text style={{ left: 15, fontSize: 20 }}>Editar perfil</Text>
                            </View>
                            <Icon.AntDesign name="right" size={wp('8')} style={{ color: '#6C63FF' }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contentCard} onPress={() => navigation.navigate('ChangePassword')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.iconCard}>
                                    <Icon.Ionicons name="log-in-outline" size={wp('8')} style={{ color: light.white }} />
                                </View>
                                <Text style={{ left: 15, fontSize: 20 }}>Cambiar Contraseña</Text>
                            </View>
                            <Icon.AntDesign name="right" size={wp('8')} style={{ color: '#6C63FF' }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contentCard} onPress={() => logout()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.iconCard}>
                                    <Icon.AntDesign name="setting" size={wp('8')} style={{ color: light.white }} />
                                </View>
                                <Text style={{ left: 15, fontSize: 20 }}>Cerrar session</Text>
                            </View>
                            <Icon.AntDesign name="right" size={wp('8')} style={{ color: '#6C63FF' }} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            }
        </>
    )
}

export default ProfileOrg

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 130,
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
        marginTop: hp('2'),
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
        width: '90%',
        height: 100,
        backgroundColor: 'white',
        marginTop: hp('18'),
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
        backgroundColor: light.purple,
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
})