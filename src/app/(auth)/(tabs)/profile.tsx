
import { Pressable, Text, ImageBackground, View } from "react-native";

import { useSession } from "@/contexts/auth";
import HeaderLogin from "@/assets/images/login/header-login.jpg";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import ProfileInfo from "@/components/Profile/ProfileInfo"
import { Dialog, DialogContent, DialogTrigger, useDialog } from "@/components/ui/Dialog";



export default function TabThreeScreen() {
  const { signOut, session } = useSession();
  const {open, setOpen} = useDialog();

  return (
    
    <>
      <ImageBackground
          className="h-1/3 flex flex-col justify-center items-center"
          source={HeaderLogin}
          blurRadius={4}
          
        >
        <View className="w-full h-full bg-black/70 justify-center items-center">
        <Avatar className="w-40 h-40">
          <AvatarImage src="https://avatars.githubusercontent.com/u/128909474?v=4"/>
          <AvatarFallback>
              AD
          </AvatarFallback>
        </Avatar>
        </View>
        
        
        </ImageBackground>

      <View className="px-3 gap-3">
        <ProfileInfo text={session.name} onPress={()=> {}}/>
        <ProfileInfo text={session.email} onPress={()=> {}}/>
        
        
        <Button text="Sair" onPress={signOut}/>

        <View className="flex gap-2">
            <Text className="font-semibold text-xl text-primary">Dialog</Text>
            <Dialog>
              <DialogTrigger>
                <Text>Teste</Text>
              </DialogTrigger>
              <DialogContent>
                <View className="flex gap-4">
                  <Text className="font-semibold text-xl text-primary">Dialog Content</Text>
                  <Text className="text-primary">
                    Tap outside the dialog to close it.
                  </Text>
                </View>
              </DialogContent>
            </Dialog>
          </View>
      </View>
    </>
    
  );
}
