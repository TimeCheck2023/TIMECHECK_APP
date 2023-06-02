import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { data } from "../utils/data";
import CardWelcome from '../components/CardWelcome';
import { scale } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




const { width, height } = Dimensions.get('window')

const Welcome = ({ navigation }) => {

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = React.useRef();
  // console.log(height);
  // console.log(width);
  const updateSliderCurrentIndex = (e) => {
    // toma o captura la posicion de la imagen
    const contentOffSet = e.nativeEvent.contentOffset.x;
    // para calcular el índice actual y lo redondea
    const currentIndex = Math.round(contentOffSet / width);
    setCurrentSlideIndex(currentIndex);
  }
  
  // const handleNext = () => {
  //   const nextSlideIndex = currentSlideIndex + 1;
  //   if (nextSlideIndex != data.length) {
  //     const offset = nextSlideIndex * width;
  //     ref?.current.scrollToOffset({ offset });
  //     setCurrentSlideIndex(currentSlideIndex + 1);
  //   }
  // }
  return (
    <View className='flex-1'>
      <View className='flex-row pb-16 pl-10 pr-10 bg-[#6C63FF]' style={{
        borderBottomRightRadius: 50,
        height: hp('56%')
      }}>
      </View>
      <View className='absolute top-0 bottom-0 left-0 right-0 items-center'>
        <View className='flex-row h-4 items-center top-12'>
          {
            data.map((_, index) => {
              return <View className={`w-7 h-[5] rounded-xl bg-white ml-1'`} key={index} />
            })
          }
        </View>
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateSliderCurrentIndex}
          keyExtractor={item => item.id}
          data={data}
          renderItem={({ item }) => <CardWelcome item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View className='flex-row  justify-between items-center rounded-2xl' style={{ width: wp('100%'), height: hp('8%'), bottom: hp('6') }}>
          <TouchableOpacity activeOpacity={0.7} className={`bg-[#6C63FF] items-center justify-center left-6  rounded-lg`} style={{ width: wp('40%'), height: hp('8.2%') }} onPress={() => navigation.navigate('Sign_Up')} >
            <Text className={`text-xl text-white font-bold`}>Register</Text>
          </TouchableOpacity >
          <TouchableOpacity activeOpacity={0.7} className={`bg-slate-400 items-center justify-center right-6 rounded-lg`} style={{ width: wp('40%'), height: hp('8.2%') }} onPress={() => navigation.navigate('Sign_In')}>
            <Text className={`text-xl text-white font-bold`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default Welcome