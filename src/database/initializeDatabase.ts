import { type SQLiteDatabase } from 'expo-sqlite'

export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL
      );
    `)

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS stores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        image TEXT NOT NULL,
        rate TEXT NOT NULL
      );
    `)

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS foods (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        time TEXT,
        delivery REAL,
        rating REAL,
        image TEXT,
        restaurantId INTEGER
      );
    `)
  }
  