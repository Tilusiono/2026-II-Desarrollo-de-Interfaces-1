export function manejarErrores(error, request, response, next) {
  if (response.headersSent) return next(error);

  console.error(error);
  const statusCode = error.statusCode ?? 500;
  response.status(statusCode).json({
    mensaje: error.message ?? "Error interno del servidor",
    detalles: error.detalles ?? undefined,
  });
}
