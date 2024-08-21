import { FlatList, View, ActivityIndicator } from "react-native";
import { CardFood } from "./foods";
import { useFoods } from "@/hooks/useFoods";

export interface FoodProperties {
  id: string;
  name: string;
  price: number;
  time: string;
  delivery: number;
  rating: number;
  image: string;
  restaurantId: string;
}

export function TrendingFoods() {
  const { foods, isPending } = useFoods();

  if (isPending)
    return (
      <View className="flex flex-1 w-full h-full">
        <ActivityIndicator size="large" color="#ff4017" />
      </View>
    );

  return (
    <FlatList
      data={foods}
      renderItem={({ item }) => <CardFood food={item} />}
      horizontal={true}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
      showsHorizontalScrollIndicator={false}
    />
  );
}
