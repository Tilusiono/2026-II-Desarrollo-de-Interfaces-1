import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar rutas
import productoRoutes from './src/routes/productoRoutes.js';
import clienteRoutes from './src/routes/clienteRoutes.js';
import sedeRoutes from './src/routes/sedeRoutes.js'; // 🔥 NUEVA RUTA

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 7878;

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// Servir Bootstrap
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// ============================================
// RUTAS API
// ============================================
app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/sedes', sedeRoutes); // 🔥 NUEVA RUTA

// ============================================
// RUTA PRINCIPAL (Frontend)
// ============================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Servidor en http://localhost:${PORT}`);
});