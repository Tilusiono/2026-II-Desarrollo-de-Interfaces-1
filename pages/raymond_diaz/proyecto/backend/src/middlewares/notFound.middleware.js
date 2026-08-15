import { AppError } from "../errors/AppError.js";

export function notFoundMiddleware(request, _response, next) {
  next(new AppError(`Ruta no encontrada: ${request.method} ${request.originalUrl}`, 404, null, "ROUTE_NOT_FOUND"));
}
