import db from '../../database/db.js';

export const sedeRepository = {
    async getAll() {
        return await db.all('SELECT * FROM sedes WHERE activo = 1');
    },

    async getAllIncludingInactive() {
        return await db.all('SELECT * FROM sedes');
    },

    async getById(id) {
        return await db.get('SELECT * FROM sedes WHERE id = ?', id);
    },

    async getByCodigo(codigo) {
        return await db.get('SELECT * FROM sedes WHERE codigo = ?', codigo);
    },

    async search(termino) {
        const likeTerm = `%${termino}%`;
        return await db.all(
            `SELECT * FROM sedes 
             WHERE (nombre LIKE ? OR distrito LIKE ? OR direccion LIKE ?) AND activo = 1`,
            [likeTerm, likeTerm, likeTerm]
        );
    },

    async create(sede) {
        const result = await db.run(`
            INSERT INTO sedes (
                codigo, nombre, direccion, distrito, telefono, 
                encargado, capacidad, horario_apertura, horario_cierre
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            sede.codigo,
            sede.nombre,
            sede.direccion,
            sede.distrito || null,
            sede.telefono || null,
            sede.encargado || null,
            sede.capacidad || 0,
            sede.horario_apertura || null,
            sede.horario_cierre || null
        ]);
        return await this.getById(result.lastID);
    },

    async update(id, sede) {
        await db.run(`
            UPDATE sedes SET
                codigo = ?,
                nombre = ?,
                direccion = ?,
                distrito = ?,
                telefono = ?,
                encargado = ?,
                capacidad = ?,
                horario_apertura = ?,
                horario_cierre = ?,
                activo = ?
            WHERE id = ?
        `, [
            sede.codigo,
            sede.nombre,
            sede.direccion,
            sede.distrito || null,
            sede.telefono || null,
            sede.encargado || null,
            sede.capacidad || 0,
            sede.horario_apertura || null,
            sede.horario_cierre || null,
            sede.activo !== undefined ? (sede.activo ? 1 : 0) : 1,
            id
        ]);
        return await this.getById(id);
    },

    async delete(id) {
        return await db.run('UPDATE sedes SET activo = 0 WHERE id = ?', id);
    },

    async deletePermanent(id) {
        return await db.run('DELETE FROM sedes WHERE id = ?', id);
    },

    async getEmpleados(sedeId) {
        return await db.all('SELECT * FROM empleados WHERE sede_id = ? AND activo = 1', sedeId);
    }
};