import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const Card = ({ onPress, isTurnedOver, children }) => {
    return (
        <Pressable onPress={onPress} style={isTurnedOver ? styles.cardUp : styles.cardDown}>
            {isTurnedOver ? (
                <Text style={styles.text}>{children}</Text>
            ) : (
                <Text style={styles.text}>?</Text>
            )}
        </Pressable>
    )
}

export default Card

const styles = StyleSheet.create({
    cardUp: {
        width: 100,
        height: 100,
        margin: 10,
        borderWidth: 3,
        borderColor: '#334155',
        backgroundColor: '#1e293b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    cardDown: {
        width: 100,
        height: 100,
        margin: 10,
        borderWidth: 3,
        borderColor: '#334155',
        backgroundColor: '#1e293b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    text: {
        fontSize: 42,
        color: '#334155'
    }
})