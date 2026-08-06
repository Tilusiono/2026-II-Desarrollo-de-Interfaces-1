import { db } from '../../database/db.js';

export const clienteRepository = {
    async getAll() {
        return await db.all('SELECT * FROM clientes');
    },

    async getById(id) {
        return await db.get('SELECT * FROM clientes WHERE id = ?', id);
    },

    async create(cliente) {
        const result = await db.run(`
            INSERT INTO clientes (nombre, correo, telefono, direccion, tipo_cliente)
            VALUES (?, ?, ?, ?, ?)
        `, [
            cliente.nombre,
            cliente.correo,
            cliente.telefono || null,
            cliente.direccion || null,
            cliente.tipo_cliente || 'Unitario'
        ]);
        return await this.getById(result.lastID);
    },

    async update(id, cliente) {
        await db.run(`
            UPDATE clientes SET
                nombre = ?,
                correo = ?,
                telefono = ?,
                direccion = ?,
                tipo_cliente = ?
            WHERE id = ?
        `, [
            cliente.nombre,
            cliente.correo,
            cliente.telefono || null,
            cliente.direccion || null,
            cliente.tipo_cliente || 'Unitario',
            id
        ]);
        return await this.getById(id);
    },

    async delete(id) {
        return await db.run('DELETE FROM clientes WHERE id = ?', id);
    }
};