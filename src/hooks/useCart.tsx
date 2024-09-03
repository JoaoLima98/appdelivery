import { useSQLiteContext } from "expo-sqlite";
import React, { createContext, useContext, ReactNode } from "react";

interface FoodProperties {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  restaurantId: number;
  delivery: number;
  time: string;
}

interface FoodItemWithCount extends FoodProperties {
  count: number;
}

interface CartResponse {
  foods: FoodItemWithCount[];
  totalPrice: number;
}

type CartContextProps = {
  getCartByIdUser: (userId: number) => Promise<CartResponse>;
  setCartByUser: (userId: number, foodId: number) => Promise<void>;
  removeFromCartByUser: (userId: number, foodId: number) => Promise<boolean>;
};

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const database = useSQLiteContext();

  const getCartByIdUser = async (
    userId: number,
  ): Promise<{
    foods: (FoodProperties & { count: number })[];
    totalPrice: number;
  }> => {
    try {
      const query = `SELECT * FROM cart WHERE id_user = ${userId}`;
      const queryFood = `SELECT * FROM foods`;

      let response: { id: number; id_food: number; id_user: number }[] | null =
        null;

      response = await database.getAllAsync<{
        id: number;
        id_food: number;
        id_user: number;
      }>(query);

      const responseFoods =
        await database.getAllAsync<FoodProperties>(queryFood);

      const foodIds = response.map((item) => item.id_food);

      const matchedFoods = foodIds.map((foodId) => {
        return responseFoods.filter((item) => Number(item.id) === foodId)[0];
      });

      const foodCounts: Record<number, FoodProperties & { count: number }> = {};
      let totalPrice = 0;

      matchedFoods.forEach((food) => {
        if (food) {
          if (foodCounts[food.id]) {
            foodCounts[food.id].count += 1;
          } else {
            foodCounts[food.id] = { ...food, count: 1 };
          }
          totalPrice += food.price;
        }
      });

      const uniqueFoods = Object.values(foodCounts);

      return { foods: uniqueFoods, totalPrice };
    } catch (error) {
      console.log(error);
      return { foods: [], totalPrice: 0 };
    }
  };

  const setCartByUser = async (userId: number, foodId: number) => {
    const statement = await database.prepareAsync(
      "INSERT INTO cart (id_user, id_food) VALUES ($id_user, $id_food)",
    );
    try {
      await statement.executeAsync({
        $id_user: userId,
        $id_food: foodId,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const removeFromCartByUser = async (
    userId: number,
    foodId: number,
  ): Promise<boolean> => {
    try {
      const query = `DELETE FROM cart WHERE id_user = ${userId} AND id_food = ${foodId}`;

      await database.execAsync(query);

      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{ getCartByIdUser, setCartByUser, removeFromCartByUser }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => useContext(CartContext);
