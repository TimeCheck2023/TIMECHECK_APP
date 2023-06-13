import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';

const HeaderOrg = ({ navigation, SearchFilter, search }) => {

    const { userInfo } = useContext(AuthContext)

    const inset = useSafeAreaInsets();

    return (
        <View>
            <View style={[styles.container2, { marginTop: inset.top + 15 }]}>
                <AntDesign name='home' size={30} onPress={() => { }} />
                <Text numberOfLines={1} style={styles.title}>{userInfo.nombre_organizacion}</Text>
                <Ionicons name='notifications-sharp' color='#7560EE' size={30} onPress={() => { }} />
            </View>
            <View style={styles.containerSearch}>
                <View style={styles.inner}>
                    <View style={styles.search}>
                        <AntDesign name='search1' color='#7560EE' size={30} onPress={() => { }} />
                    </View>
                    <TextInput cursorColor='#7560EE' style={styles.field} value={search} onChangeText={(text) => SearchFilter(text)} />
                </View>
            </View>
        </View>
    )
}

export default HeaderOrg

const styles = StyleSheet.create({
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24
    },
    title: {
        fontSize: 25,
        fontWeight: '900'
    },
    containerSearch: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 24 / 1.5,

    },
    inner: {
        flexDirection: 'row',
        borderBottomColor: '#7560EE',
        borderBottomWidth: 1,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    search: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1
    },
    field: {
        backgroundColor: 'white',
        flex: 1,
        paddingLeft: 48,
        paddingRight: 18,
        paddingVertical: 18,
        borderRadius: 16,
        height: 54,
        elevation: 7,
        shadowColor: '#7560EE',
        fontSize: 18,
        fontWeight: '600'
    },
})