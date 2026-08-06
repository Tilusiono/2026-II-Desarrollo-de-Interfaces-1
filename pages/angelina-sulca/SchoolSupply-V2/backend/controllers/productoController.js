import { productoRepository } from '../repositories/productoRepository.js';

// GET - Obtener todos los productos
export const obtenerProductos = async (req, res) => {
    try {
        const productos = await productoRepository.getAll();
        res.json({ success: true, data: productos });
    } catch (error) {
        console.error('❌ Error en obtenerProductos:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// GET - Obtener producto por ID
export const obtenerProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await productoRepository.getById(parseInt(id));
        if (!producto) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.json({ success: true, data: producto });
    } catch (error) {
        console.error('❌ Error en obtenerProducto:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// GET - Obtener productos en oferta
export const obtenerOfertas = async (req, res) => {
    try {
        const productos = await productoRepository.getOfertas();
        res.json({ success: true, data: productos });
    } catch (error) {
        console.error('❌ Error en obtenerOfertas:', error);
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
        console.error('❌ Error en buscarProductos:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// POST - Crear un producto
export const crearProducto = async (req, res) => {
    try {
        console.log('📥 Recibiendo POST /api/productos:', req.body);
        const producto = await productoRepository.create(req.body);
        console.log('✅ Producto creado:', producto);
        res.status(201).json({ success: true, data: producto });
    } catch (error) {
        console.error('❌ Error en crearProducto:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// PUT - Actualizar un producto
export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`📥 Recibiendo PUT /api/productos/${id}:`, req.body);
        const producto = await productoRepository.update(parseInt(id), req.body);
        if (!producto) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.json({ success: true, data: producto });
    } catch (error) {
        console.error('❌ Error en actualizarProducto:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// DELETE - Eliminar un producto (borrado lógico)
export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`📥 Recibiendo DELETE /api/productos/${id}`);
        const result = await productoRepository.delete(parseInt(id));
        if (!result) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.json({ success: true, message: 'Producto eliminado' });
    } catch (error) {
        console.error('❌ Error en eliminarProducto:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};