// ============================================
// SERVICE: Sede (CommonJS)
// ============================================

const { sedeRepository } = require('../repositories/sedeRepository');
const { SedeResponseDTO } = require('../dtos/sedeDTO');

class SedeService {
    constructor() {
        this.repository = sedeRepository;
    }

    async getAll(filters = {}) {
        const sedes = await this.repository.getAll(filters);
        return sedes.map(s => new SedeResponseDTO(s));
    }

    async getById(id) {
        const sede = await this.repository.getById(id);
        if (!sede) return null;
        return new SedeResponseDTO(sede);
    }

    async getByCodigo(codigo) {
        const sede = await this.repository.getByCodigo(codigo);
        if (!sede) return null;
        return new SedeResponseDTO(sede);
    }

    async search(termino) {
        const sedes = await this.repository.search(termino);
        return sedes.map(s => new SedeResponseDTO(s));
    }

    async create(sedeData) {
        const existente = await this.repository.getByCodigo(sedeData.codigo);
        if (existente) {
            throw new Error('Ya existe una sede con ese código');
        }
        const sede = await this.repository.create(sedeData);
        return new SedeResponseDTO(sede);
    }

    async update(id, sedeData) {
        const sede = await this.repository.update(id, sedeData);
        if (!sede) return null;
        return new SedeResponseDTO(sede);
    }

    async delete(id) {
        return await this.repository.delete(id);
    }

    async getEmpleados(sedeId) {
        return await this.repository.getEmpleados(sedeId);
    }
}

module.exports = { SedeService };