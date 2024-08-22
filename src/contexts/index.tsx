import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "../hooks/useColorScheme";
import { initializeDatabase } from "@/database/initializeDatabase";
import { SQLiteProvider } from "expo-sqlite";
import { createContext, ReactNode } from "react";
import { StoresProvider } from "@/hooks/useStores";
import { FoodsProvider } from "@/hooks/useFoods";
import { Dialog, DialogContext } from "@/components/ui/Dialog";

const AllContext = createContext({});

export const AllProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();

  return (
    <AllContext.Provider value={{}}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Dialog>
          <SQLiteProvider databaseName="test.db" onInit={initializeDatabase}>
            <StoresProvider>
              <FoodsProvider>{children}</FoodsProvider>
            </StoresProvider>
          </SQLiteProvider>
        </Dialog>
      </ThemeProvider>
    </AllContext.Provider>
  );
};
