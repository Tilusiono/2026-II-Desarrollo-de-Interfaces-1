// ============================================
// CONTROLLER: Sede
// ============================================

import { SedeService } from '../services/sedeService.js';
import { SedeRequestDTO, SedeQueryDTO } from '../dtos/sedeDTO.js';

const sedeService = new SedeService();

// GET - Obtener todas las sedes
export const obtenerSedes = async (req, res, next) => {
    try {
        const query = new SedeQueryDTO(req.query);
        const sedes = await sedeService.getAll(query.getFilters());
        res.json({ success: true, data: sedes.map(s => s.toJSON()) });
    } catch (error) {
        next(error);
    }
};

// GET - Buscar sedes
export const buscarSedes = async (req, res, next) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ success: false, error: 'Se requiere un término de búsqueda' });
        }
        const sedes = await sedeService.search(q);
        res.json({ success: true, data: sedes.map(s => s.toJSON()) });
    } catch (error) {
        next(error);
    }
};

// GET - Obtener sede por ID
export const obtenerSede = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sede = await sedeService.getById(parseInt(id));
        if (!sede) {
            return res.status(404).json({ success: false, error: 'Sede no encontrada' });
        }
        res.json({ success: true, data: sede.toJSON() });
    } catch (error) {
        next(error);
    }
};

// GET - Obtener sede por código
export const obtenerSedePorCodigo = async (req, res, next) => {
    try {
        const { codigo } = req.params;
        const sede = await sedeService.getByCodigo(codigo);
        if (!sede) {
            return res.status(404).json({ success: false, error: 'Sede no encontrada' });
        }
        res.json({ success: true, data: sede.toJSON() });
    } catch (error) {
        next(error);
    }
};

// POST - Crear sede
export const crearSede = async (req, res, next) => {
    try {
        const dto = new SedeRequestDTO(req.body);
        const errors = dto.validate();
        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }
        const sede = await sedeService.create(dto);
        res.status(201).json({ success: true, data: sede.toJSON() });
    } catch (error) {
        next(error);
    }
};

// PUT - Actualizar sede
export const actualizarSede = async (req, res, next) => {
    try {
        const { id } = req.params;
        const dto = new SedeRequestDTO(req.body);
        const errors = dto.validate();
        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }
        const sede = await sedeService.update(parseInt(id), dto);
        if (!sede) {
            return res.status(404).json({ success: false, error: 'Sede no encontrada' });
        }
        res.json({ success: true, data: sede.toJSON() });
    } catch (error) {
        next(error);
    }
};

// DELETE - Eliminar sede
export const eliminarSede = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await sedeService.delete(parseInt(id));
        if (!result) {
            return res.status(404).json({ success: false, error: 'Sede no encontrada' });
        }
        res.json({ success: true, message: 'Sede eliminada' });
    } catch (error) {
        next(error);
    }
};

// ============================================
// 🔥 FUNCIÓN FALTANTE: Obtener empleados de una sede
// ============================================
export const obtenerEmpleadosDeSede = async (req, res, next) => {
    try {
        const { id } = req.params;
        const empleados = await sedeService.getEmpleados(parseInt(id));
        res.json({ success: true, data: empleados });
    } catch (error) {
        next(error);
    }
};