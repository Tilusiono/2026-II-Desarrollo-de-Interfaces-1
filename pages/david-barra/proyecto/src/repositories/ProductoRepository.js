import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Producto from "../models/Producto.js";
import { objetoContieneTexto } from "../utils/texto.js";

const require = createRequire(import.meta.url);

export class ProductoRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo VARCHAR(20) NOT NULL UNIQUE,
        nombre TEXT NOT NULL,
        categoria CHAR(3) NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0,
        precio DECIMAL(10, 2) NOT NULL,
        peso REAL,
        descripcion TEXT,
        activo BOOLEAN NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
        fechaVencimiento DATE,
        horaRegistro TIME NOT NULL,
        fechaHoraRegistro DATETIME NOT NULL,
        imagen BLOB,
        imagenMimeType VARCHAR(100)
      )
    `);
  }
  //GET all productos
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
//GET productos by ID
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
//POST productos
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

//PUT
  async reemplazar(id, productoModel) {
    const resultado = this.db
      .prepare(
        `
        UPDATE productos
        SET codigo = ?,
            nombre = ?,
            categoria = ?,
            stock = ?,
            precio = ?,
            peso = ?,
            descripcion = ?,
            activo = ?,
            fechaVencimiento = ?,
            horaRegistro = ?,
            fechaHoraRegistro = ?,
            imagen = ?,
            imagenMimeType = ?
        WHERE id = ?
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
        Number(id),
      );

    return resultado.changes ? this.buscarPorId(id) : null;
  }

//BUSCAR SEARCH
  async query(productoConsultaDto) {
    const productos = await this.listar();
    const texto = productoConsultaDto.texto ?? "";
    const categoria = productoConsultaDto.categoria ?? "";
    const activo = productoConsultaDto.activo ?? "";
    const precioMin = productoConsultaDto.precioMin ?? "";
    const precioMax = productoConsultaDto.precioMax ?? "";

    return productos.filter((productoModel) => {
      const camposBuscables = {
        id: productoModel.id,
        codigo: productoModel.codigo,
        nombre: productoModel.nombre,
        categoria: productoModel.categoria,
        descripcion: productoModel.descripcion,
      };

      return (
        objetoContieneTexto(camposBuscables, texto) &&
        (!categoria || productoModel.categoria === categoria) &&
        (activo === "" || String(productoModel.activo) === String(activo)) &&
        (precioMin === "" || productoModel.precio >= Number(precioMin)) &&
        (precioMax === "" || productoModel.precio <= Number(precioMax))
      );
    });
  }

}




