import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import { Sede } from "../models/Sede.js";
import { objetoContieneTexto } from "../utils/texto.js";

const require = createRequire(import.meta.url);

export class SedeRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sede (
        id_sede INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) NOT NULL,
        direccion VARCHAR(200),
        telefono VARCHAR(15),
        capacidad INTEGER NOT NULL DEFAULT 0,
        estado BOOLEAN NOT NULL DEFAULT 1 CHECK (estado IN (0, 1)),
        horaApertura TIME NOT NULL,
        fechaInauguracion DATE
      )
    `);
  }
}