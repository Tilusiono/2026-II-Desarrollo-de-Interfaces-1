const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Bienvenido a mi servidor");
});

app.get("/productos", (req, res) => {
    res.send("Lista de productos");
});

app.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000");
});