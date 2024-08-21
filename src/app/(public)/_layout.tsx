import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "@/database/initializeDatabase";

export default function AppLayout() {
  StatusBar({ translucent: true });

  return (
    <SQLiteProvider databaseName="test.db" onInit={initializeDatabase}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login/index" />
      </Stack>
    </SQLiteProvider>
  );
}
