import { db } from '../database/jsonDB.js';

export const clienteRepository = {
    async getAll() {
        return db.getClientes();
    },

    async getById(id) {
        return db.getClienteById(id);
    },

    async search(termino) {
        const term = termino.toLowerCase();
        return db.getClientes().filter(c =>
            c.nombre.toLowerCase().includes(term) ||
            (c.correo && c.correo.toLowerCase().includes(term))
        );
    },

    async create(cliente) {
        return db.createCliente(cliente);
    },

    async update(id, cliente) {
        return db.updateCliente(id, cliente);
    },

    async delete(id) {
        return db.deleteCliente(id);
    },

    async getVentas(clienteId) {
        // Si no tienes ventas en JSON, devuelves array vacío
        return [];
    }
};