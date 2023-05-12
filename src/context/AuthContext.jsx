import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    const login = (message) => {
        setIsLoading(true);
        setUserInfo(message.EsUsuario)
        setUserToken(message.token)
        AsyncStorage.setItem('userInfo', JSON.stringify(message.EsUsuario));
        AsyncStorage.setItem('userToken', message.token);
        setIsLoading(false);
    }
    
    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userInfo');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let token = await AsyncStorage.getItem('userToken');
            let Info = await AsyncStorage.getItem('userInfo');
            if (Info) {
                setUserToken(token)
                setUserInfo(Info)
            }
            setIsLoading(false)
        } catch (error) {
            console.log(`islogging in error: ${error}`);
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])


    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    )
}