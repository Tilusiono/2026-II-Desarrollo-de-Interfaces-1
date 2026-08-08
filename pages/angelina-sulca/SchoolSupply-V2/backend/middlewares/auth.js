// ============================================
// MIDDLEWARE: Auth (CommonJS)
// ============================================

const SECRET_KEY = 'mi-clave-secreta-super-segura';

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : null;

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Token de autenticación no proporcionado',
            message: 'Debes iniciar sesión para acceder a este recurso'
        });
    }

    try {
        if (token === SECRET_KEY || token.startsWith('eyJ')) {
            req.user = { id: 1, nombre: 'Admin', rol: 'personal' };
            next();
        } else {
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

const verificarPersonal = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: 'No autenticado',
            message: 'Debes iniciar sesión para acceder a este recurso'
        });
    }

    if (req.user.rol !== 'personal') {
        return res.status(403).json({
            success: false,
            error: 'Acceso denegado',
            message: 'Se requieren permisos de Personal para esta acción'
        });
    }

    next();
};

const verificarCliente = (req, res, next) => {
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

const generarToken = (userData) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                  Buffer.from(JSON.stringify(userData)).toString('base64') +
                  '.simulacion';
    return token;
};

const verificarTokenSimulado = (token) => {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Token inválido');
        }
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        return payload;
    } catch (error) {
        throw new Error('Token inválido');
    }
};

module.exports = {
    verificarToken,
    verificarPersonal,
    verificarCliente,
    generarToken,
    verificarTokenSimulado
};