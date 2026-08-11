export function esTexto(valor) {
  return typeof valor === "string" && valor.trim() !== "";
}

export function esEnteroNoNegativo(valor) {
  return Number.isInteger(Number(valor)) && Number(valor) >= 0;
}

export function esNumeroNoNegativo(valor) {
  return Number.isFinite(Number(valor)) && Number(valor) >= 0;
}

export function esFecha(valor) {
  return !Number.isNaN(Date.parse(valor));
}

export function esHora(valor) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(String(valor));
}