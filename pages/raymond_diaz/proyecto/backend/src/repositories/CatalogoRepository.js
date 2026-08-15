import { getDatabase } from "../config/database.js";

export class CatalogoRepository {
  constructor(database = getDatabase()) {
    this.database = database;
  }

  listarCategorias() {
    return this.database.prepare(`
      SELECT id, nombre, descripcion FROM categorias WHERE activo = 1 ORDER BY nombre COLLATE NOCASE
    `).all();
  }

  listarProveedores() {
    return this.database.prepare(`
      SELECT id, ruc, razon_social AS razonSocial, contacto
        FROM proveedores WHERE activo = 1 ORDER BY razon_social COLLATE NOCASE
    `).all();
  }
}
