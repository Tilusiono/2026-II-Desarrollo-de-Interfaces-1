import { db } from '../database/jsonDB.js';

export const sedeRepository = {
    async getAll(filters = {}) {
        let sedes = db.getSedes();
        if (filters.activo !== undefined) {
            sedes = sedes.filter(s => s.activo === filters.activo);
        }
        if (filters.distrito) {
            sedes = sedes.filter(s => s.distrito === filters.distrito);
        }
        if (filters.termino) {
            const term = filters.termino.toLowerCase();
            sedes = sedes.filter(s =>
                s.nombre.toLowerCase().includes(term) ||
                (s.distrito && s.distrito.toLowerCase().includes(term)) ||
                s.direccion.toLowerCase().includes(term)
            );
        }
        return sedes;
    },

    async getById(id) {
        return db.getSedeById(id);
    },

    async getByCodigo(codigo) {
        return db.getSedeByCodigo(codigo);
    },

    async search(termino) {
        const term = termino.toLowerCase();
        return db.getSedes().filter(s =>
            s.nombre.toLowerCase().includes(term) ||
            (s.distrito && s.distrito.toLowerCase().includes(term)) ||
            s.direccion.toLowerCase().includes(term)
        );
    },

    async create(sede) {
        return db.createSede(sede);
    },

    async update(id, sede) {
        return db.updateSede(id, sede);
    },

    async delete(id) {
        return db.deleteSede(id);
    },

    async deletePermanent(id) {
        return db.deleteSede(id);
    },

    async getEmpleados(sedeId) {
        // Si no tienes empleados en JSON, devuelves array vacío
        return [];
    }
};