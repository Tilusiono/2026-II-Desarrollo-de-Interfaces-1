const express = require("express");

const router = express.Router();

const {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} = require("../controllers/clienteController");


// Obtener todos los clientes
router.get("/", obtenerClientes);

// Obtener cliente por ID
router.get("/:id", obtenerClientePorId);

// Crear cliente
router.post("/", crearCliente);

// Actualizar cliente
router.put("/:id", actualizarCliente);

// Eliminar cliente
router.delete("/:id", eliminarCliente);


module.exports = router;