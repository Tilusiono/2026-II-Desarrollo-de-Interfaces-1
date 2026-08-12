import {
  esEnteroNoNegativo,
  esFecha,
  esHora,
  esNumeroNoNegativo,
  esTexto,
} from "./comunes.validator.js";

const ARQUITECTURAS = ["X64", "X86", "ARM", "RSC"];

function esImagenBase64(valor) {
  return /^data:image\/[a-zA-Z0-9.+-]+;base64,[a-zA-Z0-9+/=]+$/.test(
    String(valor),
  );
}

function validarCamposProcesador(procesador) {
  const errores = [];
  if (procesador.codigo !== undefined && !esTexto(procesador.codigo))
    errores.push("codigo debe ser texto");
  if (procesador.modelo !== undefined && !esTexto(procesador.modelo))
    errores.push("modelo debe ser texto");
  if (
    procesador.arquitectura !== undefined &&
    !ARQUITECTURAS.includes(procesador.arquitectura)
  )
    errores.push("arquitectura no es válida");
  if (
    procesador.nucleos !== undefined &&
    !esEnteroNoNegativo(procesador.nucleos)
  )
    errores.push("nucleos debe ser un entero no negativo");
  if (procesador.precio !== undefined && !esNumeroNoNegativo(procesador.precio))
    errores.push("precio debe ser un número no negativo");
  if (
    procesador.frecuenciaGhz !== undefined &&
    procesador.frecuenciaGhz !== null &&
    !esNumeroNoNegativo(procesador.frecuenciaGhz)
  )
    errores.push("frecuenciaGhz debe ser un número no negativo o null");
  if (
    procesador.descripcion !== undefined &&
    procesador.descripcion !== null &&
    typeof procesador.descripcion !== "string"
  )
    errores.push("descripcion debe ser texto o null");
  if (
    procesador.registro !== undefined &&
    typeof procesador.registro !== "boolean"
  )
    errores.push("registro debe ser booleano");
  if (
    procesador.fechaLanzamiento !== undefined &&
    procesador.fechaLanzamiento !== null &&
    !esFecha(procesador.fechaLanzamiento)
  )
    errores.push("fechaLanzamiento no es válida");
  if (procesador.horaRegistro !== undefined && !esHora(procesador.horaRegistro))
    errores.push("horaRegistro debe usar HH:mm");
  if (
    procesador.fechaHoraRegistro !== undefined &&
    !esFecha(procesador.fechaHoraRegistro)
  )
    errores.push("fechaHoraRegistro no es válida");
  if (
    procesador.imagenBase64 !== undefined &&
    procesador.imagenBase64 !== null &&
    procesador.imagenBase64 !== "" &&
    !esImagenBase64(procesador.imagenBase64)
  )
    errores.push("imagenBase64 debe ser una imagen Base64 válida o null");
  return errores;
}

export function validarProcesadorCompleto(procesador) {
  const errores = validarCamposProcesador(procesador);
  if (!esTexto(procesador.codigo)) errores.push("codigo es obligatorio");
  if (!esTexto(procesador.modelo)) errores.push("modelo es obligatorio");
  if (procesador.arquitectura === undefined || procesador.arquitectura === "")
    errores.push("arquitectura es obligatoria");
  if (procesador.nucleos === undefined) errores.push("nucleos es obligatorio");
  if (procesador.precio === undefined) errores.push("precio es obligatorio");
  if (procesador.registro === undefined)
    errores.push("registro es obligatorio");
  if (procesador.horaRegistro === undefined || procesador.horaRegistro === "")
    errores.push("horaRegistro es obligatorio");
  if (
    procesador.fechaHoraRegistro === undefined ||
    procesador.fechaHoraRegistro === ""
  )
    errores.push("fechaHoraRegistro es obligatoria");
  return [...new Set(errores)];
}

export function validarProcesadorParcial(procesador) {
  const camposEnviados = Object.fromEntries(
    Object.entries(procesador).filter(([, valor]) => valor !== undefined),
  );
  if (Object.keys(camposEnviados).length === 0)
    return ["Debe enviar al menos un campo"];
  return validarCamposProcesador(camposEnviados);
}
