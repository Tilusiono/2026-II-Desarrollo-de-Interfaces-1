import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Servicio from "../models/Servicios.js";

const require = createRequire(import.meta.url);
const { DatabaseSync } = require("node:sqlite");

export class ServiciosRepository {
    constructor(archivo = sqlitePath) {
        this.db = new DatabaseSync(archivo);
        this.db.exec("PRAGMA foreign_keys = ON;");
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS categorias (
                id TEXT PRIMARY KEY,
                nombre TEXT NOT NULL,
                descripcion TEXT,
                activo BOOLEAN NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
                horaRegistro TIME NOT NULL,
                fechaHoraRegistro DATETIME NOT NULL
            );

            CREATE TABLE IF NOT EXISTS servicios_casino (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                codigo VARCHAR(20) NOT NULL UNIQUE,
                nombre TEXT NOT NULL,
                categoria_id TEXT NOT NULL,
                capacidadMax INTEGER NOT NULL DEFAULT 0,
                precio DECIMAL(10, 2) NOT NULL,
                duracionMinutos REAL,
                descripcion TEXT,
                activo BOOLEAN NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
                fechaVencimiento DATE,
                horaRegistro TIME NOT NULL,
                fechaHoraRegistro DATETIME NOT NULL,
                imagen BLOB,
                imagenMimeType VARCHAR(100),
                FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON UPDATE CASCADE ON DELETE RESTRICT
            );
        `);
    }

    async listar() {
        const filas = this.db.prepare("SELECT * FROM servicios_casino ORDER BY id").all();
        return filas.map(fila => new Servicio(
            fila.id, fila.codigo, fila.nombre, fila.categoria_id, fila.capacidadMax,
            fila.precio, fila.duracionMinutos, fila.descripcion, fila.activo,
            fila.fechaVencimiento, fila.horaRegistro, fila.fechaHoraRegistro,
            fila.imagen ? Buffer.from(fila.imagen) : null, fila.imagenMimeType
        ));
    }

    async buscarPorId(id) {
        const fila = this.db.prepare("SELECT * FROM servicios_casino WHERE id = ?").get(id);
        return fila ? new Servicio(
            fila.id, fila.codigo, fila.nombre, fila.categoria_id, fila.capacidadMax,
            fila.precio, fila.duracionMinutos, fila.descripcion, fila.activo,
            fila.fechaVencimiento, fila.horaRegistro, fila.fechaHoraRegistro,
            fila.imagen ? Buffer.from(fila.imagen) : null, fila.imagenMimeType
        ) : null;
    }

    async crear(ServicioModel) {
        // Obtenemos el valor usando el getter de la clase (o la propiedad directa si viene suelta)
        const categoriaId = typeof ServicioModel.categoriaId === 'function' 
            ? ServicioModel.categoriaId 
            : (ServicioModel.categoriaId || ServicioModel.categoria_id);

        const stmt = this.db.prepare(`
            INSERT INTO servicios_casino (
                codigo, nombre, categoria_id, capacidadMax, precio, 
                duracionMinutos, descripcion, activo, fechaVencimiento, horaRegistro, fechaHoraRegistro
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const resultado = stmt.run(
            String(ServicioModel.codigo),
            String(ServicioModel.nombre),
            String(categoriaId),
            Number(ServicioModel.capacidadMax),
            Number(ServicioModel.precio),
            Number(ServicioModel.duracionMinutos),
            String(ServicioModel.descripcion),
            Number(ServicioModel.activo),
            String(ServicioModel.fechaVencimiento),
            String(ServicioModel.horaRegistro),
            String(ServicioModel.fechaHoraRegistro)
        );
    }
    async reemplazar(id, servicioModel) {
        // Rescatamos el ID de la categoría manejando posibles getters o nombres de campos
        const categoriaId = servicioModel.categoriaId || servicioModel.categoria_id;

        const stmt = this.db.prepare(`
            UPDATE servicios_casino
            SET codigo = ?,
                nombre = ?,
                categoria_id = ?,
                capacidadMax = ?,
                precio = ?,
                duracionMinutos = ?,
                descripcion = ?,
                activo = ?,
                fechaVencimiento = ?,
                horaRegistro = ?,
                fechaHoraRegistro = ?,
                imagen = ?,
                imagenMimeType = ?
            WHERE id = ?
        `);

        const resultado = stmt.run(
            String(servicioModel.codigo),
            String(servicioModel.nombre),
            String(categoriaId),
            Number(servicioModel.capacidadMax),
            Number(servicioModel.precio),
            Number(servicioModel.duracionMinutos),
            String(servicioModel.descripcion || ''),
            Number(servicioModel.activo),
            String(servicioModel.fechaVencimiento),
            String(servicioModel.horaRegistro),
            String(servicioModel.fechaHoraRegistro),
            servicioModel.imagen ? Buffer.from(servicioModel.imagen) : null,
            servicioModel.imagenMimeType || null,
            Number(id) // El ID de servicios_casino es INTEGER auto-incremental
        );

        return resultado.changes ? await this.buscarPorId(id) : null;
    }
}
