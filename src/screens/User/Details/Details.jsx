import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, Animated } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useEffect, useRef, useState } from 'react'
import * as Icon from '@expo/vector-icons';
import { getAsistencia, saveAsistencia, updateAsistencia } from '../../../api/api';
import { AuthContext } from '../../../context/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Dimensions } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import CircleProgress from '../../../components/CircleProgress/CircleProgress';

const { width, height } = Dimensions.get('window')


const Details = ({ navigation, route }) => {

  const { items } = route.params;
  const [progress, setProgress] = useState(new Animated.Value(0));
  // source={{ uri: items.imagenEvento }}
  const bottomSheetRef = useRef(null);
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 9,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }, [])


  const precio = items.valorEvento === 0 ? 'Gratis' : items.valorEvento


  const progressAnim = progress.interpolate({
    inputRange: [0, data.length],
    outputRange: ['0%', '100%']
  })

  return (
    <View style={{ flex: 1 }}>
      <View>
        <ImageBackground style={styles.backgroundImage} source={{ uri: items.imagenEvento }}>
          <TouchableOpacity style={{
            backgroundColor: 'white',
            width: wp('11'),
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
          }}>
            <Icon.AntDesign name="arrowleft" size={30} color="black" onPress={navigation.goBack} />
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: 'white',
            width: wp('11'),
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
          }}>
            <Icon.AntDesign name="arrowleft" size={30} color="black" onPress={navigation.goBack} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['62%', '87%']}
        borderRadius={10}
      // handleIndicatorStyle={{ opacity: 0 }}
      >
        <BottomSheetScrollView>
          <View style={{ paddingHorizontal: 20, backgroundColor: 'white', }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: '83%' }}>
                <Text style={styles.titleName}>Evento de deporte</Text>
                <Text style={{ fontSize: 20, fontWeight: '600', color: 'black', marginTop: 10 }}>deporte</Text>
              </View>
              <View style={{ flexDirection: 'row', top: 0 }}>
                <Text style={styles.price}>1</Text>
                <Text style={{ fontSize: 25, fontWeight: '600', color: 'black' }}>/100</Text>
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={{ textAlign: 'center', fontSize: 20}}>Graficas</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <CircleProgress data={90 
                
                }/>
                {/* <CircleProgress data={20}/> */}
              </View>
            </View>


            {/* <View style={{ marginVertical: 20 }}>
              <View style={{ paddingVertical: 10 }}>
                <Text style={{ color: '#6C5CE7', fontWeight: 'bold', fontSize: 17 }}>Details</Text>
              </View>
              <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ flexDirection: 'row', marginRight: 20 }}>
                  <View style={{ backgroundColor: 'white', elevation: 7, width: 50, height: 50, padding: 5, borderRadius: 10, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon.Feather name='calendar' size={20} color='#6C5CE7' />
                  </View>
                  <View>
                    <Text>Duration</Text>
                    <Text>3 hours</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                  <View style={{ backgroundColor: 'white', elevation: 7, width: 50, height: 50, padding: 5, borderRadius: 10, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon.Feather name='calendar' size={20} color='#6C5CE7' />
                  </View>
                  <View>
                    <Text>Duration</Text>
                    <Text>3 hours</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
                <View style={{ width: 50, height: 50, backgroundColor: 'white', elevation: 7, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Icon.Ionicons name='location-outline' size={20} color='#6C5CE7' />
                </View>
                <Text style={{ fontSize: 20, fontWeight: '600', paddingHorizontal: 10 }}>carrera #13 la mariela</Text>
              </View>

              <Text
                style={{
                  fontSize: 10 * 2.7,
                  fontWeight: '600',
                  color: 'gray',
                  marginBottom: 10
                }}
              >Description</Text>
              <Text
                style={{
                  fontSize: 10 * 1.9,
                  fontWeight: '500',
                  color: 'gray',
                }}
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, est quasi blanditiis voluptatum maxime a sequi eligendi minima necessitatibus. Est perspiciatis ut laborum quisquam ab maxime iusto magnam mollitia exercitationem esse dignissimos nesciunt quae velit, quas, nam illo corporis rem illum fuga obcaecati aspernatur minima sequi tenetur. Exercitationem, eveniet quo.</Text>

              <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',

              }}>
              <Animated.View style={[{
                  height: 20,
                  borderRadius: 20,
                  backgroundColor: 'red'
                }, {
                  width: progressAnim
                }]}>

                </Animated.View>

              </View>
            </View> */}

          </View >
        </BottomSheetScrollView>
      </BottomSheet >
      {/* <View style={{ width: '100%', position: 'absolute', bottom: 0 }}>
        <TouchableOpacity style={{ padding: 20, backgroundColor: 'black', marginHorizontal: 20, borderRadius: 20 }}>
          <Text>Chosee this for</Text>
          <Text>35.00</Text>
        </TouchableOpacity>
      </View> */}
    </View >
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
  ContainerInfo: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    bottom: 20
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleName: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold'
  },
  Containeraforo: {
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: '#6C5CE7',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  ContainerItems: {
    paddingVertical: 10,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row'
  },
  handleContainer: {
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: 'gray',
    borderRadius: 2,
    marginTop: 4,
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