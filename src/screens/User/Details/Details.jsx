import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useEffect, useRef, useState } from 'react'
import * as Icon from '@expo/vector-icons';
import { getAsistencia, saveAsistencia, updateAsistencia } from '../../../api/api';
import { AuthContext } from '../../../context/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet from '@gorhom/bottom-sheet';




const Details = ({ navigation, route }) => {

  const { items } = route.params;
  const bottomSheetRef = useRef(null);


  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: items.imagenEvento }}
        style={{ width: '100%', height: 400 }}
      >
        <SafeAreaView>
          <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{
              backgroundColor: 'white',
              width: wp('12'),
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
              <Icon.AntDesign name="arrowleft" size={27} color="black" onPress={navigation.goBack} />
            </TouchableOpacity>
            <View>
              <TouchableOpacity style={{
                backgroundColor: 'white',
                width: wp('12'),
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
                <Icon.AntDesign name="heart" size={27} color="black" onPress={navigation.goBack} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['55%', '87%']}
        borderRadius={20}
      // backgroundComponent={Componet}
      // animatedIndex={animatedIndex}
      // handleIndicatorStyle={{ opacity: 0 }}
      >
        {/* <Animatable.View style={[styles.card]} animation='fadeInUp' delay={400} duration={400} easing='ease-in-out'>
          <Animated.View style={[styles.header, headerStyle]}>
            <Animated.Text style={[styles.title, titleStyle]}>Evento de futbol</Animated.Text>
            <Animated.Text style={[styles.location, tipoStyle]}>Ibage</Animated.Text>
          </Animated.View>
        </Animatable.View> */}
      </BottomSheet>
    </View>
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