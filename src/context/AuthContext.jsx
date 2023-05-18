import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    //iniciar session
    const login = (message) => {
        setIsLoading(true);
        var decoded = jwt_decode(message);
        setUserToken(message)
        AsyncStorage.setItem('userInfo', JSON.stringify(decoded.payload));
        setUserInfo(decoded.payload.EsUsuario)
        AsyncStorage.setItem('userToken', message);
        setIsLoading(false);
    }
    
    //cerrar session
    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userInfo');
        setIsLoading(false);
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true)
            let token = await AsyncStorage.getItem('userToken');
            let Info = await AsyncStorage.getItem('userInfo');
            const objeto = JSON.parse(Info);
            if (objeto) {
                console.log("este es tu id: " + objeto.EsUsuario);
                setUserToken(token)
                setUserInfo(objeto.EsUsuario)
            }
            setIsLoading(false)
        } catch (error) {
            console.log(`islogging in error: ${error}`);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, [])  


    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    )
}