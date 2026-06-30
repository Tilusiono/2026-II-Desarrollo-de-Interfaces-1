// ==========================================
// CLASE 4: Inventario
// Gestiona las existencias físicas de un producto en la tienda.
// ==========================================
class Inventario {
    #producto;    // Instancia de Producto
    #stockActual;
    #stockMinimo; // Para alertas de reabastecimiento

    constructor(producto, stockInicial, stockMinimo) {
        this.#producto = producto;
        this.#stockActual = stockInicial;
        this.#stockMinimo = stockMinimo;
    }

    get producto() { return this.#producto; }
    get stockActual() { return this.#stockActual; }
}
