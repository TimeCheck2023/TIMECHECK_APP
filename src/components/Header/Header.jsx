import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Pressable, Animated } from 'react-native'
import * as Icon from '@expo/vector-icons';
import Avatar from '../../../assets/Avatar.png'
import React, { useContext, useRef, useState } from 'react'
import { TextInput } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { light, sizes } from "../../constants/theme";


const header = ({ navigation, search, handleSearch, Category, select, setSelect, handleSelect, userInfo }) => {

    const [isVisible, setIsVisible] = useState(false)
    const animation = useRef(new Animated.Value(0)).current
    const animatedBorderWidth = useRef(new Animated.Value(0)).current;
    const animatedBorderColor = useRef(new Animated.Value(0)).current;


    const handleFiltre = () => {
        setIsVisible(!isVisible)
        if (isVisible) {
            Animated.timing(animation, {
                toValue: 60,
                duration: 500,
                useNativeDriver: false
            }).start()
        } else {
            handleSelect('All')
            Animated.timing(animation, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start()
        }
    }

    const handleFocus = () => {
        Animated.parallel([
            Animated.timing(animatedBorderWidth, {
                toValue: 2,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.timing(animatedBorderColor, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const handleBlur = () => {
        Animated.parallel([
            Animated.timing(animatedBorderWidth, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.timing(animatedBorderColor, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const borderStyle = {
        borderColor: animatedBorderColor.interpolate({
            inputRange: [0, 1],
            outputRange: [light.lightGray, light.purple],
        }),
        borderWidth: animatedBorderWidth,
    };

    return (
        <View>
            {/* header */}
            <View style={styles.header}>
                <TouchableOpacity style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 20,
                    bottom: 3,
                    shadowColor: '#6C63FF',
                    borderColor: '#7973ED',
                    borderWidth: 2,
                    overflow: 'hidden',
                }} onPress={() => navigation.navigate('Profiles')}>
                    <Image source={{ uri: userInfo.image_url }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                </TouchableOpacity>
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
                <Animated.View style={[styles.SearchTextInput, borderStyle]}>
                    <Icon.FontAwesome name='search' size={20} color={light.purple} style={{ opacity: 0.9 }} />
                    <TextInput
                        style={{ flex: 1, fontSize: 22, color: light.purple, opacity: 0.9 }}
                        placeholder='Search'
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={search}
                        cursorColor={light.purple}
                        onChangeText={handleSearch}
                    />
                </Animated.View>
                <Pressable style={styles.filtre} onPress={handleFiltre}>
                    <Icon.Ionicons name='md-filter' size={25} color={light.lightGray} style={{ opacity: 0.9 }} />
                </Pressable>
            </View>


            {/* category */}
            <View>
                <Animated.ScrollView horizontal
                    style={[styles.CategoryListContainer, {
                        height: animation,
                    }]}
                    contentContainerStyle={{ justifyContent: 'space-between', alignItems: 'center', gap: 15 }}
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
                </Animated.ScrollView>
            </View>
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
        alignItems: 'center'
    },
    SearchTextInput: {
        flex: 1,
        height: 55,
        borderRadius: sizes.radius + 5,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 12,
        backgroundColor: light.white,
    },
    filtre: {
        backgroundColor: '#6C63FF',
        width: 50,
        aspectRatio: 1,
        borderRadius: sizes.radius,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // category
    CategoryListContainer: {
        marginTop: 7,
        flexDirection: 'row',
        paddingHorizontal: 10,
        // height: 60
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