import { StyleSheet, Text, View, Modal, Button, Switch, TouchableOpacity } from 'react-native'
import React from 'react'
import { light, shadow, sizes } from "../../../constants/theme";

const MyModal = ({ isModalOpen, setIsModalOpen }) => {
    const [switch1, setSwitch1] = React.useState(false)
    return (
        <>
            <Modal
                visible={isModalOpen}
                transparent={true}
                animationType='slide'
            >
                <View style={styles.modalContainer}>
                    <View style={[shadow.light, styles.modal]}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: light.black }}>configuracion</Text>
                        <View style={styles.opcionContainer}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 10 }}>Modo Oscuro</Text>
                            <Switch value={switch1} onChange={() => setSwitch1(!switch1)} />
                        </View>
                        <TouchableOpacity style={styles.buttomContainer}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: light.white }}>Cerrar Session</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttomContainer} onPress={() => setIsModalOpen(!isModalOpen)}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: light.white }}>Cerrar modal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default MyModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modal: {
        backgroundColor: light.white,
        margin: 20,
        borderRadius: sizes.radius,
        paddingHorizontal: 30,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    opcionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    buttomContainer: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: light.purple,
        borderRadius: sizes.radius,
        marginBottom: 10
    },

})