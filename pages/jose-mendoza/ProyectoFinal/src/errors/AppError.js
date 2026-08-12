export class AppError extends Error {
  constructor(mensaje, statusCode = 500, detalles = null) {
    super(mensaje);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.detalles = detalles;
  }
}