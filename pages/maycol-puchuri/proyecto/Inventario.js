// ==========================================
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
    get stockActual() { return this.#stockActual; }

    descontarStock(cantidad) {
        if (cantidad > this.#stockActual) {
            throw new Error(`Stock insuficiente para ${this.#producto.nombre}`);
        }
        this.#stockActual -= cantidad;
    }

    agregarStock(cantidad) {
        this.#stockActual += cantidad;
    }
}