import { View, Text, FlatList, Alert } from "react-native";
import React, { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import * as Notifications from "expo-notifications";
import { useSession } from "@/contexts/auth";

import Ionicons from "@expo/vector-icons/Ionicons";

import { router, useFocusEffect } from "expo-router";
import { formatCurrency } from "@/utils/format-currency";
import { useCart } from "@/hooks/useCart";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

interface FoodProperties {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  restaurantId: number;
  delivery: number;
  time: string;
}

interface FoodItemWithCount extends FoodProperties {
  count: number;
}

interface CartResponse {
  foods: FoodItemWithCount[];
  totalPrice: number;
}

export default function TabTwoScreen() {
  const { getItem } = useAsyncStorage("@cep");
  const [foods, setFoods] = useState<CartResponse>();
  const [cep, setCEP] = useState<string>();
  const { session } = useSession();
  const { getCartByIdUser, removeFromCartByUser } = useCart();

  async function displayNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Olá, ${session.name}`,
        body: "Seu pedido já está em produção!!!",
      },
      trigger: null,
    });
  }

  const getCart = async () => {
    const cepItem = await getItem();
    const foodFiltered = await getCartByIdUser(session.id);
    setCEP(cepItem || "");
    setFoods(foodFiltered);
  };

  useFocusEffect(
    React.useCallback(() => {
      getCart();
      return () => {};
    }, []),
  );

  return (
    <View className="flex-1">
      <FlatList
        data={foods?.foods}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        ListHeaderComponent={() => (
          <View className="items-center justify-center flex-row m-6">
            <Ionicons name="cart-outline" size={26} color={"#b91c1c"} />
            <Text className="text-primary text-lg font-bold">Seu Carrinho</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="px-3 mb-3">
            <Text className="text-lg font-bold">
              Você não adicinou nenhum item!
            </Text>
          </View>
        )}
        renderItem={({ item, index }) => (
          <View
            className="bg-gray-400/70 h-28 flex-row items-center justify-between p-2 mb-3"
            key={String(index)}
          >
            <View className="flex-row items-center justify-between gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={item.image} />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <View className="flex flex-col">
                <Text className="text-xl">{item.name}</Text>
                <Text className="text-lg">
                  Preço: {formatCurrency(item.price)}
                </Text>
                <Text className="text-lg">
                  Quantidade: x{foods?.foods[index].count}
                </Text>
              </View>
            </View>
            <Button
              text="X"
              className="w-12 h-12"
              onPress={() =>
                Alert.alert(
                  "Atenção!",
                  `Você deseja remover x${foods?.foods[index].count} ${item.name} do carrinho?`,
                  [
                    {
                      text: "NÃO",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "destructive",
                    },
                    {
                      text: "SIM",
                      onPress: async () => {
                        await removeFromCartByUser(
                          session.id,
                          foods!.foods[index].id,
                        );
                        await getCart();
                      },
                    },
                  ],
                )
              }
            />
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />

      <View className="gap-y-5 p-2">
        <View className="items-center justify-start flex-row">
          <Ionicons name="location-outline" size={26} color={"#b91c1c"} />
          <Text className="text-primary ml-2">Endereço</Text>
        </View>
        <View className="h-25 flex-row items-center justify-between">
          {cep ? (
            <Text onPress={() => router.push("/(auth)/location")}>{cep}</Text>
          ) : (
            <Button
              text="Adicionar"
              className="px-2 rounded-2xl w-36"
              onPress={() => router.push("/(auth)/location")}
            />
          )}
        </View>
      </View>
      <View className="h-25 flex-row items-center justify-between p-2">
        <Text className="text-lg">
          TOTAL A PAGAR: {formatCurrency(foods?.totalPrice || 0)}
        </Text>
        <Button
          text="CONFIRMAR"
          className="px-2"
          onPress={async () => displayNotification()}
        />
      </View>
    </View>
  );
}
