import { View, Text, ImageBackground, FlatList, Button as RNButton } from 'react-native';
import React, { useState } from "react";
import HeaderLogin from "@/assets/images/login/header-login.jpg";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from "@/components/ui/Button";  // Seu componente Button customizado
import * as Notifications from 'expo-notifications';
import { useSession } from '@/contexts/auth';
import Ionicons from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";
import { TextInput } from 'react-native-paper';

export default function TabTwoScreen() {
  const { session } = useSession();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  async function displayNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Olá, ${session.name}`,
        body: 'Seu pedido já está em produção!!!',
      },
      trigger: null,
    });
  }

  return (
    <View className="flex-1">
      <ImageBackground
        className="h-1/4 flex flex-col justify-center items-center"
        source={HeaderLogin}
        blurRadius={4}
      >
        <View className="bg-black/70 w-full h-full rounded-md p-4 flex flex-col justify-center items-center">
          <Text className="text-3xl text-white font-bold">Finalize sua Compra!</Text>
        </View>
      </ImageBackground>

      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
        ListHeaderComponent={() => (
          <View className='w-36 items-center justify-center flex-row p-2 m-4'>
            <Ionicons name="cart-outline" size={26} color={"#b91c1c"} />
            <Text className='text-primary ml-2'>
              Seu Carrinho
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View className='bg-gray-400/70 h-28 flex-row items-center justify-between p-2' key={String(item)}>
            <View className='flex-row items-center justify-between gap-6'>
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://img.freepik.com/fotos-gratis/hamburguer-saboroso-isolado-no-fundo-branco-fastfood-de-hamburguer-fresco-com-carne-e-queijo_90220-1063.jpg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <View className='flex flex-col'>
                <Text className='text-xl'>Hamburgão</Text>
                <Text className='text-lg'>Preço: R$ 6,00</Text>
              </View>
            </View>
            <Button text='X' className='w-12 h-12' />
          </View>
        )}
        ItemSeparatorComponent={() => <View className='h-2' />}
        ListFooterComponent={() => (
          <View className='p-2'>
            <View className='w-36 items-center justify-center flex-row p-2 mt-4'>
              <Ionicons name="location-outline" size={26} color={"#b91c1c"} />
              <Text className='text-primary ml-2'>
                Endereço
              </Text>
            </View>
            <View className='h-25 flex-row items-center justify-between p-2 mt-4'>
              <Button text='Adicionar endereço' className='px-2 rounded-2xl w-36' onPress={toggleModal} />
              <Modal 
                isVisible={isModalVisible} 
                onBackdropPress={toggleModal} 
                style={{ justifyContent: 'flex-end', margin: 0 }}
              >
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                  <Text>Digite seu Cep:</Text>
                  <TextInput placeholder='CEP'></TextInput>
                  <RNButton title="Cancelar" onPress={toggleModal} />
                </View>
              </Modal>
            </View>
          </View>
        )}
      />

      <View className='h-25 flex-row items-center justify-between p-2'>
        <Text className='text-lg'>TOTAL A PAGAR: R$ 250,00</Text>
        <Button text='CONFIRMAR' className='px-2' onPress={async () => displayNotification()} />
      </View>
    </View>
  );
}
