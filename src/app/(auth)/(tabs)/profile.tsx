import { useState } from "react";
import { ImageBackground, View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { useSession } from "@/contexts/auth";
import HeaderLogin from "@/assets/images/login/header-login.jpg";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import ProfileInfo from "@/components/Profile/ProfileInfo";
import { useUser } from "@/hooks/useUser";

import { Dialog } from "react-native-paper";
import { ControllerTextInput } from "@/components/controller/controlledTextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { yupResolver } from "@hookform/resolvers/yup";
import { changeUserFormSchema } from "@/domain/formSchemas/profile/changeUser";

type ModalProps = {
  key: string | undefined;
  value: string | undefined;
} | null;

export default function TabThreeScreen() {
  const { update } = useUser();
  const { control, handleSubmit } = useForm<{ value: string }>({
    resolver: yupResolver(changeUserFormSchema),
  });
  const { signOut, session, signIn } = useSession();
  const [showChangeModal, setShowChangeModal] = useState<ModalProps>(null);
  const [showModalExit, setModalExit] = useState(false);

  const hideDialog = () => setShowChangeModal(null);

  const toggleModalExit = () => setModalExit((prev) => !prev);

  const onSubmit = async (data: { value: string }) => {
    if (session && showChangeModal?.key === "Nome") {
      const userUpdate = await update(
        { ...session, name: data.value },
        session.id,
      );
      await signIn(userUpdate!);
      hideDialog();
    }

    if (session && showChangeModal?.key === "Email") {
      const userUpdate = await update(
        { ...session, email: data.value },
        session.id,
      );
      await signIn(userUpdate!);
      hideDialog();
    }
  };

  return (
    <>
      <ImageBackground
        className="h-1/3 flex flex-col justify-center items-center"
        source={HeaderLogin}
        blurRadius={4}
      >
        <View className="w-full h-full bg-black/70 justify-center items-center">
          <Avatar className="w-40 h-40">
            <AvatarImage src="https://avatars.githubusercontent.com/u/128909474?v=4" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </View>
      </ImageBackground>

      <View className="px-3 gap-3">
        <ProfileInfo
          text={session.name}
          userId={session.id}
          onPress={() =>
            setShowChangeModal({ key: "Nome", value: session.name })
          }
        >
          <Ionicons name="person" size={26} color={"#334155"} />
        </ProfileInfo>

        <ProfileInfo
          text={session.email}
          userId={session.id}
          onPress={() =>
            setShowChangeModal({ key: "Email", value: session.email })
          }
        >
          <Ionicons name="at-circle" size={26} color={"#334155"} />
        </ProfileInfo>

        <Button text="Sair" onPress={signOut} />
      </View>

      <Dialog visible={Boolean(showChangeModal)} onDismiss={hideDialog}>
        <Dialog.Title>
          Deseja realmente alterar o {showChangeModal?.key}?
        </Dialog.Title>
        <Dialog.Content>
          <ControllerTextInput
            control={control}
            name="value"
            label={showChangeModal?.key}
            placeholder={showChangeModal?.value}
            messageErrorClassname="mt-0"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            text="Cancelar"
            onPress={hideDialog}
            className="p-2"
            variant="link"
          />
          <Button
            text="Salvar"
            onPress={handleSubmit(onSubmit)}
            className="p-2"
          />
        </Dialog.Actions>
      </Dialog>
      <Dialog visible={showModalExit} onDismiss={toggleModalExit}>
        <Dialog.Title>Deseja realmente sair do App Delivery?</Dialog.Title>

        <Dialog.Actions>
          <Button
            text="Cancelar"
            onPress={toggleModalExit}
            className="p-2"
            variant="link"
          />
          <Button
            text="Salvar"
            onPress={async () => {
              await signOut();
              toggleModalExit();
            }}
            className="p-2"
          />
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
