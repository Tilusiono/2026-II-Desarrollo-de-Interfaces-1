export const esTexto = (value, min = 1, max = 255) =>
  typeof value === "string" && value.length >= min && value.length <= max;

export const esEnteroPositivo = (value) => Number.isInteger(value) && value > 0;
export const esEnteroNoNegativo = (value) => Number.isInteger(value) && value >= 0;
export const esNumeroNoNegativo = (value) => Number.isFinite(value) && value >= 0;
export const esBooleano = (value) => typeof value === "boolean";
export const esCorreo = (value) =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 150;
