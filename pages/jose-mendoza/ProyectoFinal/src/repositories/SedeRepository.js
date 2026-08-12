import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import { Sede } from "../models/Sede.js";
import { objetoContieneTexto } from "../utils/texto.js";

const require = createRequire(import.meta.url);

export class SedeRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sede (
        id_sede INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) NOT NULL,
        direccion VARCHAR(200),
        telefono VARCHAR(15),
        capacidad INTEGER NOT NULL DEFAULT 0,
        estado BOOLEAN NOT NULL DEFAULT 1 CHECK (estado IN (0, 1)),
        horaApertura TIME NOT NULL,
        fechaInauguracion DATE
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

  async reemplazar(id, sedeModel) {
    const resultado = this.db
      .prepare(
        `
        UPDATE sede
        SET nombre = ?,
            direccion = ?,
            telefono = ?,
            capacidad = ?,
            estado = ?,
            horaApertura = ?,
            fechaInauguracion = ?
        WHERE id_sede = ?
      `
      )
      .run(
        sedeModel.getNombre(),
        sedeModel.getDireccion(),
        sedeModel.getTelefono(),
        Number(sedeModel.getCapacidad()), 
        sedeModel.getEstado(),
        sedeModel.getHoraApertura(),
        sedeModel.getFechaInauguracion(),
        Number(id)
      );

    return resultado.changes ? this.buscarPorId(id) : null;
  }

  // BUSCAR / QUERY SEARCH
  async query(sedeConsultaDto) {
    const dto = sedeConsultaDto ?? {};
    const sedes = await this.listar();
    const texto = dto.texto ?? "";
    const estado = dto.estado ?? "";
    const capacidadMin = dto.capacidadMin ?? "";
    const capacidadMax = dto.capacidadMax ?? "";

    return sedes.filter((sedeModel) => {
      const estadoActual = sedeModel.getEstado ? sedeModel.getEstado() : sedeModel.estado;
      const capacidadActual = sedeModel.getCapacidad ? sedeModel.getCapacidad() : sedeModel.capacidad;

      const camposBuscables = {
        idSede: sedeModel.getIdSede ? sedeModel.getIdSede() : sedeModel.idSede,
        nombre: sedeModel.getNombre ? sedeModel.getNombre() : sedeModel.nombre,
        direccion: (sedeModel.getDireccion ? sedeModel.getDireccion() : sedeModel.direccion) || "",
        telefono: (sedeModel.getTelefono ? sedeModel.getTelefono() : sedeModel.telefono) || "",
        capacidad: capacidadActual,
        estado: estadoActual,
        horaApertura: sedeModel.getHoraApertura ? sedeModel.getHoraApertura() : sedeModel.horaApertura,
        fechaInauguracion: (sedeModel.getFechaInauguracion ? sedeModel.getFechaInauguracion() : sedeModel.fechaInauguracion) || "",
      };

      return (
        objetoContieneTexto(camposBuscables, texto) &&
        (estado === "" || String(estadoActual) === String(estado)) &&
        (capacidadMin === "" || capacidadActual >= Number(capacidadMin)) &&
        (capacidadMax === "" || capacidadActual <= Number(capacidadMax))
      );
    });
  }

  // DELETE ELIMINAR

  async eliminar(identificador) {
    const sedeModelo = await this.buscarPorId(identificador);
    if (!sedeModelo) {
      return null;
    }

    this.db.prepare("DELETE FROM sede WHERE id_sede = ?").run(Number(identificador));
    return sedeModelo;
  }
}