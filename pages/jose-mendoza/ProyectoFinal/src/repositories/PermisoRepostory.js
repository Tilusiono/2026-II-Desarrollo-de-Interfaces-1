import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import { Permiso } from "../models/Permiso.js";
import { objetoContieneTexto } from "../utils/texto.js";

const require = createRequire(import.meta.url);

export class PermisoRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS permiso (
        id_permiso INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo_permiso VARCHAR(50) NOT NULL,
        fecha_inicio DATE NOT NULL,
        fecha_fin DATE NOT NULL,
        motivo TEXT,
        estado VARCHAR(20) NOT NULL DEFAULT 'Pendiente'
        CHECK (estado IN (
          'Pendiente',
          'Aprobado',
          'Rechazado'
        )),
        id_empleado INTEGER,
        FOREIGN KEY (id_empleado)
        REFERENCES empleado(id_empleado)
      )
    `);
  }

  async listar() {
    const filas = this.db
      .prepare("SELECT * FROM sede ORDER BY id_sede")
      .all();

    return filas.map(
      (fila) =>
        new Sede(
          fila.id_sede,
          fila.nombre,
          fila.direccion,
          fila.telefono,
          fila.capacidad,
          fila.estado,
          fila.horaApertura,
          fila.fechaInauguracion
        )
    );
  }

  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM sede WHERE id_sede = ?")
      .get(Number(id));

    if (!fila) return null;

    return new Sede(
      fila.id_sede,
      fila.nombre,
      fila.direccion,
      fila.telefono,
      fila.capacidad,
      fila.estado,
      fila.horaApertura,
      fila.fechaInauguracion
    );
  }

  async crear(sedeModel) {
    const resultado = this.db
      .prepare(
        `
        INSERT INTO sede (
            nombre,
            direccion,
            telefono,
            capacidad,
            estado,
            horaApertura,
            fechaInauguracion
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `
      )
      .run(
        sedeModel.getNombre(),
        sedeModel.getDireccion(),
        sedeModel.getTelefono(),
        sedeModel.getCapacidad(),
        sedeModel.getEstado(),
        sedeModel.getHoraApertura(),
        sedeModel.getFechaInauguracion()
      );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }

}