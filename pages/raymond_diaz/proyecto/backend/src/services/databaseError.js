import { AppError } from "../errors/AppError.js";

export function traducirErrorBaseDatos(error, entityName) {
  const message = String(error?.message || "");
  if (message.includes("UNIQUE constraint failed")) {
    return new AppError(`Ya existe un ${entityName} con esos datos únicos`, 409, null, "DUPLICATE");
  }
  if (message.includes("FOREIGN KEY constraint failed")) {
    return new AppError("La categoría o el proveedor indicado no existe", 400, null, "FOREIGN_KEY");
  }
  if (message.includes("CHECK constraint failed")) {
    return new AppError("La base de datos rechazó uno de los valores", 400, null, "CHECK_CONSTRAINT");
  }
  return error;
}
