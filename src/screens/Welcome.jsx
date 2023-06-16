import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, FlatList, Animated } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fondo from '../../assets/image/fondo.jpg'
import { light, sizes, spacing } from "../constants/theme";


const images = [
    { id: 1, image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 2, image: 'https://images.pexels.com/photos/1918160/pexels-photo-1918160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 3, image: 'https://images.pexels.com/photos/382297/pexels-photo-382297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 4, image: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 5, image: 'https://images.pexels.com/photos/4940642/pexels-photo-4940642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 6, image: 'https://i.pinimg.com/564x/11/e4/6f/11e46f903f9f1d29a6375398f9d8a054.jpg' },
]

const ListItem = React.memo(({ item, opacityValue }) => {
    return (
        <Animated.View style={{ width: wp('95%'), height: hp('35%'), borderRadius: 20, overflow: 'hidden', backgroundColor: light.gray, }}>
            <Animated.Image source={{ uri: item.image }} style={{ width: '100%', height: '100%', opacity: opacityValue, resizeMode: 'cover' }} />
        </Animated.View>
    )
})

const Welcome2 = ({ navigation }) => {

    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const opacityValue = useRef(new Animated.Value(1)).current;


    useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % images.length;

            if (nextIndex === 0 && currentIndex !== 0) {
                // Si es la última imagen y no es la primera vez,
                // volvemos al principio del carrusel
                scrollToIndexWithAnimation(0)
                setCurrentIndex(0);
            } else {
                // Avanzamos al siguiente índice normalmente
                scrollToIndexWithAnimation(nextIndex)
                setCurrentIndex(nextIndex);
            }
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [currentIndex]);

    const scrollToIndexWithAnimation = (index) => {
        Animated.timing(opacityValue, {
            toValue: 0.7,
            duration: 400,
            useNativeDriver: true,
        }).start(() => {
            carouselRef.current.scrollToIndex({ animated: true, index });
            Animated.timing(opacityValue, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }).start();
        });
    }

    const renderItem = useCallback(({ item }) => {
        return <ListItem item={item} opacityValue={opacityValue} />;
    }, []);



    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={styles.container} source={fondo}>
                <View style={styles.content}>

                    <View style={[{ width: wp('95%'), height: hp('35%'), borderRadius: 20, overflow: 'hidden', backgroundColor: light.purple }]}>
                        <FlatList
                            ref={carouselRef}
                            data={images}
                            horizontal
                            pagingEnabled
                            // showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            scrollEventThrottle={16}
                            showsHorizontalScrollIndicator={false}
                            decelerationRate={0.9}
                            snapToInterval={200}
                            snapToAlignment="start"
                        />
                    </View>
                    <Text style={styles.title}>Bienvenidos a timecheck!</Text>
                    <Text style={styles.contentDescription}>
                        TimeCheck es una herramienta en línea que facilita el registro automatizado de asistentes a eventos. Permite a los usuarios registrarse en línea
                        , a los organizadores monitorear la asistencia en tiempo real y generar informes de asistencia. Simplifica la gestión de eventos y mejora la experiencia tanto para los organizadores como para los participantes.
                    </Text>
                    <View style={styles.containerBtn}>
                        <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={() => navigation.navigate('Sign_Up')}>
                            <Text style={styles.btnTextOne}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn2} activeOpacity={0.8} onPress={() => navigation.navigate('Sign_In')}>
                            <Text style={styles.btnTextTow}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground >
        </View >
    )
}

export default Welcome2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        resizeMode: 'cover',
    },
    content: {
        height: hp('95%'),
        width: '100%',
        bottom: 0,
        position: 'absolute',
        paddingHorizontal: spacing.l,
        paddingVertical: spacing.xl,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: light.white,
        fontSize: wp('7.5%'),
        fontWeight: 'bold',
        marginTop: spacing.l
    },
    contentDescription: {
        color: light.white,
        lineHeight: hp('3%'),
        fontSize: hp('3%'),
        fontSize: wp('5%'),
        marginTop: hp('1.5%'),
    },
    containerBtn: {
        width: '100%',
        height: hp('8%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.xl,
    },
    btn: {
        flex: 1,
        backgroundColor: light.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: sizes.radius,
        borderBottomLeftRadius: sizes.radius
    },
    btnTextOne: {
        fontWeight: 'bold',
        fontSize: wp('5%'),
        color: light.purple
    },
    btnTextTow: {
        fontWeight: 'bold',
        fontSize: wp('5%'),
        color: light.white
    },
    btn2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: sizes.radius,
        borderBottomRightRadius: sizes.radius,
        borderWidth: 2,
        borderColor: light.white
    },
})