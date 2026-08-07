// ============================================
// SERVICE: Cliente
// ============================================

import { clienteRepository } from '../repositories/clienteRepository.js';
import { ClienteResponseDTO } from '../dtos/clienteDTO.js';

export class ClienteService {
    constructor() {
        this.repository = clienteRepository;
    }

    async getAll() {
        const clientes = await this.repository.getAll();
        return clientes.map(c => new ClienteResponseDTO(c));
    }

    async getById(id) {
        const cliente = await this.repository.getById(id);
        if (!cliente) return null;
        return new ClienteResponseDTO(cliente);
    }

    async search(termino) {
        const clientes = await this.repository.search(termino);
        return clientes.map(c => new ClienteResponseDTO(c));
    }

    async create(clienteData) {
        const cliente = await this.repository.create(clienteData);
        return new ClienteResponseDTO(cliente);
    }

    async update(id, clienteData) {
        const cliente = await this.repository.update(id, clienteData);
        if (!cliente) return null;
        return new ClienteResponseDTO(cliente);
    }

    async delete(id) {
        return await this.repository.delete(id);
    }

    async getVentas(clienteId) {
        return await this.repository.getVentas(clienteId);
    }
}