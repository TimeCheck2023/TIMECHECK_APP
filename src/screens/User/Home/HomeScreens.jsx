import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable, FlatList, RefreshControl, TextInput, KeyboardAvoidingView, Platform, Dimensions, ActivityIndicator, Button, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Icon from '@expo/vector-icons';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { AuthContext } from '../../../context/AuthContext';
import { getEvent } from '../../../api/api';
import CardEvent from './CardEvent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../../../components/Loading/Loading';
import Header from '../../../components/Header/Header';
import SheetComment from '../../../components/SheetComment/SheetComment';
import { useFocusEffect } from '@react-navigation/native';
import { light, sizes, spacing } from '../../../constants/theme';

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

    const [isloadingData, setIsloadingData] = useState(false)

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

    //categorias 
    const Category = ['All', 'Educativo', 'Religioso', 'Social', 'Cultural', 'Musical', 'Deportivo', 'Festival', 'Feria', 'Exposición']

    // funcion pra mostar el bottomsheetModals
    const openBottomSheet = (eventId) => {
        bottomSheetModalRef.current?.present();
        setEventId(eventId);
        // Evento para obtener los registros del servidor al cargar la aplicación
        socket.emit('getComments', eventId);

    };


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
            // console.log(data);
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

    // useEffect para ejecutar el loadEvent
    useEffect(() => {
        loadEvent();
        console.log(isDarkMode);
    }, [])


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



    // funcion para hacer la peticion de los eventos
    const loadEvent = () => {
        setIsloadingData(true)
        getEvent().then((response) => {
            setData(response.data.response);
            setFilteredData(response.data.response)
            setIsloadingData(false)
        }).catch((error) => {
            setIsloadingData(false)
            setIsloadingFaild(true)
            console.log("error.response");
        })
    }


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
        setSearch('');
        if (tipo) {
            if (tipo === 'All') {
                return setFilteredData(data), setSelect(tipo);
            }
            const newData = data.filter(items => {
                const itemData = items.tipoEvento ? items.tipoEvento.toLowerCase() : ''.toLowerCase()
                const textData = tipo.toLowerCase();
                return itemData.indexOf(textData) > -1
            })
            setFilteredData(newData)
            setSelect(tipo);
        } else {
            setFilteredData(data)
            setSelect(tipo);
        }

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

    //renderiza la session de comentarios
    const renderComment = ({ item }) => {
        return <SheetComment item={item} userInfo={userInfo.correo} setCommenttId={setCommenttId} openModals={openModals} />
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* header, search, selector */}
            <Header navigation={navigation} search={search} handleSearch={handleSearch} Category={Category} select={select} handleSelect={handleSelect} userInfo={userInfo} />
            {
                isloadingData ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                        <Loading />
                    </View>
                    :
                    loadingFaild ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                            < Button title="Refresh" onPress={retryFetch} />
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
                                <Text style={{ fontSize: wp('5'), fontWeight: 'bold' }}>Comment</Text>
                            </View>
                            {isLoadings && <Loading isLoadings={isLoadings} />}
                            <BottomSheetFlatList
                                data={dataComment}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderComment}
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                showsVerticalScrollIndicator={false}
                            />
                            <KeyboardAvoidingView style={styles.KeyboardComment}
                                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                            >
                                <View style={styles.containerText}>
                                    <TextInput
                                        style={styles.textInputComment}
                                        value={comment}
                                        multiline={true}
                                        onChangeText={handleTextInputChange} placeholder='Comenta aquí'
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
                                </View>
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


        </SafeAreaView >
    )
}

export default HomeScreens;

const styles = StyleSheet.create({
    // comment
    KeyboardComment: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: '#ccc',
        backgroundColor: light.light,
        height: '10%',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    containerText: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: light.white,
        borderRadius: sizes.radius + 10,
        alignItems: 'center',
    },
    textInputComment: {
        color: light.black,
        fontSize: hp('2.4'),
        fontSize: wp('5'),
        flex: 1,
        fontWeight: 'bold',
        paddingLeft: spacing.s + 4,
    },
    buttomSend: {
        backgroundColor: '#7560EE',
        borderRadius: sizes.radius + 5,
        marginRight: 5,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
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