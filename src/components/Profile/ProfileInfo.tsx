import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, PressableProps, Text, View } from "react-native";

type ProfileInfoProps = {
  userId: number;
  text: string;
  children?: React.ReactNode;
} & PressableProps;

export default function ProfileInfo({
  userId,
  text,
  children,
  ...props
}: ProfileInfoProps) {
  return (
    <>
      <Pressable
        className="border-b border-slate-500 h-16 flex-row items-center justify-between"
        {...props}
      >
        <View className="flex-row items-center gap-5">
          {children}
          <Text className="text-slate-700 font-bold text-lg">{text}</Text>
        </View>
        <Ionicons name="chevron-forward" size={26} color={"#334155"} />
      </Pressable>
    </>
  );
}
