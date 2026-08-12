const metodosEscritura = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function cabecerasSeguras(request, response, next) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
}

export function exigirPermisoEscritura(request, response, next) {
  if (!metodosEscritura.has(request.method)) return next();

  const claveEsperada = process.env.API_WRITE_KEY ?? "API_KEY";
  const claveRecibida = request.get("x-api-key");

  if (!claveRecibida || claveRecibida !== claveEsperada) {
    return response.status(403).json({
      mensaje: "Acceso denegado para operación de escritura",
      errores: ["Se requiere una clave válida en la cabecera x-api-key"],
    });
  }

  return next();
}
