import { AppError } from "../errors/AppError.js";

export function validarBody(DtoClass, validator) {
  return (request, _response, next) => {
    const dto = new DtoClass(request.body);
    const errors = validator(dto);
    if (errors.length) return next(new AppError("Datos de entrada inválidos", 400, errors, "VALIDATION_ERROR"));
    request.validatedBody = dto;
    next();
  };
}
