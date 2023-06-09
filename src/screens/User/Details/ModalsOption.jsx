import { StyleSheet, Text, View, Modal, TouchableOpacity, Animated } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import * as Icon from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { light, sizes } from '../../../constants/theme';


const ModalsOption = ({ isModalsOpen, setIsModalsOpen, scale, navigation, item, setMostrarAdvertencia }) => {
    return (
        <>
            <Modal
                transparent
                visible={isModalsOpen}
            >
                <TouchableOpacity activeOpacity={3} style={{ flex: 1 }} onPress={() => setIsModalsOpen(!isModalsOpen)}>
                    <Animated.View style={[styles.cardModal, {
                        transform: [{ scale }]
                    }]}>
                        <TouchableOpacity style={styles.option} onPress={() => { navigation.navigate('FormEventUpdate', { item: item }), setIsModalsOpen(!isModalsOpen) }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Editar</Text>
                            <Icon.AntDesign name='edit' size={wp('6')} style={{ color: '#6C63FF' }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={() => { setMostrarAdvertencia(true), setIsModalsOpen(!isModalsOpen) }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Eliminar</Text>
                            <Icon.AntDesign name='delete' size={wp('6')} style={{ color: '#6C63FF' }} />
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        </>
    )
}

export default ModalsOption

const styles = StyleSheet.create({
    cardModal: {
        position: 'absolute',
        top: 70,
        right: 30,
        borderRadius: sizes.radius,
        backgroundColor: light.light,
        width: 160,
        height: 120,
        justifyContent: 'center',
        padding: 10
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})