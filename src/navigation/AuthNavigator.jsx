import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Sign_up from '../screens/Sign_up'
import Sign_In from '../screens/Sign_In';
import VerificationScreen from '../screens/VerificationScreen';
import Welcome2 from '../screens/Welcome';
import Verificacion from '../screens/Verificacion';



const Stack = createNativeStackNavigator();


const AuthNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Welcome' component={Welcome2} />
            <Stack.Screen name='Sign_In' component={Sign_In} />
            <Stack.Screen name='Sign_Up' component={Sign_up} />
            <Stack.Screen name='Verificacion' component={Verificacion} />
        </Stack.Navigator>
    )
}

export default AuthNavigator