import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import io from "socket.io-client";

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

        const connectToSocket = () => {
            socket.on('connect', () => {
                console.log('Conectado al servidor');
            })

            // Devolver una función de limpieza para desconectarse cuando se desmonte el componente
            return () => {
                socket.disconnect();
            };
        };
        // Llamar a la función para conectar al socket cuando se monte el componente
        const cleanup = connectToSocket();

        // Llamar a la función de limpieza cuando se desmonte el componente
        return cleanup;
    }, [])


    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo, socket }}>
            {children}
        </AuthContext.Provider>
    )
}