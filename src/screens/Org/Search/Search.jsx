import { StyleSheet, Text, View, TextInput, ScrollView, Image, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { getUsers, saveMiembro } from '../../../api/api';
import Avatar from '../../../../assets/Avatar.png'
import fondoHeader from '../../../../assets/image/fondoHeader.png'
import HeaderOrg from '../../../components/HeaderOrg/HeaderOrg';
import Loading from '../../../components/Loading/Loading';
import CardPlay from '../../../components/CardPlay/CardPlay';


const ModalUP = ({ visible, dataRol, setVisible, handleAdd }) => {
    const [rol, setRol] = useState('');

    return (
        <Modal transparent visible={visible}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View>
                        <Image source={fondoHeader} style={styles.imageHeader} resizeMode='center' />
                        <AntDesign name='arrowleft' size={30} style={{ position: 'absolute', top: 15, color: 'white', left: 20 }} onPress={() => { setVisible(!visible), setRol('') }} />
                    </View>
                    <View style={styles.imageModal}>
                        <Image source={Avatar} style={{ width: '100%', height: '100%', borderRadius: 80 }} resizeMode='center' />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{dataRol.nombre_completo_usuario}</Text>
                        <Text style={{ color: '#9597A1', fontSize: 20, fontWeight: 'bold', paddingVertical: 5 }}>{dataRol.correo_usuario}</Text>

                    </View>
                    <View style={styles.conatinerRol}>
                        <TouchableOpacity onPress={() => setRol(0)} style={[styles.rolOne, rol === '' ? null : rol === 0 && { borderColor: '#5458F7', borderWidth: 2, }]}>
                            <Text style={{ fontSize: 20, color: '#5458F7', lineHeight: 18, fontWeight: 'bold' }}>Admin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setRol(1)} style={[styles.rolTwo, rol === '' ? null : rol === 1 && { borderColor: '#5458F7', borderWidth: 2, }]}>
                            <Text style={{ fontSize: 20, color: '#5458F7', lineHeight: 18, fontWeight: 'bold' }}>Miembro</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.conatinerButton}>
                        <TouchableOpacity style={{ height: 53, width: 150, borderRadius: 40, backgroundColor: '#5458F7', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => handleAdd(dataRol.nro_documento_usuario, rol)}>
                            <Text style={{ fontSize: 20, color: 'white', lineHeight: 18, fontWeight: 'bold' }}>Agregar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const Search = ({ route, navigation }) => {

    const { parametro } = route.params;

    const inset = useSafeAreaInsets();

    const [data, setData] = useState([])
    const [dataRol, setDataRol] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState('')
    const [isloadingData, setIsLoadingData] = useState(false)


    useEffect(() => {
        fetchDatausers();
    }, [])


    const fetchDatausers = async () => {
        setIsLoadingData(true)
        try {
            const responde = await getUsers()
            setData(responde.data.message)
            setFilteredData(responde.data.message)
            setSearch('')
            setIsLoadingData(false)
        } catch (error) {
            console.log(error.responde);
            setIsLoadingData(false)
        }
    }

    const handleSubmit = (items) => {
        setVisible(!visible)
        setDataRol(items)
    }

    const handleAdd = async (num, rol) => {
        if (rol === '') return console.log("debes selecionar un rol")
        const objeto = {
            id_suborganizacion2: parametro,
            nro_documento_usuario1: num,
            rol: rol
        }
        try {
            await saveMiembro(objeto)
            navigation.goBack();
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


    return (
        <View style={styles.container}>
            <HeaderOrg SearchFilter={SearchFilter} search={search} />

            <ScrollView>
                <View style={{ flex: 1, width: '100%', alignItems: 'center', paddingVertical: 40 }}>
                    {
                        isloadingData ?
                            <Loading />
                            : filteredData.length < 0 ? <CardPlay /> : filteredData.map((item, index) => (
                                <TouchableOpacity style={styles.contentCard} key={index} onPress={() => handleSubmit(item)}>
                                    <Image style={styles.image} />
                                    <View style={{ flex: 1, }}>
                                        <Text style={styles.textName} numberOfLines={1}>{item.nombre_completo_usuario}</Text>
                                        <Text style={styles.textEmail} >{item.correo_usuario}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                </View>
            </ScrollView>

            <ModalUP visible={visible} handleAdd={handleAdd} dataRol={dataRol} setVisible={setVisible} />
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb',
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    containerSearch: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 24 / 1.5,

    },
    inner: {
        flexDirection: 'row',
    },
    search: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1
    },
    field: {
        backgroundColor: 'white',
        flex: 1,
        paddingLeft: 48,
        paddingRight: 18,
        paddingVertical: 18,
        borderRadius: 16,
        height: 54,
        elevation: 7,
        shadowColor: '#7560EE',
    },
    filtre: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1
    },
    contentCard: {
        paddingHorizontal: 30,
        width: '90%',
        height: 90,
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
        fontSize: 25,
        marginLeft: 10,
        fontWeight: '600'
    },
    textEmail: {
        fontSize: 20,
        marginLeft: 15,
        fontWeight: '600',
        color: 'gray'
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
})