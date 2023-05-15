import { View, Text, TouchableOpacity, Modal, Image, TextInput } from 'react-native'
import * as Icon from '@expo/vector-icons';
import sena from "../../assets/eventoSena.jpg";

const BottonModals = ({ isModals, setIsModals }) => {

    return (
        <>
            <Modal
                visible={isModals}
                // transparent={true}
                animationType="slide"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            >
                <View className='flex-1 bg-[#E8EAED] m-2 rounded-2xl' style={{ paddingTop: 40, paddingHorizontal: 10 }}>
                    <Text className='text-2xl font-bold'>comments</Text>
                    <TouchableOpacity className='absolute right-3 top-3 p-3 rounded-2xl bg-[#7560EE]' onPress={() => setIsModals(!isModals)}>
                        <Icon.AntDesign name="close" size={20} color="white" />
                    </TouchableOpacity>
                    <View className='w-full bg-white p-4 mt-7 rounded-2xl'>
                        <View className='flex-row'>
                            <View className='w-12 h-12 rounded-full'>
                                <Image source={sena} className='w-[100%] h-[100%] rounded-full' />
                            </View>
                            <View className='left-2'>
                                <Text className='text-xl font-bold text-black'>Danielaldana212@gmail.com</Text>
                                <Text className='text-base font-bold text-black'>10/02/2023</Text>
                            </View>
                        </View>
                        <View className='mt-4'>
                            <Text className='text-base font-bold text-black text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dolorum, cum unde optio esse animi vitae suscipit voluptates odit beatae quam mollitia inventore assumenda harum accusamus exercitationem eum. Ab, dicta?</Text>
                        </View>
                    </View>
                    <View className='absolute bottom-3 w-full flex-row p-2 gap-2 items-center'>
                        <TextInput className='p-3 w-[330px] text-lg bg-white rounded-2xl' placeholder='Write a Comments' />
                        <Icon.Feather name="send" size={20} className='p-4 text-center rounded-2xl text-[#7560EE] bg-white' />
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default BottonModals