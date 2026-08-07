import { clienteRepository } from '../repositories/clienteRepository.js';

// GET - Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
    try {
        const clientes = await clienteRepository.getAll();
        res.json({ success: true, data: clientes });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// GET - Obtener cliente por ID
export const obtenerCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await clienteRepository.getById(id);
        if (!cliente) {
            return res.status(404).json({ success: false, error: 'Cliente no encontrado' });
        }
        res.json({ success: true, data: cliente });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// POST - Crear cliente
export const crearCliente = async (req, res) => {
    try {
        const cliente = await clienteRepository.create(req.body);
        res.status(201).json({ success: true, data: cliente });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// PUT - Actualizar cliente
export const actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await clienteRepository.update(id, req.body);
        res.json({ success: true, data: cliente });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// DELETE - Eliminar cliente
export const eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        await clienteRepository.delete(id);
        res.json({ success: true, message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};