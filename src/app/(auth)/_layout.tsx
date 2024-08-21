import "@/styles/global.css";
import { AllProvider } from "@/contexts";
import { useSession } from "@/contexts/auth";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function AuthLayout() {
  const { session } = useSession();

  if (!session) return <Redirect href="/(public)/login" />;

  return (
    <AllProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AllProvider>
  );
}
