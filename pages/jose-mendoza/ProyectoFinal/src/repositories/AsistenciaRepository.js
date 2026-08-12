import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Asistencia from "../models/Asistencia.js";
import { objetoContieneTexto } from "../utils/texto.js";

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

    async listar() {
    const filas = this.db.prepare("SELECT * FROM asistencia ORDER BY id_asistencia").all();

    return filas.map(
      (fila) =>
        new Asistencia(
                    fila.id_asistencia,
                    fila.fecha,
                    fila.hora_entrada,
                    fila.hora_salida,
                    fila.horas_trabajadas,
                    fila.estado,
                    fila.id_empleado
                ),
      );
  }

  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM asistencia WHERE id_asistencia = ?")
      .get(Number(id));

    if (!fila) return null;

    return new Asistencia(
          fila.id_asistencia,
          fila.fecha,
          fila.hora_entrada,
          fila.hora_salida,
          fila.horas_trabajadas,
          fila.estado,
          fila.id_empleado
    );
  }

  async crear(asistenciaModel) {
    const resultado = this.db
      .prepare(
        `
        INSERT INTO asistencia (
                    fecha,
                    hora_entrada,
                    hora_salida,
                    horas_trabajadas,
                    estado,
                    id_empleado
                )
                VALUES (?, ?, ?, ?, ?, ?)
                `,
      )
      .run(
        asistenciaModel.fecha,
        asistenciaModel.horaEntrada,
        asistenciaModel.horaSalida,
        asistenciaModel.horasTrabajadas,
        asistenciaModel.estado,
        asistenciaModel.idEmpleado
      );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }
}