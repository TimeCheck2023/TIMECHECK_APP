import { View, Text, Image, ImageBackground, Linking, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, Animated } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useEffect, useRef, useState } from 'react'
import * as Icon from '@expo/vector-icons';
import { DeleteAsistencia, getAsistencia, getEventId, saveAsistencia, updateAsistencia } from '../../../api/api';
import { AuthContext } from '../../../context/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Dimensions } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import CircleProgress from '../../../components/CircleProgress/CircleProgress';
import avatar from '../../../../assets/Avatar.png';
import moment from 'moment/moment';
import Loading from '../../../components/Loading/Loading';

const { width, height } = Dimensions.get('window')


const Details = ({ navigation, route }) => {

  const { items } = route.params;


  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState(0)
  const [dataLikes, setDataLikes] = useState([])
  const [data, setData] = useState([])
  const [prueba, setPrueba] = useState({})
  const [isloading, setIsloading] = useState(false)

  const { logout, socket, userInfo } = useContext(AuthContext)

  const bottomSheetRef = useRef(null);

  const sendWhatsAppMessage = () => {
    const phoneNumber = '573207432224'; // Aquí debes poner el número al que quieres abrir el chat de WhatsApp
    const message = '3207430224'; // Aquí debes poner el número al que quieres abrir el chat de WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  useEffect(() => {

    getEvents();
    getAsistencias();

    socket.on('Countlikes', (data) => {
      setLikes(data);
      console.log(data);
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
    try {
      const response = await getEventId(items.idEvento)
      // console.log(response.data.response[0]);
      setData(response.data.response[0]);
    } catch (error) {
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
    } catch (error) {
      console.log(error.response.data);
      setIsloading(false)
    }
  }

  const resultLikes = dataLikes.some((like) => like.nro_documento_usuario3 === userInfo.nro_documento_usuario && like.id_evento5 === items.idEvento)


  return (
    <>
      {
        isloading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Loading />
          </View>
          :
          <View style={{ flex: 1 }}>
            <View>
              <ImageBackground style={styles.backgroundImage} source={{ uri: data.imagenEvento }}>
                <TouchableOpacity style={styles.ImagenButtom}>
                  <Icon.AntDesign name="arrowleft" size={wp('6')} style={{ color: '#6C63FF' }} onPress={navigation.goBack} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.ImagenButtom}
                  onPress={() => { resultLikes ? DeleteLikes(items.idEvento) : CreateLikes(items.idEvento) }}
                >
                  {resultLikes ?
                    <Icon.AntDesign name='heart' size={wp('6')} style={{ color: '#6C63FF' }} />
                    :
                    <Icon.Feather name='heart' size={wp('6')} style={{ color: '#6C63FF' }} />
                  }
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={['62%', '97%']}
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
                      {/* Container Contacto */}
                      <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold'
                      }}>Listing Agent</Text>
                      <View style={styles.ContactEvents}>
                        <Image source={avatar} style={styles.ImageAvatar} />
                        <View style={{ flex: 1, paddingLeft: 15 }}>
                          <Text style={styles.ContactTextOne}>Samarinda Kita</Text>
                          <Text style={styles.ContactTextTwo}>SubOrganizacion</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity style={styles.ButtomPhone} onPress={sendWhatsAppMessage}>
                            <Icon.Entypo name='phone' size={24} color='white' />
                          </TouchableOpacity>
                          {/* <TouchableOpacity style={{ backgroundColor: '#6C5CE7', elevation: 7, width: 40, height: 40, padding: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon.Feather name='calendar' size={20} color='white' />
                  </TouchableOpacity> */}
                        </View>
                      </View>


                      {/* Container Description */}

                      <View style={{ paddingVertical: 10 }}>
                        <Text style={styles.DescriptionTitle}>Description</Text>
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
                          />
                          <CircleProgress
                            value={comments} // Aquí puedes pasar el valor de progreso deseado entre 0 y 1
                            label='Comments'
                            colorText='#1B1B1B'
                            colorProgress='#7560EE'
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
                {/* precis */}
                <View>
                  <Text style={{ fontSize: 15, color: 'white' }}>Price:</Text>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>{precio}</Text>
                </View>

                {/* buttom */}
                <TouchableOpacity onPress={() => { prueba.tipoAsistencia === 'cancelado' || prueba.tipoAsistencia === '' || prueba.exists === false ? handleSubmitPost() : deleAsistencia() }} style={{ backgroundColor: 'white', paddingHorizontal: 50, paddingVertical: 15, borderRadius: 30 }}>
                  {isloading ?
                    <ActivityIndicator size="large" color='#7560EE' />
                    :
                    <Text style={{ fontWeight: '700', fontSize: 18, color: '#6C5CE7' }}>{prueba.tipoAsistencia === 'cancelado' || prueba.tipoAsistencia === '' ? 'Asistir' : 'cancelar asistencia'}</Text>
                  }

                </TouchableOpacity>

              </View>
            </View>
          </View >
      }
    </>
  )
}

export default Details


const styles = StyleSheet.create({
  backgroundImage: {
    padding: 20,
    height: height / 2.5,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  ImagenButtom: {
    backgroundColor: 'white',
    width: wp('11'),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
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
    padding: 20
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
})

{/* tipo de eventos y devolver */ }
      // <View className=' w-screen flex-row items-center justify-center mt-6'>
      //   <TouchableOpacity className='absolute w-[45px] h-[45px] left-4 items-center justify-center rounded-2xl'
      //     style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      //     onPress={() => navigation.goBack()}>
      //     <Icon.AntDesign name="arrowleft" size={27} color="white" />
      //   </TouchableOpacity>

      //   <Text className='text-2xl font-medium text-black '>{items.tipoEvento}</Text>
      // </View>

      // {/* header de image */}
      // <View className=' h-[270px] w-[360px] justify-center items-center top-10'>
      //   <ImageBackground source={{ uri: items.imagenEvento }} resizeMode='contain' borderRadius={30} borderBottomRightRadius={30} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      //     <View className='absolute w-14 h-12 flex-row items-center justify-evenly right-4 top-4 rounded-2xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      //       <Icon.Feather name='heart' size={20} className='text-white' />
      //       <Text className='text-xl text-white'>0</Text>
      //     </View>
      //   </ImageBackground>
      // </View>

      // <View className='flex-1 p-4 mt-10 w-screen'>
      //   <Text className='text-3xl  font-extrabold text-black' >{items.nombreEvento}</Text>
      //   <Text className='text-base text-justify font-normal text-black top-2'>{items.descripcionEvento}</Text>
      // </View>
      // <View className='absolute flex-1 flex-row gap-2 left-0 right-0 justify-center items-center bottom-5'>
      //   <TouchableOpacity className='sm:w-14 sm:h-14 items-center justify-center rounded-xl bg-[#6C5CE7]'>
      //     <Icon.Feather name='share-2' className='text-white' size={18} />
      //   </TouchableOpacity>
      //   <TouchableOpacity className=' sm:w-56 sm:h-14 bg-[#6C5CE7]  rounded-2xl items-center justify-center' onPress={() => setPrueba(!prueba)}>
      //     {
      //       prueba ?
      //         <Text className='text-white text-lg font-bold'>cancelar asistencia</Text>
      //         :
      //         <Text className='text-white text-lg font-bold'>asistencia</Text>
      //     }

      //   </TouchableOpacity>
      // </View>