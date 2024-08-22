import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Search() {
  return (
    <View className="flex flex-row border border-slate-950 h-10 rounded-full items-center gap-2 px-4 bg-transparent m-1">
      <Feather name="search" size={20} color={"#64748b"} />
      <TextInput
        placeholder="O que quer comer?"
        className="w-full h-screen flex-1 bg-transparent"
      />
    </View>
  );
}
