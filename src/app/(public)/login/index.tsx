import { View, Text, Pressable, ImageBackground } from "react-native";
import { useUser } from "@/hooks/useUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { ControllerTextInput } from "@/components/controller/controlledTextInput";
import { loginFormSchema, LoginForm } from "@/domain/formSchemas/auth/login";
import { useSession } from "@/contexts/auth";

import HeaderLogin from "@/assets/images/login/header-login.jpg";
import { Button } from "@/components/ui/Button";
import { useLayoutEffect } from "react";
import {useTable} from "@/hooks/useTable"


export default function Login() {
  const {populationStoresTable, populationFoodsTable} = useTable();
  const { signIn, session } = useSession();
  const { userSession } = useUser();
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: yupResolver(loginFormSchema),
  });

  async function populate(){
   
    try {
      await populationFoodsTable();
      await populationStoresTable();
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async (data: LoginForm) => {
    const user = await userSession(data);

    if (user) {
      signIn(user);
      router.replace("/(auth)/");
      return;
    }
  };

  useLayoutEffect(() => {
    if (session) {
      router.replace("/(auth)/");
    }

    return () => {};
  });

  return (
    <View className="flex-1 justify-center">
      <ImageBackground
        className="h-1/3 flex flex-col justify-center items-center"
        source={HeaderLogin}
        blurRadius={4}
      >
        <View className="bg-black/70 w-full h-full rounded-md p-4 flex flex-col justify-center items-center">
          <Text className="text-3xl text-white font-bold">Login</Text>
        </View>
      </ImageBackground>

      <View className="bg-white flex-1 p-4 gap-y-5">
        <ControllerTextInput
          control={control}
          name="email"
          label="E-mail"
          placeholder="Digite seu email"
        />

        <ControllerTextInput
          label="Senha"
          control={control}
          name="password"
          placeholder="Digite sua senha"
          passwordType
        />

        <Button text="Entrar" onPress={handleSubmit(onSubmit)} />

        <View className="flex-row gap-3 items-center justify-center mt-4">
          <Text className="text-slate-700 text-lg">
            Ainda não tem uma conta?
          </Text>
          <Button
            text="Cadastrar-se"
            onPress={() => router.push("/(public)/signup")}
            variant="link"
          />
        </View>
        <Button text=""onPress={populate} className="bg-white"></Button>
      </View>
      
    </View>
  );
}
