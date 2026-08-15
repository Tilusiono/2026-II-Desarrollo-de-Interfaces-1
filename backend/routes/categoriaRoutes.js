const express = require("express");

const router = express.Router();

const {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} = require("../controllers/categoriaController");


// Obtener todas las categorías
router.get("/", obtenerCategorias);

// Obtener una categoría por ID
router.get("/:id", obtenerCategoriaPorId);

// Crear categoría
router.post("/", crearCategoria);

// Actualizar categoría
router.put("/:id", actualizarCategoria);

// Eliminar categoría
router.delete("/:id", eliminarCategoria);


module.exports = router;