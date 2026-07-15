const express = require("express");
const path = require("path");

const app = express();
const PORT = 7878;

// Permitir que el servidor lea la carpeta "public"
app.use(express.static('public'));

// Rutas de la web
app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a mi servidor con Express</h1>');
});

app.get('/productos', (req, res) => {
  res.send('<h1>Página de Productos</h1><p>Lista de productos disponible.</p>');
});

// Publicar los archivos HTML, CSS y JS de la carpeta public
app.use(
  express.static(
    path.join(__dirname, "public"),
    { index: false }
  )
);
  
app.use(
  express.static(path.join(__dirname, "src"))
);

// Publicar Bootstrap instalado mediante NPM
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
