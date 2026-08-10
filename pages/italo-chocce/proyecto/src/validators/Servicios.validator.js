import {
  esNumeroNoNegativo,
  esTexto,
} from "./comunes.validator.js";

function validarCamposServicio(servicio) {
  const errores = [];

  if (
    servicio.nombre !== undefined &&
    servicio.nombre !== "" &&
    !esTexto(servicio.nombre)
  ) {
    errores.push("nombre debe ser texto");
  }

  if (servicio.precio !== undefined && !esNumeroNoNegativo(servicio.precio)) {
    errores.push("precio debe ser un número no negativo");
  }

  if (
    servicio.descripcion !== undefined &&
    servicio.descripcion !== null &&
    typeof servicio.descripcion !== "string"
  ) {
    errores.push("descripcion debe ser texto o null");
  }

  return errores;
}

export function validarServicioCompleto(servicio) {
  const errores = validarCamposServicio(servicio);

  if (!servicio || Object.keys(servicio).length === 0) {
    return ["El cuerpo de la petición no puede estar vacío"];
  }

  if (!esTexto(servicio.nombre)) errores.push("nombre es obligatorio");
  if (servicio.precio === undefined) errores.push("precio es obligatorio");

  return errores;
}

export function validarServicioParcial(servicio) {
  if (!servicio || Object.keys(servicio).length === 0) {
    return ["Debe enviar al menos un campo"];
  }
  return validarCamposServicio(servicio);
}