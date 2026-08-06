// ============================================
// CLASE: detalleCompra (NO hereda)
// ============================================

export class detalleCompra {
    #descuentoAplicado;
    #precioFinal;

    producto;
    cantidad;
    precioUnitario;
    subtotal;
    observacion;

    constructor(cod, prod, cant, pUni, subTot, obs) {
        this.producto = prod;
        this.cantidad = cant;
        this.precioUnitario = pUni;
        this.subtotal = subTot;
        this.observacion = obs;
        this.#descuentoAplicado = 0;
        this.#precioFinal = subTot;
    }

    getdescuentoAplicado() {
        return this.#descuentoAplicado;
    }

    getprecioFinal() {
        return this.#precioFinal;
    }

    setcantidad(nuevaCantidad) {
        if (nuevaCantidad > 0) {
            this.cantidad = nuevaCantidad;
            this.calcularSubtotal();
        }
    }

    setobservacion(nuevaObservacion) {
        this.observacion = nuevaObservacion;
    }

    calcularSubtotal() {
        this.subtotal = this.precioUnitario * this.cantidad;
        return this.subtotal;
    }

    aplicarDescuento(porcentaje) {
        this.#descuentoAplicado = (this.subtotal * porcentaje) / 100;
        this.#precioFinal = this.subtotal - this.#descuentoAplicado;
        return this.#precioFinal;
    }

    obtenerSubtotal() {
        return this.subtotal;
    }

    cambiarCantidad(nuevaCantidad) {
        if (nuevaCantidad > 0) {
            this.cantidad = nuevaCantidad;
            this.calcularSubtotal();
            return true;
        }
        return false;
    }

    agregarObservacion(obs) {
        this.observacion = obs;
        return this.observacion;
    }

    #validarCantidad() {
        return this.cantidad > 0;
    }

    #validarPrecio() {
        return this.precioUnitario > 0;
    }
}