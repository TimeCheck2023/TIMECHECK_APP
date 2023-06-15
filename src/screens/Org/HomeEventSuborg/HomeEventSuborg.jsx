import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HeaderOrg from '../../../components/HeaderOrg/HeaderOrg'
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import { getEvent } from '../../../api/api';
import { ScrollView } from 'react-native';
import fondoHeader from '../../../../assets/image/fondoHeader.png'
import CardPlay from '../../../components/CardPlay/CardPlay';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../../../components/Loading/Loading';



const { width, height } = Dimensions.get('window');

const CARD_WIDTH = width / 2 - (24 + 24 / 2)
const CARD_HEIGHT = 220



const HomeEventSuborg = ({ route, navigation }) => {

    const { parametro } = route.params;

    const { logout, socket, userInfo } = useContext(AuthContext)


    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState('')
    const [isloading, setIsloading] = useState(false)

    // useEffect para ejecutar el loadEvent
    useEffect(() => {
        loadEvent();
    }, [])

    const loadEvent = () => {
        setIsloading(true)
        getEvent().then((response) => {
            const eventosDePersona = response.data.response.filter(evento => evento.idSuborganizacion === parametro);
            setData(eventosDePersona);
            // console.log(eventosDePersona);
            setIsloading(false)
            setFilteredData(eventosDePersona);
        }).catch((error) => {
            console.log("error.response");
            setIsloading(false)
        })
    }

    const SearchFilter = (text) => {
        setSearch(text)
        if (text) {
            const newData = data.filter(items => {
                const itemData = items.nombreEvento ? items.nombreEvento.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1
            })
            setFilteredData(newData)
        } else {
            setFilteredData(data)
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <HeaderOrg search={search} SearchFilter={SearchFilter} />

            <ScrollView>
                <View style={styles.container}>
                    {isloading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                            <Loading />
                        </View>
                        :
                        filteredData.length > 0 ? (
                            filteredData.map((item, index) => {
                                return (
                                    <View key={item.idEvento} style={[styles.cardContainer, { paddingTop: index === 1 ? 0 : 24 }]}>
                                        <View style={[styles.card, { backgroundColor: 'white' }]} >
                                            <TouchableOpacity style={styles.ImageBox} onPress={() => navigation.navigate('Graphics', { items: item })}>
                                                <Image style={styles.image} source={{ uri: item.imagenEvento }} />
                                            </TouchableOpacity>
                                            <View style={styles.footer}>
                                                <View style={styles.titleBox}>
                                                    <Text style={styles.title} numberOfLines={1}>{item.nombreEvento}</Text>
                                                    <Text style={styles.location} numberOfLines={1}>{item.lugarEvento}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.favorite}>
                                                <AntDesign name='heart' size={wp('6')} style={{ color: '#6C63FF' }} />
                                            </View>
                                        </View>
                                    </View>
                                )
                            })

                        ) : (
                            <CardPlay navigation={navigation} text='Por el momento esta suborganizacion no tiene eventos creados' />
                        )
                    }
                </View>
            </ScrollView >
        </View >
    )
}

export default HomeEventSuborg

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
    },
})