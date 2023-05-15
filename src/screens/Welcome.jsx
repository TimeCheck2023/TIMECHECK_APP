import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { data } from "../utils/data";
import CardWelcome from '../components/CardWelcome';


const { width, height } = Dimensions.get('window')

// console.log(`Ancho de la ventana: ${windowWidth}, Alto de la ventana: ${windowHeight}, plataforma:  ${Platform.OS}`);


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
  const handleNext = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != data.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  }
  return (
    <View className='flex-1'>
      <View className='flex-row h-[450px] pb-16 pl-10 pr-10 bg-[#6C63FF]' style={{
        borderBottomRightRadius: 170,
      }}>
      </View>
      <View className='absolute top-0 bottom-0 left-0 right-0 items-center'>
        <View className='flex-row h-4 items-center top-12'>
          {
            data.map((_, index) => {
              return <View className={`${currentSlideIndex === index ? 'bg-[#57585b] w-7 h-[5] rounded-xl ml-1' : 'w-5 h-[5] rounded-xl bg-white ml-1'}`} key={index} />
            })
          }
        </View>
        <View className='flex-1 justify-center items-center sm:bottom-14'>
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
              className='sm:w-72 sm:h-16 lg:w-96 lg:h-20 sm:bottom-16 lg:bottom-14 flex-row justify-between items-center rounded-xl bg-[#6C63FF]'
              onPress={handleNext}
            >
              <View className='justify-center items-center sm:left-[63] lg:left-24'>
                <Text className='font-bold sm:text-xl lg:text-2xl text-white'>
                  GET STARTED
                </Text>

              </View>
              <View className='sm:w-11 sm:h-11 lg:w-14 lg:h-14 bg-slate-200 justify-center items-center rounded-full right-4'>
                <AntDesign name="arrowright" size={24} color="black" />
              </View>
            </TouchableOpacity>)
            :
            (
              <>
                <TouchableOpacity
                  activeOpacity={0.9}
                  className='sm:w-72 sm:h-16 lg:w-96 lg:h-20 sm:bottom-16 lg:bottom-14 flex-row justify-between items-center rounded-xl bg-[#6C63FF]'
                  onPress={() => navigation.navigate('Sign_Up')}
                >
                  <View className='justify-center items-center sm:left-28 lg:left-36'>
                    <Text className='font-bold sm:text-xl lg:text-3xl text-white'>
                      Register
                    </Text>
                  </View>
                  <View className='sm:w-11 sm:h-11 lg:w-14 lg:h-14 bg-slate-200 justify-center items-center rounded-full right-4'>
                    <AntDesign name="arrowright" size={24} color="black" />
                  </View>
                </TouchableOpacity>
                <View className='flex-row justify-center sm:bottom-12'>
                  <Text className='text-xl font-bold'>Already have an account?  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Sign_In')}>
                    <Text className='text-[#6C5CE7] text-xl font-bold'>Login</Text>
                  </TouchableOpacity>
                </View>
              </>
            )
        }
      </View>

    </View>
  )
}

export default Welcome