import "react-native-reanimated";
import "@/styles/global.css";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { SessionProvider } from "@/contexts/auth";
import { useSafeAreaInsets } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { paddingTop: insets.top },
        }}
      >
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </SessionProvider>
  );
}
