// CLASE 4: Inventario
// ==========================================
class Inventario {
  #producto;
  #stockActual;
  #stockMinimo;

  constructor(producto, stockInicial, stockMinimo) {
    this.#producto = producto;
    this.#stockActual = stockInicial;
    this.#stockMinimo = stockMinimo;
  }

  get producto() { return this.#producto; }
  set producto(nuevoProducto) { this.#producto = nuevoProducto; }

  get stockActual() { return this.#stockActual; }
  set stockActual(cantidad) {
    if (cantidad < 0) throw new Error("El stock no puede ser negativo.");
    this.#stockActual = cantidad;
  }

  get stockMinimo() { return this.#stockMinimo; }
  set stockMinimo(cantidad) {
    if (cantidad < 0) throw new Error("El stock mínimo no puede ser negativo.");
    this.#stockMinimo = cantidad;
  }

  descontarStock(cantidad) {
    if (cantidad > this.#stockActual) {
      throw new Error(`Stock insuficiente para ${this.#producto.nombre}`);
    }
    this.#stockActual -= cantidad;
  }

  agregarStock(cantidad) {
    if (cantidad < 0) throw new Error("No puedes agregar stock negativo.");
    this.#stockActual += cantidad;
  }
}