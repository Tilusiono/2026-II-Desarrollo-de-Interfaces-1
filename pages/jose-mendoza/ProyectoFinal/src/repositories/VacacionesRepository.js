import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import {Vacaciones} from "../models/Vacaciones.js";
import { objetoContieneTexto } from "../utils/texto.js";

const require = createRequire(import.meta.url);

export class VacacionesRepository {

constructor(archivo = sqlitePath) {

    const { DatabaseSync } = require("node:sqlite");

    this.db = new DatabaseSync(archivo);

    this.db.exec("PRAGMA foreign_keys = ON");

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS vacaciones (
        id_vacacion INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha_inicio DATE NOT NULL,
        fecha_fin DATE NOT NULL,
        cantidad_dias INTEGER NOT NULL,
        estado VARCHAR(20) NOT NULL DEFAULT 'Pendiente'
        CHECK (estado IN (
          'Pendiente',
          'Aprobado',
          'Rechazado'
        )),
        observacion TEXT,
        id_empleado INTEGER,
        FOREIGN KEY (id_empleado)
        REFERENCES empleado(id_empleado)

      )
    `);

  }
} 