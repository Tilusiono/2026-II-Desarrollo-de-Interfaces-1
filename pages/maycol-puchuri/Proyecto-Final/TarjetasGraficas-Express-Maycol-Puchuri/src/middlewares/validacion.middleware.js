import {
  validarTarjetaGraficaCompleto as revisarTarjetaGraficaCompleto,
  validarTarjetaGraficaParcial as revisarTarjetaGraficaParcial,
} from "../validators/tarjetaGrafica.validator.js";

function continuarSiEsValido(errores, response, next) {
  if (errores.length > 0) {
    return response.status(400).json({ mensaje: "Datos no válidos", errores });
  }
  next();
}

export function validarTarjetaGraficaCompleto(request, response, next) {
  continuarSiEsValido(revisarTarjetaGraficaCompleto(request.body), response, next);
}

export function validarTarjetaGraficaParcial(request, response, next) {
  continuarSiEsValido(revisarTarjetaGraficaParcial(request.body), response, next);
}
