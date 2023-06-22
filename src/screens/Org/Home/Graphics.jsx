import React, { useContext, useEffect, useState, useRef } from "react";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryPortal } from 'victory-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView, Share } from "react-native";
import * as Icon from '@expo/vector-icons';
import { AuthContext } from "../../../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { light, sizes } from "../../../constants/theme";
import CircleProgress from "../../../components/CircleProgress/CircleProgress";
import { Svg } from 'react-native-svg';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { captureRef } from 'react-native-view-shot';


const Graphics = ({ route, navigation }) => {

  const { socket } = useContext(AuthContext)

  const graphRef = useRef(null);


  const [confirmadas, setConfirmadas] = useState(0)
  const [pendientes, setPendientes] = useState(0)
  const [canceladas, setCanceladas] = useState(0)
  const [showGraph, setShowGraph] = useState(true);
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState(0)


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

  const generatePDF = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
      });

      if (!result.canceled) {
        const base64Data = result.base64;

        const htmlContent = `<img src="data:image/png;base64,${base64Data}" />`;

        const pdfFile = await Print.printToFileAsync({ html: htmlContent });

        const destinationPath = `${FileSystem.documentDirectory}graph.pdf`;

        await FileSystem.moveAsync({
          from: pdfFile.uri,
          to: destinationPath,
        });

        console.log('PDF generado exitosamente');
        console.log('Ruta del archivo PDF:', destinationPath);
      }
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }

  };


  const sharePDF = async (path) => {
    try {
      const shareOptions = {
        url: `file://${path}`,
        mimeType: 'application/pdf',
        filename: 'graph.pdf',
        message: '¡Hola! Aquí tienes el archivo PDF de la gráfica que generé.',
      };

      await Share.share(shareOptions);
    } catch (error) {
      console.error('Error al compartir el PDF:', error);
    }
  };


  return (
    <View style={[styles.container]} >
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
            <Icon.AntDesign name="left" size={24} style={styles.iconHeader} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle} numberOfLines={1}>Estadisticas</Text>
          </View>
          <TouchableOpacity style={styles.headerButton} onPress={generatePDF}>
            <Icon.AntDesign name="pdffile1" size={24} style={styles.iconHeader} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.card}>
            {showGraph ?
              <Svg ref={graphRef} width={420} height={320}>
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
              </Svg>
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

      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
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
