// ============================================
// MIDDLEWARE: Autenticación básica (ejemplo)
// ============================================

// Clave secreta simple (en producción usaría .env)
const SECRET_KEY = 'mi-clave-secreta';

export const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Token no proporcionado'
        });
    }

    // Simulación de verificación (en producción usarías JWT)
    if (token !== `Bearer ${SECRET_KEY}`) {
        return res.status(401).json({
            success: false,
            error: 'Token inválido'
        });
    }

    next();
};