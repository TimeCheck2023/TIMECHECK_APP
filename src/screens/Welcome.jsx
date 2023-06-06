import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fondo from '../../assets/image/fondo.jpg'

const { width, height } = Dimensions.get('window');


const Welcome2 = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={styles.container} source={fondo}>
                <View style={styles.content}>
                    <Image style={{ width: 370, height: 400, borderRadius: 20, resizeMode: 'cover' }} source={{ uri: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} />
                    <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', marginTop: 22 }}>Bienvenidos a timecheck!</Text>
                    <Text style={styles.contentDescription}>
                        TimeCheck es una herramienta en línea que facilita el registro automatizado de asistentes a eventos. Permite a los usuarios registrarse en línea
                        {/* , a los organizadores monitorear la asistencia en tiempo real y generar informes de asistencia. Simplifica la gestión de eventos y mejora la experiencia tanto para los organizadores como para los participantes. */}
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Sign_Up')}>
                            <View style={styles.containerBtn}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#6C63FF' }}>Register</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Sign_In')}>
                            <View style={styles.containerBtn}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#6C63FF' }}>Login</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Welcome2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        resizeMode: 'cover',
    },
    content: {
        height: '95%',
        width: '100%',
        bottom: 0,
        position: 'absolute',
        paddingHorizontal: 20,
        paddingVertical: 40,
        // backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    contentDescription: {
        color: 'white',
        lineHeight: hp('3%'),
        fontSize: hp('2%'),
        fontSize: wp('4.5%'),
        marginTop: hp('2%'),
    },
    containerBtn: {
        width: 150,
        height: 50,
        backgroundColor: 'white',
        marginTop: 60,
        marginLeft: 20,
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
        top: 140,
        right: 25,
    }
})