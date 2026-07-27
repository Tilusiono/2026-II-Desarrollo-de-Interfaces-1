import db from '../../database/db.js';

export const sedeRepository = {
    // Obtener todas las sedes activas
    getAll() {
        const stmt = db.prepare('SELECT * FROM sedes WHERE activo = 1');
        return stmt.all();
    },

    // Obtener todas las sedes (incluyendo inactivas)
    getAllIncludingInactive() {
        const stmt = db.prepare('SELECT * FROM sedes');
        return stmt.all();
    },

    // Obtener sede por ID
    getById(id) {
        const stmt = db.prepare('SELECT * FROM sedes WHERE id = ?');
        return stmt.get(id);
    },

    // Obtener sede por código
    getByCodigo(codigo) {
        const stmt = db.prepare('SELECT * FROM sedes WHERE codigo = ?');
        return stmt.get(codigo);
    },

    // Buscar sedes por nombre o distrito
    search(termino) {
        const stmt = db.prepare(`
            SELECT * FROM sedes 
            WHERE (nombre LIKE ? OR distrito LIKE ? OR direccion LIKE ?) AND activo = 1
        `);
        const likeTerm = `%${termino}%`;
        return stmt.all(likeTerm, likeTerm, likeTerm);
    },

    // Crear sede
    create(sede) {
        const stmt = db.prepare(`
            INSERT INTO sedes (
                codigo, nombre, direccion, distrito, telefono, 
                encargado, capacidad, horario_apertura, horario_cierre
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const info = stmt.run(
            sede.codigo,
            sede.nombre,
            sede.direccion,
            sede.distrito || null,
            sede.telefono || null,
            sede.encargado || null,
            sede.capacidad || 0,
            sede.horario_apertura || null,
            sede.horario_cierre || null
        );
        return this.getById(info.lastInsertRowid);
    },

    // Actualizar sede
    update(id, sede) {
        const stmt = db.prepare(`
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
        `);
        stmt.run(
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
        );
        return this.getById(id);
    },

    // Eliminar sede (borrado lógico)
    delete(id) {
        const stmt = db.prepare('UPDATE sedes SET activo = 0 WHERE id = ?');
        return stmt.run(id);
    },

    // Eliminar sede físicamente (solo para administración)
    deletePermanent(id) {
        const stmt = db.prepare('DELETE FROM sedes WHERE id = ?');
        return stmt.run(id);
    },

    // Obtener empleados de una sede
    getEmpleados(sedeId) {
        const stmt = db.prepare('SELECT * FROM empleados WHERE sede_id = ? AND activo = 1');
        return stmt.all(sedeId);
    }
};