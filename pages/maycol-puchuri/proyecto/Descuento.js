// ==========================================
// CLASE: Compra (Gestor principal del flujo)
// ==========================================
class Compra {
    #id;
    #detalles; // Array que almacena instancias de DetalleCompra
    #estado;   // 'Pendiente', 'Pagado'
    #pago;     // Instancia de la clase Pago (inicia en null)

    constructor(id) {
        this.#id = id;
        this.#detalles = [];
        this.#estado = 'Pendiente';
        this.#pago = null;
    }

    get id() { return this.#id; }
    get detalles() { return this.#detalles; }
    get estado() { return this.#estado; }
    get pago() { return this.#pago; }
}