const express = require('express');
const path = require('path');

const app = express();
const PORT = 7878;

//Publicar los archivos HTML, CSS y JS en la carpeta "public"
app.use(
    express.static(
    path.join(__dirname, 'public'),
    {index: false}
)
);
app.use(
    express.static(path.join(__dirname, 'src'))
);


//Publicar bootstrap instalado mediante NPM
app.use(
    "/bootstrap",
    express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))
);



app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});