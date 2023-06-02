import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import BottomSheet from '@gorhom/bottom-sheet';
import * as Animatable from 'react-native-animatable';
import Animated, { Extrapolate, color, interpolate, interpolateColor, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import * as Icon from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const { width, height } = Dimensions.get('window')


const DetailsEvent = ({ navigation, route }) => {

  const bottomSheetRef = useRef(null);

  const insets = useSafeAreaInsets()

  const { userInfo } = useContext(AuthContext)

  const { items } = route.params;

  const animatedIndex = useSharedValue(0)

  const titleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value, [0, 0.5], ['white', 'black']
    )
  }));


  const tipoStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value, [0, 0.5], ['white', 'gray']
    )
  }));
  const headerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value, [0, 0.5], ['rgba(0, 0, 0, 0.7)', 'white']
    )
  }));

  const Componet = ({ animatedIndex, style }) => {
    const containerStyle = useAnimatedStyle(() => ({
      ...style,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      opacity: interpolate(animatedIndex.value, [0, 0.5], [0, 1], Extrapolate.CLAMP)
    }))
    return (
      <Animated.View style={containerStyle} />
    )
  }

  const URI = 'https://raw.githubusercontent.com/azdravchev/Travel-App/details_screen_bottom_sheet/assets/images/trips/eea622430834cb64b900c2f03e5be6b8.jpeg'

  return (
    <View style={styles.container}>
      <Animatable.View style={[styles.backButtom, { marginTop: insets.top + 12 }]} animation='fadeIn' delay={400} duration={400} easing='ease-in-out'>
        <Icon.AntDesign name="arrowleft" size={27} style={styles.backIcon} color="white" onPress={navigation.goBack} />
      </Animatable.View>
      <View style={[StyleSheet.absoluteFillObject, styles.imageBox]}>
        <Image style={styles.image} source={{ uri: items.imagenEvento }} />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['30%', '87%']}
        borderRadius={10}
        backgroundComponent={Componet}
        animatedIndex={animatedIndex}
        handleIndicatorStyle={{ opacity: 0 }}
      >
        <Animatable.View style={[styles.card]} animation='fadeInUp' delay={400} duration={400} easing='ease-in-out'>
          <Animated.View style={[styles.header, headerStyle]}>
            <Animated.Text style={[styles.title, titleStyle]}>Evento de futbol</Animated.Text>
            <Animated.Text style={[styles.location, tipoStyle]}>Ibage</Animated.Text>
          </Animated.View>
        </Animatable.View>
      </BottomSheet>
    </View >
  )
}

export default DetailsEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: '100%',
    resizeMode: 'cover'
  },
  imageBox: {
    // borderRadius: 16,
    overflow: 'hidden',
  },
  backButtom: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    left: 24,
    zIndex: 1,
    width: wp('12'),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  backIcon: {
    color: 'white',
  },
  card: {
    position: 'absolute',
    left: 0,
    // bottom: 0,
    right: 0,
    height: '25%'
  },
  header: {
    paddingVertical: 13,
    paddingHorizontal: 24,
    width: wp('90%'),
    marginLeft: 12,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  location: {
    fontSize: 26,
    color: 'white',
  },
  // locationText: {
  //   fontSize: 32,
  //   color: 'white',
  // },
  // locationIcon: {
  //   color: 'gray',
  // },
})