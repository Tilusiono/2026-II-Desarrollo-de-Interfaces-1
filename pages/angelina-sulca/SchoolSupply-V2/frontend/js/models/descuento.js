// ============================================
// CLASE: descuento (NO hereda)
// ============================================

export class descuento {
    #aplicado;
    #metodoPagoSeleccionado;

    porcentajeCantidad;
    porcentajePago;
    descCantidad;
    subtotalConDescuento;
    descPago;
    total;

    constructor(porCant, porPag, desCant, subDesc, desPag, tot) {
        this.porcentajeCantidad = porCant;
        this.porcentajePago = porPag;
        this.descCantidad = desCant;
        this.subtotalConDescuento = subDesc;
        this.descPago = desPag;
        this.total = tot;
        this.#aplicado = false;
        this.#metodoPagoSeleccionado = "Efectivo";
    }

    getaplicado() {
        return this.#aplicado;
    }

    getmetodoPagoSeleccionado() {
        return this.#metodoPagoSeleccionado;
    }

    setmetodoPagoSeleccionado(nuevoMetodo) {
        this.#metodoPagoSeleccionado = nuevoMetodo;
    }

    calcularPorCantidad(cantidad) {
        let descuento = 0;
        if (cantidad >= 24) {
            descuento = 15;
        } else if (cantidad >= 12) {
            descuento = 10;
        } else if (cantidad >= 6) {
            descuento = 5;
        } else {
            descuento = 0;
        }
        this.porcentajeCantidad = descuento;
        this.#aplicado = true;
        return descuento;
    }

    calcularPorPago(metodo) {
        let descuento = 0;
        if (metodo === "Yape" || metodo === "Plin") {
            descuento = 5;
        } else if (metodo === "Transferencia") {
            descuento = 3;
        } else {
            descuento = 0;
        }
        this.porcentajePago = descuento;
        this.#metodoPagoSeleccionado = metodo;
        this.#aplicado = true;
        return descuento;
    }

    calcularTotal(subtotal) {
        let descCant = (subtotal * this.porcentajeCantidad) / 100;
        let subtotalDesc = subtotal - descCant;
        let descPago = (subtotalDesc * this.porcentajePago) / 100;
        let total = subtotalDesc - descPago;
        this.descCantidad = descCant;
        this.subtotalConDescuento = subtotalDesc;
        this.descPago = descPago;
        this.total = total;
        return total;
    }

    obtenerDetalles(subtotal) {
        let descCant = (subtotal * this.porcentajeCantidad) / 100;
        let subtotalDesc = subtotal - descCant;
        let descPago = (subtotalDesc * this.porcentajePago) / 100;
        let total = subtotalDesc - descPago;
        return {
            subtotal: subtotal,
            descCantidad: descCant,
            subtotalConDescuento: subtotalDesc,
            descPago: descPago,
            total: total,
            porcentajeCantidad: this.porcentajeCantidad,
            porcentajePago: this.porcentajePago
        };
    }

    reiniciar() {
        this.porcentajeCantidad = 0;
        this.porcentajePago = 0;
        this.descCantidad = 0;
        this.subtotalConDescuento = 0;
        this.descPago = 0;
        this.total = 0;
        this.#aplicado = false;
    }

    obtenerPorcentajeTotal() {
        return this.porcentajeCantidad + this.porcentajePago;
    }

    #validarMetodoPago(metodo) {
        let metodosValidos = ["Efectivo", "Tarjeta", "Yape", "Plin", "Transferencia"];
        for (let i = 0; i < metodosValidos.length; i++) {
            if (metodosValidos[i] === metodo) {
                return true;
            }
        }
        return false;
    }
}