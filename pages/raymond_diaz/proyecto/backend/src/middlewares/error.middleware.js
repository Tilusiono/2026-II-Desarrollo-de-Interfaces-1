import { AppError } from "../errors/AppError.js";

export function errorMiddleware(error, _request, response, _next) {
  const expected = error instanceof AppError;
  const statusCode = expected ? error.statusCode : 500;
  if (!expected) console.error(error);
  response.status(statusCode).json({
    ok: false,
    error: {
      codigo: expected ? error.code : "INTERNAL_ERROR",
      mensaje: expected ? error.message : "Ocurrió un error interno",
      detalles: expected ? error.details : null,
    },
  });
}
