// ============================================
// REPOSITORY: Sede (CommonJS)
// ============================================

const { getDB } = require('../database/sqliteDB');

const sedeRepository = {
    async getAll(filters = {}) {
        const db = getDB();
        let query = 'SELECT * FROM sedes WHERE 1=1';
        const params = [];

        if (filters.activo !== undefined) {
            query += ' AND activo = ?';
            params.push(filters.activo);
        }
        if (filters.distrito) {
            query += ' AND distrito = ?';
            params.push(filters.distrito);
        }
        if (filters.termino) {
            query += ' AND (nombre LIKE ? OR distrito LIKE ? OR direccion LIKE ?)';
            params.push(`%${filters.termino}%`, `%${filters.termino}%`, `%${filters.termino}%`);
        }

        query += ' ORDER BY id DESC';
        return db.prepare(query).all(params);
    },

    async getById(id) {
        const db = getDB();
        return db.prepare('SELECT * FROM sedes WHERE id = ?').get(id);
    },

    async getByCodigo(codigo) {
        const db = getDB();
        return db.prepare('SELECT * FROM sedes WHERE codigo = ?').get(codigo);
    },

    async search(termino) {
        const db = getDB();
        return db.prepare(
            `SELECT * FROM sedes 
             WHERE nombre LIKE ? OR distrito LIKE ? OR direccion LIKE ?`
        ).all(`%${termino}%`, `%${termino}%`, `%${termino}%`);
    },

    async create(sede) {
        const db = getDB();
        const { codigo, nombre, direccion, distrito, telefono, encargado, capacidad, horario_apertura, horario_cierre } = sede;

        const stmt = db.prepare(`
            INSERT INTO sedes (codigo, nombre, direccion, distrito, telefono, encargado, capacidad, horario_apertura, horario_cierre)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const info = stmt.run(
            codigo, 
            nombre, 
            direccion, 
            distrito || null, 
            telefono || null, 
            encargado || null, 
            capacidad || 0, 
            horario_apertura || null, 
            horario_cierre || null
        );

        return await this.getById(info.lastInsertRowid);
    },

    async update(id, sede) {
        const db = getDB();
        const { codigo, nombre, direccion, distrito, telefono, encargado, capacidad, horario_apertura, horario_cierre, activo } = sede;

        const stmt = db.prepare(`
            UPDATE sedes 
            SET codigo = ?, nombre = ?, direccion = ?, distrito = ?, 
                telefono = ?, encargado = ?, capacidad = ?, 
                horario_apertura = ?, horario_cierre = ?, activo = ?
            WHERE id = ?
        `);

        stmt.run(
            codigo, 
            nombre, 
            direccion, 
            distrito || null, 
            telefono || null, 
            encargado || null, 
            capacidad || 0, 
            horario_apertura || null, 
            horario_cierre || null, 
            activo !== undefined ? activo : 1, 
            id
        );

        return await this.getById(id);
    },

    async delete(id) {
        const db = getDB();
        db.prepare('UPDATE sedes SET activo = 0 WHERE id = ?').run(id);
        return true;
    },

    async deletePermanent(id) {
        const db = getDB();
        db.prepare('DELETE FROM sedes WHERE id = ?').run(id);
        return true;
    },

    async getEmpleados(sedeId) {
        return [];
    }
};

module.exports = { sedeRepository };