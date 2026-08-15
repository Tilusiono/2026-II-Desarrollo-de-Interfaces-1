const pool = require("../config/database");

// Obtener todos los empleados
const obtenerEmpleados = async (req, res) => {
    try {
        const [empleados] = await pool.query(`
            SELECT
                idEmpleado,
                nombreEmpleado,
                apellidoEmpleado,
                cargo
            FROM empleado
            ORDER BY idEmpleado
        `);

        res.json(empleados);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener los empleados",
            error: error.message
        });
    }
};


// Obtener empleado por ID
const obtenerEmpleadoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const [empleados] = await pool.query(`
            SELECT
                idEmpleado,
                nombreEmpleado,
                apellidoEmpleado,
                cargo
            FROM empleado
            WHERE idEmpleado = ?
        `, [id]);

        if (empleados.length === 0) {
            return res.status(404).json({
                mensaje: "Empleado no encontrado"
            });
        }

        res.json(empleados[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al buscar el empleado",
            error: error.message
        });
    }
};


// Crear empleado
const crearEmpleado = async (req, res) => {
    try {
        const {
            nombreEmpleado,
            apellidoEmpleado,
            cargo
        } = req.body;

        if (!nombreEmpleado || !apellidoEmpleado || !cargo) {
            return res.status(400).json({
                mensaje: "Nombre, apellido y cargo son obligatorios"
            });
        }

        const [resultado] = await pool.query(`
            INSERT INTO empleado
            (nombreEmpleado, apellidoEmpleado, cargo)
            VALUES (?, ?, ?)
        `, [
            nombreEmpleado,
            apellidoEmpleado,
            cargo
        ]);

        res.status(201).json({
            mensaje: "Empleado creado correctamente",
            idEmpleado: resultado.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al crear el empleado",
            error: error.message
        });
    }
};


// Actualizar empleado
const actualizarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nombreEmpleado,
            apellidoEmpleado,
            cargo
        } = req.body;

        if (!nombreEmpleado || !apellidoEmpleado || !cargo) {
            return res.status(400).json({
                mensaje: "Nombre, apellido y cargo son obligatorios"
            });
        }

        const [resultado] = await pool.query(`
            UPDATE empleado
            SET
                nombreEmpleado = ?,
                apellidoEmpleado = ?,
                cargo = ?
            WHERE idEmpleado = ?
        `, [
            nombreEmpleado,
            apellidoEmpleado,
            cargo,
            id
        ]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Empleado no encontrado"
            });
        }

        res.json({
            mensaje: "Empleado actualizado correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar el empleado",
            error: error.message
        });
    }
};


// Eliminar empleado
const eliminarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;

        const [resultado] = await pool.query(
            "DELETE FROM empleado WHERE idEmpleado = ?",
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Empleado no encontrado"
            });
        }

        res.json({
            mensaje: "Empleado eliminado correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "No se puede eliminar el empleado porque puede estar relacionado con ventas",
            error: error.message
        });
    }
};


module.exports = {
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
};