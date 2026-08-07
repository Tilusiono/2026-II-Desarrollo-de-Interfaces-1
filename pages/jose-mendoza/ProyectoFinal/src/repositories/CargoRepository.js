import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";

const require = createRequire(import.meta.url);
export class CargoRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS cargo (
        id_cargo INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        sueldo_base DECIMAL(10,2)

      )
    `);
  }
}