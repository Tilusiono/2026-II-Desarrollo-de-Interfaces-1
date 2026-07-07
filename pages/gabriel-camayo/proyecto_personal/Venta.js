import Transaccion from './Transaccion.js';

class Venta extends Transaccion {
    entregado;
    #descuentoAplicado;
    #idCajero;
    #direccionEnvio;

    constructor(idTransaccion, montoTotal, metodoPago, descuento, idCajero, direccion, entregado = false) {
        super(idTransaccion, montoTotal, metodoPago);
        this.#descuentoAplicado = descuento;
        this.#idCajero = idCajero;
        this.#direccionEnvio = direccion;
        this.entregado = entregado;
    }

    #verificarDescuento() {
        return this.#descuentoAplicado > 0 ? "Descuento aplicado" : "Sin descuento";
    }

    #calcularDistancia() {
        return this.#direccionEnvio.toLowerCase().includes("lima") ? "Envío Local" : "Envío Provincia";
    }

    generarGuia() {
        const logistica = this.#calcularDistancia();
        return `Guía a ${this.#direccionEnvio} (${logistica})`;
    }

    obtenerDetalles() {
        return `Venta por cajero ${this.#idCajero} | Estado: ${this.entregado ? "Entregada" : "Pendiente"} | ${this.#verificarDescuento()}`;
    }
}

export default Venta