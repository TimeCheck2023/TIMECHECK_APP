import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'


const ListItems = ({ item, index }) => {
    return (
        <View style={[styles.TaskContainer]}>
            <View style={[styles.task]}>
                <Image style={styles.image} source={{uri: item.image_url}} />
                <View style={{ flex: 1, }}>
                    <Text style={styles.textName} numberOfLines={1}>{item.nombre_completo_usuario}</Text>
                    <Text style={styles.textEmail} >{item.correo_usuario}</Text>
                    <Text style={styles.textRol} >{item.rol === 1 ? 'Miembro' : 'Admin'}</Text>
                </View>
            </View>
        </View>
    )
}

export default ListItems

const styles = StyleSheet.create({
    TaskContainer: {
        width: '100%',
        alignItems: 'center',
    },

    task: {
        width: '100%',
        height: 120,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingLeft: 20,
        // shadow ios
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowRadius: 10,
        // shadow android
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: 'gray'
    },
    textName: {
        fontSize: 25,
        marginLeft: 10,
        fontWeight: '600'
    },
    textEmail: {
        fontSize: 23,
        marginLeft: 15,
        fontWeight: '600',
        color: 'gray'
    },
    textRol: {
        fontSize: 20,
        marginLeft: 15,
        fontWeight: '600',
        color: '#5458F7'
    },
    iconContainerDelete: {
        height: 120,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7560EE'
    },
    iconContainerUpdate: {
        height: 120,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
})