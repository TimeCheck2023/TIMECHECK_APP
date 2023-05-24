import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext'
import { getSubOrg } from '../../api/api';
import esperando from '../../../assets/esperando.png'
import { useFocusEffect } from '@react-navigation/native';


const HomeOrg = ({ items }) => {
  const { logout, userInfo } = useContext(AuthContext);
  const [data, setData] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        await getSubOrg(userInfo.id_organización)
          .then((response) => {
            setData(response.data.message);
            console.log(response.data.message);
            // setIsloading(false)
          }).catch((error) => {
            // setIsloading(false)
            console.log(error.response);
          })
      })()
    }, []),
  );
  // useEffect(() => {

  // }, [])

  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-slate-100'>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.length === 0 ?
          <View className='w-full items-center'>
            <Text className='text-xl text-center text-black font-bold mt-10'>Aún no hay eventos registrados.</Text>
            <View className='w-80 h-48 items-center mt-7 rounded-2xl'>
              {/* <Image source={imgGame}  className='' /> */}
              <Image source={esperando} resizeMode='cover' className='w-full h-full rounded-2xl' />
            </View>
          </View>
          :
          data.map((dat) => (
            <TouchableOpacity className='w-72 h-72 z-30 my-4' key={dat.id_suborganizacion}>
              <View className="h-full w-full bg-purple-500 flex justify-around rounded-md shadow-md border border-gray-500">
                <Text className='text-white text-center text-2xl font-bold'>{dat.nombre_suborganizacion}</Text>
                <Text className='text-white text-justify px-8 space-y-4 font-semibold'>{dat.descripcion_suborganizacion}</Text>
              </View>
            </TouchableOpacity>
          ))
        }

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeOrg;
