import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable, FlatList, RefreshControl, TextInput, KeyboardAvoidingView, Platform, Dimensions, ActivityIndicator, Button, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from '../../../../assets/Avatar.png'
import * as Icon from '@expo/vector-icons';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { AuthContext } from '../../../context/AuthContext';
import { getEvent } from '../../../api/api';
import CardEvent from './CardEvent';
import moment from 'moment';
import 'moment/locale/es';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../../../components/Loading/Loading';
import Header from '../../../components/Header/Header';
import SheetComment from '../../../components/SheetComment/SheetComment';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native';

const { height, width } = Dimensions.get('window')

const HomeScreens = ({ navigation }) => {

    const isDarkMode = useColorScheme();

    // estados y contexto que guardan sessiones y conexiones
    const { logout, socket, userInfo } = useContext(AuthContext)
    //seleciona el tipo de evento
    const [select, setSelect] = useState('All')
    //almacena el comentario
    const [comment, setComment] = useState('')
    //almacena el la busqueda
    const [search, setSearch] = useState('')
    //almacena la data de los eventos
    const [data, setData] = useState([])

    const [filteredData, setFilteredData] = useState([])
    //almacena la data de los comentarios
    const [dataComment, setDataComment] = useState([])
    //almacena la data de los likes
    const [dataLikes, setDataLikes] = useState([])
    //almacena el id del evento seleccionado
    const [eventId, setEventId] = useState(null)
    //almacena el id del comentario seleccionado
    const [commentId, setCommenttId] = useState(null)
    //loading para cargar los eventos
    const [isloading, setIsloading] = useState(false)
    //loading para cargar los comentarios
    const [isloadingComent, setIsloadingComent] = useState(true)
    //loading para cargar para el send de comentarios
    const [isloadingComentSend, setIsloadingComentSend] = useState(false)
    //loading para cargar para el send de comentarios
    const [loadingFaild, setIsloadingFaild] = useState(false)
    //loading para saber si estan comentando
    const [isLoadings, setisLoadings] = useState(null)
    //loading para refrescar la data de los eventos flatlist
    const [refreshing, setRefreshing] = useState(false)
    //estado para mostar una modal o no
    const [modalVisible, setModalVisible] = useState(false);

    // ref manipular el bottomSheetModals
    const bottomSheetModalRef = useRef(null);



    // funcion pra mostar el bottomsheetModals
    const openBottomSheet = (eventId) => {
        bottomSheetModalRef.current?.present();
        setEventId(eventId);
        // Evento para obtener los registros del servidor al cargar la aplicación
        socket.emit('getComments', eventId);
    };


    const retryFetch = () => {
        setIsloadingFaild(false)
        loadEvent();
    }


    // funcion para refrescar la data de los eventos
    const onRefresh = async () => {
        setRefreshing(true);
        loadEvent();
        setRefreshing(false);
    }

    // useEffect para ejecutar el loadEvent
    useEffect(() => {
        // registerForPushNotificationsAsync();
        loadEvent();
        // console.log(isDarkMode);
    }, [])

    // funcion para hacer la peticion de los eventos
    const loadEvent = () => {
        setIsloading(true)
        getEvent().then((response) => {
            setData(response.data.response);
            setFilteredData(response.data.response)
            setIsloading(false)
        }).catch((error) => {
            setIsloading(false)
            setIsloadingFaild(true)
            console.log("error.response");
        })
    }
    // useEffect(() => {
    //     // Solicitar permisos de notificación
    //     const registerForPushNotifications = async () => {
    //         const { status } = await Notifications.requestPermissionsAsync();
    //         if (status !== 'granted') {
    //             console.log('Permisos de notificación no concedidos');
    //             return;
    //         }
    //     };

    //     registerForPushNotifications();
    // }, []);


    // const registerForPushNotificationsAsync = async () => {
    //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
    //     let finalStatus = existingStatus;

    //     if (existingStatus !== 'granted') {
    //         const { status } = await Notifications.requestPermissionsAsync();
    //         finalStatus = status;
    //     }

    //     if (finalStatus !== 'granted') {
    //         console.log('Permiso de notificación denegado');
    //         return;
    //     }

    //     // Obtener el token de notificación del dispositivo
    //     const token = (await Notifications.getExpoPushTokenAsync()).data;

    //     // Enviar el token de notificación al servidor
    //     enviarTokenDeNotificacionAlServidor(token);
    // };



    // const enviarTokenDeNotificacionAlServidor = async (token) => {
    //     try {
    //         console.log(token);
    //         const response = await fetch('https://timecheck.up.railway.app/Notification/enviar-notificacion', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 token: token,
    //                 mensaje: '¡Hola desde la aplicación móvil!',
    //             }),
    //         });

    //         const data = await response.json();
    //         console.log(data);
    //     } catch (error) {
    //         console.log('Error al enviar el token de notificación al servidor', error);
    //     }
    // };

    useEffect(() => {
        // socket.on('connect', () => {
        socket.on('activo', (activo) => {
            setisLoadings(activo);
        });

        socket.on('desactivo', (desactivo) => {
            setisLoadings(desactivo);
        });

        socket.on('likes', (getLikes) => {
            setDataLikes(getLikes)
        });

        // Evento de error
        socket.on('error', (error) => {
            console.log('Error en la conexión del socket:', error);
        });

        socket.on('resultComments', (getComments) => {
            setDataComment(getComments);
            setComment('')
            setIsloadingComent(false);
            setIsloadingComentSend(false)
        })
        socket.on('delete', (getComments) => {
            setModalVisible(false);
        })
        socket.emit('getLikes', userInfo.nro_documento_usuario)
        // });



        // return () => {
        //     socket.off('connect');
        //     socket.off('typing');
        //     socket.off('likes');
        //     socket.off('error');
        //     socket.off('resultComments');
        //     socket.off('delete');
        // };
    }, [socket])

    // funcion para optener el valor del comenatrio
    const handleTextInputChange = (text) => {
        setComment(text);
        if (text.length < 0 || text === '') {
            setisLoadings(null);
            socket.emit('desactivo')
        } else if (isLoadings === null) {
            socket.emit('activo')
        }
    };

    // funcion para crear un comenatrio
    const submitComment = () => {
        setIsloadingComentSend(true)
        const objeto = new Object({
            comentario: comment,
            id_evento4: eventId,
            nro_documento_usuario: userInfo.nro_documento_usuario
        });

        socket.emit('addComment', objeto)
        socket.emit('desactivo')
    }

    // funcion para guardar el valor del search
    const handleSearch = (text) => {
        setSelect('All');

        //filtros tanto search como seleccion para la data eventos 
        // const filtro = select === 'All' ? data : data.filter((item, index) => item.tipoEvento === select)
        // const filtro2 = search === '' ? data : data.filter((item) => (item.nombreEvento && item.nombreEvento.toLowerCase().includes(search.toLowerCase())))
        // let filt = search ? filtro2 : filtro;

        if (text) {
            const newData = data.filter(items => {
                const itemData = items.nombreEvento ? items.nombreEvento.toLowerCase() : ''.toLowerCase()
                const textData = text.toLowerCase();
                return itemData.indexOf(textData) > -1
            })
            setFilteredData(newData)
            setSearch(text);
        } else {
            setFilteredData(data)
            setSearch(text);
        }
    }

    // funcion para guardar el valor del select
    const handleSelect = (tipo) => {
        setSelect(tipo);
        setSearch('');
    }

    // funcion abrir la ventana de eliminar comentario
    const openModals = () => {
        setModalVisible(true);
    };

    // funcion para eliminar un comentario
    const onDelete = () => {
        socket.emit('deleteComment', { commentId, id_evento4: eventId })
    };


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

    //categorias 
    const Category = ['All', 'Educativo', 'Religioso', 'Social', 'Cultural', 'Musical', 'Deportivo', 'Festival', 'Feria', 'Exposición']



    //renderiza la session de comentarios
    const renderComment = ({ item }) => {
        return <SheetComment item={item} userInfo={userInfo.correo} setCommenttId={setCommenttId} openModals={openModals} />
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* header, search, selector */}
            <Header navigation={navigation} search={search} handleSearch={handleSearch} Category={Category} select={select} handleSelect={handleSelect} userInfo={userInfo} />

            {/* card recore y retorna las cartas */}

            {
                loadingFaild ?
                    <View>
                        <Button title="Refresh" onPress={retryFetch} />
                    </View>
                    :
                    <FlatList
                        data={filteredData}
                        renderItem={({ item }) => <CardEvent items={item} openBottomSheet={openBottomSheet} navigation={navigation} CreateLikes={CreateLikes} dataLikes={dataLikes} DeleteLikes={DeleteLikes} userInfo={userInfo} />}
                        keyExtractor={item => item.idEvento}
                        refreshControl={
                            <RefreshControl
                                colors={['#7560EE']}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        contentContainerStyle={{ alignItems: 'center', paddingVertical: 30 }}
                        showsVerticalScrollIndicator={false}
                        onEndReached={loadEvent}
                        onEndReachedThreshold={0.1}
                    />
            }


            {/* BottomSheet */}
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={['95%']}
                onChange={(index) => { index === -1 && setDataComment([]) }}
            >
                {
                    isloadingComent ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <>
                            <View style={{ height: 40, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Comment</Text>
                            </View>
                            {
                                isLoadings && <Loading isLoadings={isLoadings} />
                            }
                            <BottomSheetFlatList
                                data={dataComment}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderComment}
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                            />
                            <KeyboardAvoidingView style={styles.KeyboardComment}
                                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                            >
                                <TextInput
                                    style={styles.textInputComment}
                                    value={comment}
                                    multiline={true}
                                    onChangeText={handleTextInputChange} placeholder='Write a Comments'
                                    editable={!isloadingComentSend}
                                />
                                <TouchableOpacity disabled={isloadingComentSend || comment.length === 0 && true} onPress={submitComment} style={styles.buttomSend} >
                                    {
                                        isloadingComentSend ?
                                            <ActivityIndicator size="small" color="#fff" />
                                            :
                                            <Icon.Feather name="send" size={20} style={{ color: '#fff', textAlign: 'center', }} />
                                    }
                                </TouchableOpacity>
                            </KeyboardAvoidingView>
                            {modalVisible && (
                                <View style={styles.container}>
                                    <View style={styles.modal}>
                                        <Text style={styles.message}>¿Quieres eliminar este comentario?</Text>
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity style={styles.cancelButton} activeOpacity={1} onPress={() => setModalVisible(false)}>
                                                <Text style={styles.buttonText}>Cancelar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                                                <Text style={[styles.buttonText, styles.deleteButtonText]}>Eliminar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </>
                    )
                }
            </BottomSheetModal>
        </SafeAreaView>
    )
}

export default HomeScreens;

const styles = StyleSheet.create({
    // comment
    KeyboardComment: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: '#ccc',
        backgroundColor: 'white',
    },
    textInputComment: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 5,
        maxHeight: 80,
        paddingLeft: 30,
        fontSize: 18
    },
    buttomSend: {
        backgroundColor: '#7560EE',
        padding: 13,
        borderRadius: 5,
        marginRight: 5,
    },

    // alerta 
    container: {
        position: 'absolute',
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
        width: '90%'
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '45%',
    },
    cancelButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButtonText: {
        color: 'white',
    },
})