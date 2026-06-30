class SoporteTecnico extends Transaccion {
    garantiaActiva;
    #tipoFalla;
    #tecnicoAsignado;
    #piezasCambiadas;

    constructor(id, codigoRef, montoTotal, metodoPago, comprobante, tipoFalla, tecnicoAsignado, piezasCambiadas, garantiaActiva = true) {
        super(id, codigoRef, montoTotal, metodoPago, comprobante);
        this.#tipoFalla = tipoFalla;
        this.#tecnicoAsignado = tecnicoAsignado;
        this.#piezasCambiadas = piezasCambiadas;
        this.garantiaActiva = garantiaActiva;
    }

    #evaluarCostoReparacion() {
        return this.garantiaActiva ? 0 : 150; 
    }

    #validarGarantiaInterna() {
        return this.#piezasCambiadas === 0 && this.garantiaActiva;
    }

    emitirDiagnostico() {
        const costo = this.#evaluarCostoReparacion();
        const aplicaCambio = this.#validarGarantiaInterna();
        return `Técnico ${this.#tecnicoAsignado} informa: ${this.#tipoFalla}. Costo S/${costo}. Cambio aplicable: ${aplicaCambio}`;
    }

    obtenerDetalles() { 
        return `Soporte Técnico | Falla reportada: ${this.#tipoFalla}`;
    }
}