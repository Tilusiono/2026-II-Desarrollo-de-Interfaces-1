import { Router } from 'express';
import {
    obtenerProductos,
    obtenerOfertas,
    buscarProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from '../controllers/productoController.js';
// ✅ COMENTA O ELIMINA LAS IMPORTACIONES DE AUTENTICACIÓN
// import { verificarToken, verificarPersonal } from '../middlewares/auth.js';
import { validarProducto } from '../middlewares/validator.js';

const router = Router();

// Rutas públicas (todas sin autenticación)
router.get('/', obtenerProductos);
router.get('/ofertas', obtenerOfertas);
router.get('/buscar', buscarProductos);
router.get('/:id', obtenerProducto);

// ✅ QUITA verificarToken y verificarPersonal
router.post('/', validarProducto, crearProducto);
router.put('/:id', validarProducto, actualizarProducto);
router.delete('/:id', eliminarProducto);

export default router;