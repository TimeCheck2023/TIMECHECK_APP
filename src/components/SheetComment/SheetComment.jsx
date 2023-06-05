import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import moment from 'moment';
import sena from "../../../assets/eventoSena.jpg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const SheetComment = React.memo(({ item, userInfo, setCommenttId, openModals }) => {
  const isMiComentario = item.correo_usuario === userInfo;

  const fechaActual = moment().startOf('day');
  const fechaComentario = moment.utc(item.fecha_creacion);
  let fechaFormateada;

  if (fechaComentario.isSame(fechaActual, 'day')) {
    fechaFormateada = fechaComentario.format('[Hoy] h:mm A');
  } else if (fechaComentario.isSame(fechaActual.clone().subtract(1, 'day'), 'day')) {
    fechaFormateada = 'Ayer';
  } else {
    fechaFormateada = fechaComentario.format('DD/MM/YYYY');
  }



  return (
    <TouchableOpacity style={styles.CardComment} activeOpacity={1} onLongPress={() => { isMiComentario && openModals(), setCommenttId(item.id_comentario) }}
    >
      <View style={isMiComentario ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' }}>
        <Image source={sena} style={styles.ImageComment}
        />
        <View style={styles.ContentText}>
          <Text style={styles.TextOne} >{item.correo_usuario}</Text>
          <Text style={styles.TextTwo}>
            {item.comentario}
          </Text>
        </View>
      </View>
      <Text style={[styles.fechaCard, isMiComentario ? { left: 30 } : { right: 30 }]}>{fechaFormateada}</Text>
    </TouchableOpacity>
  );
})

export default SheetComment

const styles = StyleSheet.create({
  // comentarios
  CardComment: {
    padding: 16,
    paddingBottom: 40,
    marginTop: 8,
  },
  ImageComment: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 52
  },
  ContentText: {
    padding: 16,
    width: 288,
    borderRadius: 16,
    left: 12,
    backgroundColor: '#9DA6B8'

  },
  TextOne: {
    fontSize: wp('4.4%'),
    fontWeight: 'bold',
    color: 'black'
  },
  TextTwo: {
    fontSize: 17,
    fontWeight: 600,
    color: 'black',
    marginTop: 7,
    textAlign: 'justify'
  },
  fechaCard: {
    position: 'absolute',
    fontSize: 19,
    fontWeight: 'bold',
    bottom: 3
  },

})