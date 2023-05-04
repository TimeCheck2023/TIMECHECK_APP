import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { data } from "../../utils/data";
import CardWelcome from '../../components/CardWelcome';


const { width, height } = Dimensions.get('window')

// console.log(`Ancho de la ventana: ${windowWidth}, Alto de la ventana: ${windowHeight}, plataforma:  ${Platform.OS}`);


const Welcome = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = React.useRef();
  const updateSliderCurrentIndex = (e) => {
    // toma o captura la posicion de la imagen
    const contentOffSet = e.nativeEvent.contentOffset.x;
    // para calcular el índice actual y lo redondea
    const currentIndex = Math.round(contentOffSet / width);
    setCurrentSlideIndex(currentIndex);
  }
  const handleNext = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != data.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  }
  return (
    <SafeAreaView className='flex-1 items-center justify-center'>
      <View className='flex-row h-4 items-center mt-12'>
        {
          data.map((_, index) => {
            return <View className={`${currentSlideIndex === index ? 'bg-purple-600 w-7 h-[5] rounded-xl ml-1' : 'w-5 h-[5] rounded-xl bg-slate-400 ml-1'}`} key={index} />
          })
        }
      </View>
      <View className='flex-1 justify-center items-center'>
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
      </View>
      {
        currentSlideIndex !== data.length - 1 ?
          (<TouchableOpacity
            activeOpacity={0.9}
            className='sm:w-72 sm:h-16 lg:w-96 lg:h-20 sm:bottom-9 lg:bottom-14 flex-row justify-between items-center rounded-xl bg-purple-800'
            onPress={handleNext}
          >
            <View className='justify-center items-center sm:left-20 lg:left-24'>
              <Text className='font-bold sm:text-lg lg:text-2xl text-white'>
                GET STARTED
              </Text>

            </View>
            <View className='sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-slate-200 justify-center items-center rounded-full right-4'>
              <AntDesign name="arrowright" size={24} color="black" />
            </View>
          </TouchableOpacity>)
          :
          (<TouchableOpacity
            activeOpacity={0.9}
            className='sm:w-72 sm:h-16 lg:w-96 lg:h-20 sm:bottom-9 lg:bottom-14 flex-row justify-between items-center rounded-xl bg-purple-800'
            onPress={() => navigation.navigate('Sign_In')}
          >
            <View className='justify-center items-center sm:left-28 lg:left-36'>
              <Text className='font-bold sm:text-xl lg:text-3xl text-white'>
                Login
              </Text>

            </View>
            <View className='sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-slate-200 justify-center items-center rounded-full right-4'>
              <AntDesign name="arrowright" size={24} color="black" />
            </View>
          </TouchableOpacity>)
      }
    </SafeAreaView>
  )
}

export default Welcome