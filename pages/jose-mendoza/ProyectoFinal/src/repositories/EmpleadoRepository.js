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

        id_empleado INTEGER PRIMARY KEY AUTOINCREMENT,

        dni CHAR(8) NOT NULL UNIQUE,

        nombres VARCHAR(100) NOT NULL,

        apellidos VARCHAR(100) NOT NULL,

        telefono VARCHAR(15),

        correo VARCHAR(100),

        direccion VARCHAR(200),

        fecha_ingreso DATE,

        salario DECIMAL(10, 2),

        estado BOOLEAN NOT NULL DEFAULT 1 
        CHECK (estado IN (0, 1)),

        id_tipo_empleado INTEGER,

        id_cargo INTEGER,

        id_area INTEGER,

        id_sede INTEGER,

        FOREIGN KEY (id_tipo_empleado)
        REFERENCES tipo_empleado(id_tipo_empleado),

        FOREIGN KEY (id_cargo)
        REFERENCES cargo(id_cargo),

        FOREIGN KEY (id_area)
        REFERENCES area(id_area),

        FOREIGN KEY (id_sede)
        REFERENCES sede(id_sede)

      )
    `);

  }

}