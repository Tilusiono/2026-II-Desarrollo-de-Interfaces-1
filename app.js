const express = require("express");
const path = require("path");

const app = express();
const PORT = 7878;

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
