// ==========================================
// CLASE: Pago
// ==========================================
class Pago {
    #id;
    #monto;
    #metodo;
    #fecha;

    constructor(id, monto, metodo) {
        this.#id = id;
        this.#monto = monto;
        this.#metodo = metodo; // Ej: 'Efectivo', 'Tarjeta'
        this.#fecha = new Date();
    }

    get id() { return this.#id; }
    get monto() { return this.#monto; }
    get metodo() { return this.#metodo; }
    get fecha() { return this.#fecha; }
}
