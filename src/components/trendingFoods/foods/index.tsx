import { View, Pressable, Text, Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { formatCurrency } from "@/utils/format-currency";
import { FoodProperties } from "../type";

export function CardFood({ food, ...rest }: FoodProperties) {
  return (
    <Pressable className="flex flex-col rounded-xl" {...rest}>
      <Image source={{ uri: food.image }} className="w-44 h-36 rounded-l-xl" />
      <View className="flex flex-row bg-neutral-900/75 w-fit gap-1 rounded-md absolute top-1 left-1 px-2 py-1">
        <Ionicons name="star" size={14} color="#ca8a04" />
        <Text className="text-white text-sm">{food.rating}</Text>
      </View>

      <Text className="font-medium text-md">{formatCurrency(food.price)}</Text>
      <Text className="font-medium text-lg">{food.name}</Text>
    </Pressable>
  );
}
