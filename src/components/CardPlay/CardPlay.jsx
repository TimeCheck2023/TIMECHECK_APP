import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import fondoHeader from '../../../assets/image/fondoHeader.png'



const CardPlay = ({ navigation, text }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={1} style={styles.containerCard}>
                <ImageBackground source={fondoHeader} style={[styles.card]} >
                    <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>{text}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={1} style={[styles.Buttom]} onPress={() => navigation.navigate('JuegoMemoria')}>
                        <Text style={{ fontSize: 20, color: '#5458F7', lineHeight: 18, fontWeight: 'bold' }}>Jugar</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}

export default CardPlay;

const styles = StyleSheet.create({
    containerCard: {
        width: 380,
        height: 370,
        backgroundColor: 'white',
        borderRadius: 21,
        elevation: 3,
        marginTop: 23,
        overflow: 'hidden',
    },
    card: {
        width: '100%',
        height: '100%',
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Buttom: {
        height: 53,
        width: 150,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 15,
        right: 15
    },
})