import { useSQLiteContext } from 'expo-sqlite';
import React, { createContext, useState, useContext, ReactNode } from 'react';

type TableStoresContextProps = {
    populationStoresTable: () => Promise<void>;
    populationFoodsTable: () => Promise<void>;
    showPopulations: () => Promise<void>;
  }

export type TableStoresProps = {
    id: number
    name: string
    image:string
    rate: string
  }

export type TableFoodsProps = { 
    id: number,
    name: string, 
    price: number,
    time: string,
    delivery: number,
    rating: number,
    image: string,
    restaurantId: number
  }

const TableContext = createContext<TableStoresContextProps>({} as TableStoresContextProps);


export const TableProvider = ({ children }:{ children: ReactNode }) => {
    const database = useSQLiteContext()


    const populationStoresTable = async () => {
        const responseStores = await fetch("http://192.168.100.4:3000/restaurants")
        const dataStores: TableStoresProps[] = await responseStores.json();

        async function create(data: Omit<TableStoresProps, "id">) {
            const statement = await database.prepareAsync(
              "INSERT INTO stores (name, image, rate) VALUES ($name, $image, $rate)"
            )
          
            try {
              const result = await statement.executeAsync({
                $name: data.name,
                $image: data.image,
                $rate: data.rate
              })
        
              const insertedRowId = result.lastInsertRowId.toLocaleString()
        
              return { insertedRowId }
            } catch (error) {
              throw error
            } finally {
              await statement.finalizeAsync()
            }
          }


        dataStores.forEach(async (element: Omit<TableStoresProps, "id">) => {
           await create(element)
        });

        console.log("Termiou a população da tabela de Stores")
    }

    const populationFoodsTable = async () => {
        const responseFoods = await fetch("http://192.168.100.4:3000/foods")
        const dataFoods: TableFoodsProps[]  = await responseFoods.json();

        async function create(data: Omit<TableFoodsProps, "id">) {
            const statement = await database.prepareAsync(
              "INSERT INTO foods (name, price, time, delivery, rating, image, restaurantID) VALUES ($name, $price, $time, $delivery, $rating, $image, $restaurantID)"
            )
          
            try {
              const result = await statement.executeAsync({
                $name: data.name,
                $price: data.price,
                $time: data.time,
                $delivery: data.delivery,
                $rating: data.rating,
                $image: data.image,
                $restaurantID: data.restaurantId
                
              })
        
              const insertedRowId = result.lastInsertRowId.toLocaleString()
        
              return { insertedRowId }
            } catch (error) {
              throw error
            } finally {
              await statement.finalizeAsync()
            }
          }

        dataFoods.forEach(async (element: Omit<TableFoodsProps, "id">) => {
            await create(element)
        });

        console.log("Termiou a população da tabela de Foods")
    }

    const showPopulations = async () => {

            try{
                const queryStores = "SELECT * FROM stores"
                const queryFoods = "SELECT * FROM foods"
        
                const responseStores = await database.getAllAsync<TableStoresProps>(queryStores)
        
                const responseFoods = await database.getAllAsync<TableStoresProps>(queryFoods)

                console.log(responseStores)
                console.log(responseFoods)
            }catch (error){
              throw error
            }
          
    }



  return (
    <TableContext.Provider value={{ populationStoresTable, populationFoodsTable, showPopulations }}>
      {children}
    </TableContext.Provider>
  );
};


export const useTable = (): TableStoresContextProps => useContext(TableContext);