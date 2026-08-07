import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// ============================================
// CONFIGURAR VARIABLES DE ENTORNO
// ============================================
// Si tienes dotenv instalado, descomenta esto:
// import dotenv from 'dotenv';
// dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// IMPORTAR MIDDLEWARES Y RUTAS
// ============================================

import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import { validarProducto, validarSede, validarCliente, validarId } from './middlewares/validator.js';
import { verificarToken, verificarPersonal } from './middlewares/auth.js';

import productoRoutes from './routes/productoRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import sedeRoutes from './routes/sedeRoutes.js';

// ============================================
// INICIALIZAR APP
// ============================================

const app = express();
const PORT = process.env.PORT || 7878; // Usa el puerto del .env o el 7878 por defecto

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

// Productos
app.use('/api/productos', productoRoutes);

// Clientes
app.use('/api/clientes', clienteRoutes);

// Sedes
app.use('/api/sedes', sedeRoutes);

// ============================================
// RUTA DE AUTENTICACIÓN (ejemplo)
// ============================================

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: 'Email y contraseña son obligatorios'
        });
    }

    // Simulación de autenticación
    if (email === 'admin@schoolsupply.com' && password === 'admin123') {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                      Buffer.from(JSON.stringify({ id: 1, nombre: 'Admin', rol: 'personal' })).toString('base64') +
                      '.simulacion';
        
        return res.json({
            success: true,
            data: {
                token: token,
                usuario: {
                    id: 1,
                    nombre: 'Admin',
                    email: 'admin@schoolsupply.com',
                    rol: 'personal'
                }
            }
        });
    }

    if (email === 'cliente@schoolsupply.com' && password === 'cliente123') {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                      Buffer.from(JSON.stringify({ id: 2, nombre: 'Cliente', rol: 'cliente' })).toString('base64') +
                      '.simulacion';
        
        return res.json({
            success: true,
            data: {
                token: token,
                usuario: {
                    id: 2,
                    nombre: 'Cliente',
                    email: 'cliente@schoolsupply.com',
                    rol: 'cliente'
                }
            }
        });
    }

    return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
    });
});

// Ruta protegida de ejemplo (solo Personal)
app.get('/api/admin/dashboard', verificarToken, verificarPersonal, (req, res) => {
    res.json({
        success: true,
        message: 'Bienvenido al panel de administración',
        user: req.user
    });
});

// ============================================
// RUTA PRINCIPAL (Frontend)
// ============================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ============================================
// MANEJO DE ERRORES
// ============================================

app.use(notFoundHandler);
app.use(errorHandler);

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
    console.log(`✅ Servidor en http://localhost:${PORT}`);
    console.log(`📁 Entorno: ${process.env.NODE_ENV || 'development'}`);
});