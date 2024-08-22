import AsyncStorage from "@react-native-async-storage/async-storage";

function useAsyncStorage<T>(key: string) {
  const getValue = async (): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Erro ao carregar do AsyncStorage:", error);
      return null;
    }
  };

  const setValue = async (value: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Erro ao salvar no AsyncStorage:", error);
    }
  };

  const removeItem = async () => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Erro ao remover do AsyncStorage:", error);
    }
  };

  return { getValue, setValue, removeItem };
}

export default useAsyncStorage;
