// ============================================
// ROUTES: Sede (CommonJS)
// ============================================

const express = require('express');
const router = express.Router();

const {
    obtenerSedes,
    buscarSedes,
    obtenerSede,
    obtenerSedePorCodigo,
    crearSede,
    actualizarSede,
    eliminarSede,
    obtenerEmpleadosDeSede
} = require('../controllers/sedeController');

const { validarSede } = require('../middlewares/validator');

router.get('/', obtenerSedes);
router.get('/buscar', buscarSedes);
router.get('/codigo/:codigo', obtenerSedePorCodigo);
router.get('/:id', obtenerSede);
router.post('/', validarSede, crearSede);
router.put('/:id', validarSede, actualizarSede);
router.delete('/:id', eliminarSede);
router.get('/:id/empleados', obtenerEmpleadosDeSede);

module.exports = router;