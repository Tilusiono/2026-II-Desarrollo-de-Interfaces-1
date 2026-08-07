// ============================================
// SERVICE: Sede
// ============================================

import { sedeRepository } from '../repositories/sedeRepository.js';
import { SedeResponseDTO } from '../dtos/sedeDTO.js';

export class SedeService {
    constructor() {
        this.repository = sedeRepository;
    }

    async getAll(filters = {}) {
        const sedes = await this.repository.getAll();
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
        // Verificar que el código no exista
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