import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Welcome2 = () => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={styles.container} source={{ uri: 'https://raw.githubusercontent.com/azdravchev/Travel-App/details_screen_images_carousel/assets/images/645d5f28e26c7de2a280f71db15c2141.jpeg' }}>
                <View style={styles.content}>
                    <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>Bienvenidos a timecheck!</Text>
                    <Text style={styles.contentDescription}>
                        TimeCheck es una herramienta en línea que facilita el registro automatizado de asistentes a eventos. Permite a los usuarios registrarse en línea, a los organizadores monitorear la asistencia en tiempo real y generar informes de asistencia. Simplifica la gestión de eventos y mejora la experiencia tanto para los organizadores como para los participantes.
                    </Text>
                    <TouchableOpacity activeOpacity={0.8}>
                        <View style={styles.containerBtn}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.8}>
                    <View style={styles.containerBtn2}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Login</Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

export default Welcome2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6C63FF'
    },
    content: {
        height: '53%',
        width: '100%',
        bottom: 0,
        position: 'absolute',
        paddingHorizontal: 20,
        paddingVertical: 40,
        // backgroundColor: 'gray'
    },
    contentDescription: {
        color: 'white',
        lineHeight: hp('3%'),
        // fontSize: hp('2%'), 
        fontSize: wp('4.5%'),
        marginTop: hp('1%'),
    },
    containerBtn: {
        width: 150,
        height: 50,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBtn2: {
        position: 'absolute',
        width: 120,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        top: 50,
        right: 25,
    }
})