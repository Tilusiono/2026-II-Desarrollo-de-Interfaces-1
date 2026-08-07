// ============================================
// MIDDLEWARE: Manejo global de errores
// ============================================

/**
 * Middleware para manejar errores de forma centralizada
 * Captura cualquier error y devuelve una respuesta JSON estructurada
 */
export const errorHandler = (err, req, res, next) => {
    // Determinar el código de estado (si no tiene, 500)
    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';

    // Mostrar error en consola (para debugging)
    console.error('❌ Error:', {
        message: err.message,
        stack: err.stack,
        status: status,
        url: req.url,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query
    });

    // Responder al cliente
    res.status(status).json({
        success: false,
        error: message,
        // Solo mostrar detalles en desarrollo
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack,
            details: err.details || null
        })
    });
};

// ============================================
// MIDDLEWARE: Ruta no encontrada (404)
// ============================================

/**
 * Middleware para manejar rutas no encontradas
 * Se ejecuta cuando ninguna ruta coincide
 */
export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: `Ruta no encontrada: ${req.method} ${req.url}`,
        message: 'La ruta que buscas no existe en el servidor'
    });
};

// ============================================
// CLASE: AppError (para errores personalizados)
// ============================================

/**
 * Clase para crear errores personalizados con código de estado
 * Útil para lanzar errores desde los servicios o controladores
 */
export class AppError extends Error {
    constructor(message, status = 400, details = null) {
        super(message);
        this.status = status;
        this.details = details;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    // Errores comunes
    static badRequest(message = 'Solicitud inválida', details = null) {
        return new AppError(message, 400, details);
    }

    static unauthorized(message = 'No autorizado') {
        return new AppError(message, 401);
    }

    static forbidden(message = 'Acceso prohibido') {
        return new AppError(message, 403);
    }

    static notFound(message = 'Recurso no encontrado') {
        return new AppError(message, 404);
    }

    static conflict(message = 'Conflicto con el recurso existente') {
        return new AppError(message, 409);
    }

    static internal(message = 'Error interno del servidor') {
        return new AppError(message, 500);
    }

    static validation(message = 'Error de validación', details = null) {
        return new AppError(message, 422, details);
    }
}