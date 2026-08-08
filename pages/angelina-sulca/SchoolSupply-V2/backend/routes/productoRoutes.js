// ============================================
// ROUTES: Producto (CommonJS)
// ============================================

const express = require('express');
const router = express.Router();

const {
    obtenerProductos,
    obtenerOfertas,
    buscarProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productoController');

const { validarProducto } = require('../middlewares/validator');

router.get('/', obtenerProductos);
router.get('/ofertas', obtenerOfertas);
router.get('/buscar', buscarProductos);
router.get('/:id', obtenerProducto);
router.post('/', validarProducto, crearProducto);
router.put('/:id', validarProducto, actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;