import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, PressableProps, Text, View } from 'react-native';
import { Button } from '../ui/Button';

type ProfileInfoProps = {
  text: string;
} & PressableProps

export default function ProfileInfo({text, ...props}: ProfileInfoProps) {


 return (
<>

<Pressable className="border-b border-slate-500 h-16 flex-row items-center justify-between" {...props}>
  <View className="flex-row items-center gap-5">
  <Ionicons name="person" size={26} color={'#334155'}/>
    <Text className="text-slate-700 font-bold text-lg">
       {text}
    </Text>
  </View>
    <Ionicons name="chevron-forward" size={26} color={'#334155'}/>
</Pressable>
</>
  

  );
}

 