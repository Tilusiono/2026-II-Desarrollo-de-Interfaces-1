const express = require("express");

const router = express.Router();

const {
    obtenerVentas,
    obtenerVentaPorId,
    crearVenta
} = require("../controllers/ventaController");


// Obtener todas las ventas
router.get("/", obtenerVentas);

// Obtener una venta por ID
router.get("/:id", obtenerVentaPorId);

// Registrar una nueva venta
router.post("/", crearVenta);


module.exports = router;