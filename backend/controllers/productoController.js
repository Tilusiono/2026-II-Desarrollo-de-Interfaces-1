const pool = require("../config/database");

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const [productos] = await pool.query(`
            SELECT 
                p.idProducto,
                p.nombreProducto,
                p.descripcion,
                p.precio,
                p.stock,
                c.nombreCategoria
            FROM producto p
            INNER JOIN categoria c 
                ON p.idCategoria = c.idCategoria
            ORDER BY p.idProducto;
        `);

        res.json(productos);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener los productos",
            error: error.message
        });
    }
};


// Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const [productos] = await pool.query(`
            SELECT 
                p.idProducto,
                p.nombreProducto,
                p.descripcion,
                p.precio,
                p.stock,
                c.nombreCategoria
            FROM producto p
            INNER JOIN categoria c 
                ON p.idCategoria = c.idCategoria
            WHERE p.idProducto = ?
        `, [id]);

        if (productos.length === 0) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json(productos[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al buscar el producto",
            error: error.message
        });
    }
};


// Crear producto
const crearProducto = async (req, res) => {
    try {
        const {
            nombreProducto,
            descripcion,
            precio,
            stock,
            idCategoria
        } = req.body;

        if (!nombreProducto || precio === undefined || stock === undefined || !idCategoria) {
            return res.status(400).json({
                mensaje: "Los campos nombreProducto, precio, stock e idCategoria son obligatorios"
            });
        }

        const [resultado] = await pool.query(`
            INSERT INTO producto
            (nombreProducto, descripcion, precio, stock, idCategoria)
            VALUES (?, ?, ?, ?, ?)
        `, [
            nombreProducto,
            descripcion || null,
            precio,
            stock,
            idCategoria
        ]);

        res.status(201).json({
            mensaje: "Producto creado correctamente",
            idProducto: resultado.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al crear el producto",
            error: error.message
        });
    }
};


// Actualizar producto
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nombreProducto,
            descripcion,
            precio,
            stock,
            idCategoria
        } = req.body;

        const [resultado] = await pool.query(`
            UPDATE producto
            SET
                nombreProducto = ?,
                descripcion = ?,
                precio = ?,
                stock = ?,
                idCategoria = ?
            WHERE idProducto = ?
        `, [
            nombreProducto,
            descripcion || null,
            precio,
            stock,
            idCategoria,
            id
        ]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json({
            mensaje: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar el producto",
            error: error.message
        });
    }
};


// Eliminar producto
const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const [resultado] = await pool.query(
            "DELETE FROM producto WHERE idProducto = ?",
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json({
            mensaje: "Producto eliminado correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "No se puede eliminar el producto",
            error: error.message
        });
    }
};


module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};