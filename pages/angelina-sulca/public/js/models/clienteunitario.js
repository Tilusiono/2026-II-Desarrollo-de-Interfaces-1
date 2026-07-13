// ============================================
// CLASE HIJO 1: clienteunitario (hereda de cliente)
// ============================================

import { cliente } from './cliente.js';

export class clienteunitario extends cliente {
    tipoCliente;
    descuentoBase;
    #cantidadComprasUnitarias;

    constructor(id, nombre, correo, telefono, direccion) {
        super(id, nombre, correo, telefono, direccion);
        this.tipoCliente = "Unitario";
        this.descuentoBase = 0;
        this.#cantidadComprasUnitarias = 0;
    }

    get cantidadComprasUnitarias() {
        return this.#cantidadComprasUnitarias;
    }

    set descuentoBase(nuevoDescuento) {
        if (nuevoDescuento >= 0 && nuevoDescuento <= 10) {
            this.descuentoBase = nuevoDescuento;
        }
    }

    agregarCompra(compra) {
        super.agregarCompra(compra);
        this.#cantidadComprasUnitarias = this.#cantidadComprasUnitarias + 1;
        this.actualizarDescuento();
        return this.#cantidadComprasUnitarias;
    }

    actualizarDescuento() {
        if (this.#cantidadComprasUnitarias >= 10) {
            this.descuentoBase = 10;
        } else if (this.#cantidadComprasUnitarias >= 5) {
            this.descuentoBase = 5;
        } else {
            this.descuentoBase = 0;
        }
        return this.descuentoBase;
    }

    obtenerTipo() {
        return "ClienteUnitario";
    }

    obtenerDescripcion() {
        return "Cliente Unitario: " + this.nombre + " - Compras: " + this.#cantidadComprasUnitarias;
    }

    #validarCantidadCompras() {
        return this.#cantidadComprasUnitarias >= 0;
    }
}