// ============================================
// SERVICE: Producto (CommonJS)
// ============================================

const { productoRepository } = require('../repositories/productoRepository');
const { ProductoResponseDTO } = require('../dtos/productoDTO');

class ProductoService {
    constructor() {
        this.repository = productoRepository;
    }

    async getAll(filters = {}) {
        const productos = await this.repository.getAll(filters);
        return productos.map(p => new ProductoResponseDTO(p));
    }

    async getById(id) {
        const producto = await this.repository.getById(id);
        if (!producto) return null;
        return new ProductoResponseDTO(producto);
    }

    async search(termino) {
        const productos = await this.repository.search(termino);
        return productos.map(p => new ProductoResponseDTO(p));
    }

    async getOfertas() {
        const productos = await this.repository.getOfertas();
        return productos.map(p => new ProductoResponseDTO(p));
    }

    async create(productoData) {
        const producto = await this.repository.create(productoData);
        return new ProductoResponseDTO(producto);
    }

    async update(id, productoData) {
        const producto = await this.repository.update(id, productoData);
        if (!producto) return null;
        return new ProductoResponseDTO(producto);
    }

    async delete(id) {
        return await this.repository.delete(id);
    }

    async updateStock(id, cantidad) {
        return await this.repository.updateStock(id, cantidad);
    }
}

module.exports = { ProductoService };