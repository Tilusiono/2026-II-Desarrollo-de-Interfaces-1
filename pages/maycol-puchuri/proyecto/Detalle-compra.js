// ==========================================
// CLASE: DetalleCompra (Línea del carrito)
// ==========================================
class DetalleCompra {
    #producto; // Instancia de la clase Producto
    #cantidad;

    constructor(producto, cantidad) {
        this.#producto = producto;
        this.#cantidad = cantidad;
    }

    get producto() { return this.#producto; }
    get cantidad() { return this.#cantidad; }

    // Método para calcular el subtotal de esta línea
    calcularSubtotal() {
        return this.#producto.precio * this.#cantidad;
    }
}