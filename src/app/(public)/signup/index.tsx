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

export default function Login() {
  const { signIn } = useSession();
  const { userSession, create } = useUser();
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    

 
      await create(data);
      await signIn(data)
      router.replace("/(auth)/");

    
  };
  

  return (
    <View className="flex-1 justify-center">
      <ImageBackground
        className="h-1/3 flex flex-col justify-center items-center"
        source={HeaderLogin}
        blurRadius={4}
      >
        <View className="bg-slate-900/70 w-full h-full rounded-md p-4 backdrop-blur-md flex flex-col justify-center items-center">
          <Text className="text-3xl text-white font-bold">CADASTRO</Text>
        </View>
      </ImageBackground>

      <View className="bg-white flex-1 p-4 gap-y-5">

        
      <ControllerTextInput
          label="Nome"
          control={control}
          name="name"
          placeholder="Digite seu nome"
        />
        
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


        <View>
        <Button text="Cadastrar"
          onPress={handleSubmit(onSubmit)}
          />
  
        </View>
      </View>
    </View>
  );
}
