export function rutaNoEncontrada(request, response) {
  response.status(404).json({
    mensaje: "Ruta no encontrada",
    metodo: request.method,
    ruta: request.originalUrl,
  });
}