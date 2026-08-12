import { AppError } from "../errors/AppError.js";

export function validarMetodoQuery(request, response, next) {
  if (request.method !== "QUERY") {
    return next(
      new AppError("Esta ruta acepta únicamente el método HTTP QUERY", 405),
    );
  }
  next();
}
