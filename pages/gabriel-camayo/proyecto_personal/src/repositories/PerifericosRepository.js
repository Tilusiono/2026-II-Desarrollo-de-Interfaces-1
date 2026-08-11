import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Perifericos from "../models/Perifericos.js";

const require = createRequire(import.meta.url);

export class PerifericosRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS perifericos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo VARCHAR(20) NOT NULL UNIQUE,
        tipo VARCHAR(50) NOT NULL, /* Ej: Mouse, Teclado, Monitor, Audífonos */
        marca VARCHAR(50) NOT NULL,
        modelo VARCHAR(100) NOT NULL,
        tipoConexion VARCHAR(30), /* Ej: Inalámbrico, USB, Bluetooth, HDMI */
        color VARCHAR(30),
        precio DECIMAL(10, 2) NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0,
        horaRegistro TIME NOT NULL,
        fechaHoraRegistro DATETIME NOT NULL
      )
    `);
  }



//GET ALL
  async listar() {
    const filas = this.db.prepare("SELECT * FROM perifericos ORDER BY id").all();

    return filas.map(
      (fila) =>
        new Perifericos(
          fila.id,
          fila.codigo,
          fila.tipo,
          fila.marca,
          fila.modelo,
          fila.tipoConexion,
          fila.color,
          fila.precio,
          fila.stock,
          fila.horaRegistro,
          fila.fechaHoraRegistro,
         
        ),
    );
  }

//GET BY ID
  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM perifericos WHERE id = ?")
      .get(Number(id));

    if (!fila) return null;

    return new Perifericos(
      fila.id,
      fila.codigo,
      fila.tipo,
      fila.marca,
      fila.modelo,
      fila.tipoConexion,
      fila.color,
      fila.precio,
      fila.stock,
      fila.horaRegistro,
      fila.fechaHoraRegistro,
    );
  }

//POST
  async crear(periferico) {
    const resultado = this.db
      .prepare(
        `
        INSERT INTO perifericos (
          codigo, tipo, marca, modelo, tipoConexion, color, precio,
          stock, horaResgistro, fechaHoraRegistro
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
        periferico.codigo,
        periferico.tipo,
        periferico.marca,
        periferico.modelo,
        periferico.tipoConexion,
        periferico.color,
        periferico.precio,
        periferico.stock,
        periferico.horaRegistro,
        periferico.fechaHoraRegistro,
        );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }
}