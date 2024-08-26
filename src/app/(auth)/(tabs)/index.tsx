import { ScrollView, View } from "react-native";
import { Header } from "../../../components/header";

import Banner from "../../../components/banner";
import Search from "@/components/search";
import { Section } from "@/components/section";
import { TrendingFoods } from "@/components/trendingFoods";
import { Stores } from "@/components/stores";

export default function HomeScreen() {
  return (
    <ScrollView 
    showsVerticalScrollIndicator={false} 
    overScrollMode="never" 
    className="mt-5">
      <Header />
      <View className="px-5 mt-5">
        <Search />
      </View>
      <Banner />
      <Section
        name="Compra rápida"
        label="Veja Mais"
        action={() => console.log("TESTE CLICK")}
        size="text-xl"
      />
      <TrendingFoods />

      <Section
        name="Restaurantes"
        label="Veja mais"
        action={() => console.log("Ação Verificadas")}
        size="text-xl"
      />
      <Stores />
    </ScrollView>
  );
}
