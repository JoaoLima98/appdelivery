import { View, Pressable, Text, Image } from 'react-native';
import {StoresProperties} from '..'
import { Ionicons } from '@expo/vector-icons';

export function StoreItem({ item }: {item: StoresProperties}) {
 return (
   <Pressable className='flex flex-row items-center justify-start gap-2'>
        <Image
        source={{uri: item.image}}
        className='w-20 h-20 rounded-full'
        />

        <View className='flex gap-2'>
            <Text className='text-base text-black leading-4 font-bold'>{item.name}</Text>
            <View className='flex-row items-center gap-2'>
                <Ionicons name='star' size={14} color='#ca8a04'/>
                <Text className='text-sm'>{item.rate}</Text>
            </View>
        </View>
   </Pressable>
  );
}