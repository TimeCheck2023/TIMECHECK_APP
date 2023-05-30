import React, { useContext, useEffect } from "react";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from "victory-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, StyleSheet } from "react-native";

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
  container: {
    flex: 1,
    marginBottom: 16,
    marginHorizontal: 10, 
  },
  text: {
    fontSize: 20,
  },
});

export default Graphics;
