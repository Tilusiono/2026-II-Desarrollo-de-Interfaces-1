import db from '../../database/db.js';

export const clienteRepository = {
    // Obtener todos los clientes
    getAll() {
        const stmt = db.prepare('SELECT * FROM clientes');
        return stmt.all();
    },

    // Obtener cliente por ID
    getById(id) {
        const stmt = db.prepare('SELECT * FROM clientes WHERE id = ?');
        return stmt.get(id);
    },

    // Buscar cliente por nombre o correo
    search(termino) {
        const stmt = db.prepare(`
            SELECT * FROM clientes 
            WHERE nombre LIKE ? OR correo LIKE ?
        `);
        const likeTerm = `%${termino}%`;
        return stmt.all(likeTerm, likeTerm);
    },

    // Crear cliente
    create(cliente) {
        const stmt = db.prepare(`
            INSERT INTO clientes (nombre, correo, telefono, direccion, tipo_cliente)
            VALUES (?, ?, ?, ?, ?)
        `);
        const info = stmt.run(
            cliente.nombre,
            cliente.correo,
            cliente.telefono || null,
            cliente.direccion || null,
            cliente.tipo_cliente || 'Unitario'
        );
        return this.getById(info.lastInsertRowid);
    },

    // Actualizar cliente
    update(id, cliente) {
        const stmt = db.prepare(`
            UPDATE clientes SET
                nombre = ?,
                correo = ?,
                telefono = ?,
                direccion = ?,
                tipo_cliente = ?
            WHERE id = ?
        `);
        stmt.run(
            cliente.nombre,
            cliente.correo,
            cliente.telefono || null,
            cliente.direccion || null,
            cliente.tipo_cliente || 'Unitario',
            id
        );
        return this.getById(id);
    },

    // Eliminar cliente
    delete(id) {
        const stmt = db.prepare('DELETE FROM clientes WHERE id = ?');
        return stmt.run(id);
    },

    // Obtener ventas de un cliente
    getVentas(clienteId) {
        const stmt = db.prepare('SELECT * FROM ventas WHERE cliente_id = ?');
        return stmt.all(clienteId);
    }
};