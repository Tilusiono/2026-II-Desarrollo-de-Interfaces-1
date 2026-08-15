const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/database");
const productoRoutes = require("./routes/productoRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const empleadoRoutes = require("./routes/empleadoRoutes");
const ventaRoutes = require("./routes/ventaRoutes");

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());


// Rutas
app.get("/", (req, res) => {
    res.json({
        mensaje: "API del Mini Market funcionando correctamente"
    });
});

app.get("/api/prueba-db", async (req, res) => {
    try {
        const [resultado] = await pool.query(
            "SELECT 1 + 1 AS resultado"
        );

        res.json({
            mensaje: "Conexión con MySQL correcta",
            resultado: resultado[0].resultado
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al conectar con MySQL",
            error: error.message
        });
    }
});


// API de productos
app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/empleados", empleadoRoutes);
app.use("/api/ventas", ventaRoutes);


// Servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );
});