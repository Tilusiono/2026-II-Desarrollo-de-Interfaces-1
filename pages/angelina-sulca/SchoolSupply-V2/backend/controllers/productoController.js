// ============================================
// CONTROLLER: Producto
// ============================================

import { ProductoService } from '../services/productoService.js';
import { ProductoRequestDTO, ProductoQueryDTO } from '../dtos/productoDTO.js';

const productoService = new ProductoService();

// GET - Obtener todos los productos
export const obtenerProductos = async (req, res, next) => {
    try {
        const query = new ProductoQueryDTO(req.query);
        const productos = await productoService.getAll(query.getFilters());
        res.json({ success: true, data: productos.map(p => p.toJSON()) });
    } catch (error) {
        next(error);
    }
};

// GET - Obtener productos en oferta
export const obtenerOfertas = async (req, res, next) => {
    try {
        const productos = await productoService.getOfertas();
        res.json({ success: true, data: productos.map(p => p.toJSON()) });
    } catch (error) {
        next(error);
    }
};

// GET - Buscar productos
export const buscarProductos = async (req, res, next) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ success: false, error: 'Se requiere un término de búsqueda' });
        }
        const productos = await productoService.search(q);
        res.json({ success: true, data: productos.map(p => p.toJSON()) });
    } catch (error) {
        next(error);
    }
};

// GET - Obtener producto por ID
export const obtenerProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const producto = await productoService.getById(parseInt(id));
        if (!producto) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.json({ success: true, data: producto.toJSON() });
    } catch (error) {
        next(error);
    }
};

// POST - Crear producto
export const crearProducto = async (req, res, next) => {
    try {
        const dto = new ProductoRequestDTO(req.body);
        const errors = dto.validate();
        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }
        const producto = await productoService.create(dto);
        res.status(201).json({ success: true, data: producto.toJSON() });
    } catch (error) {
        next(error);
    }
};

// PUT - Actualizar producto
export const actualizarProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const dto = new ProductoRequestDTO(req.body);
        const errors = dto.validate();
        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }
        const producto = await productoService.update(parseInt(id), dto);
        if (!producto) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.json({ success: true, data: producto.toJSON() });
    } catch (error) {
        next(error);
    }
};

// DELETE - Eliminar producto
export const eliminarProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await productoService.delete(parseInt(id));
        if (!result) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.json({ success: true, message: 'Producto eliminado' });
    } catch (error) {
        next(error);
    }
};