import React, { useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import CustomGestureHandlerRootView from '../GestureHandlerRootView.android';


const Prueba_Bottom = () => {
    const bottomSheetModalRef = useRef(null);

    const openBottomSheet = () => {
        bottomSheetModalRef.current?.present();
    };

    const closeBottomSheet = () => {
        bottomSheetModalRef.current?.dismiss();
    };

    return (
        <CustomGestureHandlerRootView>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <Button title="Open Bottom Sheet" onPress={openBottomSheet} />
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        snapPoints={['50%', '100%']}
                        dismissOnPanDown={true}
                        style={styles.bottomSheet}
                    >
                        <View style={styles.sheetContent}>
                            {/* Contenido del bottom sheet */}
                            <Text>Desliza hacia abajo para cerrar</Text>
                            <Button title="Close Bottom Sheet" onPress={closeBottomSheet} />
                        </View>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </CustomGestureHandlerRootView>
    )
}

export default Prueba_Bottom

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
})