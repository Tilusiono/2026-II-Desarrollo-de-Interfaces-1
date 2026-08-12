import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import {Cargo} from "../models/Cargo.js";
import { objetoContieneTexto } from "../utils/texto.js";

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
  async listar() {
    const filas = this.db.prepare("SELECT * FROM  cargo BY id_cargo").all();

    return filas.map(
      (fila) =>
        new Producto(
              fila.id_cargo,
              fila.nombre,
              fila.descripcion,
              fila.sueldo_base
        ),
    );
  }

  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM cargo WHERE id_cargo = ?")
      .get(Number(id));

    if (!fila) return null;

    return new Cargo(
          fila.id_cargo,
          fila.nombre,
          fila.descripcion,
          fila.sueldo_base
    );
  }

  async crear(cargoModel) {
    const resultado = this.db
      .prepare(
        `
            INSERT INTO cargo (
                nombre,
                descripcion,
                sueldo_base
            )
            VALUES (?, ?, ?)
            `,
      )
      .run(
            cargoModel.getNombre(),
            cargoModel.getDescripcion(),
            cargoModel.getSueldoBase()
      );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }
}