import { FlatList, Alert } from "react-native";
import { CardFood } from "./foods";
import { useFoods } from "@/hooks/useFoods";
import { useCart } from "@/hooks/useCart";
import { useSession } from "@/contexts/auth";

export function TrendingFoods() {
  const { session } = useSession();
  const { foods } = useFoods();
  const { getCartByIdUser, setCartByUser } = useCart();

  return (
    <FlatList
      data={foods}
      renderItem={({ item }) => (
        <CardFood
          food={item}
          onPress={() =>
            Alert.alert(
              "Atenção!",
              `Você deseja adicionar ${item.name} ao carrinho?`,
              [
                {
                  text: "NÃO",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "destructive",
                },
                {
                  text: "SIM",
                  onPress: async () => {
                    await setCartByUser(session.id, Number(item.id));
                    await getCartByIdUser(session.id);
                  },
                },
              ],
            )
          }
        />
      )}
      horizontal={true}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
      showsHorizontalScrollIndicator={false}
    />
  );
}
