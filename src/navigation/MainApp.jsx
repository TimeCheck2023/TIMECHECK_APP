import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigator from './BottomTabNavigator';


const MainNavigator = createNativeStackNavigator();

const MainApp = () => {

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Verifica el rol del usuario almacenado en AsyncStorage
        const checkUserRole = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log(token);
                setUserRole(token);
            } catch (error) {
                console.log('Error al obtener el rol del usuario', error);
            }
        };

        checkUserRole();
    }, []);


    return (
        <MainNavigator.Navigator>
            {
                userRole === null ? (
                    <MainNavigator.Screen
                        name="Auth"
                        component={AuthNavigator}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <MainNavigator.Screen
                        name="Main"
                        component={BottomTabNavigator}
                        options={{ headerShown: false }}
                    />
                )}
        </MainNavigator.Navigator>
    )
}

export default MainApp