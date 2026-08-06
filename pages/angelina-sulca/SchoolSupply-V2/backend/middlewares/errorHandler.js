// ============================================
// MIDDLEWARE: Manejo global de errores
// ============================================

export const errorHandler = (err, req, res, next) => {
    // Si el error tiene un status, lo usamos, si no, 500
    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';

    // Mostrar error en consola (para debugging)
    console.error('❌ Error:', err);

    // Responder al cliente
    res.status(status).json({
        success: false,
        error: message,
        // Solo mostrar detalles en desarrollo
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

// ============================================
// MIDDLEWARE: Ruta no encontrada (404)
// ============================================

export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: `Ruta no encontrada: ${req.method} ${req.url}`
    });
};