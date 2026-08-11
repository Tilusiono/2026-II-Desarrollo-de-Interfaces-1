import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Automoviles from "../models/Automoviles.js";

const require = createRequire(import.meta.url);

export class AutomovilesRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
        CREATE TABLE IF NOT EXISTS automoviles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    anio INTEGER NOT NULL,
    color VARCHAR(30),
    categoria VARCHAR(30) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    kilometraje INTEGER DEFAULT 0,
    descripcion TEXT,
    activo BOOLEAN NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
    horaRegistro TIME NOT NULL,
    fechaHoraRegistro DATETIME NOT NULL,
    imagen BLOB,
    imagenMimeType VARCHAR(100)
      )
    `);
  }

   //GET ALL
  async listar() {
    const filas = this.db.prepare("SELECT * FROM automoviles ORDER BY id").all();

    return filas.map(
      (fila) =>
        new Automoviles(
          fila.id,
          fila.codigo,
          fila.marca,
          fila.modelo,
          fila.anio,
          fila.color,
          fila.categoria,
          fila.precio,
          fila.kilometraje,
          fila.descripcion,
          fila.activo,
          fila.horaRegistro,
          fila.fechaHoraRegistro,
          fila.imagen,
          fila.imagenMimeType ? Buffer.from(fila.imagen) : null,
        ),
    );
  }

  //GET BY ID
  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM automoviles WHERE id = ?")
      .get(Number(id));

    if (!fila) return null;

    return new Automoviles(
      fila.id,
      fila.codigo,
      fila.marca,
      fila.modelo,
      fila.anio,
      fila.color,
      fila.categoria,
      fila.precio,
      fila.kilometraje,
      fila.descripcion,
      fila.activo,
      fila.horaRegistro,
      fila.fechaHoraRegistro,
      fila.imagen,
      fila.imagenMimeType ? Buffer.from(fila.imagen) : null,
    );
  }
  //POST
  async crear(automovilemodel) {
    const resultado = this.db
      .prepare(
        `
        INSERT INTO automoviles (
          codigo, marca, modelo, anio, color, 
          categoria, precio, kilometraje, descripcion,
          activo, horaRegistro, fechaHoraRegistro,
          imagen, imagenMimeType
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
      `,
      )
      .run(
        automovilemodel.codigo,
        automovilemodel.marca,
        automovilemodel.modelo,
        automovilemodel.anio,
        automovilemodel.color,
        automovilemodel.categoria,
        automovilemodel.precio,
        automovilemodel.kilometraje,
        automovilemodel.descripcion,
        Number(automovilemodel.activo),
        automovilemodel.horaRegistro,
        automovilemodel.fechaHoraRegistro,
        automovilemodel.imagen,
        automovilemodel.imagenMimeType,
      );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }

}
 
