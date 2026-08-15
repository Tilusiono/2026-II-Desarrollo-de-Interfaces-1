import { getDatabase } from "../config/database.js";
import { Usuario } from "../models/Usuario.js";

const SELECT_USUARIO = `
  SELECT id, documento, nombres, apellidos, correo, telefono, direccion, rol,
         activo, creado_en, actualizado_en
    FROM usuarios
   WHERE eliminado_en IS NULL`;

function mapRow(row) {
  if (!row) return null;
  return new Usuario({
    id: Number(row.id), documento: row.documento, nombres: row.nombres,
    apellidos: row.apellidos, correo: row.correo, telefono: row.telefono,
    direccion: row.direccion, rol: row.rol, activo: Boolean(row.activo),
    creadoEn: row.creado_en, actualizadoEn: row.actualizado_en,
  });
}

export class UsuarioRepository {
  constructor(database = getDatabase()) {
    this.database = database;
  }

  listar(filters = {}) {
    let sql = SELECT_USUARIO;
    const conditions = [];
    const params = [];
    if (filters.texto) {
      conditions.push("(nombres LIKE ? COLLATE NOCASE OR apellidos LIKE ? COLLATE NOCASE OR documento LIKE ? OR correo LIKE ? COLLATE NOCASE)");
      const text = `%${filters.texto}%`;
      params.push(text, text, text, text);
    }
    if (filters.rol) {
      conditions.push("rol = ?");
      params.push(filters.rol);
    }
    if (filters.activo !== null && filters.activo !== undefined) {
      conditions.push("activo = ?");
      params.push(filters.activo ? 1 : 0);
    }
    if (conditions.length) sql += ` AND ${conditions.join(" AND ")}`;
    sql += " ORDER BY apellidos COLLATE NOCASE, nombres COLLATE NOCASE";
    return this.database.prepare(sql).all(...params).map(mapRow);
  }

  obtenerPorId(id) {
    return mapRow(this.database.prepare(`${SELECT_USUARIO} AND id = ?`).get(id));
  }

  crear(dto) {
    const result = this.database.prepare(`
      INSERT INTO usuarios
        (documento, nombres, apellidos, correo, telefono, direccion, rol, activo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      dto.documento, dto.nombres, dto.apellidos, dto.correo, dto.telefono ?? null,
      dto.direccion ?? null, dto.rol, dto.activo ? 1 : 0,
    );
    return this.obtenerPorId(Number(result.lastInsertRowid));
  }

  reemplazar(id, dto) {
    if (!this.obtenerPorId(id)) return null;
    this.database.prepare(`
      UPDATE usuarios
         SET documento = ?, nombres = ?, apellidos = ?, correo = ?, telefono = ?,
             direccion = ?, rol = ?, activo = ?, actualizado_en = CURRENT_TIMESTAMP
       WHERE id = ? AND eliminado_en IS NULL
    `).run(
      dto.documento, dto.nombres, dto.apellidos, dto.correo, dto.telefono ?? null,
      dto.direccion ?? null, dto.rol, dto.activo ? 1 : 0, id,
    );
    return this.obtenerPorId(id);
  }

  actualizar(id, dto) {
    if (!this.obtenerPorId(id)) return null;
    const fieldMap = {
      documento: "documento", nombres: "nombres", apellidos: "apellidos", correo: "correo",
      telefono: "telefono", direccion: "direccion", rol: "rol", activo: "activo",
    };
    const entries = Object.entries(dto).filter(([key]) => fieldMap[key]);
    const assignments = entries.map(([key]) => `${fieldMap[key]} = ?`);
    const values = entries.map(([key, value]) => key === "activo" ? (value ? 1 : 0) : value);
    this.database.prepare(`
      UPDATE usuarios SET ${assignments.join(", ")}, actualizado_en = CURRENT_TIMESTAMP
       WHERE id = ? AND eliminado_en IS NULL
    `).run(...values, id);
    return this.obtenerPorId(id);
  }

  eliminar(id) {
    const usuario = this.obtenerPorId(id);
    if (!usuario) return null;
    this.database.prepare(`
      UPDATE usuarios
         SET activo = 0, eliminado_en = CURRENT_TIMESTAMP, actualizado_en = CURRENT_TIMESTAMP
       WHERE id = ? AND eliminado_en IS NULL
    `).run(id);
    return usuario;
  }
}
