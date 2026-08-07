import { db } from '../../database/db.js';

export const productoRepository = {
    async getAll() {
        return await db.all('SELECT * FROM productos WHERE activo = 1');
    },

    async getById(id) {
        return await db.get('SELECT * FROM productos WHERE id = ?', id);
    },

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

    async delete(id) {
        return await db.run('UPDATE productos SET activo = 0 WHERE id = ?', id);
    }
};