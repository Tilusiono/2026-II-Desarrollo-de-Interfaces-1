const pool = require("../config/database");

// Obtener todas las categorías
const obtenerCategorias = async (req, res) => {
    try {
        const [categorias] = await pool.query(`
            SELECT
                idCategoria,
                nombreCategoria,
                descripcion
            FROM categoria
            ORDER BY idCategoria
        `);

        res.json(categorias);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener las categorías",
            error: error.message
        });
    }
};


// Obtener una categoría por ID
const obtenerCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const [categorias] = await pool.query(`
            SELECT
                idCategoria,
                nombreCategoria,
                descripcion
            FROM categoria
            WHERE idCategoria = ?
        `, [id]);

        if (categorias.length === 0) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada"
            });
        }

        res.json(categorias[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al buscar la categoría",
            error: error.message
        });
    }
};


// Crear categoría
const crearCategoria = async (req, res) => {
    try {
        const {
            nombreCategoria,
            descripcion
        } = req.body;

        if (!nombreCategoria) {
            return res.status(400).json({
                mensaje: "El nombre de la categoría es obligatorio"
            });
        }

        const [resultado] = await pool.query(`
            INSERT INTO categoria
            (nombreCategoria, descripcion)
            VALUES (?, ?)
        `, [
            nombreCategoria,
            descripcion || null
        ]);

        res.status(201).json({
            mensaje: "Categoría creada correctamente",
            idCategoria: resultado.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al crear la categoría",
            error: error.message
        });
    }
};


// Actualizar categoría
const actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nombreCategoria,
            descripcion
        } = req.body;

        if (!nombreCategoria) {
            return res.status(400).json({
                mensaje: "El nombre de la categoría es obligatorio"
            });
        }

        const [resultado] = await pool.query(`
            UPDATE categoria
            SET
                nombreCategoria = ?,
                descripcion = ?
            WHERE idCategoria = ?
        `, [
            nombreCategoria,
            descripcion || null,
            id
        ]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada"
            });
        }

        res.json({
            mensaje: "Categoría actualizada correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar la categoría",
            error: error.message
        });
    }
};


// Eliminar categoría
const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const [resultado] = await pool.query(
            "DELETE FROM categoria WHERE idCategoria = ?",
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada"
            });
        }

        res.json({
            mensaje: "Categoría eliminada correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "No se puede eliminar la categoría porque puede estar relacionada con productos",
            error: error.message
        });
    }
};


module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};