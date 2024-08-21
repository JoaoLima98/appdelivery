import { useSQLiteContext } from 'expo-sqlite';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { StoresProps } from '@/database/types/stores'


type StoresContextProps = {
    searchByName: (name: string) => Promise<StoresProps[] | null>
    remove: (id: number) => Promise<void>
    stores: StoresProps[]
}

const StoresContext = createContext<StoresContextProps>({} as StoresContextProps);

export const StoresProvider = ({ children }:{ children: ReactNode }) => {
    const [stores, setStores] = useState<StoresProps[]>([])
    const database = useSQLiteContext()



    async function searchByName(name: string): Promise<StoresProps[] | null> {
        try {
          const query = "SELECT * FROM stores WHERE name LIKE ?"
    
          const response = await database.getAllAsync<StoresProps>(
            query,
            `%${name}%`
          )
    
          return response
        } catch (error) {
          throw error
        }
    }

    async function getAll() {
        try{
            const query = "SELECT id, name, image, rate FROM stores"
    
            const response = await database.getAllAsync<StoresProps>(query)
    
            setStores(response)
        }catch (error){
          throw error
        }
      }

    async function remove(id: number) {
        try {
          await database.execAsync("DELETE FROM stores WHERE id = " + id)
          await getAll()
        } catch (error) {
          throw error
        }
        
    
    }

    useEffect(() => {
      getAll();
    } , []);


  return (
    <StoresContext.Provider value={{ stores, remove, searchByName }}>
      {children}
    </StoresContext.Provider>
  );
};


export const useStores = (): StoresContextProps => useContext(StoresContext);
