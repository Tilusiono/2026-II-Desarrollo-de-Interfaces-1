import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Servicio from "../models/Servicio.js";

const require = createRequire(import.meta.url);

export class ServicioRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
            CREATE TABLE IF NOT EXISTS servicios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo VARCHAR(20) NOT NULL UNIQUE,
            nombre TEXT NOT NULL,
            categoria CHAR(3) NOT NULL,
            precio DECIMAL(10, 2) NOT NULL,
            descripcion TEXT,
            activo BOOLEAN NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
            horaRegistro TIME NOT NULL,
            fechaHoraRegistro DATETIME NOT NULL,
            imagen BLOB,
            imagenMimeType VARCHAR(100)
        );
      )
    `);
  }
  async listar() {
    const filas = this.db.prepare("SELECT * FROM servicios ORDER BY id").all();

    return filas.map(
      (fila) =>
        new Servicio(
          fila.id,
          fila.codigo,
          fila.nombre,
          fila.categoria,
          fila.stock,
          fila.precio,
          fila.descripcion,
          fila.activo,
          fila.horaRegistro,
          fila.fechaHoraRegistro,
          fila.imagen ? Buffer.from(fila.imagen) : null,
          fila.imagenMimeType,
        ),
    );
  }

  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM productos WHERE id = ?")
      .get(Number(id));

    if (!fila) return null;

    return new Producto(
      fila.id,
      fila.codigo,
      fila.nombre,
      fila.categoria,
      fila.precio,
      fila.descripcion,
      fila.activo,
      fila.peso,
      fila.activo,
      fila.horaRegistro,
      fila.fechaVencimiento,
      fila.fechaHoraRegistro,
      fila.imagen ? Buffer.from(fila.imagen) : null,
      fila.imagenMimeType,
    );
  }

  async crear(servicio) {
    const resultado = this.db
      .prepare(
        `
        INSERT INTO productos (
          codigo, nombre, categoria, stock, precio, peso, descripcion,
          activo, fechaVencimiento, horaRegistro, fechaHoraRegistro,
          imagen, imagenMimeType
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
        servicio.codigo,
        servicio.nombre,
        servicio.categoria,
        servicio.stock,
        servicio.precio,
        servicio.peso,
        servicio.descripcion,
        Number(servicio.activo),
        servicio.fechaVencimiento,
        servicio.horaRegistro,
        servicio.fechaHoraRegistro,
        servicio.imagen,
        servicio.imagenMimeType,
      );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }
}

