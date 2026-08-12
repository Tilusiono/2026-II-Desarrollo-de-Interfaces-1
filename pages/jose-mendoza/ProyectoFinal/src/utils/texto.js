export function normalizarTexto(valor = "") {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function objetoContieneTexto(objeto, texto) {
  const buscado = normalizarTexto(texto);
  if (!buscado) return true;

  return Object.values(objeto).some((valor) =>
    normalizarTexto(valor).includes(buscado),
  );
}
