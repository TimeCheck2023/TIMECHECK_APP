import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from './AuthNavigator'
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";
import HomeStack from "./HomeStack";


const MainApp = () => {
    const { isLoading, userToken } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }
    return (
        <NavigationContainer>
            {userToken !== null ? <HomeStack /> : <AuthNavigator />}
            <StatusBar style='auto' />
        </NavigationContainer>
    )
}

export default MainApp