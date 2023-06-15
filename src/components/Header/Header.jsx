import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import * as Icon from '@expo/vector-icons';
import Avatar from '../../../assets/Avatar.png'
import React, { useContext } from 'react'
import { TextInput } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const header = ({ visible, navigation, search, handleSearch, Category, select, handleSelect, userInfo }) => {

    return (
        <View>
            {/* header */}
            <View style={styles.header}>
                <View style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    elevation: 20,
                    bottom: 3,
                    shadowColor: '#6C63FF',
                    borderColor: '#7973ED',
                    borderWidth: 1,
                }}>
                    <Text style={{ color: '#7973ED', fontSize: 25, fontWeight: 'bold' }}>{userInfo.nombre_completo_usuario.charAt(0).toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerTextOne} numberOfLines={1}>{userInfo.nombre_completo_usuario}</Text>
                    <Text style={styles.headerTextTwo} numberOfLines={1}>{userInfo.correo}</Text>
                </View>
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Notifications')}>
                    <Icon.Ionicons name='notifications-sharp' color='#7560EE' size={24} />
                </TouchableOpacity>
            </View>


            {/* shearch */}
            <View style={styles.Search}>
                <View style={styles.SearchTextInput}>
                    <Icon.FontAwesome name='search' size={20} color='#7560EE' style={{ opacity: 0.5 }} />
                    <TextInput
                        style={{ flex: 1, fontSize: 20, color: '#7560EE', opacity: 0.5 }}
                        placeholder='Search'
                        value={search}
                        onChangeText={handleSearch}
                    />
                </View>
            </View>


            {/* category */}
            {
                !visible &&
                <>
                    <View>
                        <ScrollView horizontal
                            contentContainerStyle={styles.CategoryListContainer}
                            showsHorizontalScrollIndicator={false}>
                            {
                                Category.map((item, index) => (
                                    <Pressable key={index} onPress={() => { handleSelect(item) }}>
                                        <Text style={[styles.CategoryListText, (item == select && styles.activeCategory)]}>
                                            {item}
                                        </Text>
                                    </Pressable>
                                ))
                            }
                        </ScrollView>
                    </View>
                </>
            }

        </View>
    )
}

export default header

const styles = StyleSheet.create({
    // header
    header: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    headerImage: {
        width: 60,
        aspectRatio: 1,
        borderRadius: 52
    },
    headerTextOne: {
        fontSize: 22,
        color: '#191919',
        fontWeight: 'bold',
        marginBottom: 8
    },
    headerTextTwo: {
        fontSize: 16,
        color: '#191919',
        opacity: 0.5
    },
    headerIcon: {
        width: 52,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 52,
        borderWidth: 2,
        borderColor: '#7560EE',
    },

    // Search
    Search: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 4,
    },
    SearchTextInput: {
        flex: 1,
        height: 52,
        borderRadius: 52,
        borderWidth: 2,
        borderColor: '#7560EE',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 12
    },

    // category
    CategoryListContainer: {
        marginTop: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        height: 60,
        gap: 15,
    },
    CategoryListText: {
        fontSize: 21,
        fontWeight: 'bold',
        paddingBottom: 5,
        paddingHorizontal: 12,
        color: 'grey'
    },

    activeCategory: {
        color: '#7560EE',
        borderBottomWidth: 2,
        paddingBottom: 5,
        borderColor: '#7560EE'
    },

})