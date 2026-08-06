import { db } from '../database/jsonDB.js';

export const productoRepository = {
    async getAll() {
        return db.getProductos();
    },

    async getById(id) {
        return db.getProductoById(id);
    },

    async getOfertas() {
        return db.getProductos().filter(p => p.en_oferta === 1);
    },

    async search(termino) {
        const term = termino.toLowerCase();
        return db.getProductos().filter(p =>
            p.nombre.toLowerCase().includes(term) ||
            p.marca.toLowerCase().includes(term) ||
            (p.color && p.color.toLowerCase().includes(term))
        );
    },

    async create(producto) {
        console.log('📝 Creando producto:', producto);
        const result = db.createProducto(producto);
        console.log('✅ Producto creado:', result);
        return result;
    },

    async update(id, producto) {
        console.log(`📝 Actualizando producto ID ${id}:`, producto);
        const result = db.updateProducto(id, producto);
        console.log('✅ Producto actualizado:', result);
        return result;
    },

    async updateStock(id, cantidad) {
        const producto = db.getProductoById(id);
        if (!producto || producto.stock < cantidad) return false;
        producto.stock -= cantidad;
        db.updateProducto(id, producto);
        return true;
    },

    async delete(id) {
        console.log(`🗑️ Eliminando producto ID ${id}`);
        const result = db.deleteProducto(id);
        console.log('✅ Producto eliminado:', result);
        return result;
    },

    async deletePermanent(id) {
        return db.deleteProducto(id);
    }
};