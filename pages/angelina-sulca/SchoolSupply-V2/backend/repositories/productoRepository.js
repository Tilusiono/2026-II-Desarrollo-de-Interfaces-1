// ============================================
// REPOSITORY: Producto (CommonJS)
// ============================================

const { getDB } = require('../database/sqliteDB');

const productoRepository = {
    async getAll(filters = {}) {
        const db = getDB();
        let query = 'SELECT * FROM productos WHERE 1=1';
        const params = [];

        if (filters.activo !== undefined) {
            query += ' AND activo = ?';
            params.push(filters.activo);
        }
        if (filters.en_oferta !== undefined) {
            query += ' AND en_oferta = ?';
            params.push(filters.en_oferta);
        }
        if (filters.categoria) {
            query += ' AND categoria = ?';
            params.push(filters.categoria);
        }
        if (filters.termino) {
            query += ' AND (nombre LIKE ? OR marca LIKE ?)';
            params.push(`%${filters.termino}%`, `%${filters.termino}%`);
        }
        if (filters.precio_min !== undefined) {
            query += ' AND precio_unitario >= ?';
            params.push(filters.precio_min);
        }
        if (filters.precio_max !== undefined) {
            query += ' AND precio_unitario <= ?';
            params.push(filters.precio_max);
        }

        query += ' ORDER BY id DESC';
        return db.prepare(query).all(params);
    },

    async getById(id) {
        const db = getDB();
        return db.prepare('SELECT * FROM productos WHERE id = ?').get(id);
    },

    async getOfertas() {
        const db = getDB();
        return db.prepare('SELECT * FROM productos WHERE en_oferta = 1 AND activo = 1').all();
    },

    async search(termino) {
        const db = getDB();
        return db.prepare(
            `SELECT * FROM productos 
             WHERE (nombre LIKE ? OR marca LIKE ?) AND activo = 1`
        ).all(`%${termino}%`, `%${termino}%`);
    },

    async create(producto) {
        const db = getDB();
        const { nombre, marca, color, calidad, precio_unitario, precio_docena, stock, categoria, descripcion, en_oferta } = producto;

        const stmt = db.prepare(`
            INSERT INTO productos (nombre, marca, color, calidad, precio_unitario, precio_docena, stock, categoria, descripcion, en_oferta)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const info = stmt.run(
            nombre, 
            marca, 
            color || null, 
            calidad || null, 
            precio_unitario, 
            precio_docena || null, 
            stock || 0, 
            categoria || null, 
            descripcion || null, 
            en_oferta || 0
        );

        return await this.getById(info.lastInsertRowid);
    },

    async update(id, producto) {
        const db = getDB();
        const { nombre, marca, color, calidad, precio_unitario, precio_docena, stock, activo, categoria, descripcion, en_oferta } = producto;

        const stmt = db.prepare(`
            UPDATE productos 
            SET nombre = ?, marca = ?, color = ?, calidad = ?, 
                precio_unitario = ?, precio_docena = ?, stock = ?, 
                activo = ?, categoria = ?, descripcion = ?, en_oferta = ?
            WHERE id = ?
        `);

        stmt.run(
            nombre, 
            marca, 
            color || null, 
            calidad || null, 
            precio_unitario, 
            precio_docena || null, 
            stock || 0, 
            activo !== undefined ? activo : 1, 
            categoria || null, 
            descripcion || null, 
            en_oferta || 0, 
            id
        );

        return await this.getById(id);
    },

    async delete(id) {
        const db = getDB();
        db.prepare('UPDATE productos SET activo = 0 WHERE id = ?').run(id);
        return true;
    },

    async deletePermanent(id) {
        const db = getDB();
        db.prepare('DELETE FROM productos WHERE id = ?').run(id);
        return true;
    },

    async updateStock(id, cantidad) {
        const db = getDB();
        const producto = await this.getById(id);
        if (!producto || producto.stock < cantidad) return false;
        
        db.prepare('UPDATE productos SET stock = stock - ? WHERE id = ?').run(cantidad, id);
        return true;
    }
};

module.exports = { productoRepository };