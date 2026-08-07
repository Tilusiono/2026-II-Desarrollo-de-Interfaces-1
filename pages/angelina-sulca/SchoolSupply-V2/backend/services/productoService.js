// ============================================
// SERVICE: Producto
// ============================================

import { productoRepository } from '../repositories/productoRepository.js';
import { ProductoResponseDTO } from '../dtos/productoDTO.js';

export class ProductoService {
    constructor() {
        this.repository = productoRepository;
    }

    // Obtener todos los productos
    async getAll(filters = {}) {
        const productos = await this.repository.getAll(filters);
        return productos.map(p => new ProductoResponseDTO(p));
    }

    // Obtener producto por ID
    async getById(id) {
        const producto = await this.repository.getById(id);
        if (!producto) return null;
        return new ProductoResponseDTO(producto);
    }

    // Buscar productos
    async search(termino) {
        const productos = await this.repository.search(termino);
        return productos.map(p => new ProductoResponseDTO(p));
    }

    // Obtener productos en oferta
    async getOfertas() {
        const productos = await this.repository.getOfertas();
        return productos.map(p => new ProductoResponseDTO(p));
    }

    // Crear producto
    async create(productoData) {
        const producto = await this.repository.create(productoData);
        return new ProductoResponseDTO(producto);
    }

    // Actualizar producto
    async update(id, productoData) {
        const producto = await this.repository.update(id, productoData);
        if (!producto) return null;
        return new ProductoResponseDTO(producto);
    }

    // Eliminar producto
    async delete(id) {
        return await this.repository.delete(id);
    }

    // Actualizar stock
    async updateStock(id, cantidad) {
        return await this.repository.updateStock(id, cantidad);
    }
}