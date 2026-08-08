// ============================================
// APP - SchoolSupply (CommonJS)
// ============================================

const express = require('express');
const cors = require('cors');
const path = require('path');
const { getDB } = require('./database/sqliteDB');

// Middlewares
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');
const { validarProducto, validarSede, validarCliente, validarId } = require('./middlewares/validator');
const { verificarToken, verificarPersonal } = require('./middlewares/auth');

// Rutas
const productoRoutes = require('./routes/productoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const sedeRoutes = require('./routes/sedeRoutes');

const app = express();
const PORT = process.env.PORT || 7878;

// ============================================
// MIDDLEWARES GLOBALES
// ============================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// ============================================
// RUTAS API
// ============================================

app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/sedes', sedeRoutes);

// ============================================
// AUTENTICACIÓN
// ============================================

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: 'Email y contraseña son obligatorios'
        });
    }

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

app.get('/api/admin/dashboard', verificarToken, verificarPersonal, (req, res) => {
    res.json({
        success: true,
        message: 'Bienvenido al panel de administración',
        user: req.user
    });
});

// ============================================
// RUTA PRINCIPAL
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
    
    try {
        getDB();
        console.log('✅ SQLite conectado correctamente');
    } catch (error) {
        console.error('❌ Error conectando a SQLite:', error.message);
    }
});