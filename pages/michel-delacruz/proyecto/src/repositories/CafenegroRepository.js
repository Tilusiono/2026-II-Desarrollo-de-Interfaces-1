import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Cafenegro from "../models/Cafenegro.js";

const require = createRequire(import.meta.url);

export class CafenegrosRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");

    this.db = new DatabaseSync(archivo);

    this.db.exec("PRAGMA foreign_keys = ON");

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS Cafenegro (
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
    `);
  }

  async listar() {
    const filas = this.db
      .prepare("SELECT * FROM Cafenegro ORDER BY id")
      .all();

    return filas.map(
      (fila) =>
        new Cafenegro(
          fila.id,
          fila.codigo,
          fila.nombre,
          fila.categoria,
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
      .prepare("SELECT * FROM Cafenegro WHERE id = ?")
      .get(Number(id));

    if (!fila) return null;

    return new Cafenegro(
      fila.id,
      fila.codigo,
      fila.nombre,
      fila.categoria,
      fila.precio,
      fila.descripcion,
      fila.activo,
      fila.horaRegistro,
      fila.fechaHoraRegistro,
      fila.imagen ? Buffer.from(fila.imagen) : null,
      fila.imagenMimeType,
    );
  }

  async crear(Cafenegro) {
    const resultado = this.db
      .prepare(
        `
        INSERT INTO Cafenegro (
          codigo,
          nombre,
          categoria,
          precio,
          descripcion,
          activo,
          horaRegistro,
          fechaHoraRegistro,
          imagen,
          imagenMimeType
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
      )
      .run(
        Cafenegro.codigo,
        Cafenegro.nombre,
        Cafenegro.categoria,
        Cafenegro.precio,
        Cafenegro.descripcion,
        Number(Cafenegro.activo),
        Cafenegro.horaRegistro,
        Cafenegro.fechaHoraRegistro,
        Cafenegro.imagen,
        Cafenegro.imagenMimeType,
      );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }
   // DELETE
     async eliminar(id) {
    const cafenegroModel = await this.buscarPorId(id);
    if (!cafenegroModel) return null;

    this.db.prepare("DELETE FROM Cafenegro WHERE id = ?").run(Number(id));
    return cafenegroModel;
  }

}