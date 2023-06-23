import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { light } from '../../../constants/theme'

const ListItems = ({ data, name }) => {
    return (
        <>
            {data.length === 0 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: light.black }}>Por el momento no existen registros {name}</Text>
                </View>
                :
                <View style={{ flex: 1, width: '100%', alignItems: 'center', paddingVertical: 20 }}>
                    {data.map((item, index) => (
                        <TouchableOpacity style={styles.contentCard}
                            key={index}
                        >
                            {/* <Image style={styles.image} /> */}
                            <View style={{ flex: 1, }}>
                                <Text style={styles.textName} numberOfLines={1}>{item.fullName}</Text>
                                <Text style={styles.textEmail} >{item.email}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            }
        </>
    )
}

export default ListItems

const styles = StyleSheet.create({
    contentCard: {
        paddingHorizontal: 30,
        width: '90%',
        height: 90,
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 9,
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
        fontSize: 20,
        marginLeft: 15,
        fontWeight: '600',
        color: 'gray'
    },
})