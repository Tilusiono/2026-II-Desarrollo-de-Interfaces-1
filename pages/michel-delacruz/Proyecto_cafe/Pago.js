

// ---------
// PAGO
// ---------
class Pago {
    constructor(metodo, monto) {
        this.metodo = metodo; // Yape, efectivo, tarjeta
        this.monto = monto;
        this.estado = "pendiente";
        this.fecha = new Date();
    }

    procesarPago() {
        if (this.monto > 0) {
            this.estado = "completado";
            return true;
        }
        return false;
    }

    obtenerInfo() {
        return `Pago: ${this.metodo} - S/ ${this.monto} - ${this.estado}`;
    }

    #validarMonto(monto) {
    return typeof monto === "number" && monto > 0;
    }

    #cambiarEstado() {
    this.estado = "completado";
    }
}
