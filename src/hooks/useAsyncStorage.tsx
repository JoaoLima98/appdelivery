import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tipo genérico T permite que o hook trabalhe com qualquer tipo de dado
function useAsyncStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setStoredValue(JSON.parse(value));
        }
      } catch (error) {
        console.error("Erro ao carregar do AsyncStorage:", error);
      }
    };

    loadStoredValue();
  }, [key]);

  const setValue = async (value: any) => {
    try {
      setStoredValue(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Erro ao salvar no AsyncStorage:", error);
    }
  };

  const removeItem = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error("Erro ao remover do AsyncStorage:", error);
    }
  };

  return [storedValue, setValue, removeItem] as const;
}

export default useAsyncStorage;
