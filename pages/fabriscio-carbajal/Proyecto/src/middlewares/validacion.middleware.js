// import {
//   validarProductoCompleto as revisarProductoCompleto,
//   validarProductoParcial as revisarProductoParcial,
// } from "../validators/producto.validator.js";

// function continuarSiEsValido(errores, response, next) {
//   if (errores.length > 0) {
//     return response.status(400).json({ mensaje: "Datos no válidos", errores });
//   }
//   next();
// }

// export function validarProductoCompleto(request, response, next) {
//   continuarSiEsValido(revisarProductoCompleto(request.body), response, next);
// }

// export function validarProductoParcial(request, response, next) {
//   continuarSiEsValido(revisarProductoParcial(request.body), response, next);
// }
