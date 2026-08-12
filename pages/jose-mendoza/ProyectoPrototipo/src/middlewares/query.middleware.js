import { AppError } from "../errors/AppError.js";

// Express no incluye QUERY entre sus métodos abreviados.
// Este middleware permite enseñarlo sin confundirlo con request.query.
export function validarMetodoQuery(request, response, next) {
  if (request.method !== "QUERY") {
    return next(
      new AppError("Esta ruta acepta únicamente el método HTTP QUERY", 405),
    );
  }

  if (!request.body) {
    request.body = {};
  }

  next();
}