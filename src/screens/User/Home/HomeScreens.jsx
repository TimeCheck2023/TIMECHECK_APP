import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Pressable, FlatList, RefreshControl, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from '../../../../assets/Avatar.png'
import sena from "../../../../assets/eventoSena.jpg";
import * as Icon from '@expo/vector-icons';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { AuthContext } from '../../../context/AuthContext';
import { getEvent } from '../../../api/api';
import CardEvent from './CardEvent';
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const HomeScreens = ({ navigation }) => {

    const { logout, socket, userInfo } = useContext(AuthContext)
    const [select, setSelect] = useState('All')
    const [comment, setComment] = useState('')
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [dataComment, setDataComment] = useState([])
    const [eventId, setEventId] = useState(null)
    const [isloading, setIsloading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)



    // ref
    const bottomSheetModalRef = useRef(null);

    // callbacks
    const openBottomSheet = (eventId) => {
        bottomSheetModalRef.current?.present();
        setEventId(eventId);
        socket.on('resultComments', (getComments) => {
            setDataComment(getComments);
            setComment('')
        })

        // Evento para obtener los registros del servidor al cargar la aplicación
        socket.emit('getComments', eventId);
    };

    const handleTextInputChange = (text) => {
        setComment(text);
    };

    const submitComment = () => {
        const objeto = new Object({
            comentario: comment,
            id_evento4: eventId,
            nro_documento_usuario: userInfo.nro_documento_usuario
        });

        socket.emit('addComment', objeto)
    }

    const handleSearch = (text) => {
        setSearch(text);
    }
    const handleSelect = (item) => {
        setSelect(item);
    }


    const Category = ['All', 'Educativo', 'Religioso', 'Social', 'Cultural', 'Musical', 'Deportivo', 'Festival', 'Feria', 'Exposición']


    const loadEvent = () => {
        setIsloading(true)
        getEvent().then((response) => {
            setData(response.data.response);
            setIsloading(false)
        }).catch((error) => {
            setIsloading(false)
            console.log("error.response");
        })
    }

    const onRefresh = async () => {
        setRefreshing(true);
        loadEvent();
        setRefreshing(false);
    }

    useEffect(() => {
        loadEvent();
    }, [])


    const filtro = select === 'All' ? data : data.filter((item, index) => item.tipoEvento === select)

    

    const renderComment = ({ item }) => {
        const isMiComentario = item.correo_usuario === userInfo.correo;

        const fechaFormateada = moment.utc(item.fecha_creacion).calendar(null, {
            sameDay: '[Hoy] h:mm A',
            lastDay: '[Ayer]',
            lastWeek: 'DD/MM/YYYY',
            sameElse: 'DD/MM/YYYY',
        });



        return (
            <View style={styles.CardComment}>
                <View style={isMiComentario ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' }}>
                    <Image source={sena} style={styles.ImageComment}
                    />
                    <View style={styles.ContentText}>
                        <Text style={styles.TextOne} >{item.correo_usuario}</Text>
                        <Text style={styles.TextTwo}>
                            {item.comentario}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.fechaCard, isMiComentario ? { left: 30 } : { right: 30 }]}>{fechaFormateada}</Text>
            </View>
        );
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* header */}
            <View style={styles.header}>
                <Image source={Avatar} style={styles.headerImage} resizeMode='cover' />
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerTextOne} numberOfLines={1}>Hi, james</Text>
                    <Text style={styles.headerTextTwo}>Discover fashion that suit your style</Text>
                </View>
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Notification')}>
                    <Icon.Ionicons name='notifications-sharp' color='#7560EE' size={24} />
                </TouchableOpacity>
            </View>


            {/* shearch */}
            <View style={styles.Search}>
                <View style={styles.SearchTextInput}>
                    <Icon.FontAwesome name='search' size={20} color='#7560EE' style={{ opacity: 0.5 }} />
                    <TextInput
                        style={{ flex: 1, fontSize: 20, color: '#7560EE', opacity: 0.5 }}
                        placeholder='Search'
                        value={search}
                        onChangeText={handleSearch}
                    />
                </View>
            </View>

            {/* category */}
            <View>
                <ScrollView horizontal
                    contentContainerStyle={styles.CategoryListContainer}
                    showsHorizontalScrollIndicator={false}>
                    {
                        Category.map((item, index) => (
                            <Pressable key={index} onPress={() => { handleSelect(item) }}>
                                <Text style={[styles.CategoryListText,
                                (item == select && styles.activeCategory)]}>
                                    {item}
                                </Text>
                            </Pressable>
                        ))
                    }
                </ScrollView>
            </View>

            {/* card */}

            <FlatList
                data={filtro}
                renderItem={({ item }) => <CardEvent items={item} openBottomSheet={openBottomSheet} navigation={navigation} />}
                keyExtractor={item => item.idEvento}
                refreshControl={
                    <RefreshControl
                        colors={['#7560EE']}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
            />
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={['95%']}
            >
                <View style={{ height: 40, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Comment</Text>
                </View>
                <BottomSheetFlatList
                    data={dataComment}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderComment}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                />

                <KeyboardAvoidingView style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderTopColor: '#ccc',
                    backgroundColor: 'white',
                }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <TextInput
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                            padding: 8,
                            marginRight: 5,
                            maxHeight: 80,
                        }}
                        value={comment}
                        multiline={true}
                        textAlignVertical="bottom"
                        onChangeText={handleTextInputChange} placeholder='Write a Comments' />
                    <TouchableOpacity
                        onPress={submitComment}
                        style={{
                            backgroundColor: '#7560EE',
                            padding: 13,
                            borderRadius: 5,
                            marginRight: 5,
                        }}>
                        <Icon.Feather name="send" size={20} style={{ color: '#fff', textAlign: 'center', }} />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </BottomSheetModal>
        </SafeAreaView>
    )
}

export default HomeScreens;

const styles = StyleSheet.create({
    // header
    header: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    headerImage: {
        width: 60,
        aspectRatio: 1,
        borderRadius: 52
    },
    headerTextOne: {
        fontSize: 22,
        color: '#191919',
        fontWeight: 'bold',
        marginBottom: 8
    },
    headerTextTwo: {
        fontSize: 16,
        color: '#191919',
        opacity: 0.5
    },
    headerIcon: {
        width: 52,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 52,
        borderWidth: 2,
        borderColor: '#7560EE',
    },

    // Search
    Search: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 4
    },
    SearchTextInput: {
        flex: 1,
        height: 52,
        borderRadius: 52,
        borderWidth: 2,
        borderColor: '#7560EE',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 12
    },

    // category
    CategoryListContainer: {
        marginTop: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        height: 60,
        gap: 15,
    },
    CategoryListText: {
        fontSize: 21,
        fontWeight: 'bold',
        paddingBottom: 5,
        paddingHorizontal: 12,
        color: 'grey'
    },
    activeCategory: {
        color: '#7560EE',
        borderBottomWidth: 1,
        paddingBottom: 5,
        borderColor: '#7560EE'
    },

    // comentarios
    CardComment: {
        padding: 16,
        paddingBottom: 40,
        marginTop: 8,
    },
    ImageComment: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 52
    },
    ContentText: {
        padding: 16,
        width: 288,
        borderRadius: 16,
        left: 12,
        backgroundColor: '#9DA6B8'

    },
    TextOne: {
        fontSize: wp('4.4%'),
        fontWeight: 'bold',
        color: 'black'
    },
    TextTwo: {
        fontSize: 17,
        fontWeight: 600,
        color: 'black',
        marginTop: 7,
        textAlign: 'justify'
    },
    fechaCard: {
        position: 'absolute',
        fontSize: 19,
        fontWeight: 'bold',
        bottom: 3
    }
})