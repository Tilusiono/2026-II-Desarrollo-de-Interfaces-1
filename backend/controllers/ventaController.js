const pool = require("../config/database");


// Obtener todas las ventas
const obtenerVentas = async (req, res) => {
    try {
        const [ventas] = await pool.query(`
            SELECT
                v.idVenta,
                v.fechaVenta,
                v.total,
                CONCAT(c.nombreCliente, ' ', c.apellidoCliente) AS cliente,
                CONCAT(e.nombreEmpleado, ' ', e.apellidoEmpleado) AS empleado
            FROM venta v
            INNER JOIN cliente c
                ON v.idCliente = c.idCliente
            INNER JOIN empleado e
                ON v.idEmpleado = e.idEmpleado
            ORDER BY v.idVenta DESC
        `);

        res.json(ventas);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener las ventas",
            error: error.message
        });
    }
};


// Obtener una venta con sus detalles
const obtenerVentaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const [ventas] = await pool.query(`
            SELECT
                v.idVenta,
                v.fechaVenta,
                v.total,
                v.idCliente,
                CONCAT(c.nombreCliente, ' ', c.apellidoCliente) AS cliente,
                v.idEmpleado,
                CONCAT(e.nombreEmpleado, ' ', e.apellidoEmpleado) AS empleado
            FROM venta v
            INNER JOIN cliente c
                ON v.idCliente = c.idCliente
            INNER JOIN empleado e
                ON v.idEmpleado = e.idEmpleado
            WHERE v.idVenta = ?
        `, [id]);

        if (ventas.length === 0) {
            return res.status(404).json({
                mensaje: "Venta no encontrada"
            });
        }

        const [detalles] = await pool.query(`
            SELECT
                dv.idDetalle,
                dv.idProducto,
                p.nombreProducto,
                dv.cantidad,
                dv.precioUnitario,
                dv.subtotal
            FROM detalle_venta dv
            INNER JOIN producto p
                ON dv.idProducto = p.idProducto
            WHERE dv.idVenta = ?
            ORDER BY dv.idDetalle
        `, [id]);

        res.json({
            venta: ventas[0],
            detalles: detalles
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener la venta",
            error: error.message
        });
    }
};


// Crear una venta
const crearVenta = async (req, res) => {
    const conexion = await pool.getConnection();

    try {
        const {
            idCliente,
            idEmpleado,
            productos
        } = req.body;

        if (!idCliente || !idEmpleado || !productos || productos.length === 0) {
            conexion.release();

            return res.status(400).json({
                mensaje: "Debe indicar cliente, empleado y al menos un producto"
            });
        }

        await conexion.beginTransaction();

        let total = 0;
        const detallesVenta = [];

        // Verificar productos y calcular total
        for (const item of productos) {

            const [producto] = await conexion.query(`
                SELECT
                    idProducto,
                    nombreProducto,
                    precio,
                    stock
                FROM producto
                WHERE idProducto = ?
                FOR UPDATE
            `, [item.idProducto]);

            if (producto.length === 0) {
                throw new Error(
                    `El producto ${item.idProducto} no existe`
                );
            }

            if (item.cantidad <= 0) {
                throw new Error(
                    `La cantidad del producto ${item.idProducto} debe ser mayor que cero`
                );
            }

            if (producto[0].stock < item.cantidad) {
                throw new Error(
                    `Stock insuficiente para ${producto[0].nombreProducto}`
                );
            }

            const precioUnitario = Number(producto[0].precio);
            const subtotal = precioUnitario * Number(item.cantidad);

            total += subtotal;

            detallesVenta.push({
                idProducto: producto[0].idProducto,
                cantidad: Number(item.cantidad),
                precioUnitario: precioUnitario,
                subtotal: subtotal
            });
        }


        // Crear venta
        const [resultadoVenta] = await conexion.query(`
            INSERT INTO venta
            (idCliente, idEmpleado, total)
            VALUES (?, ?, ?)
        `, [
            idCliente,
            idEmpleado,
            total
        ]);

        const idVenta = resultadoVenta.insertId;


        // Crear detalles y actualizar stock
        for (const detalle of detallesVenta) {

            await conexion.query(`
                INSERT INTO detalle_venta
                (idVenta, idProducto, cantidad, precioUnitario, subtotal)
                VALUES (?, ?, ?, ?, ?)
            `, [
                idVenta,
                detalle.idProducto,
                detalle.cantidad,
                detalle.precioUnitario,
                detalle.subtotal
            ]);

            await conexion.query(`
                UPDATE producto
                SET stock = stock - ?
                WHERE idProducto = ?
            `, [
                detalle.cantidad,
                detalle.idProducto
            ]);
        }


        await conexion.commit();

        res.status(201).json({
            mensaje: "Venta registrada correctamente",
            idVenta: idVenta,
            total: total
        });

    } catch (error) {

        await conexion.rollback();

        console.error(error);

        res.status(500).json({
            mensaje: "Error al registrar la venta",
            error: error.message
        });

    } finally {
        conexion.release();
    }
};


module.exports = {
    obtenerVentas,
    obtenerVentaPorId,
    crearVenta
};