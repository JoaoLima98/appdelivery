import { Banners } from '@/constants/Banners';
import { View, Pressable, Text, Image,  FlatList} from 'react-native';

export default function Banner() {
 return (
    <View className='w-screen h-48 mt-5 mb-4 self-center'>
      <FlatList
        data={Banners}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className='h-full w-10' />}
        renderItem={({item}) => (
          <Pressable key={item.id} onPress={() => console.log("Click ban1")}>
              <Image 
                source={item.image} 
                className='w-screen h-full'
              />
          </Pressable>
        )}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
}