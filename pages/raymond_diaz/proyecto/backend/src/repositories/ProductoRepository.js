import { getDatabase, withTransaction } from "../config/database.js";
import { Producto } from "../models/Producto.js";

const SELECT_PRODUCTO = `
  SELECT p.id, p.codigo, p.nombre, p.marca, p.descripcion, p.precio, p.stock,
         p.categoria_id, c.nombre AS categoria, p.proveedor_id,
         pr.razon_social AS proveedor, p.activo, p.fecha_ingreso,
         p.creado_en, p.actualizado_en
    FROM productos p
    JOIN categorias c ON c.id = p.categoria_id
    LEFT JOIN proveedores pr ON pr.id = p.proveedor_id
   WHERE p.eliminado_en IS NULL`;

function mapRow(row) {
  if (!row) return null;
  return new Producto({
    id: Number(row.id), codigo: row.codigo, nombre: row.nombre, marca: row.marca,
    descripcion: row.descripcion, precio: Number(row.precio), stock: Number(row.stock),
    categoriaId: Number(row.categoria_id), categoria: row.categoria,
    proveedorId: row.proveedor_id === null ? null : Number(row.proveedor_id),
    proveedor: row.proveedor, activo: Boolean(row.activo), fechaIngreso: row.fecha_ingreso,
    creadoEn: row.creado_en, actualizadoEn: row.actualizado_en,
  });
}

export class ProductoRepository {
  constructor(database = getDatabase()) {
    this.database = database;
  }

  listar(filters = {}) {
    let sql = SELECT_PRODUCTO;
    const conditions = [];
    const params = [];

    if (filters.texto) {
      conditions.push("(p.nombre LIKE ? COLLATE NOCASE OR p.marca LIKE ? COLLATE NOCASE OR p.codigo LIKE ? COLLATE NOCASE)");
      const text = `%${filters.texto}%`;
      params.push(text, text, text);
    }
    if (filters.categoriaId) {
      conditions.push("p.categoria_id = ?");
      params.push(filters.categoriaId);
    }
    if (filters.activo !== null && filters.activo !== undefined) {
      conditions.push("p.activo = ?");
      params.push(filters.activo ? 1 : 0);
    }
    if (filters.precioMin !== null && filters.precioMin !== undefined) {
      conditions.push("p.precio >= ?");
      params.push(filters.precioMin);
    }
    if (filters.precioMax !== null && filters.precioMax !== undefined) {
      conditions.push("p.precio <= ?");
      params.push(filters.precioMax);
    }
    if (filters.stockMin !== null && filters.stockMin !== undefined) {
      conditions.push("p.stock >= ?");
      params.push(filters.stockMin);
    }

    if (conditions.length) sql += ` AND ${conditions.join(" AND ")}`;
    sql += " ORDER BY p.nombre COLLATE NOCASE ASC";
    return this.database.prepare(sql).all(...params).map(mapRow);
  }

  obtenerPorId(id) {
    return mapRow(this.database.prepare(`${SELECT_PRODUCTO} AND p.id = ?`).get(id));
  }

  obtenerPorCodigo(codigo) {
    return mapRow(this.database.prepare(`${SELECT_PRODUCTO} AND p.codigo = ? COLLATE NOCASE`).get(codigo));
  }

  crear(dto) {
    return withTransaction((db) => {
      const result = db.prepare(`
        INSERT INTO productos
          (codigo, nombre, marca, descripcion, precio, stock, categoria_id, proveedor_id, activo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        dto.codigo, dto.nombre, dto.marca, dto.descripcion ?? null, dto.precio, dto.stock,
        dto.categoriaId, dto.proveedorId ?? null, dto.activo ? 1 : 0,
      );
      const id = Number(result.lastInsertRowid);
      if (dto.stock > 0) {
        db.prepare(`
          INSERT INTO movimientos_inventario
            (producto_id, tipo, cantidad, stock_anterior, stock_nuevo, motivo)
          VALUES (?, 'entrada', ?, 0, ?, 'Registro inicial del producto')
        `).run(id, dto.stock, dto.stock);
      }
      return this.obtenerPorId(id);
    });
  }

  reemplazar(id, dto) {
    const anterior = this.obtenerPorId(id);
    if (!anterior) return null;
    return withTransaction((db) => {
      db.prepare(`
        UPDATE productos
           SET codigo = ?, nombre = ?, marca = ?, descripcion = ?, precio = ?, stock = ?,
               categoria_id = ?, proveedor_id = ?, activo = ?, actualizado_en = CURRENT_TIMESTAMP
         WHERE id = ? AND eliminado_en IS NULL
      `).run(
        dto.codigo, dto.nombre, dto.marca, dto.descripcion ?? null, dto.precio, dto.stock,
        dto.categoriaId, dto.proveedorId ?? null, dto.activo ? 1 : 0, id,
      );
      this.#registrarCambioStock(db, id, anterior.stock, dto.stock, "Reemplazo completo mediante PUT");
      return this.obtenerPorId(id);
    });
  }

  actualizar(id, dto) {
    const anterior = this.obtenerPorId(id);
    if (!anterior) return null;
    const fieldMap = {
      codigo: "codigo", nombre: "nombre", marca: "marca", descripcion: "descripcion",
      precio: "precio", stock: "stock", categoriaId: "categoria_id",
      proveedorId: "proveedor_id", activo: "activo",
    };
    const entries = Object.entries(dto).filter(([key]) => fieldMap[key]);
    const assignments = entries.map(([key]) => `${fieldMap[key]} = ?`);
    const values = entries.map(([key, value]) => key === "activo" ? (value ? 1 : 0) : value);

    return withTransaction((db) => {
      db.prepare(`
        UPDATE productos SET ${assignments.join(", ")}, actualizado_en = CURRENT_TIMESTAMP
         WHERE id = ? AND eliminado_en IS NULL
      `).run(...values, id);
      if (Object.hasOwn(dto, "stock")) {
        this.#registrarCambioStock(db, id, anterior.stock, dto.stock, "Ajuste parcial mediante PATCH");
      }
      return this.obtenerPorId(id);
    });
  }

  eliminar(id) {
    const producto = this.obtenerPorId(id);
    if (!producto) return null;
    this.database.prepare(`
      UPDATE productos
         SET activo = 0, eliminado_en = CURRENT_TIMESTAMP, actualizado_en = CURRENT_TIMESTAMP
       WHERE id = ? AND eliminado_en IS NULL
    `).run(id);
    return producto;
  }

  datosParaEstadisticas() {
    return this.database.prepare(`
      SELECT precio, stock, activo FROM productos WHERE eliminado_en IS NULL
    `).all().map((row) => ({ precio: Number(row.precio), stock: Number(row.stock), activo: Boolean(row.activo) }));
  }

  #registrarCambioStock(db, id, anterior, nuevo, motivo) {
    if (anterior === nuevo) return;
    const tipo = nuevo > anterior ? "entrada" : "salida";
    db.prepare(`
      INSERT INTO movimientos_inventario
        (producto_id, tipo, cantidad, stock_anterior, stock_nuevo, motivo)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, tipo, Math.abs(nuevo - anterior), anterior, nuevo, motivo);
  }
}
