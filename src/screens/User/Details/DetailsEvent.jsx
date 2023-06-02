import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import BottomSheet from '@gorhom/bottom-sheet';
import * as Animatable from 'react-native-animatable';

import * as Icon from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const { width, height } = Dimensions.get('window')


const DetailsEvent = ({ navigation, route }) => {

  const insets = useSafeAreaInsets()

  const { userInfo } = useContext(AuthContext)


  const { items } = route.params;

  return (
    <View style={styles.container}>
      <Animatable.View style={[styles.backButtom, { marginTop: insets.top }]} animation='fadeIn' delay={400} duration={400} easing='ease-in-out'>
        <Icon.AntDesign name="arrowleft" size={27} style={styles.backIcon} color="white" onPress={navigation.goBack} />
      </Animatable.View>
      <View style={[StyleSheet.absoluteFillObject, styles.imageBox]}>
        <Image style={styles.image} source={{ uri: items.imagenEvento }} />
      </View>

      <BottomSheet snapPoints={['30%', '80%']}>
        <Animatable.View style={styles.card} animation='fadeInUp' delay={400} duration={400} easing='ease-in-out'>
          <View style={styles.header}>
            <Text style={styles.title}>Evento de futbol</Text>
            <Text style={styles.location}>Ibage</Text>
          </View>
        </Animatable.View>
      </BottomSheet>
    </View>
  )
}

export default DetailsEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'cover'
  },
  imageBox: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  backButtom: {
    position: 'absolute',
    left: 24,
    zIndex: 1
  },
  backIcon: {
    color: 'white',
  },
  card: {
    position: 'absolute',
    left: 0,
    // bottom: 0,
    right: 0,
    height: '30%'
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  location: {
    fontSize: 26,
    color: 'black',
  },
  // locationText: {
  //   fontSize: 32,
  //   color: 'white',
  // },
  // locationIcon: {
  //   color: 'gray',
  // },
})