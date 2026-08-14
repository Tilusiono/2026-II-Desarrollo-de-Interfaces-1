import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Categoria from "../models/Categoria.js";

const require = createRequire(import.meta.url);

export class CategoriaRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS categorias (
        id CHAR(3) PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        descripcion TEXT,
        activo BOOLEAN NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
        horaRegistro TIME NOT NULL,
        fechaHoraRegistro DATETIME NOT NULL
      );
    `);
  }
    async listar() {
    const filas = this.db.prepare("SELECT * FROM categorias ORDER BY id").all();

    return filas.map(
      (fila) =>
        new Categoria(
          fila.id,
          fila.nombre,
          fila.descripcion,
          fila.activo,
          fila.horaRegistro,
          fila.fechaHoraRegistro,
        ),
    );
  }

  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM categorias WHERE id = ?")
      .get(id);

    if (!fila) return null;

    return new Categoria(
      fila.id,
      fila.nombre,
      fila.descripcion,
      fila.activo,
      fila.horaRegistro,
      fila.fechaHoraRegistro,
    );
  }

  async crear(CategoriaModel) {
    this.db
      .prepare(
        `
        INSERT INTO categorias (
          id, nombre, descripcion, activo, horaRegistro, fechaHoraRegistro
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
            CategoriaModel.id ?? CategoriaModel.codigo, // <-- AQUí ESTÁ EL TRUCO
            CategoriaModel.nombre,
            CategoriaModel.descripcion,
            Number(CategoriaModel.activo),
            CategoriaModel.horaRegistro,
            CategoriaModel.fechaHoraRegistro,
        );
      }
    
      async reemplazar(id, categoriaModel) {
        const stmt = this.db.prepare(`
            UPDATE categorias
            SET nombre = ?,
                descripcion = ?,
                activo = ?,
                horaRegistro = ?,
                fechaHoraRegistro = ?
            WHERE id = ?
        `);

        const resultado = stmt.run(
            String(categoriaModel.nombre),
            String(categoriaModel.descripcion || ''),
            Number(categoriaModel.activo),
            String(categoriaModel.horaRegistro),
            String(categoriaModel.fechaHoraRegistro),
            String(id) // El ID de categorías es TEXT (ej. 'CAT-001')
        );

        return resultado.changes ? await this.buscarPorId(id) : null;
    }

    async eliminar(id) {
    const categoriaModel = await this.buscarPorId(id);
    if (!categoriaModel) return null;

    this.db.prepare("DELETE FROM categorias WHERE id = ?").run(id);
    return categoriaModel;
  }
  }

        