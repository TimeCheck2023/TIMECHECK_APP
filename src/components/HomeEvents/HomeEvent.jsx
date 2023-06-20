import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { getEvent } from '../../api/api'
import Header from '../Header/Header'
import { AuthContext } from '../../context/AuthContext'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Icon from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');

const CARD_WIDTH = width / 2 - (24 + 24 / 2)
const CARD_HEIGHT = 220




const HomeEvent = ({ navigation }) => {

    // estados y contexto que guardan sessiones y conexiones
    const { logout, socket, userInfo } = useContext(AuthContext)

    const [data, setData] = useState([])
    //almacena el la busqueda
    const [search, setSearch] = useState('')
    //seleciona el tipo de evento
    const [select, setSelect] = useState('All')

    //categorias 
    const Category = ['All', 'Educativo', 'Religioso', 'Social', 'Cultural', 'Musical', 'Deportivo', 'Festival', 'Feria', 'Exposición']

    // funcion para guardar el valor del search
    const handleSearch = (text) => {
        setSearch(text);
        setSelect('All');
    }
    // funcion para guardar el valor del select
    const handleSelect = (tipo) => {
        setSelect(tipo);
        setSearch('');
    }

    const loadEvent = () => {
        getEvent().then((response) => {
            const eventosDePersona = response.data.response.filter(evento => evento.idSuborganizacion === userInfo.id_suborganizacion);
            setData(eventosDePersona);
        }).catch((error) => {
            console.log("error.response");
        })
    }
    // useEffect para ejecutar el loadEvent
    useEffect(() => {
        loadEvent();
    }, [])

    const URI = 'https://raw.githubusercontent.com/azdravchev/Travel-App/details_screen_bottom_sheet/assets/images/trips/eea622430834cb64b900c2f03e5be6b8.jpeg'



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header visible={true} navigation={navigation} search={search} handleSearch={handleSearch} Category={Category} select={select} handleSelect={handleSelect} userInfo={userInfo} />

            <ScrollView>
                <View style={styles.container}>
                    <TouchableOpacity style={[styles.cardContainer]} onPress={() => navigation.navigate('FromEvents')}>
                        <View style={[styles.card, { backgroundColor: '#6C63FF', justifyContent: 'center', alignItems: 'center' }]} >
                            <Icon.AntDesign name="plussquareo" size={60} color="white" />
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', paddingVertical: 20 }}>Crear Evento</Text>
                        </View>
                    </TouchableOpacity>
                    {data.map((item, index) => {
                        return (
                            <View key={item.idEvento} style={[styles.cardContainer, { paddingTop: index === 1 ? 0 : 24 }]}>
                                <View style={[styles.card, { backgroundColor: 'white' }]} >
                                    <TouchableOpacity style={styles.ImageBox} onPress={() => navigation.navigate('DetailsSub', { items: item })}>
                                        <Image style={styles.image} source={{ uri: item.imagenEvento }} />
                                    </TouchableOpacity>
                                    <View style={styles.footer}>
                                        <View style={styles.titleBox}>
                                            <Text style={styles.title} numberOfLines={1}>{item.nombreEvento}</Text>
                                            <Text style={styles.location} numberOfLines={1}>{item.lugarEvento}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.favorite}>
                                        <Icon.AntDesign name='heart' size={wp('6')} style={{ color: '#6C63FF' }} />
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeEvent

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
        height: CARD_HEIGHT - 60,
        resizeMode: 'cover'
    },
    footer: {
        marginTop: 6,
        marginLeft: 16,
        marginRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
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