class Transaccion {
    moneda;
    #idTransaccion;
    #montoTotal;
    #metodoPago;

    constructor(idTransaccion, montoTotal, metodoPago, moneda = "PEN") {
        if (new.target === Transaccion) {
            throw new Error("Abstracción: Transaccion no se puede instanciar.");
        }
        this.#idTransaccion = idTransaccion;
        this.#montoTotal = montoTotal;
        this.#metodoPago = metodoPago;
        this.moneda = moneda;
    }

    #validarMonto() {
        return this.#montoTotal > 0;
    }

    #generarFolio() {
        return `TRX-${this.#idTransaccion}-${this.#metodoPago}`;
    }

    procesarPagoBase() {
        if (!this.#validarMonto()) throw new Error("Monto inválido");
        return `Aprobado: ${this.#generarFolio()} por ${this.#montoTotal} ${this.moneda}`;
    }

    obtenerDetalles() {
        throw new Error("Polimorfismo: Debe implementarse en la clase hija.");
    }
}

export default Transaccion