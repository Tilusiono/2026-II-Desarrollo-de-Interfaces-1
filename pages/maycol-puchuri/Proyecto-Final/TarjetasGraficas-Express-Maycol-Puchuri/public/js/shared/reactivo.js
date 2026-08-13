// Recibe un callback y evita lanzar una búsqueda por cada tecla presionada.
export function debounce(callback, espera = 300) {
  let temporizador;

  return (...argumentos) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => callback(...argumentos), espera);
  };
}
