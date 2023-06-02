import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image, Dimensions } from 'react-native'
import * as Icon from '@expo/vector-icons';
import React, { useEffect, useState, useContext, useRef } from 'react'
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window')

const CARD_WIDTH = wp('90%');
const CARD_HEIGHT = hp('42%');


const CardEvent = ({ items, navigation, openBottomSheet }) => {

  const pruebaComent = () => {
    console.log("aqui en coment");
  }
  const pruebaImage = () => {
    console.log("aqui en pruebaImage");
  }

  return (
    <View style={{ marginBottom: 30 }} >
      <View style={styles.card}>
        <View style={styles.cardFechas}>
          <Text style={{ fontSize: wp('7'), fontWeight: 'bold', color: 'white' }} >{moment(items.fechaInicioEvento).format('DD')}</Text>
          <Text style={{ fontSize: wp('5'), fontWeight: '600', color: 'white' }} >{moment(items.fechaInicioEvento).format('MMM')}</Text>
        </View>
        <TouchableOpacity style={styles.iconLike} onPress={pruebaComent}>
          <Icon.Feather name='heart' size={wp('6')} style={{ color: 'white' }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageBox} onPress={() => navigation.navigate('Details', { items: items })}>
          <Image style={styles.image} source={{ uri: items.imagenEvento }} />
        </TouchableOpacity>
        <View style={styles.footer}>
          <View style={styles.titleBox}>
            <Text style={styles.title}  numberOfLines={1}>{items.nombreEvento}</Text>
            <Text style={styles.location}>{items.tipoEvento}</Text>
          </View>
          <TouchableOpacity style={styles.iconComment} onPress={() => { openBottomSheet(items.idEvento) }}>
            <Icon.Feather name='message-circle' size={24} style={{ color: 'white' }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default CardEvent

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 16,
  },

  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 88,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden'
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 16,
    marginRight: 10,
  },
  titleBox: {
    flex: 1
  },
  title: {
    marginVertical: 4,
    fontSize: hp('3'),
    fontWeight: 'bold'
  },
  location: {
    fontSize: hp('2.7'),
  },
  iconComment: {
    backgroundColor: '#6C63FF',
    width: 60,
    aspectRatio: 1,
    borderRadius: 20,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLike: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: wp('12'),
    aspectRatio: 1,
    borderRadius: 20,
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFechas: {
    position: 'absolute',
    width: wp('16'),
    height: hp('12'),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    top: 16,
    right: 16,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }

})