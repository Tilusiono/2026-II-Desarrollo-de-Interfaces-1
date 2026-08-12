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

  async listar() {

    const filas = this.db
        .prepare("SELECT * FROM vacaciones ORDER BY id_vacacion")
        .all();

    return filas.map(
        (fila) =>
            new Vacaciones(
                fila.id_vacacion,
                fila.fecha_inicio,
                fila.fecha_fin,
                fila.cantidad_dias,
                fila.estado,
                fila.observacion,
                fila.id_empleado
            )
    );

}


async buscarPorId(id) {

    const fila = this.db
        .prepare(
            "SELECT * FROM vacaciones WHERE id_vacacion = ?"
        )
        .get(Number(id));

    if (!fila) return null;

    return new Vacaciones(
        fila.id_vacacion,
        fila.fecha_inicio,
        fila.fecha_fin,
        fila.cantidad_dias,
        fila.estado,
        fila.observacion,
        fila.id_empleado
    );

}


async crear(vacacionesModel) {

    const resultado = this.db
        .prepare(
            `
            INSERT INTO vacaciones (
                fecha_inicio,
                fecha_fin,
                cantidad_dias,
                estado,
                observacion,
                id_empleado
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `
        )
        .run(
            vacacionesModel.getFechaInicio(),
            vacacionesModel.getFechaFin(),
            vacacionesModel.getCantidadDias(),
            vacacionesModel.getEstado(),
            vacacionesModel.getObservacion(),
            vacacionesModel.getIdEmpleado()
        );

    return this.buscarPorId(
        Number(resultado.lastInsertRowid)
    );

  }
} 