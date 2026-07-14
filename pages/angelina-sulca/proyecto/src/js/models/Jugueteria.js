// ============================================
// CLASE HIJO 4: Jugueteria (hereda de producto)
// ============================================

import { producto } from './producto.js';

export class Jugueteria extends producto {
    edadRecomendada;
    tipoJuguete;
    material;
    enOferta;
    #tipoProducto;

    constructor(id, nombre, marca, precioUnitario, precioDocena, stock,
                edadRecomendada, tipoJuguete, material, enOferta = false) {
        super(id, nombre, marca, precioUnitario, precioDocena, stock);
        this.edadRecomendada = edadRecomendada;
        this.tipoJuguete = tipoJuguete;
        this.material = material;
        this.enOferta = enOferta;
        this.#tipoProducto = "Jugueteria";
    }

    get tipoProducto() {
        return this.#tipoProducto;
    }

    set edadRecomendada(nuevaEdad) {
        if (nuevaEdad >= 0) {
            this.edadRecomendada = nuevaEdad;
        }
    }

    obtenerInfo() {
        return super.obtenerInfo() + " - " + this.tipoJuguete + " (Edad: " + this.edadRecomendada + "+)";
    }

    obtenerTipo() {
        return "Jugueteria";
    }

    obtenerDescripcion() {
        return "Juguete: " + this.nombre + " - " + this.tipoJuguete;
    }

    #validarEdad() {
        return this.edadRecomendada >= 0 && this.edadRecomendada <= 18;
    }
}