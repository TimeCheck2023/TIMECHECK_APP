import React, { useContext, useEffect, useState } from "react";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from "victory-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import * as Icon from '@expo/vector-icons';
import { AuthContext } from "../../../context/AuthContext";

const Graphics = ({ route }) => {

  const { socket } = useContext(AuthContext)

  const [confirmadas, setConfirmadas] = useState(0)
  const [pendientes, setPendientes] = useState(0)
  const [canceladas, setCanceladas] = useState(0)

  const { items } = route.params;
  console.log(items);


  useEffect(() => {
    socket.emit('getAsistencia', items.idEvento)


    socket.on('Asistencias', data => {
      console.log(data);
      setConfirmadas(data.asistencias_confirmadas)
      setPendientes(data.asistencias_pendientes)
      setCanceladas(data.asistencias_canceladas)
    })
  }, [])

  const colorScale = ["#7032DD", "#E697FF", "#7032DD"];

  const data = [
    {
      month: 1,
      earnings: confirmadas,
    },
    {
      month: 2,
      earnings: pendientes,
    },
    {
      month: 3,
      earnings: canceladas,
    },
  ];




  return (
    <SafeAreaView style={[styles.container]} >
      <ScrollView>
        <Text style={styles.letra} className="text-slate-950 text-3xl text-center font-bold">Estadisticas de los Eventos</Text>
        <View style={styles.separator} />
        {/* <View style={styles.Search}>
          <TouchableOpacity
            style={styles.SearchTextInput}>

            <Icon.FontAwesome name='search' size={20} color='#000' style={{ opacity: 0.5 }} />
            <Text style={{ flex: 1, fontSize: 20, color: '#000', opacity: 0.5 }}>Search</Text>

          </TouchableOpacity>
        </View> */}

        <View className="w-85 h-90 z-20 my-4 mx-5 shadow-md border-violet-500">
          <Text style={styles.NombreEvento} className="text-violet-500 text-4xl font-bold">{items.nombreEvento}</Text>
          {/* <Text style={styles.asistentes} className="text-color1 text-3xl font-bold">500</Text> */}
          <Text style={styles.asistentes} className="text-slate-950 text-xl font-bold">Asistentes</Text>
          <View style={styles.separator} />
          <VictoryChart theme={VictoryTheme.material} padding={{ top: 20, bottom: 50, left: 40, right: 50 }} domainPadding={{ x: 350 }}>
            <VictoryBar
              style={{
                data: {
                  fill: ({ index }) => colorScale[index % colorScale.length], // Asigna colores personalizados a cada barra
                },
              }}
              // horizontal
              data={data}
              barWidth={15}
              cornerRadius={{ top: 5 }}
              x="month"
              y="earnings"
              animate={{
                duration: 3000,
                onLoad: {
                  duration: 3000,
                },
              }}
            />
          </VictoryChart>


          <View style={styles.conteneGrafica}>
            <View style={[styles.box, { backgroundColor: '#7032DD' }]} />
            <Text style={styles.title}>Asistidos</Text>
            {/* <View style={{ marginHorizontal: 5 }} /> */}
            <View style={[styles.box, { backgroundColor: '#E697FF' }]} />
            <Text style={styles.title}>pendiente</Text>
            <View style={[styles.box, { backgroundColor: 'gray' }]} />
            <Text style={styles.title}>No Asistidos</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  conteneGrafica: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
