import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "@/database/initializeDatabase";
import { TableProvider } from "@/hooks/useTable";


export default function AppLayout() {
  StatusBar({ translucent: true });

  return (
    <SQLiteProvider databaseName="test.db" onInit={initializeDatabase}>
      <TableProvider>

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login/index" />
      </Stack>
      </TableProvider>
    </SQLiteProvider>
  );
}
