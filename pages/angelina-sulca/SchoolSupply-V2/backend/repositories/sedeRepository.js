import { db } from '../database/jsonDB.js';

export const sedeRepository = {
    async getAll() {
        return db.getSedes().filter(s => s.activo === 1);
    },

    async getAllIncludingInactive() {
        return db.getSedes();
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