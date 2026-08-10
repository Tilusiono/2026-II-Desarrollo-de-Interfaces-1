import {
  validarServicioCompleto as revisarServicioCompleto,
  validarServicioParcial as revisarServicioParcial,
} from "../validators/Servicios.validator.js";

function continuarSiEsValido(errores, response, next) {
  if (errores.length > 0) {
    return response.status(400).json({ mensaje: "Datos no válidos", errores });
  }
  next();
}

export function validarServicioCompleto(request, response, next) {
  continuarSiEsValido(revisarServicioCompleto(request.body), response, next);
}

export function validarServicioParcial(request, response, next) {
  continuarSiEsValido(revisarServicioParcial(request.body), response, next);
}