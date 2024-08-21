import { Pressable, ScrollView } from "react-native";
import { Header } from "../../../components/header";

import Banner from "../../../components/banner";
import Search from "@/components/search";
import { Section } from "@/components/section";
import { TrendingFoods } from "@/components/trendingFoods";
import { Stores } from "@/components/stores";
import { useSession } from "@/contexts/auth";

export default function HomeScreen() {
  const { session } = useSession();

  console.log(session);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header />
      <Search />
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
      ></Section>
      <Stores></Stores>
    </ScrollView>
  );
}
