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
import { ChangeForm, changeUserFormSchema } from "@/domain/formSchemas/profile/changeUser";

type ModalProps = {
  key: string | undefined;
  value: string | undefined;
} | null;

export default function TabThreeScreen() {
  const { update, removeUser } = useUser();
  const { control, handleSubmit } = useForm<ChangeForm>({
    resolver: yupResolver(changeUserFormSchema),
  });
  const { signOut, session, signIn } = useSession();
  const [showChangeModalEmail, setShowChangeModalEmail] = useState<ModalProps>(null);
  const [showChangeModalName, setShowChangeModalName] = useState<ModalProps>(null);
  const [showModalExit, setModalExit] = useState(false);
  const [showModalDelete, setModalDelete] = useState(false);


  const hideDialogEmail = () => setShowChangeModalEmail(null);
  const hideDialogName = () => setShowChangeModalName(null);

  const hideDialogDelete = () => setModalDelete((prev) => !prev);

  const toggleModalExit = () => setModalExit((prev) => !prev);

  const onSubmit = async (data:  ChangeForm) => {
    if (session && showChangeModalName?.key) {
      const userUpdate = await update(
        { ...session, name: data.name },
        session.id,
      );
      await signIn(userUpdate!);
      hideDialogName();
    }

    if (session && showChangeModalEmail?.key === "Email") {
      const userUpdate = await update(
        { ...session, email: data.email },
        session.id,
      );
      await signIn(userUpdate!);
      hideDialogEmail();
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
            setShowChangeModalName({ key: "Nome", value: session.name })
          }
        >
          <Ionicons name="person" size={26} color={"#334155"} />
        </ProfileInfo>

        <ProfileInfo
          text={session.email}
          userId={session.id}
          onPress={() =>
            setShowChangeModalEmail({ key: "Email", value: session.email })
          }
        >
          <Ionicons name="at-circle" size={26} color={"#334155"} />
        </ProfileInfo>

        <Button text="Excluir Conta" onPress={() => setModalDelete(true)} />
        <Button text="Sair" onPress={() => setModalExit(true)} />
      </View>

      <Dialog visible={Boolean(showChangeModalName)} onDismiss={hideDialogName}>
        <Dialog.Title>
          Deseja realmente alterar o {showChangeModalName?.key}?
        </Dialog.Title>
        <Dialog.Content>
          <ControllerTextInput
            control={control}
            name="name"
            label={showChangeModalName?.key}
            placeholder={showChangeModalName?.value}
            messageErrorClassname="mt-0"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            text="Cancelar"
            onPress={hideDialogName}
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
      <Dialog visible={Boolean(showChangeModalEmail)} onDismiss={hideDialogEmail}>
        <Dialog.Title>
          Deseja realmente alterar o {showChangeModalEmail?.key}?
        </Dialog.Title>
        <Dialog.Content>
          <ControllerTextInput
            control={control}
            name="email"
            label={showChangeModalEmail?.key}
            placeholder={showChangeModalEmail?.value}
            messageErrorClassname="mt-0"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            text="Cancelar"
            onPress={hideDialogEmail}
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
            text="Sair"
            onPress={async () => {
              await signOut();
              toggleModalExit();
            }}
            className="p-2"
          />
        </Dialog.Actions>
      </Dialog>

      <Dialog visible={showModalDelete} onDismiss={hideDialogDelete}>
        <Dialog.Title>Deseja realmente excluir sua conta?</Dialog.Title>

        <Dialog.Actions>
          <Button
            text="Não deletar"
            onPress={hideDialogDelete}
            className="p-2"
            variant="link"
          />
          <Button
            text="Deletar"
            onPress={ async ()=>{
            await removeUser(session.id)
            await signOut();
            }
              
            }
            className="p-2"
          />
        </Dialog.Actions>
      </Dialog>
    </>
)
}