import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Servicio from "../models/Servicio.js";
import { objetoContieneTexto } from "../utils/texto.js";

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
        nombre VARCHAR(100) NOT NULL,
        tipoServicio VARCHAR(50) NOT NULL,
        precio DECIMAL(10, 2) NOT NULL,
        duracionMinutos INTEGER,
        fechaInicio DATE,
        descripcion TEXT,
        activo BOOLEAN NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
        horaRegistro TIME NOT NULL,
        fechaHoraRegistro DATETIME NOT NULL,
        imagen BLOB,
        imagenMimeType VARCHAR(100)
        );
    `);
  }


    //GET ALL
   async listar() {
    const filas = this.db.prepare("SELECT * FROM servicios ORDER BY id").all();

    return filas.map(
      (fila) =>
        new Servicio(
          fila.id,
          fila.codigo,
          fila.nombre,
          fila.tipoServicio,
          fila.precio,
          fila.duracionMinutos,
          fila.fechaInicio,
          fila.descripcion,
          fila.activo,
          fila.horaRegistro,
          fila.fechaHoraRegistro,
          fila.imagen ? Buffer.from(fila.imagen) : null,
          fila.imagenMimeType,
        ),
    );
  }

  //GET BY ID
  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM servicios WHERE id = ?")
      .get(Number(id));

    if (!fila) return null;

    return new Servicio(
      fila.id,
      fila.codigo,
      fila.nombre,
      fila.tipoServicio,
      fila.precio,
      fila.duracionMinutos,
      fila.fechaInicio,
      fila.descripcion,
      fila.activo,
      fila.horaRegistro,
      fila.fechaHoraRegistro,
      fila.imagen ? Buffer.from(fila.imagen) : null,
      fila.imagenMimeType,
    );
  }
  
  //POST
  async crear(x) {
    const resultado = this.db
      .prepare(
        `
        INSERT INTO servicios (
          codigo, nombre, tipoServicio, precio, 
          duracionMinutos, fechaInicio, descripcion,activo,
          horaRegistro, fechaHoraRegistro,imagen, imagenMimeType
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
        x.codigo,
        x.nombre,
        x.tipoServicio,
        x.precio,
        x.duracionMinutos,
        x.fechaInicio,
        x.descripcion,
        Number(x.activo),
        x.horaRegistro,
        x.fechaHoraRegistro,
        x.imagen,
        x.imagenMimeType,
      );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }

   //PUT
  async modificarRepositorio(identificador,servicio) {
    const resultado = this.db
      .prepare(
        `
        UPDATE servicios
        SET codigo = ?,
            nombre = ?,
            tipoServicio = ?,
            precio = ?,
            duracionMinutos = ?,
            fechaInicio = ?,
            descripcion = ?,
            activo = ?,
            horaRegistro = ?,
            fechaHoraRegistro = ?,
            imagen = ?,
            imagenMimeType = ?
        WHERE id = ?
      `,
      )
      .run(
        servicio.codigo,
        servicio.nombre,
        servicio.tipoServicio,
        servicio.precio,
        servicio.duracionMinutos,
        servicio.fechaInicio,
        servicio.descripcion,
        Number(servicio.activo),
        servicio.horaRegistro,
        servicio.fechaHoraRegistro,
        servicio.imagen,
        servicio.imagenMimeType,
        Number(identificador),
      );

    return resultado.changes ? this.buscarPorId(identificador) : null;
  }

  //SEARCH
  async query(dtoConsulta) {
    const servicios = await this.listar();
    const texto = dtoConsulta.texto ?? "";
    const tipoServicio = dtoConsulta.tipoServicio ?? "";
    const activo = dtoConsulta.activo ?? "";
    const precioMin = dtoConsulta.precioMin ?? "";
    const precioMax = dtoConsulta.precioMax ?? "";
    const duracionMin = dtoConsulta.duracionMin ?? "";
    const duracionMax = dtoConsulta.duracionMax ?? "";

    return servicios.filter((servicioModel) => {
      const camposBuscables = {
        id: servicioModel.id,
        codigo: servicioModel.codigo,
        nombre: servicioModel.nombre,
        tipoServicio: servicioModel.tipoServicio,
        descripcion: servicioModel.descripcion,
      };

      return (
        objetoContieneTexto(camposBuscables, texto) &&
        (!tipoServicio || servicioModel.tipoServicio === tipoServicio) &&
        (activo === "" || String(servicioModel.activo) === String(activo)) &&
        (precioMin === "" || servicioModel.precio >= Number(precioMin)) &&
        (precioMax === "" || servicioModel.precio <= Number(precioMax)) &&
        (duracionMin === "" || servicioModel.duracionMinutos >= Number(duracionMin)) &&
        (duracionMax === "" || servicioModel.duracionMinutos <= Number(duracionMax))  
      );
    });
  }



}


