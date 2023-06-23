import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { deleteMiembro, getUserMiembro, getUsers, updateUserRol } from '../../../api/api'
import { Swipeable } from 'react-native-gesture-handler';
import HeaderOrg from '../../../components/HeaderOrg/HeaderOrg'
import * as Icon from '@expo/vector-icons'
import ListItems from './ListItems';
import { Modal } from 'react-native';
import Avatar from '../../../../assets/Avatar.png'
import fondoHeader from '../../../../assets/image/fondoHeader.png'
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Loading from '../../../components/Loading/Loading';
import CardPlay from '../../../components/CardPlay/CardPlay';
import Header from '../../../components/Header/Header';
import { AuthContext } from '../../../context/AuthContext';
import ModalDelete from '../../../components/modals/ModalDelete';


const ModalUP = ({ visible, dataRol, setVisible, handleUpdate, rol, setRol }) => {

    return (
        <Modal transparent visible={visible}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View>
                        <Image source={fondoHeader} style={styles.imageHeader} resizeMode='center' />
                        <Icon.AntDesign name='arrowleft' size={30} style={{ position: 'absolute', top: 15, color: 'white', left: 20 }} onPress={() => { setVisible(!visible) }} />
                    </View>
                    <View style={styles.imageModal}>
                        <Image source={Avatar} style={{ width: '100%', height: '100%', borderRadius: 80 }} resizeMode='center' />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{dataRol.nombre_completo_usuario}</Text>
                        <Text style={{ color: '#9597A1', fontSize: 20, fontWeight: 'bold', paddingVertical: 5 }}>{dataRol.correo_usuario}</Text>

                    </View>
                    <View style={styles.conatinerRol}>
                        <TouchableOpacity onPress={() => setRol(0)} style={[styles.rolOne, rol === 0 && { borderColor: '#5458F7', borderWidth: 2, }]}>
                            <Text style={{ fontSize: 20, color: '#5458F7', lineHeight: 18, fontWeight: 'bold' }}>Admin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setRol(1)} style={[styles.rolTwo, rol === 1 && { borderColor: '#5458F7', borderWidth: 2, }]}>
                            <Text style={{ fontSize: 20, color: '#5458F7', lineHeight: 18, fontWeight: 'bold' }}>Miembro</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.conatinerButton}>
                        <TouchableOpacity style={{ height: 53, width: 150, borderRadius: 40, backgroundColor: '#5458F7', justifyContent: 'center', alignItems: 'center' }} onPress={() => handleUpdate(dataRol.nro_documento_usuario, rol)}>
                            <Text style={{ fontSize: 20, color: 'white', lineHeight: 18, fontWeight: 'bold' }}>Actualizar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}



const UserMiembro = ({ route, navigation }) => {

    const { parametro } = route.params;

    const { userInfo } = useContext(AuthContext)

    const swipeableRef = useRef([]);
    const [data, setData] = useState([])
    const [dataRol, setDataRol] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState('')
    const [id, setId] = useState(null)
    const [index, setIndex] = useState(null)
    const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false);
    const [isloadingData, setIsLoadingData] = useState(false)
    const [rol, setRol] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            fetchDatausers();
        }, []),
    );

    const fetchDatausers = async () => {
        setIsLoadingData(true)
        try {
            const responde = await getUserMiembro(parametro)
            setData(responde.data.message)
            setFilteredData(responde.data.message)
            console.log(responde.data.message);
            setSearch('')
            setIsLoadingData(false)
        } catch (error) {
            console.log(error.response.data.error);
            setFilteredData([])
            setIsLoadingData(false)
        }
    }

    const handleSubmit = (items) => {
        setVisible(!visible)
        setDataRol(items)
        setRol(items.rol)
    }


    const handleSubmitDelete = async () => {  
        const objeto = { nroDocumentoUsuario: id, idSuborganizacion: parametro }
        try {
            await deleteMiembro(objeto)
            fetchDatausers();
            setMostrarAdvertencia(false)
            handleCloseCard(index)
        } catch (error) {
            console.log(error);
            setMostrarAdvertencia(false)
        }
    }

    const handleUpdate = async (num, rol) => {
        const objeto = {
            id_suborganizacion2: parametro,
            nro_documento_usuario1: num,
            rol: rol
        }
        try {
            await updateUserRol(objeto)
            fetchDatausers();
            setVisible(!visible)
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const SearchFilter = (text) => {
        setSearch(text)
        if (text) {
            const newData = data.filter(items => {
                const itemData = items.nombre_completo_usuario ? items.nombre_completo_usuario.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1
            })
            setFilteredData(newData)
        } else {
            setFilteredData(data)
        }
    }



    const handleCloseCard = (index) => {
        swipeableRef.current[index]?.close();
    };

    const handleOpen = (index) => {
        for (let i = 0; i < swipeableRef.current.length; i++) {
            if (i !== index) {
                swipeableRef.current[i]?.close();
            }
        }
    };

    const renderRightActions = (index, item) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={[styles.iconContainerDelete]} onPress={() => { handleCloseCard(index), handleSubmit(item) }}>
                    <Icon.AntDesign name='edit' size={70 * 0.4} color={'white'} />
                </TouchableOpacity>
                {/* handleCloseCard(index), handleSubmitDelete(item.nro_documento_usuario) */}
                <TouchableOpacity style={[styles.iconContainerUpdate]} onPress={() => { setMostrarAdvertencia(true), setId(item.nro_documento_usuario), setIndex(index)  }}>
                    <Icon.FontAwesome5 name={'trash-alt'} size={70 * 0.4} color={'white'} />
                </TouchableOpacity>
            </View>
        )
    };

    return (
        <View style={{ flex: 1 }}>

            {/* <HeaderOrg SearchFilter={SearchFilter} search={search} /> */}
            <Header handleSearch={SearchFilter} search={search} userInfo={userInfo} estado={false} />


            <ScrollView style={{ flex: 1 }}>
                {
                    isloadingData ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                            <Loading />
                        </View>
                        :
                        filteredData.length === 0 ?
                            (<CardPlay navigation={navigation} text='Por el momento esta suborganización no tiene miembros' />) :
                            filteredData.map((item, index) => (
                                <View style={{ marginTop: 20 }} key={index}>
                                    <Swipeable
                                        ref={ref => swipeableRef.current[index] = ref}
                                        renderRightActions={() => renderRightActions(index, item)}
                                        overshootRight={false}
                                        onSwipeableOpen={() => handleOpen(index)}
                                    >
                                        <ListItems item={item} />
                                    </Swipeable>
                                </View>
                            ))}
            </ScrollView>
            <TouchableOpacity style={styles.containerButtom} onPress={() => navigation.navigate('Search', {
                parametro
            })}>
                <Ionicons
                    name='add-sharp'
                    size={35}
                    color='#5458F7'

                />
            </TouchableOpacity>
            <ModalUP visible={visible} rol={rol} setRol={setRol} handleUpdate={handleUpdate} dataRol={dataRol} setVisible={setVisible} />
            <ModalDelete
                // textIsloadin={isloadingDeleText}
                // isloading={isloadingDele}
                visible={mostrarAdvertencia}
                setShow={setMostrarAdvertencia}
                title='¿Estás seguro de que quieres eliminar este Usuario de la subOrganización?'
                // description='¡Atención! Al eliminar el evento, se borrarán todos los datos asociados, incluyendo los likes y comentarios relacionados al evento.'
                handleDelete={handleSubmitDelete}
            />

        </View>
    )
}

export default UserMiembro

const styles = StyleSheet.create({
    contentCard: {
        paddingHorizontal: 30,
        width: '90%',
        height: 130,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 9,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: 'gray'
    },
    textName: {
        fontSize: 28,
        marginLeft: 10,
        fontWeight: '700'
    },
    textEmail: {
        fontSize: 22,
        marginLeft: 15,
        fontWeight: '600',
        color: 'gray'
    },
    textRol: {
        fontSize: 20,
        marginLeft: 15,
        fontWeight: '600',
        color: 'gray'
    },
    TaskContainer: {
        width: '100%',
        alignItems: 'center',
    },

    task: {
        width: '100%',
        height: 120,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingLeft: 20,
        // shadow ios
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowRadius: 10,
        // shadow android
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: 'gray'
    },
    textName: {
        fontSize: 25,
        marginLeft: 10,
        fontWeight: '600'
    },
    textEmail: {
        fontSize: 23,
        marginLeft: 15,
        fontWeight: '600',
        color: 'gray'
    },
    textRol: {
        fontSize: 20,
        marginLeft: 15,
        fontWeight: '600',
        color: '#5458F7'
    },
    iconContainerDelete: {
        height: 120,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7560EE'
    },
    iconContainerUpdate: {
        height: 120,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 380,
        height: 470,
        backgroundColor: 'white',
        borderRadius: 21,
        elevation: 3
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 90,
        overflow: 'hidden'
    },
    imageHeader: {
        height: 130,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    imageModal: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        position: 'absolute',
        top: 55
    },
    textContainer: {
        width: '100%',
        position: 'absolute',
        top: 196,
        alignItems: 'center',
        paddingVertical: 10
    },
    text: {
        alignSelf: 'center',
        fontSize: 25,
        lineHeight: 26,
        fontWeight: 'bold'
    },
    conatinerRol: {
        flexDirection: 'row',
        height: 32,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 290,
        justifyContent: 'space-between',
    },
    rolOne: {
        height: 53,
        width: 150,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rolTwo: {
        height: 53,
        width: 150,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    conatinerButton: {
        flexDirection: 'row',
        height: 32,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 370,
        justifyContent: 'center',
    },
    containerButtom: {
        width: 68,
        height: 68,
        borderRadius: 50,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 7,
        right: 7,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7,
        shadowColor: '#5458F7'
    }
})