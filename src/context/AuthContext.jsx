import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import io from "socket.io-client";
import { useFocusEffect } from "@react-navigation/native";

const socket = io('https://timecheck.up.railway.app')
// const socket = io('http://192.168.1.47:4000')


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    
    //iniciar session
    const login = async (message) => {
        try {
            setIsLoading(true);
            const token_message = message.message;
            var decoded = jwt_decode(message.message);
            setUserToken(token_message)
            await AsyncStorage.setItem('userInfo', JSON.stringify(decoded.payload));
            setUserInfo(decoded.payload)
            await AsyncStorage.setItem('userToken', token_message);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    //cerrar session
    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userInfo');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        // AsyncStorage.removeItem("userToken")
        // AsyncStorage.removeItem("userInfo")
        try {
            setIsLoading(true)
            let token = await AsyncStorage.getItem('userToken');
            let Info = await AsyncStorage.getItem('userInfo');
            const objeto = JSON.parse(Info);
            if (objeto) {
                setUserToken(token)
                setUserInfo(objeto)
                console.log(objeto);
            }
            setIsLoading(false)
        } catch (error) {
            console.log(`islogging in error: ${error}`);
        }
    }


    useEffect(() => {
        isLoggedIn();
        // Función para conectar al socket

        socket.on('connect', () => {
            console.log('Conectado al servidor');
        })

        socket.on('disconnect', () => {
            console.log('Socket desconectado');
            // Aquí puedes implementar lógica para reconectar automáticamente
        });

    }, [])


    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo, socket, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    )
}