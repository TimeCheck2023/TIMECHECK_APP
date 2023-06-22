import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { light } from '../../constants/theme'

const ModalDelete = ({ textIsloadin, isloading, visible, setShow, title, description, handleDelete }) => {
    return (
        <Modal visible={visible} transparent>
            <View style={styles.modalContainer}>
                <View style={styles.contenido}>
                    {
                        textIsloadin ?
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: light.purple }}>El evento se elimino correctamente</Text>
                            :
                            <>
                                <Text style={styles.titulo2}>{title}</Text>
                                <Text style={styles.contentText}>{description}</Text>
                                {isloading ?
                                    <ActivityIndicator size="large" color={light.purple} />
                                    :
                                    <>
                                        <TouchableOpacity
                                            onPress={handleDelete}
                                            style={styles.botonEliminar}>
                                            <Text style={styles.textoBotonEliminar}>Eliminar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => setShow(false)}
                                            style={styles.botonCancelar}>
                                            <Text style={styles.textoBotonCancelar}>Cancelar</Text>
                                        </TouchableOpacity>
                                    </>
                                }
                            </>
                    }
                </View>
            </View>
        </Modal>
    )
}

export default ModalDelete

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    contenido: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        width: '90%',
        padding: 20,
    },
    titulo2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    contentText: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center'
    },
    botonEliminar: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 4,
        marginTop: 10,
    },
    textoBotonEliminar: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    botonCancelar: {
        backgroundColor: 'gray',
        padding: 15,
        borderRadius: 4,
        marginTop: 10,
    },
    textoBotonCancelar: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
})