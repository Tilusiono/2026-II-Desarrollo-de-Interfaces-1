const elemento = document.querySelector("#modal-eliminar");
const contexto = document.querySelector("#modal-eliminar-contexto");
const boton = document.querySelector("#btn-confirmar-eliminar");
const modal = new window.bootstrap.Modal(elemento);

export function confirmarEliminacion(modelo) {
  contexto.textContent = `Se eliminará la tarjeta gráfica “${modelo}”.`;
  modal.show();

  return new Promise((resolve) => {
    const confirmar = () => cerrar(true);
    const cancelar = () => cerrar(false);

    function cerrar(resultado) {
      boton.removeEventListener("click", confirmar);
      elemento.removeEventListener("hidden.bs.modal", cancelar);

      if (resultado) modal.hide();
      resolve(resultado);
    }

    boton.addEventListener("click", confirmar, { once: true });
    elemento.addEventListener("hidden.bs.modal", cancelar, { once: true });
  });
}
