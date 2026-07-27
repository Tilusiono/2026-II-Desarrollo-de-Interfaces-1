import { Router } from 'express';
import {
    obtenerSedes,
    buscarSedes,
    obtenerSede,
    obtenerSedePorCodigo,
    crearSede,
    actualizarSede,
    eliminarSede,
    obtenerEmpleadosDeSede
} from '../controllers/sedeController.js';

const router = Router();

router.get('/', obtenerSedes);
router.get('/buscar', buscarSedes);
router.get('/codigo/:codigo', obtenerSedePorCodigo);
router.get('/:id/empleados', obtenerEmpleadosDeSede);
router.get('/:id', obtenerSede);
router.post('/', crearSede);
router.put('/:id', actualizarSede);
router.delete('/:id', eliminarSede);

export default router;