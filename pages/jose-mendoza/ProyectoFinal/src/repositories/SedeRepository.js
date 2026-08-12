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
    const filas = this.db.prepare("SELECT * FROM productos ORDER BY id").all();

    return filas.map(
      (fila) =>
        new Producto(
          fila.id,
          fila.codigo,
          fila.nombre,
          fila.categoria,
          fila.stock,
          fila.precio,
          fila.peso,
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
      .prepare("SELECT * FROM productos WHERE id = ?")
      .get(Number(id));

    if (!fila) return null;

    return new Producto(
      fila.id,
      fila.codigo,
      fila.nombre,
      fila.categoria,
      fila.stock,
      fila.precio,
      fila.peso,
      fila.descripcion,
      fila.activo,
      fila.fechaVencimiento,
      fila.horaRegistro,
      fila.fechaHoraRegistro,
      fila.imagen ? Buffer.from(fila.imagen) : null,
      fila.imagenMimeType,
    );
  }

  async crear(productoModel) {
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
        productoModel.codigo,
        productoModel.nombre,
        productoModel.categoria,
        productoModel.stock,
        productoModel.precio,
        productoModel.peso,
        productoModel.descripcion,
        Number(productoModel.activo),
        productoModel.fechaVencimiento,
        productoModel.horaRegistro,
        productoModel.fechaHoraRegistro,
        productoModel.imagen,
        productoModel.imagenMimeType,
      );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }
}