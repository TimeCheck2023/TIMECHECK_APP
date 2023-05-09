import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useRef, useState, useEffect } from 'react'
import Avatar from "../../../assets/Avatar.png";
import imgGame from "../../../assets/Sing_Up.png";
import * as Icon from '@expo/vector-icons';
import BottomNavbar from '../../components/BottomNavbar'
import { getEvent } from '../../api/api';
{/* <BottomNavbar /> */ }

const Home = () => {
    const [currentTab, setCurrentTab] = useState('Home')
    const [showMenu, setShowMenu] = useState(false)
    const [data, setData] = useState(null)


    useEffect(() => {
        getEvent().then((response) => {
            setData(response.data.response);
        }).catch((error) => {
            console.log(error.response.data);
        })
    }, [])


    return (
        <SafeAreaView className='flex-1 justify-center items-start' style={{ backgroundColor: '#7973ED' }}>
            {/* menu Draw */}
            <View className='justify-start p-5'>
                <View className='flex-row'>
                    <Image source={Avatar} className='rounded-full' style={{
                        width: 60,
                        height: 60,
                        marginBottom: 8
                    }} />
                    <View className='left-2'>
                        <Text className='text-xl font-bold text-white'>Daniel aldana</Text>
                        <TouchableOpacity>
                            <Text className='text-xl font-bold text-white mt-1'>View Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className='flex-grow mt-14'>
                    {
                        //Tab Bar Button...
                    }
                    {TabButton(currentTab, setCurrentTab, 'Home', 'home')}
                    {TabButton(currentTab, setCurrentTab, 'Search', 'search')}
                    {TabButton(currentTab, setCurrentTab, 'Notifications', 'bell')}
                    {TabButton(currentTab, setCurrentTab, 'Settings', 'settings')}
                </View>

                <View>
                    {TabButton(currentTab, setCurrentTab, 'logout', 'log-in')}
                </View>
            </View>

            {
                /// Over lay View....
            }
            <View className={`flex-grow bg-white absolute top-0 bottom-0 right-0 left-0  ${showMenu && 'top-16 bottom-16 left-52 w-full rotate-6 rounded-l-3xl'} pl-3 pr-3`}>
                {/* Menu Button.... */}
                <SafeAreaView className='flex-1'>
                    <View className='flex-row p-3 items-center rounded-2xl'>
                        <TouchableOpacity onPress={() => { setShowMenu(!showMenu) }}>
                            <Icon.Feather name={showMenu ? 'x' : 'menu'} size={30} color='black' className='' />
                        </TouchableOpacity>
                        <Text className='text-xl font-bold text-black left-2'>{currentTab}</Text>
                        <TouchableOpacity className='absolute right-3' onPress={() => { setShowMenu(!showMenu) }}>
                            <Icon.Feather name='search' size={30} color='black' className='' />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={data}
                        keyExtractor={item => item.idEvento}
                        renderItem={({ item }) => <CardEvent items={item} />}
                        contentContainerStyle={{ alignItems: 'center' }}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={showMenu ? false : true}
                    />
                </SafeAreaView>
            </View>
        </SafeAreaView>
    )
}

const CardEvent = ({ items }) => {
    return (
        <View className='w-96 bg-[#7973ED] rounded-3xl p-5 my-5'>
            <View className='flex-row items-center'>
                <Image source={Avatar} className='w-14 h-14 rounded-full' resizeMode='contain' />
                <View className='ml-5'>
                    <Text className='text-xl font-bold text-white'>Daniel aldana</Text>
                    <Text className='text-lg font-bold text-white'>{items.fechaCreacionEvento}</Text>
                </View>
                <View className='absolute top-1 right-0'>
                    <Icon.Entypo name='dots-three-vertical' size={20} color='#FFF' />
                </View>
            </View>
            <View className='mt-3'>
                <Image source={{ uri: items.imagenEvento }} className='w-full h-64 rounded-3xl' resizeMode='contain' />
                <Text className='text-xl font-medium text-white top-2' numberOfLines={7}>
                    {items.descripcionEvento}
                </Text>
            </View>
            <View className='flex-row items-center mt-4'>
                <View className='flex-row justify-between'>
                    <Icon.Feather name='heart' size={30} color='white' className='mt-8 p-2' />
                    <Icon.Feather name='message-circle' size={30} color='white' className='mt-8 p-2' />
                    <Icon.Feather name='menu' size={30} color='white' className='mt-8 p-2' />
                </View>
                <View className='mx-2 w-36 h-14 items-center justify-center absolute right-2 bottom-0 rounded-3xl bg-gray-50 '>
                    <Text className='text-lg font-bold text-[#7973ED]'>Asistir</Text>
                </View>
            </View>
        </View>
    )
}


const TabButton = (currentTab, setCurrentTab, title, icon) => {
    return (
        <TouchableOpacity onPress={() => {
            if (title === 'logout') {
                //Do your Stuff...
            } else {
                setCurrentTab(title)
            }
        }
        }>
            <View className={`flex-row items-center ${currentTab === title ? 'bg-white' : 'bg-transparent'} rounded-lg p-4 pl-3 pr-20 mt-3`}>
                <Icon.Feather name={icon} size={20} color={`${currentTab === title ? '#7973ED' : 'white'}`} />
                <Text className={`text-base font-bold pl-2 ${currentTab === title ? 'text-[#7973ED]' : 'text-white'}`}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Home