import { View, Text, Pressable, ImageBackground } from "react-native";
import { useUser } from "@/hooks/useUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { ControllerTextInput } from "@/components/controller/controlledTextInput";
import { loginFormSchema, LoginForm } from "@/domain/formSchemas/auth/login";
import { useSession } from "@/contexts/auth";

import HeaderLogin from "@/assets/images/login/header-login.jpg";

export default function Login() {
  const { signIn } = useSession();
  const { userSession, create } = useUser();
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    const user = await userSession(data);

    if (user) {
      signIn(user);
      router.replace("/(auth)/");
      return;
    }

    create({ ...data, name: "Victor Cassiano" });
  };

  return (
    <View className="flex-1 justify-center">
      <ImageBackground
        className="h-1/3 flex flex-col justify-center items-center"
        source={HeaderLogin}
        blurRadius={4}
      >
        <View className="bg-slate-900/70 w-full h-full rounded-md p-4 backdrop-blur-md flex flex-col justify-center items-center">
          <Text className="text-3xl text-white font-bold">Bem-vindo</Text>
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

        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="bg-red-700 rounded-md p-2 border flex flex-row items-center justify-center h-12"
        >
          <Text className="text-white text-lg">Entrar</Text>
        </Pressable>

        <View className="flex-row gap-1 items-center justify-center mt-4">
          <Text className="text-slate-700 text-sm">
            Ainda não tem uma conta?
          </Text>
          <Pressable onPress={() => console.log("Clickou no Cadastrar")}>
            <Text className="text-red-700 text-lg">Cadastrar-se</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
