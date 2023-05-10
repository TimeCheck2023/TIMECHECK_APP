import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";


import AuthNavigator from './src/navigation/AuthNavigator';
import AppStack from './src/navigation/AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';


export default function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
      // Verifica el rol del usuario almacenado en AsyncStorage
      const checkUserRole = async () => {
          try {
              const token = await AsyncStorage.getItem('token');
              setUserRole(token);
          } catch (error) {
              console.log('Error al obtener el rol del usuario', error);
          }
      };

      checkUserRole();
  }, []);
  const isAuthenticated = true; // Cambia esto según la autenticación real
  return (
    <NavigationContainer>
      {userRole === null ? <AuthNavigator /> : <AppStack />}
      <StatusBar style='light' />
    </NavigationContainer>
  );
}