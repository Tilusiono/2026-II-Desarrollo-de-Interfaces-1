import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import TarjetaGrafica from "../models/TarjetaGrafica.js";
import { objetoContieneTexto } from "../utils/texto.js";

const require = createRequire(import.meta.url);

export class TarjetaGraficaRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS tarjetas_graficas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo VARCHAR(20) NOT NULL UNIQUE,
        modelo TEXT NOT NULL,
        fabricante CHAR(3) NOT NULL,
        memoriaGb INTEGER NOT NULL DEFAULT 0,
        precio DECIMAL(10, 2) NOT NULL,
        frecuenciaMhz REAL,
        descripcion TEXT,
        registro BOOLEAN NOT NULL DEFAULT 1 CHECK (registro IN (0, 1)),
        fechaLanzamiento DATE,
        horaRegistro TIME NOT NULL,
        fechaHoraRegistro DATETIME NOT NULL,
        imagen BLOB,
        imagenMimeType VARCHAR(100)
      )
    `);
  }

  async listar() {
    const filas = this.db
      .prepare("SELECT * FROM tarjetas_graficas ORDER BY id")
      .all();

    return filas.map(
      (fila) =>
        new TarjetaGrafica(
          fila.id,
          fila.codigo,
          fila.modelo,
          fila.fabricante,
          fila.memoriaGb,
          fila.precio,
          fila.frecuenciaMhz,
          fila.descripcion,
          fila.registro,
          fila.fechaLanzamiento,
          fila.horaRegistro,
          fila.fechaHoraRegistro,
          fila.imagen ? Buffer.from(fila.imagen) : null,
          fila.imagenMimeType,
        ),
    );
  }

  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM tarjetas_graficas WHERE id = ?")
      .get(Number(id));

    if (!fila) return null;

    return new TarjetaGrafica(
      fila.id,
      fila.codigo,
      fila.modelo,
      fila.fabricante,
      fila.memoriaGb,
      fila.precio,
      fila.frecuenciaMhz,
      fila.descripcion,
      fila.registro,
      fila.fechaLanzamiento,
      fila.horaRegistro,
      fila.fechaHoraRegistro,
      fila.imagen ? Buffer.from(fila.imagen) : null,
      fila.imagenMimeType,
    );
  }

  async crear(tarjetaGraficaModel) {
    const resultado = this.db
      .prepare(
        `
        INSERT INTO tarjetas_graficas (
          codigo, modelo, fabricante, memoriaGb, precio, frecuenciaMhz,
          descripcion, registro, fechaLanzamiento, horaRegistro,
          fechaHoraRegistro, imagen, imagenMimeType
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
        tarjetaGraficaModel.codigo,
        tarjetaGraficaModel.modelo,
        tarjetaGraficaModel.fabricante,
        tarjetaGraficaModel.memoriaGb,
        tarjetaGraficaModel.precio,
        tarjetaGraficaModel.frecuenciaMhz,
        tarjetaGraficaModel.descripcion,
        Number(tarjetaGraficaModel.registro),
        tarjetaGraficaModel.fechaLanzamiento,
        tarjetaGraficaModel.horaRegistro,
        tarjetaGraficaModel.fechaHoraRegistro,
        tarjetaGraficaModel.imagen,
        tarjetaGraficaModel.imagenMimeType,
      );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }

  async reemplazar(id, tarjetaGraficaModel) {
    const resultado = this.db
      .prepare(
        `
        UPDATE tarjetas_graficas
        SET codigo = ?,
            modelo = ?,
            fabricante = ?,
            memoriaGb = ?,
            precio = ?,
            frecuenciaMhz = ?,
            descripcion = ?,
            registro = ?,
            fechaLanzamiento = ?,
            horaRegistro = ?,
            fechaHoraRegistro = ?,
            imagen = ?,
            imagenMimeType = ?
        WHERE id = ?
      `,
      )
      .run(
        tarjetaGraficaModel.codigo,
        tarjetaGraficaModel.modelo,
        tarjetaGraficaModel.fabricante,
        tarjetaGraficaModel.memoriaGb,
        tarjetaGraficaModel.precio,
        tarjetaGraficaModel.frecuenciaMhz,
        tarjetaGraficaModel.descripcion,
        Number(tarjetaGraficaModel.registro),
        tarjetaGraficaModel.fechaLanzamiento,
        tarjetaGraficaModel.horaRegistro,
        tarjetaGraficaModel.fechaHoraRegistro,
        tarjetaGraficaModel.imagen,
        tarjetaGraficaModel.imagenMimeType,
        Number(id),
      );

    return resultado.changes ? this.buscarPorId(id) : null;
  }

  async query(tarjetaGraficaConsultaDto) {
    const tarjetasGraficas = await this.listar();
    const texto = tarjetaGraficaConsultaDto.texto ?? "";
    const fabricante = tarjetaGraficaConsultaDto.fabricante ?? "";
    const registro = tarjetaGraficaConsultaDto.registro ?? "";
    const precioMin = tarjetaGraficaConsultaDto.precioMin ?? "";
    const precioMax = tarjetaGraficaConsultaDto.precioMax ?? "";

    return tarjetasGraficas.filter((tarjetaGraficaModel) => {
      const camposBuscables = {
        id: tarjetaGraficaModel.id,
        codigo: tarjetaGraficaModel.codigo,
        modelo: tarjetaGraficaModel.modelo,
        fabricante: tarjetaGraficaModel.fabricante,
        descripcion: tarjetaGraficaModel.descripcion,
      };

      return (
        objetoContieneTexto(camposBuscables, texto) &&
        (!fabricante || tarjetaGraficaModel.fabricante === fabricante) &&
        (registro === "" ||
          String(tarjetaGraficaModel.registro) === String(registro)) &&
        (precioMin === "" || tarjetaGraficaModel.precio >= Number(precioMin)) &&
        (precioMax === "" || tarjetaGraficaModel.precio <= Number(precioMax))
      );
    });
  }

  async eliminar(id) {
    const tarjetaGraficaModel = await this.buscarPorId(id);
    if (!tarjetaGraficaModel) return null;

    this.db.prepare("DELETE FROM tarjetas_graficas WHERE id = ?").run(Number(id));
    return tarjetaGraficaModel;
  }

  async vaciar() {
    this.db.exec(
      "DELETE FROM tarjetas_graficas; DELETE FROM sqlite_sequence WHERE name = 'tarjetas_graficas';",
    );
  }
}
