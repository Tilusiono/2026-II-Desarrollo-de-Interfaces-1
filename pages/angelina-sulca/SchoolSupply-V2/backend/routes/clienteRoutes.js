import { Router } from 'express';
import {
    obtenerClientes,
    obtenerCliente,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} from '../controllers/clienteController.js';
import { validarCliente } from '../middlewares/validator.js';

const router = Router();

router.get('/', obtenerClientes);
router.get('/:id', obtenerCliente);
router.post('/', validarCliente, crearCliente);
router.put('/:id', validarCliente, actualizarCliente);
router.delete('/:id', eliminarCliente);

export default router;