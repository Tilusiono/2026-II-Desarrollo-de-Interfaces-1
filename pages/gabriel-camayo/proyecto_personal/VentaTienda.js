class VentaTienda extends Transaccion {
    entregado;
    #descuentoAplicado;
    #idCajero;
    #direccionEnvio;

    constructor(id, codigoRef, montoTotal, metodoPago, comprobante, descuentoAplicado, idCajero, direccionEnvio, entregado = false) {
        super(id, codigoRef, montoTotal, metodoPago, comprobante);
        this.#descuentoAplicado = descuentoAplicado;
        this.#idCajero = idCajero;
        this.#direccionEnvio = direccionEnvio;
        this.entregado = entregado;
    }

    #verificarDescuento() {
        return this.#descuentoAplicado > 0 ? "Con descuento" : "Precio regular";
    }

    #calcularDistancia() {
        return this.#direccionEnvio.includes("Lima") ? "Envío Local" : "Envío Nacional";
    }

    generarGuiaRemision() {
        const logistica = this.#calcularDistancia();
        return `Guía de remisión a: ${this.#direccionEnvio} (${logistica})`;
    }

    obtenerDetalles() { 
        return `Venta [Cajero: ${this.#idCajero}] | Estado: ${this.entregado ? "Entregado" : "Pendiente"} | ${this.#verificarDescuento()}`;
    }
}