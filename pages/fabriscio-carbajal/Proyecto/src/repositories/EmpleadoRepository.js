import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";

const require = createRequire(import.meta.url);

export class EmpleadoRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
    CREATE TABLE IF NOT EXISTS empleado (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        apellido_paterno TEXT NOT NULL,
        dni INTEGER UNIQUE,
        teléfono TEXT,
        salario NUMERIC(8,2),
        direccion TEXT,
        hora_ingreso TIME,
        hora_salida TIME,
        disponible BOOLEAN NOT NULL DEFAULT 1 CHECK (disponible IN (0, 1)),
        fecha_ingreso DATETIME,
        fecha_nacimiento DATE
        )
    `);
  }
}

