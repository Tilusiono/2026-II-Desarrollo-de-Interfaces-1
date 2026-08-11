import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";

const require = createRequire(import.meta.url);

export class AutomovilesRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
        CREATE TABLE IF NOT EXISTS automoviles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    anio INTEGER NOT NULL,
    color VARCHAR(30),
    categoria VARCHAR(30) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    kilometraje INTEGER DEFAULT 0,
    descripcion TEXT,
    activo BOOLEAN NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
    horaRegistro TIME NOT NULL,
    fechaHoraRegistro DATETIME NOT NULL,
    imagen BLOB,
    imagenMimeType VARCHAR(100)
      )
    `);
  }
}
 



