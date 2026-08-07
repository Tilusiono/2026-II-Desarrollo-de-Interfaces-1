import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";

const require = createRequire(import.meta.url);

export class AsistenciaRepository {

constructor(archivo = sqlitePath) {

    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS asistencia (
        id_asistencia INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha DATE NOT NULL,
        hora_entrada TIME,
        hora_salida TIME,
        horas_trabajadas REAL,
        estado VARCHAR(20) NOT NULL
        CHECK (estado IN (
          'Presente',
          'Tardanza',
          'Justificado',
          'Falta'
        )),
        id_empleado INTEGER,
        FOREIGN KEY (id_empleado)
        REFERENCES empleado(id_empleado)

      )
    `);

}

}