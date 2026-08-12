import {
  validarProcesadorCompleto as revisarProcesadorCompleto,
  validarProcesadorParcial as revisarProcesadorParcial,
} from "../validators/procesador.validator.js";

function continuarSiEsValido(errores, response, next) {
  if (errores.length > 0) {
    return response.status(400).json({ mensaje: "Datos no válidos", errores });
  }
  next();
}

export function validarProcesadorCompleto(request, response, next) {
  continuarSiEsValido(revisarProcesadorCompleto(request.body), response, next);
}

export function validarProcesadorParcial(request, response, next) {
  continuarSiEsValido(revisarProcesadorParcial(request.body), response, next);
}
