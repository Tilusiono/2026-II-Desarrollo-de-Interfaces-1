import { db } from '../database/jsonDB.js';

export const productoRepository = {
    async getAll(filters = {}) {
        let productos = db.getProductos();
        
        // Aplicar filtros
        if (filters.activo !== undefined) {
            productos = productos.filter(p => p.activo === filters.activo);
        }
        if (filters.en_oferta !== undefined) {
            productos = productos.filter(p => p.en_oferta === filters.en_oferta);
        }
        if (filters.categoria) {
            productos = productos.filter(p => p.categoria === filters.categoria);
        }
        if (filters.termino) {
            const term = filters.termino.toLowerCase();
            productos = productos.filter(p =>
                p.nombre.toLowerCase().includes(term) ||
                (p.marca && p.marca.toLowerCase().includes(term))
            );
        }
        if (filters.precio_min !== undefined) {
            productos = productos.filter(p => p.precio_unitario >= filters.precio_min);
        }
        if (filters.precio_max !== undefined) {
            productos = productos.filter(p => p.precio_unitario <= filters.precio_max);
        }
        
        return productos;
    },

    async getById(id) {
        return db.getProductoById(id);
    },

    async getOfertas() {
        return db.getProductos().filter(p => p.en_oferta === 1 && p.activo === 1);
    },

    async search(termino) {
        const term = termino.toLowerCase();
        return db.getProductos().filter(p =>
            p.nombre.toLowerCase().includes(term) ||
            (p.marca && p.marca.toLowerCase().includes(term))
        );
    },

    async create(producto) {
        return db.createProducto(producto);
    },

    async update(id, producto) {
        return db.updateProducto(id, producto);
    },

    async updateStock(id, cantidad) {
        const producto = db.getProductoById(id);
        if (!producto || producto.stock < cantidad) return false;
        producto.stock -= cantidad;
        db.updateProducto(id, producto);
        return true;
    },

    async delete(id) {
        return db.deleteProducto(id);
    },

    async deletePermanent(id) {
        return db.deleteProducto(id);
    }
};