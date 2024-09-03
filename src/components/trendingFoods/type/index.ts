import { PressableProps } from "react-native";

export type FoodProperties = {
  food: {
    id: string;
    name: string;
    price: number;
    time: string;
    delivery: number;
    rating: number;
    image: string;
    restaurantId: string;
  }
} & PressableProps
