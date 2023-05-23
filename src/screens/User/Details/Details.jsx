import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useEffect, useState } from 'react'
import * as Icon from '@expo/vector-icons';
import { getAsistencia, saveAsistencia, updateAsistencia } from '../../../api/api';
import { AuthContext } from '../../../context/AuthContext';
import moment from 'moment';


const Details = ({ navigation, route }) => {

  const [prueba, setPrueba] = useState({})
  const [isloading, setIsloading] = useState(false)

  const { userInfo } = useContext(AuthContext)


  const { items } = route.params;

  const getAsistencias = async () => {
    const data = {
      idEvento: items.idEvento,
      correo: userInfo.correo,
    }
    setIsloading(true)
    await getAsistencia(data)
      .then((response) => {
        // console.log(response.data);
        setPrueba(response.data)
        setIsloading(false)
      }).catch((error) => {
        console.log(error.message);
      })
  }

  useEffect(() => {
    getAsistencias()
  }, [])


  const handleSubmitPost = async () => {
    const data = {
      eventId: items.idEvento,
      userEmail: userInfo.correo,
    }

    setIsloading(true)
    await saveAsistencia(data)
      .then((response) => {
        // console.log(response.data);
        getAsistencias();
        items.cuposDisponibles += 1
      }).catch((error) => {
        console.log(error.message);
        setIsloading(false)
      })

  }

  const handleSubmitPut = async () => {
    const data = {
      correoUsuario: userInfo.correo,
      idEvento: items.idEvento,
    }
    setIsloading(true)

    await updateAsistencia(data)
      .then((response) => {
        // console.log(response.data);
        getAsistencias();
        items.cuposDisponibles -= 1
      }).catch((error) => {
        console.log(error.message);
        setIsloading(false)
      })
  }

  return (
    <SafeAreaView className='flex-1 bg-[#ffff]'>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
      <ImageBackground style={{ flex: 0.5 }} resizeMode='cover' className='h-full' source={{ uri: items.imagenEvento }}>

        <TouchableOpacity className='flex-row justify-between' style={{ marginTop: 40, paddingHorizontal: 20 }} onPress={() => navigation.goBack()}>
          <View className='w-[45px] h-[45px] rounded-2xl justify-center items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Icon.AntDesign name="arrowleft" size={27} color="white" />
          </View>
        </TouchableOpacity>
        <View className='flex-row justify-between w-[100%] absolute bottom-7' style={{ padding: 20 }}>
          <Text className='w-[70%]  font-extrabold text-white' style={{ marginBottom: 20, fontSize: 30 }} >{items.tipoEvento}</Text>
        </View>
      </ImageBackground>


      <View className='bg-slate-300' style={{ top: -30, borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingVertical: 40, paddingHorizontal: 20, flex: 1 }}>
        <View className='flex-row sm:w-[65px] bg-white sm:h-[65px] absolute rounded-full justify-center items-center' style={{ top: -40, right: 20, elevation: 10 }}>
          <Icon.Feather name='heart' size={26} className='text-red-500' />
          <Text className='text-xl text-black right-0'>{items.likes}</Text>
        </View>
        <View className='flex-row' style={{ marginTop: 10 }}>
          <Icon.Entypo name='location' size={28} className='text-red-500' />
          <Text className='text-2xl font-bold text-black' style={{ marginLeft: 5 }}>Ibague</Text>
          <View className='absolute flex-row items-center right-3'>
            <Text className='text-2xl font-bold text-black ' style={{ marginLeft: 5 }}>Aforo: </Text>
            <Text className='text-xl font-semibold text-black ' style={{ marginLeft: 5 }}>{items.cuposDisponibles}/{items.aforoEvento}</Text>
          </View>
        </View>

        <Text className='text-2xl font-bold' style={{ marginTop: 20 }}>About the trip</Text>
        <Text className='text-lg font-semibold- text-justify justify-center' style={{ marginTop: 20 }}>Si después de seguir estos pasos sigues teniendo problemas, verifica si hay alguna otra dependencia faltante o conflicto en tu proyecto. También es posible que haya actualizaciones disponibles para los paquetes utilizados, por lo que puedes intentar actualizar tanto @react-native-masked-view como react-native-skeleton-placeholder a sus últimas versiones.</Text>

        <View className='flex-row items-center'>
          <Text className='text-xl font-bold' style={{ marginTop: 20 }}>Fecha de Incio: </Text>
          <Text className='text-lg font-semibold' style={{ marginTop: 20 }}>{moment(items.fechaInicioEvento).format('DD/MM/YYYY')}</Text>
        </View>
        <View className='flex-row items-center'>
          <Text className='text-xl font-bold' style={{ marginTop: 20 }}>Fecha de final: </Text>
          <Text className='text-lg font-semibold' style={{ marginTop: 20 }}>{moment(items.fechaFinalEvento).format('DD/MM/YYYY')}</Text>
        </View>
      </View>

      <View className='absolute flex-row h-[78px] w-screen bg-[#7560EE] justify-between items-center bottom-0' style={{ paddingHorizontal: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <View className='flex-1 flex-row items-center'>
          <Text className='text-2xl font-bold text-white'>${items.valorEvento}</Text>
        </View>
        {prueba.tipoAsistencia === 'cancelado' || prueba.tipoAsistencia === '' ?
          <TouchableOpacity className='rounded-2xl justify-center items-center px-5 right-3' style={{ height: 60, backgroundColor: '#ffff' }} onPress={() => handleSubmitPost()}>
            {
              isloading ?
                <ActivityIndicator size="large" color='#7560EE' />
                :
                <Text className='text-2xl font-bold '>asistir</Text>
            }
          </TouchableOpacity>
          :
          <TouchableOpacity className='rounded-2xl justify-center items-center px-5 right-3' style={{ height: 60, backgroundColor: '#ffff' }} onPress={() => handleSubmitPut()}>
            {
              isloading ?
                <ActivityIndicator size="large" color='#7560EE' />
                :
                <Text className='text-2xl font-bold '>cancelar asistencia</Text>
            }
          </TouchableOpacity>
        }
      </View>
    </SafeAreaView>
  )
}

export default Details


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