import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { getEvent, getEventId, getEventPendi } from '../../../api/api'
import Header from '../../../components/Header/Header'
import { AuthContext } from '../../../context/AuthContext'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Icon from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const CARD_WIDTH = width / 2 - (24 + 24 / 2)
const CARD_HEIGHT = 220


const HomeEventAsis = ({ navigation }) => {

    // estados y contexto que guardan sessiones y conexiones
    const { logout, socket, userInfo } = useContext(AuthContext)

    const [data, setData] = useState([])

    const [dataLikes, setDataLikes] = useState([])

    const [filteredData, setFilteredData] = useState([])
    //almacena el la busqueda
    const [search, setSearch] = useState('')
    //seleciona el tipo de evento
    const [select, setSelect] = useState('All')

    //categorias 
    const Category = ['All', 'Educativo', 'Religioso', 'Social', 'Cultural', 'Musical', 'Deportivo', 'Festival', 'Feria', 'Exposición']

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

    const loadEvent = () => {
        getEventPendi(userInfo.nro_documento_usuario).then((response) => {
            const eventosDePersona = response.data.response
            setData(eventosDePersona);
            setFilteredData(eventosDePersona);
        }).catch((error) => {
            console.log("error.response");
        })
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


    // useEffect para ejecutar el loadEvent
    useFocusEffect(
        React.useCallback(() => {
            socket.on('likes', (getLikes) => {
                setDataLikes(getLikes)
            });
            loadEvent();
            socket.emit('getLikes', userInfo.nro_documento_usuario)
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header visible={true} navigation={navigation} search={search} handleSearch={handleSearch} Category={Category} select={select} handleSelect={handleSelect} userInfo={userInfo} />

            <ScrollView>
                <View style={styles.container}>
                    {filteredData.map((item, index) => {
                        const resultLikes = dataLikes.some((like) => like.nro_documento_usuario3 === userInfo.nro_documento_usuario && like.id_evento5 === item.idEvento)
                        return (
                            <View key={item.idEvento} style={[styles.cardContainer, { paddingTop: index === 1 ? 0 : 24 }]}>
                                <View style={[styles.card, { backgroundColor: 'white' }]} >
                                    <TouchableOpacity style={styles.ImageBox} onPress={() => navigation.navigate('Details', { items: item })}>
                                        <Image style={styles.image} source={{ uri: item.imagenEvento }} />
                                    </TouchableOpacity>
                                    <View style={styles.footer}>
                                        <View style={styles.titleBox}>
                                            <Text style={styles.title} numberOfLines={1}>{item.nombreEvento}</Text>
                                            <Text style={styles.location} numberOfLines={1}>{item.lugarEvento}</Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity style={styles.favorite} onPress={() => { resultLikes ? DeleteLikes(item.idEvento) : CreateLikes(item.idEvento) }}>
                                        {resultLikes ?
                                            <Icon.AntDesign name='heart' size={wp('6')} style={{ color: '#6C63FF' }} />
                                            :
                                            <Icon.Feather name='heart' size={wp('6')} style={{ color: '#6C63FF' }} />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeEventAsis

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 30
    },
    cardContainer: {
        marginLeft: 24,
        marginBottom: 24,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 30,
        elevation: 8,
        shadowColor: '#6C63FF'
    },
    ImageBox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 60,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden'
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 75,
        resizeMode: 'cover'
    },
    footer: {
        marginBottom: 7,
        marginLeft: 16,
        marginRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        // paddingVertical: 10
    },
    titleBox: {
        flex: 1,

    },
    title: {
        marginVertical: 2,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    location: {
        fontSize: 19,
        color: 'gray'
    },
    favorite: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 8,
        borderRadius: 15,
        elevation: 7,
        shadowColor: 'white'
    }
})