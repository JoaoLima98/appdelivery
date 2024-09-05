import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { StoreItem } from "./item";

export interface StoresProperties {
  id: string;
  name: string;
  image: string;
  rate: string;
}

export function StoreVerticalList() {
  const [stores, setStores] = useState<StoresProperties[]>([]);

  useEffect(() => {
    async function getFoods() {
      const response = await fetch("http://192.168.100.7:3000/restaurants");
      const data = await response.json();
      setStores(data);
    }

    getFoods();
  }, []);

  return (
    <View className="px-4 flex-1 w-full h-full mb-5 gap-4">
      {stores.map((item) => (
        <StoreItem item={item} key={item.id} />
      ))}
    </View>
  );
}
