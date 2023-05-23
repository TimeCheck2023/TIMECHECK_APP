import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'

const HomeOrg = ({ items }) => {
  const { logout } = useContext(AuthContext);
  return (
    <View className='flex-1 justify-center items-center bg-slate-100'>
      <TouchableOpacity className='w-72 h-72 z-30'>
        <View className="h-full w-full bg-purple-500 flex justify-around rounded-md shadow-md border border-gray-500">
          <Text className='text-white text-center text-2xl font-bold'>Sena</Text>
          <Text className='text-white text-justify px-8 space-y-4 font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga assumenda voluptatum enim, consequuntur nihil autem esse asperiores error distinctio consequatur sit dolor quia suscipit, quo a exercitationem accusantium beatae recusandae!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeOrg;
