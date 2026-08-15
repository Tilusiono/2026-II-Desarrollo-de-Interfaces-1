import { DatabaseSync } from "node:sqlite";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const backendDirectory = path.resolve(currentDirectory, "../..");
const projectDirectory = path.resolve(backendDirectory, "..");
const databaseDirectory = path.join(projectDirectory, "database");
const defaultDatabasePath = path.join(databaseDirectory, "tienda_computadoras.sqlite");

mkdirSync(databaseDirectory, { recursive: true });

const databasePath = process.env.DB_PATH || defaultDatabasePath;
const database = new DatabaseSync(databasePath);

database.exec("PRAGMA foreign_keys = ON");
database.exec("PRAGMA journal_mode = WAL");
database.exec("PRAGMA synchronous = NORMAL");
database.exec("PRAGMA busy_timeout = 5000");

const schema = readFileSync(path.join(databaseDirectory, "schema.sql"), "utf8");
database.exec(schema);

if (process.env.DB_SEED !== "false") {
  const seed = readFileSync(path.join(databaseDirectory, "seed.sql"), "utf8");
  database.exec(seed);
}

export function getDatabase() {
  return database;
}

export function withTransaction(callback) {
  database.exec("BEGIN IMMEDIATE TRANSACTION");
  try {
    const result = callback(database);
    database.exec("COMMIT");
    return result;
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}

export function closeDatabase() {
  database.close();
}

export { databasePath };
