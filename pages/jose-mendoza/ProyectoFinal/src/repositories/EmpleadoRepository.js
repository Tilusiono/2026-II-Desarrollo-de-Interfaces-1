import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import { Empleado } from "../models/Empleado.js";
import { objetoContieneTexto } from "../utils/texto.js";

const require = createRequire(import.meta.url);

export class EmpleadoRepository {

  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS empleado (
        id_empleado INTEGER PRIMARY KEY AUTOINCREMENT,
        dni CHAR(8) NOT NULL UNIQUE,
        nombres VARCHAR(100) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        telefono VARCHAR(15),
        correo VARCHAR(100),
        direccion VARCHAR(200),
        fecha_ingreso DATE,
        salario DECIMAL(10, 2),
        estado BOOLEAN NOT NULL DEFAULT 1 
        CHECK (estado IN (0, 1)),
        id_tipo_empleado INTEGER,
        id_cargo INTEGER,
        id_area INTEGER,
        id_sede INTEGER,
        FOREIGN KEY (id_tipo_empleado)
        REFERENCES tipo_empleado(id_tipo_empleado),
        FOREIGN KEY (id_cargo)
        REFERENCES cargo(id_cargo),
        FOREIGN KEY (id_area)
        REFERENCES area(id_area),
        FOREIGN KEY (id_sede)
        REFERENCES sede(id_sede)
      )
    `);
  }

  async listar() {
    const filas = this.db
        .prepare(`
            SELECT empleado.*, 
                   area.nombre AS nombre_area, 
                   tipo_empleado.nombre AS nombre_tipo_empleado,
                   cargo.nombre AS nombre_cargo
            FROM empleado 
            LEFT JOIN area ON empleado.id_area = area.id_area
            LEFT JOIN tipo_empleado ON empleado.id_tipo_empleado = tipo_empleado.id_tipo_empleado
            LEFT JOIN cargo ON empleado.id_cargo = cargo.id_cargo
            ORDER BY id_empleado
        `)
        .all();

    return filas.map((fila) => {
        const empleado = new Empleado(
            fila.id_empleado,
            fila.dni,
            fila.nombres,
            fila.apellidos,
            fila.telefono,
            fila.correo,
            fila.direccion,
            fila.fecha_ingreso,
            fila.salario,
            fila.estado,
            fila.id_tipo_empleado,
            fila.id_cargo,
            fila.id_area,
            fila.id_sede
        );
        empleado.nombreArea = fila.nombre_area || "Sin Área";
        empleado.nombreTipoEmpleado = fila.nombre_tipo_empleado || "Sin Tipo";
        empleado.nombreCargo = fila.nombre_cargo || "Sin Cargo";
        return empleado;
    });
  }


  async buscarPorId(id) {
    const fila = this.db
        .prepare(`
            SELECT empleado.*, 
                   area.nombre AS nombre_area, 
                   tipo_empleado.nombre AS nombre_tipo_empleado,
                   cargo.nombre AS nombre_cargo
                  FROM empleado 
                  LEFT JOIN area ON empleado.id_area = area.id_area
                  LEFT JOIN tipo_empleado ON empleado.id_tipo_empleado = tipo_empleado.id_tipo_empleado
                  LEFT JOIN cargo ON empleado.id_cargo = cargo.id_cargo
                  WHERE id_empleado = ?
              `)
            .get(Number(id));

    if (!fila) return null;

    const empleado = new Empleado(
        fila.id_empleado,
        fila.dni,
        fila.nombres,
        fila.apellidos,
        fila.telefono,
        fila.correo,
        fila.direccion,
        fila.fecha_ingreso,
        fila.salario,
        fila.estado,
        fila.id_tipo_empleado,
        fila.id_cargo,
        fila.id_area,
        fila.id_sede
    );
    empleado.nombreArea = fila.nombre_area || "Sin Área";
    empleado.nombreTipoEmpleado = fila.nombre_tipo_empleado || "Sin Tipo";
    empleado.nombreCargo = fila.nombre_cargo || "Sin Cargo";
    return empleado;
  }

  async crear(productoModel) {
    const resultado = this.db
        .prepare(
            `
            INSERT INTO empleado (
                dni,
                nombres,
                apellidos,
                telefono,
                correo,
                direccion,
                fecha_ingreso,
                salario,
                estado,
                id_tipo_empleado,
                id_cargo,
                id_area,
                id_sede
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `
        )
        .run(
            empleadoModel.getDni(),
            empleadoModel.getNombres(),
            empleadoModel.getApellidos(),
            empleadoModel.getTelefono(),
            empleadoModel.getCorreo(),
            empleadoModel.getDireccion(),
            empleadoModel.getFechaIngreso(),
            empleadoModel.getSalario(),
            empleadoModel.getEstado(),
            empleadoModel.getIdTipoEmpleado(),
            empleadoModel.getIdCargo(),
            empleadoModel.getIdArea(),
            empleadoModel.getIdSede()
        );

    return this.buscarPorId(
        Number(resultado.lastInsertRowid)
    );
  }
}