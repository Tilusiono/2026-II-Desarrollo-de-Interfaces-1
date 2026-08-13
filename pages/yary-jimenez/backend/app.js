const express = require('express');
const cors = require('cors');
require('dotenv').config();

const cafesRoutes = require('./routers/cafesRouter');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/cafes', cafesRoutes);

// Ruta principal de prueba
app.get('/', (req, res) => {
  res.send('☕ Servidor de la Cafetería corriendo correctamente');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});