import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext'
import { getSubOrg } from '../../../api/api';
// import esperando from '../../../assets/esperando.png'
import { useFocusEffect } from '@react-navigation/native';
import fondoHeader from '../../../../assets/image/fondoHeader.png'
import { useNavigation } from '@react-navigation/native';
import HeaderOrg from '../../../components/HeaderOrg/HeaderOrg';
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import CircleProgress from '../../../components/CircleProgress/CircleProgress';
import Loading from '../../../components/Loading/Loading';
import CardPlay from '../../../components/CardPlay/CardPlay';


const HomeOrg = ({ items }) => {
  const { logout, userInfo } = useContext(AuthContext);
  const [data, setData] = useState([])
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

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <HeaderOrg SearchFilter={SearchFilter} search={search} />



      <ScrollView showsVerticalScrollIndicator={false}>
        {isloadingData ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
            <Loading />
          </View>
          :
          <View style={styles.container}>
            {filteredData.length === 0 ?
              <CardPlay navigation={navigation} text='Por el momentos no tienes suborganizacion creadas' />
              :
              filteredData.map((item, index) => (
                <TouchableOpacity key={item.id_suborganizacion} style={styles.containerCard} onPress={() => {
                  navigation.navigate('BottomTabNavigator',
                    { id: item.id_suborganizacion })
                }}>
                  <ImageBackground source={fondoHeader} style={[styles.card]} >
                    <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                      <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>{item.nombre_suborganizacion}</Text>
                      <Text style={{ fontSize: 20, fontWeight: '600', color: 'white', lineHeight: 30 }}>{item.descripcion_suborganizacion}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
          </View>
        }
      </ScrollView>
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
})

export default HomeOrg;
