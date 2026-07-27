import { productoRepository } from '../repositories/productoRepository.js';

// GET - Obtener todos los productos
export const obtenerProductos = async (req, res) => {
    try {
        const productos = await productoRepository.getAll();
        res.json({ success: true, data: productos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// GET - Obtener productos en oferta
export const obtenerOfertas = async (req, res) => {
    try {
        const productos = await productoRepository.getOfertas();
        res.json({ success: true, data: productos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// GET - Buscar productos
export const buscarProductos = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ success: false, error: 'Se requiere un término de búsqueda' });
        }
        const productos = await productoRepository.search(q);
        res.json({ success: true, data: productos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// GET - Obtener un producto por ID
export const obtenerProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await productoRepository.getById(id);
        if (!producto) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.json({ success: true, data: producto });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// POST - Crear un producto
export const crearProducto = async (req, res) => {
    try {
        const producto = await productoRepository.create(req.body);
        res.status(201).json({ success: true, data: producto });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// PUT - Actualizar un producto
export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await productoRepository.update(id, req.body);
        res.json({ success: true, data: producto });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// DELETE - Eliminar un producto (borrado lógico)
export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        await productoRepository.delete(id);
        res.json({ success: true, message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};