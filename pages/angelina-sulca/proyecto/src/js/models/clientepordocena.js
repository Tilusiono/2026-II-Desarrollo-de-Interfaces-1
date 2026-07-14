// ============================================
// CLASE HIJO 2: clientepordocena (hereda de cliente)
// ============================================

import { cliente } from './cliente.js';

export class clientepordocena extends cliente {
    tipoCliente;
    descuentoBase;
    cantidadDocenas;
    descuentoAdicional;
    #totalDocenasCompradas;

    constructor(id, nombre, correo, telefono, direccion) {
        super(id, nombre, correo, telefono, direccion);
        this.tipoCliente = "PorDocena";
        this.descuentoBase = 10;
        this.cantidadDocenas = 0;
        this.descuentoAdicional = 0;
        this.#totalDocenasCompradas = 0;
    }

    get totalDocenasCompradas() {
        return this.#totalDocenasCompradas;
    }

    set descuentoBase(nuevoDescuento) {
        if (nuevoDescuento >= 0 && nuevoDescuento <= 20) {
            this.descuentoBase = nuevoDescuento;
        }
    }

    agregarCompra(compra) {
        super.agregarCompra(compra);
        this.#totalDocenasCompradas = this.#totalDocenasCompradas + 1;
        this.actualizarDescuento();
        return this.#totalDocenasCompradas;
    }

    actualizarDescuento() {
        if (this.#totalDocenasCompradas >= 20) {
            this.descuentoAdicional = 5;
        } else if (this.#totalDocenasCompradas >= 10) {
            this.descuentoAdicional = 3;
        } else if (this.#totalDocenasCompradas >= 5) {
            this.descuentoAdicional = 1;
        } else {
            this.descuentoAdicional = 0;
        }
        return this.descuentoBase + this.descuentoAdicional;
    }

    calcularPrecioConDescuento(precio) {
        let descuentoTotal = this.descuentoBase + this.descuentoAdicional;
        let precioFinal = precio - (precio * descuentoTotal / 100);
        return precioFinal;
    }

    obtenerTipo() {
        return "ClientePorDocena";
    }

    obtenerDescripcion() {
        return "Cliente por Docena: " + this.nombre + " - Docenas: " + this.#totalDocenasCompradas;
    }

    #validarDocenas() {
        return this.#totalDocenasCompradas >= 0;
    }
}