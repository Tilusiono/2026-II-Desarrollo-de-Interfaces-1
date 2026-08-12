import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";

const require = createRequire(import.meta.url);

export class ProductoRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS area (
        id_area INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        capacidad INTEGER NOT NULL DEFAULT 0,
        id_sede INTEGER,
        id_jefe INTEGER,
        
        FOREIGN KEY (id_jefe)
        REFERENCES empleado(id_empleado),
        
        FOREIGN KEY (id_sede)
        REFERENCES sede(id_sede)
      )
    `);
  }
}
