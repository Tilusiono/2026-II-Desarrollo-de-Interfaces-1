// ============================================
// CONTROLLER: Cliente
// ============================================

import { ClienteService } from '../services/clienteService.js';
import { ClienteRequestDTO } from '../dtos/clienteDTO.js';

const clienteService = new ClienteService();

// GET - Obtener todos los clientes
export const obtenerClientes = async (req, res, next) => {
    try {
        const clientes = await clienteService.getAll();
        res.json({ success: true, data: clientes.map(c => c.toJSON()) });
    } catch (error) {
        next(error);
    }
};

// GET - Obtener cliente por ID
export const obtenerCliente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cliente = await clienteService.getById(parseInt(id));
        if (!cliente) {
            return res.status(404).json({ success: false, error: 'Cliente no encontrado' });
        }
        res.json({ success: true, data: cliente.toJSON() });
    } catch (error) {
        next(error);
    }
};

// POST - Crear cliente
export const crearCliente = async (req, res, next) => {
    try {
        const dto = new ClienteRequestDTO(req.body);
        const errors = dto.validate();
        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }
        const cliente = await clienteService.create(dto);
        res.status(201).json({ success: true, data: cliente.toJSON() });
    } catch (error) {
        next(error);
    }
};

// PUT - Actualizar cliente
export const actualizarCliente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const dto = new ClienteRequestDTO(req.body);
        const errors = dto.validate();
        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }
        const cliente = await clienteService.update(parseInt(id), dto);
        if (!cliente) {
            return res.status(404).json({ success: false, error: 'Cliente no encontrado' });
        }
        res.json({ success: true, data: cliente.toJSON() });
    } catch (error) {
        next(error);
    }
};

// DELETE - Eliminar cliente
export const eliminarCliente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await clienteService.delete(parseInt(id));
        if (!result) {
            return res.status(404).json({ success: false, error: 'Cliente no encontrado' });
        }
        res.json({ success: true, message: 'Cliente eliminado' });
    } catch (error) {
        next(error);
    }
};