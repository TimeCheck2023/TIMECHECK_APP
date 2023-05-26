import React, { useContext } from 'react';
import { VictoryChart, VictoryBar} from "victory-native";

const colorScale=['#7032DD', '#E697FF'];

const data = [
  {
      month: 1,
      earnings: 541,
  },
  {
      month: 2,
      earnings: 570,
  }
];

const Graphics = ({ items }) => {
  <View style={styles.container}>
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryBar style={{
                  data: {
                    fill: ({ index }) => colorScale[index % colorScale.length], // Asigna colores personalizados a cada barra
                  },
                }}
                horizontal data={data} x='month' y='earnings' />
              </VictoryChart>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  text: {
    fontSize: 20,
  },
});

export default Graphics;
