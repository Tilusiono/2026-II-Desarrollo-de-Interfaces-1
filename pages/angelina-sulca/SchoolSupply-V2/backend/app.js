import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar middlewares
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

// Importar rutas
import productoRoutes from './routes/productoRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import sedeRoutes from './routes/sedeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 7878;

// ============================================
// MIDDLEWARES GLOBALES
// ============================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// ============================================
// RUTAS API
// ============================================

app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/sedes', sedeRoutes);

// ============================================
// RUTA PRINCIPAL (Frontend)
// ============================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ============================================
// MANEJO DE ERRORES (SIEMPRE AL FINAL)
// ============================================

// Ruta no encontrada (404)
app.use(notFoundHandler);

// Error global (500)
app.use(errorHandler);

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
    console.log(`✅ Servidor en http://localhost:${PORT}`);
});