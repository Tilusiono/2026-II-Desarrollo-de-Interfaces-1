import { sedeRepository } from '../repositories/sedeRepository.js';

// GET - Obtener todas las sedes
export const obtenerSedes = async (req, res) => {
    try {
        const sedes = await sedeRepository.getAll();
        res.json({ success: true, data: sedes });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// GET - Buscar sedes
export const buscarSedes = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ success: false, error: 'Se requiere un término de búsqueda' });
        }
        const sedes = await sedeRepository.search(q);
        res.json({ success: true, data: sedes });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// GET - Obtener sede por ID
export const obtenerSede = async (req, res) => {
    try {
        const { id } = req.params;
        const sede = await sedeRepository.getById(id);
        if (!sede) {
            return res.status(404).json({ success: false, error: 'Sede no encontrada' });
        }
        res.json({ success: true, data: sede });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// GET - Obtener sede por código
export const obtenerSedePorCodigo = async (req, res) => {
    try {
        const { codigo } = req.params;
        const sede = await sedeRepository.getByCodigo(codigo);
        if (!sede) {
            return res.status(404).json({ success: false, error: 'Sede no encontrada' });
        }
        res.json({ success: true, data: sede });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// POST - Crear sede
export const crearSede = async (req, res) => {
    try {
        // Verificar que el código no exista
        const existente = await sedeRepository.getByCodigo(req.body.codigo);
        if (existente) {
            return res.status(400).json({ 
                success: false, 
                error: 'Ya existe una sede con ese código' 
            });
        }
        const sede = await sedeRepository.create(req.body);
        res.status(201).json({ success: true, data: sede });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// PUT - Actualizar sede
export const actualizarSede = async (req, res) => {
    try {
        const { id } = req.params;
        // Verificar que la sede existe
        const existente = await sedeRepository.getById(id);
        if (!existente) {
            return res.status(404).json({ success: false, error: 'Sede no encontrada' });
        }
        const sede = await sedeRepository.update(id, req.body);
        res.json({ success: true, data: sede });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// DELETE - Eliminar sede (borrado lógico)
export const eliminarSede = async (req, res) => {
    try {
        const { id } = req.params;
        const existente = await sedeRepository.getById(id);
        if (!existente) {
            return res.status(404).json({ success: false, error: 'Sede no encontrada' });
        }
        await sedeRepository.delete(id);
        res.json({ success: true, message: 'Sede eliminada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// GET - Obtener empleados de una sede
export const obtenerEmpleadosDeSede = async (req, res) => {
    try {
        const { id } = req.params;
        const empleados = await sedeRepository.getEmpleados(id);
        res.json({ success: true, data: empleados });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};