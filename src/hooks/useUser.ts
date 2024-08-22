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
    const insertQuery = `
      INSERT INTO users (name, password, email)
      VALUES ('${data.name}', '${data.password}', '${data.email}')
    `

    try {
      await database.execAsync(insertQuery)

      const selectQuery = `
        SELECT id, name, email
        FROM users
        WHERE email = '${data.email}'
        ORDER BY id DESC
        LIMIT 1
      `

      return await database.getFirstAsync(selectQuery) as Omit<UserDatabase, "password">
    } catch (error) {
      throw error
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

  async function update(data: Omit<UserDatabase, 'password'>, id: number) {
    const query = `UPDATE users SET name = '${data.name}', email = '${data.email}' WHERE id = ${id}`;

    try {
      await database.execAsync(query)
      const user = show(id)

      if(user) return user
    } catch (error) {
      throw error
    }
  }

  async function removeUser(id: number) {
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

      if(response) return {email: response.email, id: response.id, name: response.name}

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

  return { create, searchByName, update, removeUser, show, getAll, userSession }
}
