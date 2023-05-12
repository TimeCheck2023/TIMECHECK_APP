import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    const login = (message) => {
        setUserInfo(message.EsUsuario)
        setUserToken(message.token)
        AsyncStorage.setItem('userInfo', JSON.stringify(message.EsUsuario));
        AsyncStorage.setItem('userToken', message.token);
        // setIsLoading(true);
        // setUserToken('sdsfsdf');
        // setIsLoading(false);
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
            // console.log(token);
            console.log(Info);
        } catch (error) {
            console.log(`islogging in error: ${error}`);
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])


    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    )
}