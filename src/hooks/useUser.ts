import { LoginForm } from "@/domain/formSchemas/auth/login"
import { useSQLiteContext } from "expo-sqlite"

export type UserDatabase = {
  id: number
  name: string
  password:string
  email: string
}

export function useUser() {
  const database = useSQLiteContext()

  async function create(data: Omit<UserDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO users (name, password, email) VALUES ($name, $password, $email)"
    )

    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $password: data.password,
        $email: data.email
      })

      const insertedRowId = result.lastInsertRowId.toLocaleString()

      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function searchByName(name: string) {
    try {
      const query = "SELECT * FROM users WHERE name LIKE ?"

      const response = await database.getAllAsync<UserDatabase>(
        query,
        `%${name}%`
      )

      return response
    } catch (error) {
      throw error
    }
  }

  async function update(data: UserDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE users SET name = $name, quantity = $quantity WHERE id = $id"
    )

    try {
      await statement.executeAsync({
        $id: data.id,
        $name: data.name,
        $password: data.password,
        $email: data.email
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM users WHERE id = " + id)
    } catch (error) {
      throw error
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM users WHERE id = ?"

      const response = await database.getFirstAsync<UserDatabase>(query, [
        id,
      ])

      return response
    } catch (error) {
      throw error
    }
  }

  async function getAll() {
    try{
        const query = "SELECT id, name, email FROM users"

        const response = await database.getAllAsync<UserDatabase>(query)

        return response
    }catch (error){
      throw error
    }
  }

  async function userSession({email, password}: LoginForm): Promise<Omit<UserDatabase, "password">> {
    try{
      const query = "SELECT id, email, name FROM users WHERE email LIKE ? AND password LIKE ?"

      const response = await database.getAllAsync<Omit<UserDatabase, "password">>(
        query,
        `%${email}%`,
        `%${password}%`,
      )

      return response[0];
  }catch (error){
    throw error
  }
  }

  return { create, searchByName, update, remove, show, getAll, userSession }
}
