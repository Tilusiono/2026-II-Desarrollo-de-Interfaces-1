import { Router } from 'express';
import {
    obtenerSedes,
    buscarSedes,
    obtenerSede,
    obtenerSedePorCodigo,
    crearSede,
    actualizarSede,
    eliminarSede
} from '../controllers/sedeController.js';
// ✅ COMENTA O ELIMINA LAS IMPORTACIONES DE AUTENTICACIÓN
// import { verificarToken, verificarPersonal } from '../middlewares/auth.js';
import { validarSede } from '../middlewares/validator.js';

const router = Router();

router.get('/', obtenerSedes);
router.get('/buscar', buscarSedes);
router.get('/codigo/:codigo', obtenerSedePorCodigo);
router.get('/:id', obtenerSede);

// ✅ QUITA verificarToken y verificarPersonal
router.post('/', validarSede, crearSede);
router.put('/:id', validarSede, actualizarSede);
router.delete('/:id', eliminarSede);

export default router;