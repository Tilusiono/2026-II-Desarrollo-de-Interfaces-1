// ============================================
// REPOSITORY: Cliente (CommonJS)
// ============================================

const { getDB } = require('../database/sqliteDB');

const clienteRepository = {
    async getAll() {
        const db = getDB();
        return db.prepare('SELECT * FROM clientes ORDER BY id DESC').all();
    },

    async getById(id) {
        const db = getDB();
        return db.prepare('SELECT * FROM clientes WHERE id = ?').get(id);
    },

    async search(termino) {
        const db = getDB();
        return db.prepare(
            `SELECT * FROM clientes 
             WHERE nombre LIKE ? OR correo LIKE ?`
        ).all(`%${termino}%`, `%${termino}%`);
    },

    async create(cliente) {
        const db = getDB();
        const { nombre, correo, telefono, direccion, tipo_cliente } = cliente;

        const stmt = db.prepare(`
            INSERT INTO clientes (nombre, correo, telefono, direccion, tipo_cliente)
            VALUES (?, ?, ?, ?, ?)
        `);

        const info = stmt.run(
            nombre, 
            correo || null, 
            telefono || null, 
            direccion || null, 
            tipo_cliente || 'Unitario'
        );

        return await this.getById(info.lastInsertRowid);
    },

    async update(id, cliente) {
        const db = getDB();
        const { nombre, correo, telefono, direccion, tipo_cliente } = cliente;

        const stmt = db.prepare(`
            UPDATE clientes 
            SET nombre = ?, correo = ?, telefono = ?, direccion = ?, tipo_cliente = ?
            WHERE id = ?
        `);

        stmt.run(
            nombre, 
            correo || null, 
            telefono || null, 
            direccion || null, 
            tipo_cliente || 'Unitario', 
            id
        );

        return await this.getById(id);
    },

    async delete(id) {
        const db = getDB();
        db.prepare('DELETE FROM clientes WHERE id = ?').run(id);
        return true;
    },

    async getVentas(clienteId) {
        const db = getDB();
        return db.prepare('SELECT * FROM ventas WHERE cliente_id = ?').all(clienteId);
    }
};

module.exports = { clienteRepository };