import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sizes } from '../constants/theme';

const Modals = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="alert-circle-outline" size={50} color="#ff0000" />
                     </View>
                    <Text style={styles.title}>¡Alerta!</Text>
                    <Text style={styles.message}>Este es un mensaje de alerta.</Text>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: sizes.width,
        height: sizes.height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        width: '80%',
        height: '40%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Modals;