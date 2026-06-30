class Transaccion extends EntidadTienda {
    moneda;
    #montoTotal;
    #metodoPago;
    #comprobante;

    constructor(id, codigoRef, montoTotal, metodoPago, comprobante, moneda = "PEN") {
        super(id, codigoRef);
        this.#montoTotal = montoTotal;
        this.#metodoPago = metodoPago;
        this.#comprobante = comprobante;
        this.moneda = moneda;
    }

    #validarMonto() {
        return this.#montoTotal > 0;
    }

    #generarFolio() {
        return `FOLIO-${this.#comprobante}-${this.#metodoPago}`;
    }

    procesarPagoBase() {
        if (!this.#validarMonto()) throw new Error("Monto inválido para procesar.");
        return `Pago procesado vía ${this.#metodoPago} | ${this.#generarFolio()}`;
    }

    obtenerDetalles() { 
        return `Transacción de ${this.#montoTotal} ${this.moneda}`;
    }
}