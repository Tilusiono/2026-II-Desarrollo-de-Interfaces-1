import {
  esTexto,
} from "./comunes.validator.js";

function validarCamposCategoria(categoria) {
  const errores = [];

  if (
    categoria.nombre !== undefined &&
    categoria.nombre !== "" &&
    !esTexto(categoria.nombre)
  ) {
    errores.push("nombre debe ser texto");
  }

  if (
    categoria.descripcion !== undefined &&
    categoria.descripcion !== null &&
    typeof categoria.descripcion !== "string"
  ) {
    errores.push("descripcion debe ser texto o null");
  }

  return errores;
}

export function validarCategoriaCompleta(categoria) {
  const errores = validarCamposCategoria(categoria);

  if (!categoria || Object.keys(categoria).length === 0) {
    return ["El cuerpo de la petición no puede estar vacío"];
  }

  if (!esTexto(categoria.nombre)) errores.push("nombre es obligatorio");

  return errores;
}

export function validarCategoriaParcial(categoria) {
  if (!categoria || Object.keys(categoria).length === 0) {
    return ["Debe enviar al menos un campo"];
  }
  return validarCamposCategoria(categoria);
}