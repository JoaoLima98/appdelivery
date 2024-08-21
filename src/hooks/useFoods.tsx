import { useSQLiteContext } from 'expo-sqlite';
import React, { createContext, useState, useContext, ReactNode, useEffect, useTransition } from 'react';
import {FoodsProps} from '@/database/types/foods'


type FoodsContextProps = {
    searchByName: (name: string) => Promise<FoodsProps[] | null>
    remove: (id: number) => Promise<void>
    foods: FoodsProps[]
    isPending: boolean
}

const FoodsContext = createContext<FoodsContextProps>({} as FoodsContextProps);

export const FoodsProvider = ({ children }:{ children: ReactNode }) => {
    const [isPending, startTransition] = useTransition()
    const [foods, setFoods] = useState<FoodsProps[]>([])
    const database = useSQLiteContext()


    async function searchByName(name: string): Promise<FoodsProps[] | null> {
        try {
          const query = "SELECT * FROM foods WHERE name LIKE ?"
    
          const response = await database.getAllAsync<FoodsProps>(
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
            const query = "SELECT id, name, price, time, delivery, rating, image, restaurantId FROM foods"

            let response: FoodsProps[] | null = null
    
          
            startTransition(() => {
              (async () => {
                  response = await database.getAllAsync<FoodsProps>(query);
                  setFoods(response)
              })();
          });
    
        }catch (error){
          throw error
        }
      }

    async function remove(id: number) {
        try {
          await database.execAsync("DELETE FROM foods WHERE id = " + id)
          await getAll()
        } catch (error) {
          throw error
        }
        
    
    }

    useEffect(() => {
      getAll();
    }, [foods]);


  return (
    <FoodsContext.Provider value={{ foods, remove, searchByName, isPending }}>
      {children}
    </FoodsContext.Provider>
  );
};


export const useFoods = (): FoodsContextProps => useContext(FoodsContext);