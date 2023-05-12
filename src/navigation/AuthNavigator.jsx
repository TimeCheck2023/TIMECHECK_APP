import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/Welcome';
import Sign_In from '../screens/Sign_In';
import Sign_up from '../screens/Sign_up';


const Stack = createNativeStackNavigator();


const AuthNavigator = () => {
   
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='Sign_In' component={Sign_In} />
            <Stack.Screen name='Sign_up' component={Sign_up} />
        </Stack.Navigator>
    )
}

export default AuthNavigator