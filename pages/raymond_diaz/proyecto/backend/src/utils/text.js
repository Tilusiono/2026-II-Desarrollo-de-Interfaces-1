export function normalizarTexto(value) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : value;
}

export function aBooleano(value, fallback = undefined) {
  if (value === undefined || value === null || value === "") return fallback;
  if (value === true || value === 1 || value === "1" || value === "true") return true;
  if (value === false || value === 0 || value === "0" || value === "false") return false;
  return fallback;
}
