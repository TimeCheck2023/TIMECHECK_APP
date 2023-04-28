import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Welcome from './screens/Welcome';
import Sign_In from './screens/Sign_In';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Welcome'>
            <Stack.Screen name='Welcome' component={Welcome} options={{headerShown: false}} />
            <Stack.Screen name='Sign_In' component={Sign_In} options={{headerShown: false}}/>
        {/* <Stack.Screen name='' component=''/> */}
        </Stack.Navigator>
    )
}

export default AuthNavigator