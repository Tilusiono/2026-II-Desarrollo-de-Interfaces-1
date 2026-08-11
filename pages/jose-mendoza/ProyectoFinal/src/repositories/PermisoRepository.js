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
      .prepare("SELECT * FROM permiso ORDER BY id_permiso")
      .all();

    return filas.map(
      (fila) =>
        new Permiso(
          fila.id_permiso,
          fila.tipo_permiso,
          fila.fecha_inicio,
          fila.fecha_fin,
          fila.motivo,
          fila.estado,
          fila.id_empleado
        )
    );
  }

  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM permiso WHERE id_permiso = ?")
      .get(Number(id));

    if (!fila) return null;

    return new Permiso(
      fila.id_permiso,
      fila.tipo_permiso,
      fila.fecha_inicio,
      fila.fecha_fin,
      fila.motivo,
      fila.estado,
      fila.id_empleado
    );
  }

  async crear(permisoModel) {
    const resultado = this.db
      .prepare(
        `
        INSERT INTO permiso (
            tipo_permiso,
            fecha_inicio,
            fecha_fin,
            motivo,
            estado,
            id_empleado
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `
      )
      .run(
        permisoModel.getTipoPermiso(),
        permisoModel.getFechaInicio(),
        permisoModel.getFechaFin(),
        permisoModel.getMotivo(),
        permisoModel.getEstado(),
        permisoModel.getIdEmpleado()
      );

    return this.buscarPorId(
      Number(resultado.lastInsertRowid)
    );
  }

  async reemplazar(id, permisoModel) {
    const resultado = this.db
      .prepare(
        `
        UPDATE permiso
        SET tipo_permiso = ?,
            fecha_inicio = ?,
            fecha_fin = ?,
            motivo = ?,
            estado = ?,
            id_empleado = ?
        WHERE id_permiso = ?
      `
      )
      .run(
        permisoModel.getTipoPermiso(),
        permisoModel.getFechaInicio(),
        permisoModel.getFechaFin(),
        permisoModel.getMotivo(),
        permisoModel.getEstado(),
        permisoModel.getIdEmpleado(),
        Number(id)
      );

    return resultado.changes ? this.buscarPorId(id) : null;
  }

  // BUSCAR / QUERY SEARCH
  async query(permisoConsultaDto) {
    const dto = permisoConsultaDto ?? {};
    const permisos = await this.listar();

    const texto = dto.texto ?? "";
    const tipoPermiso = dto.tipoPermiso ?? "";
    const estado = dto.estado ?? "";
    const idEmpleado = dto.idEmpleado ?? "";
    const fechaInicio = dto.fechaInicio ?? "";
    const fechaFin = dto.fechaFin ?? "";

    return permisos.filter((permisoModel) => {
      const tipoPermisoActual = permisoModel.getTipoPermiso ? permisoModel.getTipoPermiso() : permisoModel.tipoPermiso;
      const estadoActual = permisoModel.getEstado ? permisoModel.getEstado() : permisoModel.estado;
      const idEmpleadoActual = permisoModel.getIdEmpleado ? permisoModel.getIdEmpleado() : permisoModel.idEmpleado;
      const fechaInicioActual = permisoModel.getFechaInicio ? permisoModel.getFechaInicio() : permisoModel.fechaInicio;
      const fechaFinActual = permisoModel.getFechaFin ? permisoModel.getFechaFin() : permisoModel.fechaFin;

      const camposBuscables = {
        idPermiso: permisoModel.getIdPermiso ? permisoModel.getIdPermiso() : permisoModel.idPermiso,
        tipoPermiso: tipoPermisoActual,
        fechaInicio: fechaInicioActual,
        fechaFin: fechaFinActual,
        motivo: (permisoModel.getMotivo ? permisoModel.getMotivo() : permisoModel.motivo) || "",
        estado: estadoActual,
        idEmpleado: idEmpleadoActual || "",
      };

      return (
        objetoContieneTexto(camposBuscables, texto) &&
        (tipoPermiso === "" || String(tipoPermisoActual) === String(tipoPermiso)) &&
        (estado === "" || String(estadoActual) === String(estado)) &&
        (idEmpleado === "" || String(idEmpleadoActual) === String(idEmpleado)) &&
        (fechaInicio === "" || String(fechaInicioActual) === String(fechaInicio)) &&
        (fechaFin === "" || String(fechaFinActual) === String(fechaFin))
      );
    });
  }
}