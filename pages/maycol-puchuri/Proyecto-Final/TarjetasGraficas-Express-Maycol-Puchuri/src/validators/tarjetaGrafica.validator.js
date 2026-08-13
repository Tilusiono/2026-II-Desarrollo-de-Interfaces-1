import {
  esEnteroNoNegativo,
  esFecha,
  esHora,
  esNumeroNoNegativo,
  esTexto,
} from "./comunes.validator.js";

const FABRICANTES = ["NVD", "AMD", "INT", "OTH"];

function esImagenBase64(valor) {
  return /^data:image\/[a-zA-Z0-9.+-]+;base64,[a-zA-Z0-9+/=]+$/.test(
    String(valor),
  );
}

function validarCamposTarjetaGrafica(tarjetaGrafica) {
  const errores = [];

  if (tarjetaGrafica.codigo !== undefined && !esTexto(tarjetaGrafica.codigo))
    errores.push("codigo debe ser texto");

  if (tarjetaGrafica.modelo !== undefined && !esTexto(tarjetaGrafica.modelo))
    errores.push("modelo debe ser texto");

  if (
    tarjetaGrafica.fabricante !== undefined &&
    !FABRICANTES.includes(tarjetaGrafica.fabricante)
  )
    errores.push("fabricante no es válido");

  if (
    tarjetaGrafica.memoriaGb !== undefined &&
    !esEnteroNoNegativo(tarjetaGrafica.memoriaGb)
  )
    errores.push("memoriaGb debe ser un entero no negativo");

  if (tarjetaGrafica.precio !== undefined && !esNumeroNoNegativo(tarjetaGrafica.precio))
    errores.push("precio debe ser un número no negativo");

  if (
    tarjetaGrafica.frecuenciaMhz !== undefined &&
    tarjetaGrafica.frecuenciaMhz !== null &&
    !esNumeroNoNegativo(tarjetaGrafica.frecuenciaMhz)
  )
    errores.push("frecuenciaMhz debe ser un número no negativo o null");

  if (
    tarjetaGrafica.descripcion !== undefined &&
    tarjetaGrafica.descripcion !== null &&
    typeof tarjetaGrafica.descripcion !== "string"
  )
    errores.push("descripcion debe ser texto o null");

  if (
    tarjetaGrafica.registro !== undefined &&
    typeof tarjetaGrafica.registro !== "boolean"
  )
    errores.push("registro debe ser booleano");

  if (
    tarjetaGrafica.fechaLanzamiento !== undefined &&
    tarjetaGrafica.fechaLanzamiento !== null &&
    !esFecha(tarjetaGrafica.fechaLanzamiento)
  )
    errores.push("fechaLanzamiento no es válida");

  if (tarjetaGrafica.horaRegistro !== undefined && !esHora(tarjetaGrafica.horaRegistro))
    errores.push("horaRegistro debe usar HH:mm");

  if (
    tarjetaGrafica.fechaHoraRegistro !== undefined &&
    !esFecha(tarjetaGrafica.fechaHoraRegistro)
  )
    errores.push("fechaHoraRegistro no es válida");

  if (
    tarjetaGrafica.imagenBase64 !== undefined &&
    tarjetaGrafica.imagenBase64 !== null &&
    tarjetaGrafica.imagenBase64 !== "" &&
    !esImagenBase64(tarjetaGrafica.imagenBase64)
  )
    errores.push("imagenBase64 debe ser una imagen Base64 válida o null");

  return errores;
}

export function validarTarjetaGraficaCompleto(tarjetaGrafica) {
  const errores = validarCamposTarjetaGrafica(tarjetaGrafica);

  if (!esTexto(tarjetaGrafica.codigo)) errores.push("codigo es obligatorio");
  if (!esTexto(tarjetaGrafica.modelo)) errores.push("modelo es obligatorio");
  if (tarjetaGrafica.fabricante === undefined || tarjetaGrafica.fabricante === "")
    errores.push("fabricante es obligatorio");
  if (tarjetaGrafica.memoriaGb === undefined) errores.push("memoriaGb es obligatorio");
  if (tarjetaGrafica.precio === undefined) errores.push("precio es obligatorio");
  if (tarjetaGrafica.registro === undefined)
    errores.push("registro es obligatorio");
  if (tarjetaGrafica.horaRegistro === undefined || tarjetaGrafica.horaRegistro === "")
    errores.push("horaRegistro es obligatorio");
  if (
    tarjetaGrafica.fechaHoraRegistro === undefined ||
    tarjetaGrafica.fechaHoraRegistro === ""
  )
    errores.push("fechaHoraRegistro es obligatoria");

  return [...new Set(errores)];
}

export function validarTarjetaGraficaParcial(tarjetaGrafica) {
  const camposEnviados = Object.fromEntries(
    Object.entries(tarjetaGrafica).filter(([, valor]) => valor !== undefined),
  );

  if (Object.keys(camposEnviados).length === 0)
    return ["Debe enviar al menos un campo"];

  return validarCamposTarjetaGrafica(camposEnviados);
}
