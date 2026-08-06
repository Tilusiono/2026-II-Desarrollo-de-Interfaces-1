// ============================================
// CLASE HIJO 2: Papeleria (hereda de escolar)
// ============================================

import { escolar } from './escolar.js';

export class Papeleria extends escolar {
    tipoPapel;
    gramaje;
    tamaño;
    color;
    enOferta;
    #tipoProducto;

    constructor(id, nombre, marca, precioUnitario, precioDocena, stock,
                grado, materia, nivel, tipoPapel, gramaje, tamaño, color, enOferta = false) {
        super(id, nombre, marca, precioUnitario, precioDocena, stock, grado, materia, nivel);
        this.tipoPapel = tipoPapel;
        this.gramaje = gramaje;
        this.tamaño = tamaño;
        this.color = color;
        this.enOferta = enOferta;
        this.#tipoProducto = "Papeleria";
    }

    get tipoProducto() {
        return this.#tipoProducto;
    }

    set gramaje(nuevoGramaje) {
        if (nuevoGramaje > 0) {
            this.gramaje = nuevoGramaje;
        }
    }

    obtenerInfo() {
        return super.obtenerInfo() + " - " + this.tipoPapel + " (" + this.gramaje + "g)";
    }

    obtenerTipo() {
        return "Papeleria";
    }

    obtenerDescripcion() {
        return "Papelería: " + this.nombre + " - " + this.tipoPapel;
    }

    #validarGramaje() {
        return this.gramaje >= 60 && this.gramaje <= 300;
    }
}