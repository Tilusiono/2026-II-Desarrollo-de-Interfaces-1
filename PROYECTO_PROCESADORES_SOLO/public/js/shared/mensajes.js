export function mostrarMensaje(elemento, texto, tipo = "ok") {
  const clase =
    tipo === "error" ? "danger" : tipo === "info" ? "info" : "success";
  elemento.textContent = texto;
  elemento.className = `alert alert-${clase} mt-3 mb-0`;
  elemento.classList.remove("d-none");
}

export function ocultarMensaje(elemento) {
  elemento.classList.add("d-none");
}
