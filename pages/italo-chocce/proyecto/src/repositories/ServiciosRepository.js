import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Producto from "../models/Servicios.js";

const require = createRequire(import.meta.url);

export class ServiciosRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS servicios_casino (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo VARCHAR(20) NOT NULL UNIQUE,
        nombre TEXT NOT NULL,
        categoria_id CHAR(3) NOT NULL,
        capacidadMax INTEGER NOT NULL DEFAULT 0,
        precio DECIMAL(10, 2) NOT NULL,
        duracionMinutos REAL,
        descripcion TEXT,
        activo BOOLEAN NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
        fechaVencimiento DATE,
        horaRegistro TIME NOT NULL,
        fechaHoraRegistro DATETIME NOT NULL,
        imagen BLOB,
        imagenMimeType VARCHAR(100),
        FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON UPDATE CASCADE ON DELETE RESTRICT
      );
    `);
  }

  async listar() {
    const filas = this.db.prepare("SELECT * FROM servicios_casino ORDER BY id").all();

    return filas.map(
      (fila) =>
        new Servicio(
          fila.id,
          fila.codigo,
          fila.nombre,
          fila.categoria_id,
          fila.capacidadMax,
          fila.precio,
          fila.duracionMinutos,
          fila.descripcion,
          fila.activo,
          fila.fechaVencimiento,
          fila.horaRegistro,
          fila.fechaHoraRegistro,
          fila.imagen ? Buffer.from(fila.imagen) : null,
          fila.imagenMimeType,
        ),
    );
  }

  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM servicios_casino WHERE id = ?")
      .get(Number(id));

    if (!fila) return null;

    return new Servicio(
      fila.id,
      fila.codigo,
      fila.nombre,
      fila.categoria_id,
      fila.capacidadMax,
      fila.precio,
      fila.duracionMinutos,
      fila.descripcion,
      fila.activo,
      fila.fechaVencimiento,
      fila.horaRegistro,
      fila.fechaHoraRegistro,
      fila.imagen ? Buffer.from(fila.imagen) : null,
      fila.imagenMimeType,
    );
  }

  async crear(ServiciosModel) {
    const resultado = this.db
      .prepare(
        `
        INSERT INTO servicios_casino (
          codigo, nombre, categoria_id, capacidadMax, precio, duracionMinutos, descripcion,
          activo, fechaVencimiento, horaRegistro, fechaHoraRegistro,
          imagen, imagenMimeType
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
        ServiciosModel.codigo,
        ServiciosModel.nombre,
        ServiciosModel.categoriaId,
        ServiciosModel.capacidadMax,
        ServiciosModel.precio,
        ServiciosModel.duracionMinutos,
        ServiciosModel.descripcion,
        Number(ServiciosModel.activo),
        ServiciosModel.fechaVencimiento,
        ServiciosModel.horaRegistro,
        ServiciosModel.fechaHoraRegistro,
        ServiciosModel.imagen,
        ServiciosModel.imagenMimeType,
      );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }
}

