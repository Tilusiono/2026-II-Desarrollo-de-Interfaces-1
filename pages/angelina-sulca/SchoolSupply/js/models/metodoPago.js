// ============================================
// CLASE: metodoPago (NO hereda)
// ============================================

export class metodoPago {
    #transacciones;
    #totalProcesado;

    nombre;
    descuento;
    tipo;
    estado;

    constructor(cod, nom, desc, tip, est) {
        this.nombre = nom;
        this.descuento = desc;
        this.tipo = tip;
        this.estado = est;
        this.#transacciones = 0;
        this.#totalProcesado = 0;
    }

    gettransacciones() {
        return this.#transacciones;
    }

    gettotalProcesado() {
        return this.#totalProcesado;
    }

    setnombre(nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    setdescuento(nuevoDescuento) {
        if (nuevoDescuento >= 0) {
            this.descuento = nuevoDescuento;
        }
    }

    procesarPago(monto) {
        if (this.estado && this.#validarMonto(monto)) {
            this.#transacciones = this.#transacciones + 1;
            this.#totalProcesado = this.#totalProcesado + monto;
            return true;
        }
        return false;
    }

    obtenerDescuento() {
        return this.descuento;
    }

    obtenerNombre() {
        return this.nombre;
    }

    estaActivo() {
        return this.estado;
    }

    activar() {
        this.estado = true;
        return this.estado;
    }

    desactivar() {
        this.estado = false;
        return this.estado;
    }

    cambiarDescuento(nuevo) {
        if (nuevo >= 0) {
            this.descuento = nuevo;
        }
        return this.descuento;
    }

    #validarMonto(monto) {
        return monto > 0;
    }
}