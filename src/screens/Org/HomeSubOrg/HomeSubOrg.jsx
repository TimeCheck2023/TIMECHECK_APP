import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { TextInput } from 'react-native';
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AuthContext } from '../../../context/AuthContext';
import { getSubOrg } from '../../../api/api';
import fondoHeader from '../../../../assets/image/fondoHeader.png'
import { useFocusEffect } from '@react-navigation/native';
import HeaderOrg from '../../../components/HeaderOrg/HeaderOrg';



const { width, height } = Dimensions.get('window');

const CARD_WIDTH = width / 2 - (24 + 24 / 2)
const CARD_HEIGHT = 220



const HomeSubOrg = ({ navigation }) => {

    const inset = useSafeAreaInsets();
    const { logout, userInfo } = useContext(AuthContext);

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState('')

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, []),
    );

    const fetchData = async () => {
        await getSubOrg(userInfo.id_organización)
            .then((response) => {
                setData(response.data.message);
                setFilteredData(response.data.message);
            }).catch((error) => {
                // setIsloading(false)
            })
    }

    const SearchFilter = (text) => {
        setSearch(text)
        if (text) {
            const newData = data.filter(items => {
                const itemData = items.nombre_suborganizacion ? items.nombre_suborganizacion.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1
            })
            setFilteredData(newData)
        } else {
            setFilteredData(data)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderOrg search={search} SearchFilter={SearchFilter} />

            <ScrollView>
                <View style={styles.container}>
                    {filteredData.map((item, index) => {
                        return (
                            <TouchableOpacity key={item.id_suborganizacion} style={styles.containerCard} onPress={() => { navigation.navigate('Search') }}>
                                <ImageBackground source={fondoHeader} style={[styles.card]} >
                                    <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>{item.nombre_suborganizacion}</Text>
                                        <Text style={{ fontSize: 20, fontWeight: '600', color: 'white', lineHeight: 30 }}>{item.descripcion_suborganizacion}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.containerButtom} onPress={() => navigation.navigate('FormSubOrg')}>
                <Ionicons
                    name='add-sharp'
                    size={35}
                    color='#5458F7'

                />
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default HomeSubOrg

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    containerCard: {
        width: 380,
        height: 370,
        backgroundColor: 'white',
        borderRadius: 21,
        elevation: 3,
        marginTop: 23,
        overflow: 'hidden',
    },
    card: {
        width: '100%',
        height: '100%',
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center'
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