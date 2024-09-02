import { View, Text, Pressable} from 'react-native';

interface Props{
    name: string;
    size:"text-lg" | "text-xl" | "text-2xl";
    label: string;
}
export function Section({name, size, label}: Props) {
 return (
   <View className='w-full flex flex-row items-center justify-between px-4'>
        <Text className={`${size} font-semibold my-4 self-start`}>{name}</Text>
            <Text>{label}</Text>

   </View>
  );
}