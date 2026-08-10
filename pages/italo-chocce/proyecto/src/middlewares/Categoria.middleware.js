import {
  validarCategoriaCompleta as revisarCategoriaCompleta,
  validarCategoriaParcial as revisarCategoriaParcial,
} from "../validators/Categoria.validator.js";

function continuarSiEsValido(errores, response, next) {
  if (errores.length > 0) {
    return response.status(400).json({ mensaje: "Datos no válidos", errores });
  }
  next();
}

export function validarCategoriaCompleta(request, response, next) {
  continuarSiEsValido(revisarCategoriaCompleta(request.body), response, next);
}

export function validarCategoriaParcial(request, response, next) {
  continuarSiEsValido(revisarCategoriaParcial(request.body), response, next);
}