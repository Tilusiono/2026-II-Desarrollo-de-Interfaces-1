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

  async listar() {

    const filas = this.db
        .prepare("SELECT * FROM tipo_empleado ORDER BY id_tipo_empleado")
        .all();

    return filas.map(
        (fila) =>
            new TipoEmpleado(
                fila.id_tipo_empleado,
                fila.nombre
            )
    );

}


async buscarPorId(id) {

    const fila = this.db
        .prepare(
            "SELECT * FROM tipo_empleado WHERE id_tipo_empleado = ?"
        )
        .get(Number(id));

    if (!fila) return null;

    return new TipoEmpleado(
        fila.id_tipo_empleado,
        fila.nombre
    );

}


async crear(tipoEmpleadoModel) {

    const resultado = this.db
        .prepare(
            `
            INSERT INTO tipo_empleado (
                nombre
            )
            VALUES (?)
            `
        )
        .run(
            tipoEmpleadoModel.getNombre()
        );

    return this.buscarPorId(
        Number(resultado.lastInsertRowid)
    );

  }

  async reemplazar(id, tipoEmpleadoModel) {
    const resultado = this.db
      .prepare(
        `
        UPDATE tipo_empleado
        SET nombre = ?
        WHERE id_tipo_empleado = ?
      `
      )
      .run(
        tipoEmpleadoModel.getNombre(), 
        Number(id)
      );

    return resultado.changes ? this.buscarPorId(id) : null;
  }

  // BUSCAR
  
    async query(tipoEmpleadoConsultaDto) {
    const tiposEmpleado = await this.listar();
    const texto = tipoEmpleadoConsultaDto.texto ?? "";

    return tiposEmpleado.filter((tipoEmpleadoModel) => {
      const idTipoEmpleadoActual = tipoEmpleadoModel.getIdTipoEmpleado ? tipoEmpleadoModel.getIdTipoEmpleado() : tipoEmpleadoModel.idTipoEmpleado;
      const nombreActual = tipoEmpleadoModel.getNombre ? tipoEmpleadoModel.getNombre() : tipoEmpleadoModel.nombre;

      const camposBuscables = {
        idTipoEmpleado: idTipoEmpleadoActual,
        nombre: nombreActual,
      };

      return (
        objetoContieneTexto(camposBuscables, texto)
      );
    });
  }
}