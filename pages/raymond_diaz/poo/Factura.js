class Factura {
    #id; #serie; #numero; #tipoComprobante; #cliente;
    estado;

    constructor(id, serie, numero, tipoComprobante, cliente, estado = "Emitida") {
        this.#id = id;
        this.#serie = serie;
        this.#numero = numero;
        this.#tipoComprobante = tipoComprobante;
        this.#cliente = cliente;
        this.estado = estado;
    }

    #obtenerCodigoComprobante() { return `${this.#serie}-${this.#numero}`; }
    #esFactura() { return this.#tipoComprobante.toLowerCase() === "factura"; }

    emitir(total) {
        return `${this.#tipoComprobante}: ${this.#obtenerCodigoComprobante()}<br>Cliente: ${this.#cliente}<br>Total: S/ ${total.toFixed(2)}<br>Es factura: ${this.#esFactura()}<br>Estado: ${this.estado}`;
    }
}
