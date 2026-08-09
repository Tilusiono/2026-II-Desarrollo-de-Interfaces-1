import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Empleado from "../models/Empleado.js";

const require = createRequire(import.meta.url);

export class EmpleadoRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
    CREATE TABLE IF NOT EXISTS empleado (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        apellido_paterno TEXT NOT NULL,
        dni INTEGER UNIQUE,
        telefono TEXT,
        salario NUMERIC(8,2),
        direccion TEXT,
        hora_ingreso TIME,
        hora_salida TIME,
        disponible BOOLEAN NOT NULL DEFAULT 1 CHECK (disponible IN (0, 1)),
        fecha_ingreso DATETIME,
        fecha_nacimiento DATE
        )
    `);
  } 

  // GET ALL
  async listar() {
    const filas = this.db.prepare("SELECT * FROM empleado ORDER BY id").all();

    return filas.map(
      (fila) =>
        new Empleado(
          fila.id,
          fila.nombre,
          fila.apellido_paterno,
          fila.dni,
          fila.telefono,
          fila.salario,
          fila.direccion,
          fila.hora_ingreso,
          fila.hora_salida,
          fila.disponible,
          fila.fecha_ingreso,
          fila.fecha_nacimiento,
        ),
    );
  }

  // GET POR ID
  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM empleado WHERE id = ?")
      .get(Number(id));

    if (!fila) return null;

    return new Empleado(
        fila.id,
        fila.nombre,
        fila.apellido_paterno,
        fila.dni,
        fila.telefono,
        fila.salario,
        fila.direccion,
        fila.hora_ingreso,
        fila.hora_salida,
        fila.disponible,
        fila.fecha_ingreso,
        fila.fecha_nacimiento,
    );
  }

  // POST
  async crear(empleado) {
    const resultado = this.db
      .prepare(
        `
        INSERT INTO empleado (
          nombre, apellido_paterno, dni, telefono,
          salario, direccion, hora_ingreso, hora_salida,
          disponible, fecha_ingreso, fecha_nacimiento
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
        empleado.nombre,
        empleado.apellidoPaterno,
        empleado.dni,
        empleado.telefono,
        empleado.salario,
        empleado.direccion,
        empleado.horaIngreso,
        empleado.horaSalida,
        Number(empleado.disponible),
        empleado.fechaIngreso,
        empleado.fechaNacimiento
      );

      


    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }

  async modificar(identificador, empleado) {
    const resultado = this.db
      .prepare(
        `
        UPDATE empleado
        SET nombre = ?,
            apellido_paterno = ?,
            dni = ?,
            telefono = ?,
            salario = ?,
            dirccion = ?,
            hora_ingreso = ?,
            hora_salida = ?,
            disponible = ?,
            fecha_ingreso = ?,
            fecha_nacimiento = ?,
        WHERE id = ?
      `,
      )
      .run(
        empleado.nombre,
        empleado.apellido_paterno,
        empleado.dni,
        empleado.telefono,
        empleado.salario,
        empleado.direccion,
        empleado.horaIngreso,
        empleado.horaSalida,
        Number(empleado.disponible),
        empleado.fechaIngreso,
        empleado.fechaNacimiento,
        Number(identificador),
      );

    return resultado.changes ? this.buscarPorId(identificador) : null;
  }

}


  



