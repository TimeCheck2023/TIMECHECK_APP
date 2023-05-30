import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/Welcome';
import Sign_up from '../screens/Sign_up'
import Sign_In from '../screens/Sign_In';
import VerificationScreen from '../screens/VerificationScreen';
import Prueba_Bottom from '../screens/prueba_Bottom';


const Stack = createNativeStackNavigator();


const AuthNavigator = () => {
   
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='Sign_In' component={Sign_In} />
            <Stack.Screen name='Sign_Up' component={Sign_up} />
            <Stack.Screen name='VerificationScreen' component={VerificationScreen} />
            <Stack.Screen name='Prueba_Bottom' component={Prueba_Bottom} />
        </Stack.Navigator>
    )
}

export default AuthNavigator