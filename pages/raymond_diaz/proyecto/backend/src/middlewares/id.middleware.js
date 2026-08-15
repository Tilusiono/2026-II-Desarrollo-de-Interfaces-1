import { AppError } from "../errors/AppError.js";

export function validarId(request, _response, next) {
  const id = Number(request.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return next(new AppError("El ID debe ser un entero positivo", 400, null, "INVALID_ID"));
  }
  request.resourceId = id;
  next();
}
