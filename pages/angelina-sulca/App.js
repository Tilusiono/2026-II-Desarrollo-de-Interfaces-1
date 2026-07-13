const express = require("express");
const path = require("path");

const app = express();
const PORT = 7878;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public"), { index: false }));
app.use(express.static(path.join(__dirname, "src")));

// Servir Bootstrap
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

// 📌 RUTA PRINCIPAL (para que funcione)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Servidor en http://localhost:${PORT}`);
});