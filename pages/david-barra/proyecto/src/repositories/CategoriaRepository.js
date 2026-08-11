import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Categoria from "../models/Categoria.js";
import { objetoContieneTexto } from "../utils/texto.js";

const require = createRequire(import.meta.url);

export class CategoriaRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
        CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo VARCHAR(20) NOT NULL UNIQUE,
        nombre TEXT NOT NULL,
        tipo CHAR(3) NOT NULL,
        cantidadProductos INTEGER NOT NULL DEFAULT 0,
        presupuesto DECIMAL(10, 2) NOT NULL,
        pesoPromedio REAL,
        descripcion TEXT,
        activo BOOLEAN NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
        fechaLimite DATE,
        horaRegistro TIME NOT NULL,
        fechaHoraRegistro DATETIME NOT NULL,
        imagen BLOB,
        imagenMimeType VARCHAR(100)
        );
    `);
  }

  //GET all categorias
  async listar() {
    const filas = this.db.prepare("SELECT * FROM categorias ORDER BY id").all();

    return filas.map(
      (fila) =>
        new Categoria(
          fila.id,
          fila.codigo,
          fila.nombre,
          fila.tipo,
          fila.cantidadProductos,
          fila.presupuesto,
          fila.pesoPromedio,
          fila.descripcion,
          fila.activo,
          fila.fechaLimite,
          fila.horaRegistro,
          fila.fechaHoraRegistro,
          fila.imagen ? Buffer.from(fila.imagen) : null,
          fila.imagenMimeType,
        ),
    );
  }

  //GET categoria by ID
  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM categorias WHERE id = ?")
      .get(Number(id));

    if (!fila) return null;

    return new Categoria(
      fila.id,
      fila.codigo,
      fila.nombre,
      fila.tipo,
      fila.cantidadProductos,
      fila.presupuesto,
      fila.pesoPromedio,
      fila.descripcion,
      fila.activo,
      fila.fechaLimite,
      fila.horaRegistro,
      fila.fechaHoraRegistro,
      fila.imagen ? Buffer.from(fila.imagen) : null,
      fila.imagenMimeType,
    );
  }

  //POST categoria
  async crear(xd) {
    const resultado = this.db
      .prepare(
        `
        INSERT INTO categorias (
          codigo, nombre, tipo, cantidadProductos, presupuesto, pesoPromedio, descripcion,
          activo, fechaLimite, horaRegistro, fechaHoraRegistro,
          imagen, imagenMimeType
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
        xd.codigo,
        xd.nombre,
        xd.tipo,
        xd.cantidadProductos,
        xd.presupuesto,
        xd.pesoPromedio,
        xd.descripcion,
        Number(xd.activo),
        xd.fechaLimite,
        xd.horaRegistro,
        xd.fechaHoraRegistro,
        xd.imagen,
        xd.imagenMimeType,
      );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }

  //PUT
  async modificarRespositorio(identificador, categ) {
    const resultado = this.db
      .prepare(
        `
        UPDATE categorias
        SET codigo = ?,
            nombre = ?,
            tipo = ?,
            cantidadProductos = ?,
            presupuesto = ?,
            pesoPromedio = ?,
            descripcion = ?,
            activo = ?,
            fechaLimite = ?,
            horaRegistro = ?,
            fechaHoraRegistro = ?,
            imagen = ?,
            imagenMimeType = ?
        WHERE id = ?
      `,
      )
      .run(
        categ.codigo,
        categ.nombre,
        categ.tipo,
        categ.cantidadProductos,
        categ.presupuesto,
        categ.pesoPromedio,
        categ.descripcion,
        Number(categ.activo),
        categ.fechaLimite,
        categ.horaRegistro,
        categ.fechaHoraRegistro,
        categ.imagen,
        categ.imagenMimeType,
        Number(identificador),
      );

    return resultado.changes ? this.buscarPorId(Number(identificador)) : null;
  }

  //BUSCAR SEARCH (CATEGORÍAS)
  async query(categoriaConsultaDto) {
    const categorias = await this.listar();
    
    // Captura de texto global y filtros específicos
    const texto = categoriaConsultaDto.texto ?? "";
    const tipo = categoriaConsultaDto.tipo ?? "";
    const activo = categoriaConsultaDto.activo ?? "";
    
    // Manejo seguro de rangos numéricos vinculados al CategoriaConsultaDto
    const cantidadProductosMin = (categoriaConsultaDto.cantidadProductosMin !== undefined && categoriaConsultaDto.cantidadProductosMin !== "") ? categoriaConsultaDto.cantidadProductosMin : null;
    const cantidadProductosMax = (categoriaConsultaDto.cantidadProductosMax !== undefined && categoriaConsultaDto.cantidadProductosMax !== "") ? categoriaConsultaDto.cantidadProductosMax : null;
    
    const presupuestoMin = (categoriaConsultaDto.presupuestoMin !== undefined && categoriaConsultaDto.presupuestoMin !== "") ? categoriaConsultaDto.presupuestoMin : null;
    const presupuestoMax = (categoriaConsultaDto.presupuestoMax !== undefined && categoriaConsultaDto.presupuestoMax !== "") ? categoriaConsultaDto.presupuestoMax : null;
    
    const pesoPromedioMin = (categoriaConsultaDto.pesoPromedioMin !== undefined && categoriaConsultaDto.pesoPromedioMin !== "") ? categoriaConsultaDto.pesoPromedioMin : null;
    const pesoPromedioMax = (categoriaConsultaDto.pesoPromedioMax !== undefined && categoriaConsultaDto.pesoPromedioMax !== "") ? categoriaConsultaDto.pesoPromedioMax : null;

    return categorias.filter((categoriaModel) => {
      const camposBuscables = {
        id: categoriaModel.id,
        codigo: categoriaModel.codigo,
        nombre: categoriaModel.nombre,
        descripcion: categoriaModel.descripcion,
      };

      return (
        objetoContieneTexto(camposBuscables, texto) &&
        (!tipo || categoriaModel.tipo === tipo) &&
        (activo === "" || String(categoriaModel.activo) === String(activo)) &&
        (cantidadProductosMin === null || categoriaModel.cantidadProductos >= Number(cantidadProductosMin)) &&
        (cantidadProductosMax === null || categoriaModel.cantidadProductos <= Number(cantidadProductosMax)) &&
        (presupuestoMin === null || categoriaModel.presupuesto >= Number(presupuestoMin)) &&
        (presupuestoMax === null || categoriaModel.presupuesto <= Number(presupuestoMax)) &&
        (pesoPromedioMin === null || categoriaModel.pesoPromedio >= Number(pesoPromedioMin)) &&
        (pesoPromedioMax === null || categoriaModel.pesoPromedio <= Number(pesoPromedioMax))
      );
    });
  }
}
