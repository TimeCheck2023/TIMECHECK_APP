import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Modal, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext'
import { getSubOrg } from '../../../api/api';
import * as Icon from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import esperando from '../../../assets/esperando.png'
import { useFocusEffect } from '@react-navigation/native';
import fondoHeader from '../../../../assets/image/fondoHeader.png'
import { useNavigation } from '@react-navigation/native';
import HeaderOrg from '../../../components/HeaderOrg/HeaderOrg';
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import CircleProgress from '../../../components/CircleProgress/CircleProgress';
import Loading from '../../../components/Loading/Loading';
import CardPlay from '../../../components/CardPlay/CardPlay';
import { light, sizes } from '../../../constants/theme';
import ModalDelete from '../../../components/modals/ModalDelete';
import Header from '../../../components/Header/Header';


const HomeOrg = ({ items }) => {
  const { logout, userInfo } = useContext(AuthContext);
  const [data, setData] = useState([])
  const [idSubOrg, setIdSubOrg] = useState(null)
  const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false);
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState('')
  const [isloadingData, setIsloadingData] = useState(false)
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const fetchData = async () => {
    setIsloadingData(true)
    await getSubOrg(userInfo.id_organización)
      .then((response) => {
        setData(response.data.message);
        setFilteredData(response.data.message);
        setIsloadingData(false)
        console.log("bien");
      }).catch((error) => {
        console.log("error");
        setIsloadingData(false)
      })
  }

  const SearchFilter = (text) => {
    setSearch(text)
    if (text) {
      const newData = data.filter(items => {
        const itemData = items.nombre_suborganizacion ? items.nombre_suborganizacion.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1
      })
      setFilteredData(newData)
    } else {
      setFilteredData(data)
    }
  }


  const DeleteSubOrg = () => {
    console.log(idSubOrg);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      {/* <HeaderOrg SearchFilter={SearchFilter} search={search} /> */}
      <Header handleSearch={SearchFilter} search={search} userInfo={userInfo} estado={false}/>



      <ScrollView showsVerticalScrollIndicator={false}>
        {isloadingData ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
            <Loading />
          </View>
          :
          <View style={styles.container}>
            {filteredData.length === 0 ?
              <CardPlay navigation={navigation} text='Por el momento no tienes suborganizaciónes creadas' />
              :
              filteredData.map((item, index) => (
                <TouchableOpacity activeOpacity={1} key={item.id_suborganizacion} style={styles.containerCard} onPress={() => {
                  navigation.navigate('BottomTabNavigator',
                    { id: item.id_suborganizacion })
                }}>
                  <ImageBackground source={fondoHeader} style={[styles.card]} >
                    <View style={styles.containerAccion}>
                      <TouchableOpacity activeOpacity={1} style={[styles.iconComment, { backgroundColor: '#6C63FF', }]} onPress={() => navigation.navigate('FormSubOrgUpdate', { item: item })}>
                        <Icon.AntDesign name='edit' size={24} style={{ color: 'white' }} />
                      </TouchableOpacity>
                      {/* <TouchableOpacity style={[styles.iconComment, { backgroundColor: 'red', }]} onPress={() => { setIdSubOrg(item.id_suborganizacion), setMostrarAdvertencia(true) }}>
                        <Icon.AntDesign name='delete' size={24} style={{ color: 'white' }} />
                      </TouchableOpacity> */}
                    </View>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 20, marginRight: 40 }}>
                      <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>{item.nombre_suborganizacion}</Text>
                      <Text style={{ fontSize: 20, fontWeight: '600', color: 'white', lineHeight: 30, width: 220 }}>{item.descripcion_suborganizacion}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
          </View>
        }
      </ScrollView>

      <ModalDelete visible={mostrarAdvertencia} setShow={setMostrarAdvertencia} title='¿Estás seguro de que quieres eliminar la SubOrganizacion?' description='¡Atención! Al eliminar la SubOrganizacion, se borrarán todos los datos asociados, incluyendo los miembros, proyectos y eventos relacionados.' handleDelete={DeleteSubOrg} />

      {/* <Modal visible={mostrarAdvertencia} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.contenido}>
            <Text style={styles.titulo2}>¿Estás seguro de que quieres eliminar la SubOrganizacion?</Text>
            <Text style={styles.contentText}></Text>
            <TouchableOpacity
              // onPress={confirmarEliminacion}
              style={styles.botonEliminar}>
              <Text style={styles.textoBotonEliminar}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMostrarAdvertencia(false)}
              style={styles.botonCancelar}>
              <Text style={styles.textoBotonCancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

      <TouchableOpacity style={styles.containerButtom} onPress={() => navigation.navigate('FormSubOrg')}>
        <Ionicons
          name='add-sharp'
          size={35}
          color='#5458F7'

        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#7560EE',
    width: '90%',
    marginBottom: 30,
    marginTop: 15,
  },
  titulo: {
    paddingTop: 20,
  },
  ContanteGraficas: {
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 10, // Ajusta este valor para aumentar o disminuir la sombra
    marginVertical: 10,
    shadowColor: '#6C63FF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  containerCard: {
    width: 380,
    height: 370,
    backgroundColor: 'white',
    borderRadius: 21,
    elevation: 3,
    marginTop: 23,
    overflow: 'hidden',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerButtom: {
    width: 68,
    height: 68,
    borderRadius: 50,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 7,
    right: 7,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
    shadowColor: '#5458F7'
  },
  containerButtom: {
    width: 68,
    height: 68,
    borderRadius: 50,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 7,
    right: 7,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
    shadowColor: '#5458F7'
  },
  Buttom: {
    height: 53,
    width: 150,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 15,
    right: 15
  },
  containerAccion: {
    width: 90,
    height: 90,
    backgroundColor: light.white,
    position: 'absolute',
    right: 1,
    top: 1,
    borderRadius: sizes.radius,
    // borderBottomLeftRadius: sizes.radius,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  iconComment: {
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contenido: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: '90%',
    padding: 20,
  },
  titulo2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  contentText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center'
  },
  botonEliminar: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 4,
    marginTop: 10,
  },
  textoBotonEliminar: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  botonCancelar: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 4,
    marginTop: 10,
  },
  textoBotonCancelar: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
})

export default HomeOrg;
