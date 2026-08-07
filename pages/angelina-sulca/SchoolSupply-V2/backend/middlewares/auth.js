// ============================================
// MIDDLEWARE: Autenticación
// ============================================

/**
 * Nota: Este es un middleware de autenticación básica.
 * En producción, usarías JWT (jsonwebtoken) con variables de entorno.
 * Este es un ejemplo simple para demostrar el concepto.
 */

// Clave secreta (en producción usarías process.env.JWT_SECRET)
const SECRET_KEY = 'mi-clave-secreta-super-segura';

// ============================================
// MIDDLEWARE: Verificar token JWT (simulado)
// ============================================

/**
 * Verifica que el token de autenticación sea válido
 * Se usa en rutas que requieren autenticación
 */
export const verificarToken = (req, res, next) => {
    // Obtener el token del header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : null;

    // Si no hay token, error 401
    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Token de autenticación no proporcionado',
            message: 'Debes iniciar sesión para acceder a este recurso'
        });
    }

    // Simulación de verificación de token
    // En producción: jwt.verify(token, SECRET_KEY)
    try {
        // Verificar que el token tenga el formato esperado
        if (token === SECRET_KEY || token.startsWith('eyJ')) {
            // Token válido (simulado)
            // En producción, aquí descifrarías el token para obtener el usuario
            req.user = { id: 1, nombre: 'Admin', rol: 'personal' };
            next();
        } else {
            // Token inválido
            return res.status(401).json({
                success: false,
                error: 'Token de autenticación inválido',
                message: 'El token proporcionado no es válido'
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Error al verificar el token',
            message: error.message
        });
    }
};

// ============================================
// MIDDLEWARE: Verificar rol de Personal
// ============================================

/**
 * Verifica que el usuario autenticado tenga rol de Personal
 * Se usa en rutas que requieren permisos de administrador
 */
export const verificarPersonal = (req, res, next) => {
    // Primero verificar que el usuario existe (token válido)
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: 'No autenticado',
            message: 'Debes iniciar sesión para acceder a este recurso'
        });
    }

    // Verificar que el rol sea Personal
    if (req.user.rol !== 'personal') {
        return res.status(403).json({
            success: false,
            error: 'Acceso denegado',
            message: 'Se requieren permisos de Personal para esta acción'
        });
    }

    next();
};

// ============================================
// MIDDLEWARE: Verificar rol de Cliente
// ============================================

/**
 * Verifica que el usuario autenticado tenga rol de Cliente
 * Se usa en rutas que requieren permisos de cliente
 */
export const verificarCliente = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: 'No autenticado',
            message: 'Debes iniciar sesión para acceder a este recurso'
        });
    }

    if (req.user.rol !== 'cliente' && req.user.rol !== 'personal') {
        return res.status(403).json({
            success: false,
            error: 'Acceso denegado',
            message: 'Se requieren permisos de Cliente para esta acción'
        });
    }

    next();
};

// ============================================
// FUNCIÓN: Generar token (simulado)
// ============================================

/**
 * Función para generar un token simulado
 * En producción usarías: jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' })
 */
export const generarToken = (userData) => {
    // Simulación: en producción esto sería un JWT real
    // const payload = { id: userData.id, nombre: userData.nombre, rol: userData.rol };
    // return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
    
    // Para demostración, devolvemos un token simulado
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                  Buffer.from(JSON.stringify(userData)).toString('base64') +
                  '.simulacion';
    return token;
};

// ============================================
// FUNCIÓN: Verificar token (simulado)
// ============================================

/**
 * Función para verificar un token simulado
 * En producción usarías: jwt.verify(token, SECRET_KEY)
 */
export const verificarTokenSimulado = (token) => {
    try {
        // Dividir el token (formato: header.payload.signature)
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Token inválido');
        }

        // Decodificar el payload (base64)
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        return payload;
    } catch (error) {
        throw new Error('Token inválido');
    }
};