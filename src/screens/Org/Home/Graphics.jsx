import React, { useContext, useEffect, useState, useRef } from "react";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryPortal } from 'victory-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView, Share, Platform } from "react-native";
import * as Icon from '@expo/vector-icons';
import { AuthContext } from "../../../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { light, sizes } from "../../../constants/theme";
import CircleProgress from "../../../components/CircleProgress/CircleProgress";
import { captureRef } from 'react-native-view-shot';
import { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import * as FileSystem from 'expo-file-system';
import { getAsistenciaCon, getAsistenciaNoAsis, getAsistenciaPen } from "../../../api/api";
import ListItems from "./ListItems";
import Loading from "../../../components/Loading/Loading";

const tab = [
  { name: 'pendientes', icon: 'user' },
  { name: 'Asistidos', icon: 'user' },
  { name: 'no asistieron', icon: 'user' },
]


const Graphics = ({ route, navigation }) => {

  const { socket } = useContext(AuthContext)

  const scrollViewRef = React.useRef();


  const [confirmadas, setConfirmadas] = useState(0)
  const [pendientes, setPendientes] = useState(0)
  const [canceladas, setCanceladas] = useState(0)
  const [showGraph, setShowGraph] = useState(true);
  const [isloading, setIsloading] = useState(false);
  const [likes, setLikes] = useState(0)
  const [values, setValues] = useState(0)
  const [comments, setComments] = useState(0)
  const [dataPendiente, setDataPendiente] = useState([])
  const [dataonfirmados, setDataConfirmados] = useState([])
  const [dataNoAsistidos, setDataNoAsistidos] = useState([])


  const { items } = route.params;
  // console.log("este es el id del evento" + items.idEvento);

  useEffect(() => {
    socket.emit('getAsistencia', items.idEvento)


    socket.on('Asistencias', data => {
      if (data.id_evento === items.idEvento) {
        data.asistencias_confirmadas === 0 && data.asistencias_pendientes === 0 && data.asistencias_canceladas === 0 ? setShowGraph(false) : setShowGraph(true);
        setConfirmadas(data.asistencias_confirmadas)
        setPendientes(data.asistencias_pendientes)
        setCanceladas(data.asistencias_canceladas)
      }
    })

    socket.on('Countlikes', (data) => {
      setLikes(data.countLikes);
    })
    socket.on('CountComment', (data) => {
      setComments(data);
    })

    getAsistenciaConfirmado()
    getAsistenciaNoAsistio()
    getAsistenciaPendiente()

    socket.emit('getCountLikes', items.idEvento)
    socket.emit('getCountComments', items.idEvento)

  }, [])



  const colorScale = ["#7032DD", light.purple, "#7032DD"];

  const data = [
    {
      type: 'Asistidos',
      value: parseInt(confirmadas),
    },
    {
      type: 'pendiente',
      value: parseInt(pendientes),
    },
    {
      type: 'no Asistidos',
      value: parseInt(canceladas),
    },
  ];


  // const filtre = data.filter((item) => item.NombreEvento === nombre)

  // const generatePDF = async () => {
  //   const pdfPath = `${FileSystem.documentDirectory}archivo.pdf`;

  //   const pageWidth = 595; // Ancho de la página en puntos (por ejemplo, para tamaño A4)
  //   const pageHeight = 842; // Alto de la página en puntos

  //   const captureConfig = {
  //     format: 'jpg',
  //     quality: 0.8,
  //     result: 'base64',
  //   };

  //   const base64Data = await captureRef(scrollViewRef, captureConfig);

  //   const pdfDoc = await PDFDocument.create();
  //   const page = PDFPage.create();
  //   page.drawImage(base64Data, {
  //     x: 0,
  //     y: pageHeight,
  //     width: pageWidth,
  //     height: pageHeight,
  //   });

  //   pdfDoc.addPage(page);

  //   const pdfBytes = await pdfDoc.save();

  //   await FileSystem.writeAsStringAsync(pdfPath, pdfBytes, {
  //     encoding: FileSystem.EncodingType.Base64,
  //   });

  //   return pdfPath;
  // }

  // const handleDownloadPDF = async () => {
  //   try {
  //     const pdfPath = await generatePDF();

  //     await FileSystem.downloadAsync(pdfPath, FileSystem.documentDirectory + 'archivo.pdf');

  //     // Archivo PDF descargado exitosamente
  //   } catch (error) {
  //     // Manejar cualquier error
  //     console.error('Error al generar o descargar el PDF:', error);
  //   }
  // };

  const getAsistenciaPendiente = async () => {
    setIsloading(true)
    try {
      const result = await getAsistenciaPen(items.idEvento)
      setDataPendiente(result.data)
      setIsloading(false)
    } catch (error) {
      console.log(error.response);
      setIsloading(false)
    }
  }

  const getAsistenciaConfirmado = async () => {
    setIsloading(true)
    try {
      const result = await getAsistenciaCon(items.idEvento)
      setDataConfirmados(result.data);
      setIsloading(false)
    } catch (error) {
      setIsloading(false)
      console.log(error.response);
    }
  }
  const getAsistenciaNoAsistio = async () => {
    setIsloading(true)
    try {
      const result = await getAsistenciaNoAsis(items.idEvento)
      setDataNoAsistidos(result.data);
      setIsloading(false)
    } catch (error) {
      console.log(error.response);
      setIsloading(false)
    }
  }


  return (
    <>
      {
        isloading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
            <Loading />
          </View > :
          <View style={[styles.container]} >
            <SafeAreaView>
              <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                  <Icon.AntDesign name="left" size={24} style={styles.iconHeader} />
                </TouchableOpacity>
                <View>
                  <Text style={styles.headerTitle} numberOfLines={1}>Estadisticas</Text>
                </View>
                <View />
                {/* <TouchableOpacity style={styles.headerButton}
                >
                  <Icon.AntDesign name="pdffile1" size={24} style={styles.iconHeader} />
                </TouchableOpacity> */}
              </View>
            </SafeAreaView>
            <ScrollView ref={scrollViewRef}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.card}>
                  {showGraph ?
                    <View ref={scrollViewRef} style={{ flex: 1 }}>
                      <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={70}
                        width={420} // Tamaño deseado del ancho del gráfico
                        height={320} // Tamaño deseado de la altura del gráfico
                      >
                        <VictoryBar
                          style={{
                            data: {
                              fill: ({ index }) => colorScale[index % colorScale.length], // Asigna colores personalizados a cada barra
                              padding: { top: 10, bottom: 10 },
                            },
                          }}
                          cornerRadius={{ topLeft: 5, topRight: 5 }} // Define el radio de la parte superior
                          data={data}
                          x="type"
                          labels={null} // Establecer labels en null para ocultar las etiquetas de las barras
                          y="value"
                          barWidth={40} // Ajusta el valor según tu preferencia
                          animate={{
                            duration: 3000,
                            onLoad: {
                              duration: 3000,
                            },
                          }}
                        />
                      </VictoryChart>
                    </View>
                    :
                    <View style={styles.noAttendanceContainer}>
                      <Text style={styles.noAttendanceText}>No hay asistencia en este evento</Text>
                    </View>
                  }
                </View>
                <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginTop: hp('3') }}>
                  <View style={[styles.contentGraficaOne, { backgroundColor: light.white }]}>
                    <View>
                      <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'black' }}>Comentarios</Text>
                    </View>
                    <View style={{ marginTop: 20, elevation: 6, shadowColor: light.white }}>
                      <CircleProgress
                        value={comments} // Aquí puedes pasar el valor de progreso deseado entre 0 y 1
                        colorText='#1B1B1B'
                        colorProgress='#7560EE'
                        colorStoke={light.lightGray}
                      />
                    </View>
                  </View>

                  <View style={[styles.contentGraficaOne, { backgroundColor: light.purple }]}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'white' }}>likes</Text>
                    </View>
                    <View style={{ marginTop: 20, elevation: 6, shadowColor: light.white }}>
                      <CircleProgress
                        value={likes} // Aquí puedes pasar el valor de progreso deseado entre 0 y 1
                        colorText='white'
                        colorProgress={light.purple}
                        colorStoke={light.white}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', padding: 16 }}>
                {tab.map((item, index) => {
                  const isActive = values === index
                  return (
                    <View key={index} style={[styles.tabWrapper, isActive && { borderColor: light.purple, borderBottomWidth: 2 }]}>
                      <TouchableOpacity onPress={() => setValues(index)}>
                        <View style={styles.tab}>
                          <Text style={[styles.tabText, isActive && { color: light.purple }]}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </View>

              {/* items */}
              {values === 0 && (<ListItems data={dataPendiente} name='pendientes' />)}
              {values === 1 && (<ListItems data={dataonfirmados} name='confirmados' />)}
              {values === 2 && (<ListItems data={dataNoAsistidos} name='de no asistidos' />)}

            </ScrollView>
          </View>
      }
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  tabWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative',
    overflow: 'hidden'
  },
  tabText: {
    fontSize: 23,
    fontWeight: '600',
    color: light.gray,
    // marginLeft: 5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white'
  },
  headerButton: {
    width: wp('12'),
    height: hp('6'),
    backgroundColor: light.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes.radius - 5
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#141414',
  },
  iconHeader: {
    color: light.purple
  },
  conteneGrafica: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  card: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 4,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes.radius

  },
  noAttendanceContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noAttendanceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black', // Color rojo o el color de tu elección
  },
  contentGraficaOne: {
    paddingHorizontal: 30,
    width: '43%',
    height: 180,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    elevation: 9,
    marginLeft: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
  },
  letra: {
    paddingTop: 20,
  },
  SearchTextInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12
  },
  Search: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 4,
    marginBottom: 30,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#7560EE',
    width: '90%',
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 20,
  },
  separator2: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '90%',
    marginBottom: 30,
    marginTop: 10,
    marginLeft: 20,
  },
  NombreEvento: {
    marginTop: 20,
    marginLeft: 20,
  },
  asistentes: {
    marginLeft: 20,
  },
  box: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
  },
});

export default Graphics;
