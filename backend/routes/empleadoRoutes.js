const express = require("express");

const router = express.Router();

const {
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
} = require("../controllers/empleadoController");


// Obtener todos los empleados
router.get("/", obtenerEmpleados);

// Obtener empleado por ID
router.get("/:id", obtenerEmpleadoPorId);

// Crear empleado
router.post("/", crearEmpleado);

// Actualizar empleado
router.put("/:id", actualizarEmpleado);

// Eliminar empleado
router.delete("/:id", eliminarEmpleado);


module.exports = router;