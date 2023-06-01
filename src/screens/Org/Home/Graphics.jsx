import React, { useContext, useEffect } from "react";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from "victory-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import * as Icon from '@expo/vector-icons';

const colorScale = ["#7032DD", "#E697FF"];

const data = [
  {
    month: 1,
    earnings: 500,
  },
  {
    month: 2,
    earnings: 520,
  },
];

const {height} = Dimensions.get("screen") 

const Graphics = ({ items }) => {
  return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.letra} className="text-slate-950 text-3xl text-center font-bold">Estadisticas de los Eventos</Text>
    <View style={styles.separator} />
       <View style={styles.Search}>
                <TouchableOpacity
                    style={styles.SearchTextInput}>

                    <Icon.FontAwesome name='search' size={20} color='#000' style={{ opacity: 0.5 }} />
                    <Text style={{ flex: 1, fontSize: 20, color: '#000', opacity: 0.5 }}>Search</Text>

                </TouchableOpacity>
        </View>
    <Text className="text-violet-500 text-3xl font-bold">Charla Soft</Text>
    <VictoryChart theme={VictoryTheme.material} padding={{ top:20, bottom:50, left:50, right:50}} domainPadding={{ x: 350 }}>
      <VictoryBar
        style={{
          data: {
            fill: ({ index }) => colorScale[index % colorScale.length], // Asigna colores personalizados a cada barra
          },
        }}
        horizontal
        data={data}
        barWidth={20} 
        height={height/ 1.05}
        cornerRadius={{ top: 5, bottom: 5 }}
        x="month"
        y="earnings"
        animate={{
          duration:3000,
          onLoad:{
            duration:3000,
          },
        }}
      />
    </VictoryChart>
  </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   marginBottom: 16,
  //   marginHorizontal: 10, 
  // },
  text: {
    fontSize: 20,
  },
  letra:{
    paddingTop:20,
  },
  SearchTextInput: {
    flex: 1,
    height: 52,
    borderRadius: 52,
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
    marginBottom:40,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#7560EE',
    width: '90%',
    marginBottom: 30,
    marginTop:10,
    marginLeft:20,
  },
});

export default Graphics;
