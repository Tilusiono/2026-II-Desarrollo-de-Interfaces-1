import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import {TipoEmpleado} from "../models/TipoEmpleado.js";
import { objetoContieneTexto } from "../utils/texto.js";

const require = createRequire(import.meta.url);
export class TipoEmpleadoRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS tipo_empleado (
        id_tipo_empleado INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(50) NOT NULL
      )
    `);

  }
  
}