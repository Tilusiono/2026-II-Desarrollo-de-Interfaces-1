import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Procesador from "../models/Procesador.js";

const require = createRequire(import.meta.url);

export class ProcesadorRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.configurarBase();
    this.crearEstructura();
  }

  configurarBase() {
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec("PRAGMA journal_mode = WAL");
    this.db.exec("PRAGMA busy_timeout = 5000");
    this.db.exec("PRAGMA synchronous = NORMAL");
  }

  crearEstructura() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS procesadores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo VARCHAR(20) NOT NULL UNIQUE,
        modelo TEXT NOT NULL,
        arquitectura CHAR(3) NOT NULL,
        nucleos INTEGER NOT NULL DEFAULT 0 CHECK (nucleos >= 0),
        precio DECIMAL(10, 2) NOT NULL CHECK (precio >= 0),
        frecuenciaGhz REAL CHECK (frecuenciaGhz IS NULL OR frecuenciaGhz >= 0),
        descripcion TEXT,
        registro BOOLEAN NOT NULL DEFAULT 1 CHECK (registro IN (0, 1)),
        fechaLanzamiento DATE,
        horaRegistro TIME NOT NULL,
        fechaHoraRegistro DATETIME NOT NULL,
        imagen BLOB,
        imagenMimeType VARCHAR(100)
      );

      CREATE TABLE IF NOT EXISTS auditoria_procesadores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        procesador_id INTEGER,
        codigo VARCHAR(20) NOT NULL,
        accion VARCHAR(12) NOT NULL CHECK (accion IN ('INSERT', 'UPDATE', 'DELETE')),
        fecha_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (procesador_id) REFERENCES procesadores(id) ON DELETE SET NULL
      );

      CREATE INDEX IF NOT EXISTS idx_procesadores_modelo
        ON procesadores(modelo);
      CREATE INDEX IF NOT EXISTS idx_procesadores_arquitectura
        ON procesadores(arquitectura);
      CREATE INDEX IF NOT EXISTS idx_procesadores_registro
        ON procesadores(registro);
      CREATE INDEX IF NOT EXISTS idx_procesadores_precio
        ON procesadores(precio);
      CREATE INDEX IF NOT EXISTS idx_auditoria_procesador
        ON auditoria_procesadores(procesador_id, fecha_hora);
    `);
  }

  convertirFila(fila) {
    if (!fila) return null;
    return new Procesador(
      fila.id,
      fila.codigo,
      fila.modelo,
      fila.arquitectura,
      fila.nucleos,
      fila.precio,
      fila.frecuenciaGhz,
      fila.descripcion,
      Boolean(fila.registro),
      fila.fechaLanzamiento,
      fila.horaRegistro,
      fila.fechaHoraRegistro,
      fila.imagen ? Buffer.from(fila.imagen) : null,
      fila.imagenMimeType,
    );
  }

  ejecutarTransaccion(operacion) {
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const resultado = operacion();
      this.db.exec("COMMIT");
      return resultado;
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
  }

  registrarAuditoria(procesadorId, codigo, accion) {
    this.db
      .prepare(
        `INSERT INTO auditoria_procesadores (procesador_id, codigo, accion)
         VALUES (?, ?, ?)`,
      )
      .run(procesadorId, codigo, accion);
  }

  async listar() {
    return this.db
      .prepare("SELECT * FROM procesadores ORDER BY id DESC")
      .all()
      .map((fila) => this.convertirFila(fila));
  }

  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM procesadores WHERE id = ?")
      .get(Number(id));
    return this.convertirFila(fila);
  }

  async buscarPorCodigo(codigo) {
    const fila = this.db
      .prepare("SELECT * FROM procesadores WHERE LOWER(codigo) = LOWER(?)")
      .get(String(codigo));
    return this.convertirFila(fila);
  }

  async crear(procesadorModel) {
    const id = this.ejecutarTransaccion(() => {
      const resultado = this.db
        .prepare(
          `INSERT INTO procesadores (
            codigo, modelo, arquitectura, nucleos, precio, frecuenciaGhz,
            descripcion, registro, fechaLanzamiento, horaRegistro,
            fechaHoraRegistro, imagen, imagenMimeType
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .run(
          procesadorModel.codigo,
          procesadorModel.modelo,
          procesadorModel.arquitectura,
          procesadorModel.nucleos,
          procesadorModel.precio,
          procesadorModel.frecuenciaGhz,
          procesadorModel.descripcion,
          Number(procesadorModel.registro),
          procesadorModel.fechaLanzamiento,
          procesadorModel.horaRegistro,
          procesadorModel.fechaHoraRegistro,
          procesadorModel.imagen,
          procesadorModel.imagenMimeType,
        );
      const nuevoId = Number(resultado.lastInsertRowid);
      this.registrarAuditoria(nuevoId, procesadorModel.codigo, "INSERT");
      return nuevoId;
    });

    return this.buscarPorId(id);
  }

  async reemplazar(id, procesadorModel) {
    const cambios = this.ejecutarTransaccion(() => {
      const resultado = this.db
        .prepare(
          `UPDATE procesadores
           SET codigo = ?, modelo = ?, arquitectura = ?, nucleos = ?, precio = ?,
               frecuenciaGhz = ?, descripcion = ?, registro = ?, fechaLanzamiento = ?,
               horaRegistro = ?, fechaHoraRegistro = ?, imagen = ?, imagenMimeType = ?
           WHERE id = ?`,
        )
        .run(
          procesadorModel.codigo,
          procesadorModel.modelo,
          procesadorModel.arquitectura,
          procesadorModel.nucleos,
          procesadorModel.precio,
          procesadorModel.frecuenciaGhz,
          procesadorModel.descripcion,
          Number(procesadorModel.registro),
          procesadorModel.fechaLanzamiento,
          procesadorModel.horaRegistro,
          procesadorModel.fechaHoraRegistro,
          procesadorModel.imagen,
          procesadorModel.imagenMimeType,
          Number(id),
        );
      if (resultado.changes) {
        this.registrarAuditoria(Number(id), procesadorModel.codigo, "UPDATE");
      }
      return resultado.changes;
    });

    return cambios ? this.buscarPorId(id) : null;
  }

  async query(procesadorConsultaDto) {
    const condiciones = [];
    const parametros = [];

    if (procesadorConsultaDto.texto) {
      condiciones.push(
        "(LOWER(codigo) LIKE LOWER(?) OR LOWER(modelo) LIKE LOWER(?) OR LOWER(COALESCE(descripcion, '')) LIKE LOWER(?))",
      );
      const patron = `%${procesadorConsultaDto.texto}%`;
      parametros.push(patron, patron, patron);
    }

    if (procesadorConsultaDto.arquitectura) {
      condiciones.push("arquitectura = ?");
      parametros.push(procesadorConsultaDto.arquitectura);
    }

    if (procesadorConsultaDto.registro !== "" && procesadorConsultaDto.registro !== undefined) {
      condiciones.push("registro = ?");
      parametros.push(String(procesadorConsultaDto.registro) === "true" ? 1 : 0);
    }

    if (procesadorConsultaDto.precioMin !== "" && procesadorConsultaDto.precioMin !== undefined) {
      condiciones.push("precio >= ?");
      parametros.push(Number(procesadorConsultaDto.precioMin));
    }

    if (procesadorConsultaDto.precioMax !== "" && procesadorConsultaDto.precioMax !== undefined) {
      condiciones.push("precio <= ?");
      parametros.push(Number(procesadorConsultaDto.precioMax));
    }

    const where = condiciones.length ? `WHERE ${condiciones.join(" AND ")}` : "";
    const filas = this.db
      .prepare(`SELECT * FROM procesadores ${where} ORDER BY id DESC`)
      .all(...parametros);
    return filas.map((fila) => this.convertirFila(fila));
  }

  async obtenerHistorial(id) {
    return this.db
      .prepare(
        `SELECT id, procesador_id AS procesadorId, codigo, accion, fecha_hora AS fechaHora
         FROM auditoria_procesadores
         WHERE procesador_id = ? OR codigo = COALESCE(
           (SELECT codigo FROM procesadores WHERE id = ?), codigo
         )
         ORDER BY id DESC`,
      )
      .all(Number(id), Number(id));
  }

  async eliminar(id) {
    const procesadorModel = await this.buscarPorId(id);
    if (!procesadorModel) return null;

    this.ejecutarTransaccion(() => {
      this.registrarAuditoria(Number(id), procesadorModel.codigo, "DELETE");
      this.db.prepare("DELETE FROM procesadores WHERE id = ?").run(Number(id));
    });
    return procesadorModel;
  }

  async vaciar() {
    this.db.exec(`
      DELETE FROM auditoria_procesadores;
      DELETE FROM procesadores;
      DELETE FROM sqlite_sequence WHERE name IN ('procesadores', 'auditoria_procesadores');
    `);
  }
}
