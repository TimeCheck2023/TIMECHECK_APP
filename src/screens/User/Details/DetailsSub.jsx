import { View, Text, Image, ImageBackground, Linking, TouchableOpacity, Modal, ActivityIndicator, StyleSheet, Animated, Easing, TextInput } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import * as Icon from '@expo/vector-icons';
import { DeleteAsistencia, getAsistencia, getEventId, saveAsistencia, updateAsistencia } from '../../../api/api';
import { AuthContext } from '../../../context/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import CircleProgress from '../../../components/CircleProgress/CircleProgress';
import avatar from '../../../../assets/Avatar.png';
import moment from 'moment/moment';
import Input from '../../../components/Input/Input';
import Loading from '../../../components/Loading/Loading';
import { light, sizes } from '../../../constants/theme';
import ModalsOption from './ModalsOption';


const DetailsSub = ({ navigation, route }) => {
    const { items } = route.params;
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState(0)
    const [dataLikes, setDataLikes] = useState([])
    const [data, setData] = useState([])
    const [prueba, setPrueba] = useState({})
    const [isloading, setIsloading] = useState(false)
    const [isModalsOpen, setIsModalsOpen] = useState(false)
    const [isModalsOpenC, setIsModalsOpenC] = useState(false)

    const { logout, socket, userInfo } = useContext(AuthContext)

    const bottomSheetRef = useRef(null);
    const scale = useRef(new Animated.Value(0)).current


    useEffect(() => {

        getEvents();
        getAsistencias();

        socket.on('Countlikes', (data) => {
            setLikes(data.countLikes);
        })
        socket.on('CountComment', (data) => {
            setComments(data);
        })

        socket.on('likes', (getLikes) => {
            setDataLikes(getLikes)
        });




        socket.emit('getCountLikes', items.idEvento)
        socket.emit('getCountComments', items.idEvento)
        socket.emit('getLikes', userInfo.nro_documento_usuario)




        // return () => {

        // }
    }, [])


    const getEvents = async () => {
        console.log("items.idEvento");
        try {
            const response = await getEventId(items.idEvento)
            setData(response.data.response);
        } catch (error) {
            console.log(error);
            console.log('error.response');
        }
    }

    const CreateLikes = (id) => {
        const objeto = new Object({
            id_evento: id,
            likes: 1,
            nro_documento_usuario: userInfo.nro_documento_usuario
        })
        socket.emit('createLikes', objeto);
    }

    const DeleteLikes = (id) => {
        const objeto = new Object({
            id_evento: id,
            nro_documento_usuario: userInfo.nro_documento_usuario
        })
        socket.emit('deleteLikes', objeto);
    }

    const getAsistencias = async () => {
        const data = {
            idEvento: items.idEvento,
            correo: userInfo.correo,
        }
        setIsloading(true)
        await getAsistencia(data)
            .then((response) => {
                setPrueba(response.data);
                setIsloading(false)
            }).catch((error) => {
                console.log(error.message);
            })
    }

    const precio = data.valorTotalEvento === 0 ? 'Gratis' : data.valorTotalEvento

    const handleSubmitPost = async () => {
        const data = {
            eventId: items.idEvento,
            userEmail: userInfo.correo,
        }
        setIsloading(true)

        try {
            const response = await saveAsistencia(data)
            console.log(response.data);
            getEvents();
            getAsistencias();
            socket.emit('postAsistencia', items.idEvento)
        } catch (error) {
            console.log(error.message);
            setIsloading(false)
        }
    }

    const deleAsistencia = async () => {
        setIsloading(true)

        const data = {
            idEvento: items.idEvento,
            correoUsuario: userInfo.correo,
        }

        try {
            const response = await DeleteAsistencia(data)
            console.log(response.data);
            getEvents();
            getAsistencias();
            socket.emit('postAsistencia', items.idEvento)
        } catch (error) {
            console.log(error.response.data);
            setIsloading(false)
        }
    }

    const resultLikes = dataLikes.some((like) => like.nro_documento_usuario3 === userInfo.nro_documento_usuario && like.id_evento5 === items.idEvento)


    const resiveBox = (to) => {
        to === 1 && setIsModalsOpen(!isModalsOpen)
        Animated.timing(scale, {
            toValue: to,
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear
        }).start()
    }

    return (
        <>
            {
                isloading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Loading />
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('ContainerImage', { image: data.imagenEvento })}>
                            <ImageBackground style={styles.backgroundImage} source={{ uri: data.imagenEvento }} >
                                <TouchableOpacity style={styles.ImagenButtomBack} >
                                    <Icon.AntDesign name="arrowleft" size={wp('6')} style={{ color: '#6C63FF' }} onPress={navigation.goBack} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.Select} onPress={() => resiveBox(1)}>
                                    <Icon.Entypo name='dots-three-vertical' size={wp('6')} style={{ color: '#6C63FF' }} />
                                </TouchableOpacity>
                                {/* modal */}
                                <ModalsOption isModalsOpen={isModalsOpen} setIsModalsOpen={setIsModalsOpen} scale={scale} />
                            </ImageBackground>
                        </TouchableOpacity>
                        <BottomSheet
                            ref={bottomSheetRef}
                            snapPoints={['70%', '72%']}
                            borderRadius={70}
                        // handleIndicatorStyle={{ opacity: 0 }}
                        >
                            <BottomSheetScrollView>
                                <View style={{ backgroundColor: 'white' }}>

                                    <View style={styles.headerContain}>
                                        <View style={{ width: '83%' }}>
                                            <Text style={styles.headerTitleOne}>{data.nombreEvento}</Text>
                                            <Text style={styles.headerTitleTwo}>{data.tipoEvento}</Text>
                                        </View>
                                        <View style={{ bottom: 20 }}>
                                            <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>Aforo: </Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.headerTextAforoOne}>{data.cuposDisponibles}</Text>
                                                <Text style={styles.headerTextAforoTwo}>/{data.aforoEvento}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Container Body*/}

                                    <View style={{ paddingHorizontal: 20, }}>

                                        {/* Container date y location*/}

                                        <View style={styles.DetailsDate}>
                                            <Icon.Feather name='calendar' size={24} color='#6C5CE7' />
                                            <Text style={styles.DetailsDateText}>{moment(data.fechaFinalEvento).format('D MMM YYYY h:mm a')}</Text>
                                        </View>
                                        <View style={styles.DetailsLocation}>
                                            <Icon.Ionicons name='location' size={24} color='#6C5CE7' />
                                            <Text style={styles.DetailsDateText}>{data.lugarEvento}</Text>
                                        </View>


                                        <View style={{ paddingVertical: 20, paddingBottom: '30%' }}>

                                            {/* Container Description */}

                                            <View style={{ paddingVertical: 10 }}>
                                                <Text style={styles.DescriptionTitle}>Descripcion</Text>
                                                <Text style={styles.DescriptionText}>
                                                    {data.descripcionEvento}
                                                </Text>
                                            </View>


                                            {/* Container graficas */}
                                            <View style={styles.ContanteGraficas}>
                                                <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>Graficas</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                    <CircleProgress
                                                        value={likes} // Aquí puedes pasar el valor de progreso deseado entre 0 y 1
                                                        label='Likes'
                                                        colorText='#1B1B1B'
                                                        colorProgress='#7560EE'
                                                        colorStoke={light.white}
                                                    />
                                                    <CircleProgress
                                                        value={comments} // Aquí puedes pasar el valor de progreso deseado entre 0 y 1
                                                        label='Comentarios'
                                                        colorText='#1B1B1B'
                                                        colorProgress='#7560EE'
                                                        colorStoke={light.white}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View >
                            </BottomSheetScrollView>
                        </BottomSheet >

                        {/* Container buttom send */}
                        <View style={styles.ContainerbuttomSend}>
                            <View style={styles.buttomSend}>

                                {/* buttom */}
                                <TouchableOpacity onPress={() => { prueba.tipoAsistencia === 'cancelado' || prueba.tipoAsistencia === '' || prueba.exists === false ? handleSubmitPost() : deleAsistencia() }} style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, borderRadius: sizes.radius + 10, height: 60, width: 240, justifyContent: 'center', alignItems: 'center' }}>
                                    {isloading ?
                                        <ActivityIndicator size="large" color='#7560EE' />
                                        :
                                        <Text style={{ fontWeight: '700', fontSize: 20, color: light.purple }}>Confirmar Asistencia</Text>
                                    }
                                </TouchableOpacity>

                                {/* precis */}
                                <TouchableOpacity style={styles.ImagenButtom}
                                    onPress={() => { resultLikes ? DeleteLikes(items.idEvento) : CreateLikes(items.idEvento) }}
                                >
                                    {resultLikes ?
                                        <Icon.AntDesign name='heart' size={wp('6')} style={{ color: '#6C63FF' }} />
                                        :
                                        <Icon.Feather name='heart' size={wp('6')} style={{ color: '#6C63FF' }} />
                                    }
                                </TouchableOpacity>

                            </View>
                        </View>

                        <Modal
                            transparent
                            visible={true}
                        >
                            <View style={styles.containerModal}>
                                <View style={styles.modal}>
                                    <Input />
                                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                        <TouchableOpacity style={{ backgroundColor: light.purple, paddingHorizontal: 20, paddingVertical: 10, borderRadius: sizes.radius + 10, height: 60, width: 240, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                            {isloading ?
                                                <ActivityIndicator size="large" color='#7560EE' />
                                                :
                                                <Text style={{ fontWeight: '700', fontSize: 20, color: light.purple }}>Confirmar Asistencia</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View >
            }
        </>
    )
}

export default DetailsSub

const styles = StyleSheet.create({
    backgroundImage: {
        padding: 20,
        height: sizes.height / 2.5,
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    ImagenButtomBack: {
        backgroundColor: 'white',
        width: wp('12'),
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: sizes.radius + 12,
        marginRight: 20
    },
    ImagenButtom: {
        backgroundColor: 'white',
        width: wp('15'),
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: sizes.radius + 12,
        marginRight: 20
    },
    Select: {
        backgroundColor: 'white',
        width: wp('12'),
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: sizes.radius + 12,
    },
    headerContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    headerTitleOne: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold'
    },
    headerTitleTwo: {
        fontSize: 25,
        fontWeight: '700',
        color: 'gray'
    },
    headerTextAforoOne: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
    },
    headerTextAforoTwo: {
        fontSize: 25,
        fontWeight: '600',
        color: 'black'
    },
    DetailsDate: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    DetailsLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    DetailsDateText: {
        fontSize: 22,
        fontWeight: '600',
        color: 'gray',
        paddingHorizontal: 10
    },
    ContactEvents: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10, // Ajusta este valor para aumentar o disminuir la sombra
        marginVertical: 10,
        shadowColor: '#6C63FF',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    ImageAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2
    },
    ContactTextOne: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black'
    },
    ContactTextTwo: {
        fontSize: 14,
        fontWeight: '600',
        color: 'gray'
    },
    ButtomPhone: {
        backgroundColor: '#6C5CE7',
        elevation: 7,
        width: 40,
        height: 40,
        padding: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    DescriptionTitle: {
        fontSize: 22,
        fontWeight: '700'
    },
    DescriptionText: {
        fontWeight: '700',
        color: 'gray',
        fontSize: 18,
        paddingVertical: 10
    },
    ContanteGraficas: {
        marginVertical: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 10, // Ajusta este valor para aumentar o disminuir la sombra
        marginVertical: 10,
        shadowColor: '#6C63FF',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    ContainerbuttomSend: {
        width: '100%',
        height: 90,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#6C5CE7',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    buttomSend: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15
    },
    price: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modal: {
        width: wp('90%'),
        height: hp('50%'),
        backgroundColor: 'white',
        borderRadius: sizes.radius,
        paddingHorizontal: 20,
    }
})