import { View, Text, ImageBackground, FlatList} from 'react-native';
import HeaderLogin from "@/assets/images/login/header-login.jpg";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from "@/components/ui/Button";

export default function TabTwoScreen() {
  return (
   

     <View className="flex-1">
      
        <ImageBackground
          className="h-1/3 flex flex-col justify-center items-center"
          source={HeaderLogin}
          blurRadius={4}
        >
          <View className="bg-black/70 w-full h-full rounded-md p-4 flex flex-col justify-center items-center">
                <Text className="text-3xl text-white font-bold">Carrinho</Text>
          </View>
        </ImageBackground>
      <FlatList 
        data={[1, 2, 3 , 4 , 5, 6]}
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
        renderItem={({item})=> (
                <View className='border-b border-slate-500 h-25 flex-row items-center justify-between p-2' key={String(item)}>
                <View className='flex-row items-center justify-between gap-6'>
                  <Avatar className="w-20 h-20">
                      <AvatarImage src="https://img.freepik.com/fotos-gratis/hamburguer-saboroso-isolado-no-fundo-branco-fastfood-de-hamburguer-fresco-com-carne-e-queijo_90220-1063.jpg" />
                      <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <Text className='text-xl'>Hamburgão</Text>             
                </View>
                <Button text='x' className='w-12 h-12'/>
            </View>
        )}
      />
          <View className='h-25 flex-row items-center justify-between p-2'>
            <Text className='text-lg'>TOTAL A PAGAR: RS 250,00</Text>
            <Button text='CONFIRMAR' className='px-2'/>        
          </View>   
    </View>
  );
}


