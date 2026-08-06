import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";

const require = createRequire(import.meta.url);

export class ServicioRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
        CREATE TABLE IF NOT EXISTS servicios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo VARCHAR(20) NOT NULL UNIQUE,
        nombre VARCHAR(100) NOT NULL,
        tipoServicio VARCHAR(50) NOT NULL,
        precio DECIMAL(10, 2) NOT NULL,
        duracionMinutos INTEGER,
        fechaInicio DATE,
        descripcion TEXT,
        activo BOOLEAN NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
        horaRegistro TIME NOT NULL,
        fechaHoraRegistro DATETIME NOT NULL,
        imagen BLOB,
        imagenMimeType VARCHAR(100)
        );
    `);
  }
}


