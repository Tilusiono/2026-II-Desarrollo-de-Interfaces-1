import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Area from "../models/Area.js";
import { objetoContieneTexto } from "../utils/texto.js";

const require = createRequire(import.meta.url);

export class AreaRepository {

  constructor(archivo = sqlitePath) {

    const { DatabaseSync } = require("node:sqlite");

    this.db = new DatabaseSync(archivo);

    this.db.exec("PRAGMA foreign_keys = ON");

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS area (
        id_area INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        capacidad INTEGER NOT NULL DEFAULT 0,
        id_sede INTEGER,
        id_jefe INTEGER,
        
        FOREIGN KEY (id_jefe)
        REFERENCES empleado(id_empleado),
        
        FOREIGN KEY (id_sede)
        REFERENCES sede(id_sede)
      )
    `);
  }

  //GET ALL 
  async listar() {

    const filas = this.db
        .prepare("SELECT * FROM area ORDER BY id_area").all();

    return filas.map(
        (fila) =>
            new Area(
                fila.id_area,
                fila.nombre,
                fila.descripcion,
                fila.capacidad,
                fila.id_sede,
                fila.id_jefe
            )
    );

}

//GET BY ID
async buscarPorId(id) {

    const fila = this.db
        .prepare("SELECT * FROM area WHERE id_area = ?")
        .get(Number(id));

    if (!fila) return null;

    return new Area(
        fila.id_area,
        fila.nombre,
        fila.descripcion,
        fila.capacidad,
        fila.id_sede,
        fila.id_jefe
    );

}

  //POST
  async crear(areaModel) {

    const resultado = this.db
        .prepare(
            `
            INSERT INTO area (
                nombre,
                descripcion,
                capacidad,
                id_sede,
                id_jefe
            )
            VALUES (?, ?, ?, ?, ?)
            `
        )
        .run(
            areaModel.nombre,
            areaModel.descripcion,
            areaModel.capacidad,
            areaModel.idSede,
            areaModel.idJefe
        );

    return this.buscarPorId(
        Number(resultado.lastInsertRowid)
    );

  }
  // PUT
  async reemplazar(id, areaModel) {
    const resultado = this.db
      .prepare(
        `
        UPDATE area
        SET nombre = ?,
            descripcion = ?,
            capacidad = ?,
            id_sede = ?,
            id_jefe = ?
        WHERE id_area = ?
      `
      )
      .run(
        areaModel.nombre,
        areaModel.descripcion,
        areaModel.capacidad,
        areaModel.idSede,
        areaModel.idJefe,
        Number(id)
      );

    return resultado.changes ? this.buscarPorId(id) : null;
  }

  // BUSCAR / SEARCH

  async query(areaConsultaDto) {
    const dto = areaConsultaDto ?? {};
    const areas = await this.listar();

    const texto = dto.texto ?? "";
    const capacidadMin = dto.capacidadMin ?? "";
    const capacidadMax = dto.capacidadMax ?? "";
    const idSede = dto.idSede ?? "";
    const idJefe = dto.idJefe ?? "";

    return areas.filter((areaModel) => {
      const camposBuscables = {
        idArea: areaModel.idArea,
        nombre: areaModel.nombre,
        descripcion: areaModel.descripcion,
        capacidad: areaModel.capacidad,
        idSede: areaModel.idSede,
        idJefe: areaModel.idJefe,
      };

      return (
        objetoContieneTexto(camposBuscables, texto) &&
        (capacidadMin === "" ||
          areaModel.capacidad >= Number(capacidadMin)) &&
        (capacidadMax === "" ||
          areaModel.capacidad <= Number(capacidadMax)) &&
        (idSede === "" ||
          String(areaModel.idSede) === String(idSede)) &&
        (idJefe === "" ||
          String(areaModel.idJefe) === String(idJefe))
      );
    });
  }

  // DELETE ELIMINAR

  async eliminar(identificador) {
    const areaModelo = await this.buscarPorId(identificador);
    if (!areaModelo) {
      return null;
    }

    this.db.prepare("DELETE FROM area WHERE id_area = ?").run(Number(identificador));
    return areaModelo;
  }

}