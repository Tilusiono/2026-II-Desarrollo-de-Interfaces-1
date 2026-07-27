import db from '../../database/db.js';

export const productoRepository = {
    // Obtener todos los productos activos
    getAll() {
        const stmt = db.prepare('SELECT * FROM productos WHERE activo = 1');
        return stmt.all();
    },

    // Obtener todos los productos (incluyendo inactivos)
    getAllIncludingInactive() {
        const stmt = db.prepare('SELECT * FROM productos');
        return stmt.all();
    },

    // Obtener productos en oferta
    getOfertas() {
        const stmt = db.prepare('SELECT * FROM productos WHERE en_oferta = 1 AND activo = 1');
        return stmt.all();
    },

    // Obtener producto por ID
    getById(id) {
        const stmt = db.prepare('SELECT * FROM productos WHERE id = ?');
        return stmt.get(id);
    },

    // Buscar productos por nombre o marca
    search(termino) {
        const stmt = db.prepare(`
            SELECT * FROM productos 
            WHERE (nombre LIKE ? OR marca LIKE ?) AND activo = 1
        `);
        const likeTerm = `%${termino}%`;
        return stmt.all(likeTerm, likeTerm);
    },

    // Crear producto
    create(producto) {
        const stmt = db.prepare(`
            INSERT INTO productos (
                nombre, marca, color, calidad, precio_unitario,
                precio_docena, stock, categoria, descripcion, en_oferta
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const info = stmt.run(
            producto.nombre,
            producto.marca,
            producto.color || null,
            producto.calidad || null,
            producto.precio_unitario,
            producto.precio_docena || null,
            producto.stock || 0,
            producto.categoria || null,
            producto.descripcion || null,
            producto.en_oferta ? 1 : 0
        );
        return this.getById(info.lastInsertRowid);
    },

    // Actualizar producto
    update(id, producto) {
        const stmt = db.prepare(`
            UPDATE productos SET
                nombre = ?,
                marca = ?,
                color = ?,
                calidad = ?,
                precio_unitario = ?,
                precio_docena = ?,
                stock = ?,
                categoria = ?,
                descripcion = ?,
                en_oferta = ?
            WHERE id = ?
        `);
        stmt.run(
            producto.nombre,
            producto.marca,
            producto.color || null,
            producto.calidad || null,
            producto.precio_unitario,
            producto.precio_docena || null,
            producto.stock || 0,
            producto.categoria || null,
            producto.descripcion || null,
            producto.en_oferta ? 1 : 0,
            id
        );
        return this.getById(id);
    },

    // Actualizar stock
    updateStock(id, cantidad) {
        const stmt = db.prepare(`
            UPDATE productos SET stock = stock - ? WHERE id = ? AND stock >= ?
        `);
        const result = stmt.run(cantidad, id, cantidad);
        return result.changes > 0;
    },

    // Eliminar producto (borrado lógico)
    delete(id) {
        const stmt = db.prepare('UPDATE productos SET activo = 0 WHERE id = ?');
        return stmt.run(id);
    },

    // Eliminar producto físicamente (solo para administración)
    deletePermanent(id) {
        const stmt = db.prepare('DELETE FROM productos WHERE id = ?');
        return stmt.run(id);
    }
};