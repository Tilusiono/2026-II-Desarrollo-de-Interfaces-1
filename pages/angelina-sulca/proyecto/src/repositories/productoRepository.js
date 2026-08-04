import db from '../../database/db.js';

export const productoRepository = {
    // Obtener todos los productos activos
    async getAll() {
        return await db.all('SELECT * FROM productos WHERE activo = 1');
    },

    // Obtener producto por ID
    async getById(id) {
        return await db.get('SELECT * FROM productos WHERE id = ?', id);
    },

    // Obtener productos en oferta
    async getOfertas() {
        return await db.all('SELECT * FROM productos WHERE en_oferta = 1 AND activo = 1');
    },

    // Buscar productos por nombre o marca
    async search(termino) {
        const likeTerm = `%${termino}%`;
        return await db.all(
            `SELECT * FROM productos 
             WHERE (nombre LIKE ? OR marca LIKE ?) AND activo = 1`,
            [likeTerm, likeTerm]
        );
    },

    // Crear producto
    async create(producto) {
        const result = await db.run(`
            INSERT INTO productos (
                nombre, marca, color, calidad, precio_unitario,
                precio_docena, stock, categoria, descripcion, en_oferta
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
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
        ]);
        return await this.getById(result.lastID);
    },

    // Actualizar producto
    async update(id, producto) {
        await db.run(`
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
        `, [
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
        ]);
        return await this.getById(id);
    },

    // Actualizar stock
    async updateStock(id, cantidad) {
        const result = await db.run(
            'UPDATE productos SET stock = stock - ? WHERE id = ? AND stock >= ?',
            [cantidad, id, cantidad]
        );
        return result.changes > 0;
    },

    // Eliminar producto (borrado lógico)
    async delete(id) {
        return await db.run('UPDATE productos SET activo = 0 WHERE id = ?', id);
    },

    // Eliminar producto físicamente
    async deletePermanent(id) {
        return await db.run('DELETE FROM productos WHERE id = ?', id);
    }
};